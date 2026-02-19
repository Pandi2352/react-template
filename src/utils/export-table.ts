// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ExportColumn<T = any> {
  key: keyof T;
  header: string;
}

/** Convert camelCase / snake_case key to "Title Case" header */
function keyToHeader(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Auto-derive columns from the first row's keys */
export function deriveColumns<T>(data: T[]): ExportColumn<T>[] {
  if (data.length === 0) return [];
  return Object.keys(data[0] as object).map((key) => ({
    key: key as keyof T,
    header: keyToHeader(key),
  }));
}

function escapeCSV(value: unknown): string {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function buildRows<T>(
  data: T[],
  columns: ExportColumn<T>[],
): string[][] {
  return data.map((row) =>
    columns.map((col) => String(row[col.key] ?? "")),
  );
}

export function exportToCSV<T>(
  data: T[],
  columns?: ExportColumn<T>[],
  filename = "export",
) {
  const cols = columns ?? deriveColumns(data);
  const header = cols.map((c) => escapeCSV(c.header)).join(",");
  const rows = buildRows(data, cols).map((r) =>
    r.map(escapeCSV).join(","),
  );
  const csv = [header, ...rows].join("\n");

  download(csv, `${filename}.csv`, "text/csv;charset=utf-8;");
}

export function exportToExcel<T>(
  data: T[],
  columns?: ExportColumn<T>[],
  filename = "export",
) {
  const cols = columns ?? deriveColumns(data);
  const headerRow = cols
    .map((c) => `<th>${escapeHTML(c.header)}</th>`)
    .join("");
  const bodyRows = buildRows(data, cols)
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td>${escapeHTML(cell)}</td>`).join("")}</tr>`,
    )
    .join("");

  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head><meta charset="UTF-8"></head>
    <body><table><thead><tr>${headerRow}</tr></thead><tbody>${bodyRows}</tbody></table></body>
    </html>`;

  download(html, `${filename}.xls`, "application/vnd.ms-excel;charset=utf-8;");
}

function escapeHTML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function download(content: string, filename: string, mimeType: string) {
  const blob = new Blob(["\uFEFF" + content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
