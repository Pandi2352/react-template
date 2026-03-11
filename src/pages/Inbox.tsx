import { useCallback, useMemo, useState } from "react";
import {
  Archive,
  CheckCheck,
  Inbox as InboxIcon,
  Mail,
  MailOpen,
  RefreshCw,
  Search,
  Sparkles,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { EmailTable } from "@/components/Table/EmailTable";
import { EmailDetailPanel } from "@/components/Table/EmailDetailPanel";
import type { EmailCategory, EmailItem } from "@/types/email";
import rawEmails from "@/mocks/data/emails.json";

const initialEmails = rawEmails as EmailItem[];

const categories: { value: "all" | EmailCategory; label: string; icon: typeof Mail }[] = [
  { value: "all", label: "All Mail", icon: Mail },
  { value: "primary", label: "Primary", icon: InboxIcon },
  { value: "promotions", label: "Promotions", icon: Sparkles },
  { value: "social", label: "Social", icon: CheckCheck },
  { value: "updates", label: "Updates", icon: RefreshCw },
];

export function Inbox() {
  const [emails, setEmails] = useState<EmailItem[]>(initialEmails);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | EmailCategory>("all");
  const [filterRead, setFilterRead] = useState<"all" | "unread" | "read">("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [openEmail, setOpenEmail] = useState<EmailItem | null>(null);

  /* ── Filtered ── */
  const filtered = useMemo(() => {
    let result = emails.filter((e) => !e.isArchived);
    if (activeCategory !== "all") result = result.filter((e) => e.category === activeCategory);
    if (filterRead === "unread") result = result.filter((e) => !e.isRead);
    else if (filterRead === "read") result = result.filter((e) => e.isRead);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.from.name.toLowerCase().includes(q) ||
          e.from.email.toLowerCase().includes(q) ||
          e.subject.toLowerCase().includes(q) ||
          e.preview.toLowerCase().includes(q) ||
          e.labels.some((l) => l.toLowerCase().includes(q)),
      );
    }
    return result;
  }, [emails, activeCategory, filterRead, search]);

  const stats = useMemo(() => {
    const active = emails.filter((e) => !e.isArchived);
    return {
      total: active.length,
      unread: active.filter((e) => !e.isRead).length,
      starred: active.filter((e) => e.isStarred).length,
    };
  }, [emails]);

  /* ── Actions ── */
  const updateEmail = useCallback((id: string, updates: Partial<EmailItem>) => {
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    if (openEmail?.id === id) setOpenEmail((prev) => (prev ? { ...prev, ...updates } : null));
  }, [openEmail]);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    const allIds = filtered.map((e) => e.id);
    setSelectedIds(allIds.every((id) => selectedIds.has(id)) ? new Set() : new Set(allIds));
  }, [filtered, selectedIds]);

  const toggleStar = useCallback((id: string) => {
    updateEmail(id, { isStarred: !emails.find((e) => e.id === id)?.isStarred });
  }, [emails, updateEmail]);

  const toggleRead = useCallback((id: string) => {
    updateEmail(id, { isRead: !emails.find((e) => e.id === id)?.isRead });
  }, [emails, updateEmail]);

  const archiveEmail = useCallback((id: string) => {
    updateEmail(id, { isArchived: true });
    if (openEmail?.id === id) setOpenEmail(null);
    setSelectedIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
  }, [updateEmail, openEmail]);

  const deleteEmail = useCallback((id: string) => {
    setEmails((prev) => prev.filter((e) => e.id !== id));
    if (openEmail?.id === id) setOpenEmail(null);
    setSelectedIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
  }, [openEmail]);

  const handleOpen = useCallback((email: EmailItem) => {
    updateEmail(email.id, { isRead: true });
    setOpenEmail({ ...email, isRead: true });
  }, [updateEmail]);

  const bulkMarkRead = useCallback(() => {
    setEmails((prev) => prev.map((e) => (selectedIds.has(e.id) ? { ...e, isRead: true } : e)));
    setSelectedIds(new Set());
  }, [selectedIds]);

  const bulkArchive = useCallback(() => {
    setEmails((prev) => prev.map((e) => (selectedIds.has(e.id) ? { ...e, isArchived: true } : e)));
    setSelectedIds(new Set());
  }, [selectedIds]);

  const bulkDelete = useCallback(() => {
    setEmails((prev) => prev.filter((e) => !selectedIds.has(e.id)));
    setSelectedIds(new Set());
  }, [selectedIds]);

  return (
    <section className="flex h-[calc(100vh-7rem)] flex-col gap-0">
      {/* ═══ Header ═══ */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Inbox</h1>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="font-medium">{stats.total} emails</span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/40" />
                  {stats.unread} unread
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {stats.starred}
                </span>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => { setEmails(initialEmails); setOpenEmail(null); setSelectedIds(new Set()); }}
          className="group inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-4 py-2.5 text-[13px] font-medium text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:shadow-none active:scale-[0.98]"
        >
          <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180" /> Refresh
        </button>
      </div>

      {/* ═══ Search + Filter bar ═══ */}
      <div className="flex flex-wrap items-center gap-2.5 pb-4">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search emails..."
            className="h-10 w-full rounded-xl border border-slate-200/80 bg-white pl-10 pr-10 text-[13px] text-slate-700 shadow-sm outline-none placeholder:text-slate-400 transition-all focus:border-blue-300 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] focus:ring-0"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilterRead(f)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 text-[12px] font-semibold transition-all ${
                filterRead === f
                  ? "bg-slate-900 text-white shadow-inner"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              {f === "unread" && <MailOpen className="h-3 w-3" />}
              {f === "read" && <Mail className="h-3 w-3" />}
              {f === "all" ? "All" : f === "unread" ? "Unread" : "Read"}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ Category tabs ═══ */}
      <div className="-mx-1 flex gap-0.5 border-b border-slate-200/60 px-1">
        {categories.map((cat) => {
          const count = cat.value === "all"
            ? emails.filter((e) => !e.isArchived).length
            : emails.filter((e) => !e.isArchived && e.category === cat.value).length;
          const isActive = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActiveCategory(cat.value)}
              className={`relative flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium transition-colors ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <cat.icon className="h-3.5 w-3.5" />
              {cat.label}
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                isActive ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400"
              }`}>
                {count}
              </span>
              {/* Active indicator */}
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-blue-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* ═══ Bulk actions ═══ */}
      {selectedIds.size > 0 && (
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-3 ring-1 ring-blue-200/40">
          <span className="text-[13px] font-semibold text-blue-700">
            {selectedIds.size} selected
          </span>
          <div className="h-4 w-px bg-blue-200/60" />
          <div className="flex items-center gap-1">
            <button type="button" onClick={bulkMarkRead}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-blue-600 transition-colors hover:bg-blue-100/60">
              <CheckCheck className="h-3.5 w-3.5" /> Mark Read
            </button>
            <button type="button" onClick={bulkArchive}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-amber-600 transition-colors hover:bg-amber-100/60">
              <Archive className="h-3.5 w-3.5" /> Archive
            </button>
            <button type="button" onClick={bulkDelete}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-red-600 transition-colors hover:bg-red-100/60">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
          <button type="button" onClick={() => setSelectedIds(new Set())}
            className="ml-auto text-[11px] font-medium text-blue-500 hover:text-blue-700 hover:underline">
            Clear
          </button>
        </div>
      )}

      {/* ═══ Main content ═══ */}
      <div className={`mt-3 flex flex-1 overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm ${openEmail ? "shadow-md" : ""}`}>
        {/* Email list */}
        <div className={`flex-1 overflow-y-auto ${openEmail ? "hidden lg:block lg:max-w-[58%] lg:border-r lg:border-slate-100" : ""}`}>
          <EmailTable
            emails={filtered}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
            onSelectAll={selectAll}
            onToggleStar={toggleStar}
            onToggleRead={toggleRead}
            onArchive={archiveEmail}
            onDelete={deleteEmail}
            onOpen={handleOpen}
          />
        </div>

        {/* Detail panel */}
        {openEmail && (
          <div className="flex-1 lg:min-w-[42%]">
            <EmailDetailPanel
              email={openEmail}
              onClose={() => setOpenEmail(null)}
              onToggleStar={toggleStar}
              onArchive={archiveEmail}
              onDelete={deleteEmail}
            />
          </div>
        )}
      </div>

      {/* ═══ Footer ═══ */}
      <div className="flex items-center justify-between px-1 pt-3 text-[11px] font-medium text-slate-400">
        <span>
          Showing <span className="text-slate-500">{filtered.length}</span> of {stats.total} emails
        </span>
        <span>
          <span className="text-slate-500">{filtered.filter((e) => !e.isRead).length}</span> unread in view
        </span>
      </div>
    </section>
  );
}
