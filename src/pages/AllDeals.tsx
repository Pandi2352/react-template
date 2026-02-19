import { useMemo, useState } from "react";
import { Eye, Filter, Pencil, RefreshCw, Trash2 } from "lucide-react";
import { cn } from "@/utils";
import {
  ExportMenu,
  SearchInput,
  DataTable,
  Dropdown,
  type DataTableColumn,
  type DropdownOption,
} from "@/components/common";
import { useUI } from "@/hooks";

type DealStage = "Prospect" | "MQL" | "SQL";

interface DealRow {
  id: number;
  company: string;
  companyDot: string;
  dealNo: string;
  dealName: string;
  serviceInterest: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  stage: DealStage;
  value: string;
  closeDate: string;
  createdDate: string;
  score: number;
  lastContact: string;
  assigned: string;
}

const deals: DealRow[] = [
  {
    id: 1,
    company: "Wipro",
    companyDot: "bg-red-500",
    dealNo: "DEAL-000032",
    dealName: "TCS - Auth",
    serviceInterest: "Skillzen",
    contactName: "-",
    contactEmail: "-",
    contactPhone: "-",
    stage: "Prospect",
    value: "₹9.0 L",
    closeDate: "-",
    createdDate: "18 Feb 2026",
    score: 20,
    lastContact: "-",
    assigned: "-",
  },
  {
    id: 2,
    company: "Wipro",
    companyDot: "bg-orange-500",
    dealNo: "DEAL-000031",
    dealName: "Wipro - Auth",
    serviceInterest: "Auth",
    contactName: "Joe",
    contactEmail: "rakeshan.joseelva@ski...",
    contactPhone: "9791605240",
    stage: "Prospect",
    value: "₹6.0 L",
    closeDate: "-",
    createdDate: "17 Feb 2026",
    score: 10,
    lastContact: "1d ago",
    assigned: "Sethupathy",
  },
  {
    id: 3,
    company: "TCS",
    companyDot: "bg-orange-500",
    dealNo: "DEAL-000030",
    dealName: "TCS - Auth",
    serviceInterest: "Auth",
    contactName: "Royston D",
    contactEmail: "royston.d@skil-mine...",
    contactPhone: "8838524693",
    stage: "Prospect",
    value: "-",
    closeDate: "-",
    createdDate: "17 Feb 2026",
    score: 20,
    lastContact: "Today",
    assigned: "Sethupathy",
  },
  {
    id: 4,
    company: "TCS",
    companyDot: "bg-orange-500",
    dealNo: "DEAL-000029",
    dealName: "TCS - Skillzen1",
    serviceInterest: "Skillzen",
    contactName: "Lakshmi A",
    contactEmail: "anna.lakshmi@skil-mi...",
    contactPhone: "9288228222",
    stage: "MQL",
    value: "₹50.0 L",
    closeDate: "-",
    createdDate: "17 Feb 2026",
    score: 20,
    lastContact: "-",
    assigned: "Sethupathy",
  },
  {
    id: 5,
    company: "TCS",
    companyDot: "bg-orange-500",
    dealNo: "DEAL-000028",
    dealName: "TCS - Skillzen",
    serviceInterest: "Skillzen",
    contactName: "Kumaran K",
    contactEmail: "kumaran.k@skil-mine...",
    contactPhone: "7538826754",
    stage: "SQL",
    value: "₹3.0 L",
    closeDate: "-",
    createdDate: "16 Feb 2026",
    score: 30,
    lastContact: "2d ago",
    assigned: "Sethupathy",
  },
];

const stagePillStyles: Record<DealStage, string> = {
  Prospect: "bg-blue-100 text-blue-700 border border-blue-200",
  MQL: "bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200",
  SQL: "bg-indigo-100 text-indigo-700 border border-indigo-200",
};

const statusOptions: DropdownOption<"All" | DealStage>[] = [
  { value: "All", label: "All Status" },
  { value: "Prospect", label: "Prospect" },
  { value: "MQL", label: "MQL" },
  { value: "SQL", label: "SQL" },
];

const FROZEN_COL1_W = 56;
const FROZEN_COL2_W = 120;

export function AllDeals() {
  const { isSidebarCollapsed } = useUI();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"All" | DealStage>("All");
  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      const matchesSearch =
        deal.company.toLowerCase().includes(search.toLowerCase()) ||
        deal.dealNo.toLowerCase().includes(search.toLowerCase()) ||
        deal.dealName.toLowerCase().includes(search.toLowerCase()) ||
        deal.contactName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "All" || deal.stage === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const summary = useMemo(
    () => ({
      total: deals.length,
      prospect: deals.filter((d) => d.stage === "Prospect").length,
      mql: deals.filter((d) => d.stage === "MQL").length,
      sql: deals.filter((d) => d.stage === "SQL").length,
    }),
    [],
  );

  const columns: DataTableColumn<DealRow>[] = useMemo(
    () => [
      {
        header: "S.No",
        accessor: "id",
        className: "text-slate-500",
        frozen: { left: 0, width: FROZEN_COL1_W },
      },
      {
        header: "Company",
        render: (deal) => (
          <div className="inline-flex items-center gap-2 font-semibold text-slate-900">
            <span
              className={cn("h-2 w-2 rounded-full", deal.companyDot)}
            />
            {deal.company}
          </div>
        ),
        frozen: { left: FROZEN_COL1_W, width: FROZEN_COL2_W, shadow: true },
      },
      {
        header: "Deal No",
        render: (deal) => (
          <button
            type="button"
            className="font-medium text-blue-600 hover:underline"
          >
            {deal.dealNo}
          </button>
        ),
      },
      {
        header: "Deal Name",
        accessor: "dealName",
        className: "text-slate-900",
      },
      {
        header: "Service Interest",
        render: (deal) => (
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
            {deal.serviceInterest}
          </span>
        ),
      },
      {
        header: "Contact",
        render: (deal) => (
          <div className="min-w-[132px] max-w-[190px]">
            <p className="text-slate-900">{deal.contactName}</p>
            <p className="truncate text-xs text-slate-500">
              {deal.contactEmail}
            </p>
            <p className="text-xs text-slate-500">{deal.contactPhone}</p>
          </div>
        ),
        className: "!whitespace-normal",
      },
      {
        header: "Stage",
        render: (deal) => (
          <span
            className={cn(
              "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
              stagePillStyles[deal.stage],
            )}
          >
            {deal.stage}
          </span>
        ),
      },
      {
        header: "Value",
        accessor: "value",
        className: "font-medium text-slate-900",
      },
      {
        header: "Close Date",
        accessor: "closeDate",
        className: "hidden text-slate-600 xl:table-cell",
        headerClassName: "hidden xl:table-cell",
      },
      {
        header: "Created Date",
        accessor: "createdDate",
        className: "whitespace-nowrap text-slate-900",
      },
      {
        header: "Score",
        render: (deal) => <>{deal.score}/100</>,
        className: "text-rose-600",
      },
      {
        header: "Last Contact",
        accessor: "lastContact",
        className: "hidden text-slate-500 2xl:table-cell",
        headerClassName: "hidden 2xl:table-cell",
      },
      {
        header: "Assigned",
        accessor: "assigned",
        className: "hidden text-slate-900 xl:table-cell",
        headerClassName: "hidden xl:table-cell",
      },
      {
        header: "Actions",
        align: "center" as const,
        render: () => (
          <div className="inline-flex items-center gap-1">
            <button
              type="button"
              className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
              title="View"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600"
              title="Edit"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Pipeline Overview
          </h1>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span>{summary.total} deals</span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              {summary.prospect}
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-fuchsia-500" />
              {summary.mql}
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              {summary.sql}
            </span>
          </div>
        </div>

        <ExportMenu data={filteredDeals} filename="deals" />
      </div>

      <div className="border border-slate-200 bg-white p-3">
        <div
          className={cn(
            "mb-3 grid gap-2",
            isSidebarCollapsed
              ? "grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto]"
              : "grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto]",
          )}
        >
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search deals..."
          />

          <Dropdown
            options={statusOptions}
            value={status}
            onChange={setStatus}
            className="min-w-[152px]"
          />

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatus("All");
            }}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 px-3 text-slate-600 transition-colors hover:bg-slate-50"
            aria-label="Reset filters"
          >
            <RefreshCw className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        <DataTable<DealRow>
          data={filteredDeals}
          columns={columns}
          keyExtractor={(row) => row.id}
          totalCount={deals.length}
          emptyMessage="No deals found for current filters."
          minWidth={
            isSidebarCollapsed ? "min-w-[1120px]" : "min-w-[1260px]"
          }
        />
      </div>
    </section>
  );
}
