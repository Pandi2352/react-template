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

type LeadSource = "Website" | "Referral" | "LinkedIn" | "Cold Call" | "Event";
type LeadStatus = "New" | "Contacted" | "Qualified" | "Unqualified";

interface LeadRow {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  designation: string;
  source: LeadSource;
  status: LeadStatus;
  score: number;
  assignedTo: string;
  createdDate: string;
  lastActivity: string;
}

const leads: LeadRow[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    email: "arjun.mehta@techcorp.in",
    phone: "9876543210",
    company: "TechCorp India",
    designation: "CTO",
    source: "LinkedIn",
    status: "Qualified",
    score: 85,
    assignedTo: "Sethupathy",
    createdDate: "19 Feb 2026",
    lastActivity: "Today",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@innovate.io",
    phone: "9123456780",
    company: "Innovate Solutions",
    designation: "VP Engineering",
    source: "Website",
    status: "Contacted",
    score: 62,
    assignedTo: "Kumaran",
    createdDate: "18 Feb 2026",
    lastActivity: "1d ago",
  },
  {
    id: 3,
    name: "Rahul Verma",
    email: "rahul.v@globalsoft.com",
    phone: "9988776655",
    company: "GlobalSoft",
    designation: "Product Manager",
    source: "Referral",
    status: "New",
    score: 40,
    assignedTo: "-",
    createdDate: "18 Feb 2026",
    lastActivity: "-",
  },
  {
    id: 4,
    name: "Sneha Iyer",
    email: "sneha.iyer@cloudnine.in",
    phone: "8877665544",
    company: "CloudNine Tech",
    designation: "Head of IT",
    source: "Event",
    status: "Qualified",
    score: 78,
    assignedTo: "Sethupathy",
    createdDate: "17 Feb 2026",
    lastActivity: "2d ago",
  },
  {
    id: 5,
    name: "Vikram Reddy",
    email: "vikram.r@nexgen.co",
    phone: "7766554433",
    company: "NexGen Systems",
    designation: "Director",
    source: "Cold Call",
    status: "Contacted",
    score: 55,
    assignedTo: "Lakshmi",
    createdDate: "16 Feb 2026",
    lastActivity: "3d ago",
  },
  {
    id: 6,
    name: "Deepa Nair",
    email: "deepa.nair@sparkle.io",
    phone: "9654321870",
    company: "Sparkle Digital",
    designation: "CEO",
    source: "LinkedIn",
    status: "New",
    score: 30,
    assignedTo: "-",
    createdDate: "15 Feb 2026",
    lastActivity: "-",
  },
  {
    id: 7,
    name: "Karthik Rajan",
    email: "karthik.r@byteworks.in",
    phone: "9012345678",
    company: "ByteWorks",
    designation: "Engineering Lead",
    source: "Website",
    status: "Unqualified",
    score: 15,
    assignedTo: "Kumaran",
    createdDate: "14 Feb 2026",
    lastActivity: "5d ago",
  },
  {
    id: 8,
    name: "Ananya Das",
    email: "ananya.d@pinnacle.com",
    phone: "8901234567",
    company: "Pinnacle Corp",
    designation: "VP Sales",
    source: "Referral",
    status: "Qualified",
    score: 90,
    assignedTo: "Sethupathy",
    createdDate: "13 Feb 2026",
    lastActivity: "Today",
  },
  {
    id: 9,
    name: "Ananya Das",
    email: "ananya.d@pinnacle.com",
    phone: "8901234567",
    company: "Pinnacle Corp",
    designation: "VP Sales",
    source: "Referral",
    status: "Qualified",
    score: 90,
    assignedTo: "Sethupathy",
    createdDate: "13 Feb 2026",
    lastActivity: "Today",
  },
  {
    id: 10,
    name: "Ananya Das",
    email: "ananya.d@pinnacle.com",
    phone: "8901234567",
    company: "Pinnacle Corp",
    designation: "VP Sales",
    source: "Referral",
    status: "Qualified",
    score: 90,
    assignedTo: "Sethupathy",
    createdDate: "13 Feb 2026",
    lastActivity: "Today",
  },
  {
    id: 11,
    name: "Ananya Das",
    email: "ananya.d@pinnacle.com",
    phone: "8901234567",
    company: "Pinnacle Corp",
    designation: "VP Sales",
    source: "Referral",
    status: "Qualified",
    score: 90,
    assignedTo: "Sethupathy",
    createdDate: "13 Feb 2026",
    lastActivity: "Today",
  },
];

const statusStyles: Record<LeadStatus, string> = {
  New: "bg-sky-100 text-sky-700 border border-sky-200",
  Contacted: "bg-amber-100 text-amber-700 border border-amber-200",
  Qualified: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Unqualified: "bg-slate-100 text-slate-500 border border-slate-200",
};

const sourceStyles: Record<LeadSource, string> = {
  Website: "bg-violet-50 text-violet-600 border-violet-200",
  Referral: "bg-teal-50 text-teal-600 border-teal-200",
  LinkedIn: "bg-blue-50 text-blue-600 border-blue-200",
  "Cold Call": "bg-orange-50 text-orange-600 border-orange-200",
  Event: "bg-pink-50 text-pink-600 border-pink-200",
};

const statusOptions: DropdownOption<"All" | LeadStatus>[] = [
  { value: "All", label: "All Status" },
  { value: "New", label: "New" },
  { value: "Contacted", label: "Contacted" },
  { value: "Qualified", label: "Qualified" },
  { value: "Unqualified", label: "Unqualified" },
];

const sourceOptions: DropdownOption<"All" | LeadSource>[] = [
  { value: "All", label: "All Sources" },
  { value: "Website", label: "Website" },
  { value: "Referral", label: "Referral" },
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "Cold Call", label: "Cold Call" },
  { value: "Event", label: "Event" },
];

function scoreColor(score: number) {
  if (score >= 75) return "text-emerald-600";
  if (score >= 50) return "text-amber-600";
  return "text-rose-600";
}

export function LeadManagement() {
  const { isSidebarCollapsed } = useUI();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"All" | LeadStatus>("All");
  const [source, setSource] = useState<"All" | LeadSource>("All");

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const q = search.toLowerCase();
      const matchesSearch =
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.company.toLowerCase().includes(q);
      const matchesStatus = status === "All" || lead.status === status;
      const matchesSource = source === "All" || lead.source === source;
      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [search, status, source]);

  const summary = useMemo(
    () => ({
      total: leads.length,
      new: leads.filter((l) => l.status === "New").length,
      contacted: leads.filter((l) => l.status === "Contacted").length,
      qualified: leads.filter((l) => l.status === "Qualified").length,
    }),
    [],
  );

  const columns: DataTableColumn<LeadRow>[] = useMemo(
    () => [
      {
        header: "S.No",
        accessor: "id",
        className: "text-slate-500",
      },
      {
        header: "Name",
        render: (lead) => (
          <div>
            <p className="font-semibold text-slate-900">{lead.name}</p>
            <p className="text-xs text-slate-500">{lead.designation}</p>
          </div>
        ),
        className: "!whitespace-normal",
      },
      {
        header: "Company",
        accessor: "company",
        className: "font-medium text-slate-900",
      },
      {
        header: "Contact",
        render: (lead) => (
          <div>
            <p className="text-slate-700">{lead.email}</p>
            <p className="text-xs text-slate-500">{lead.phone}</p>
          </div>
        ),
        className: "!whitespace-normal",
      },
      {
        header: "Source",
        render: (lead) => (
          <span
            className={cn(
              "inline-flex rounded-full border px-2 py-0.5 text-xs font-medium",
              sourceStyles[lead.source],
            )}
          >
            {lead.source}
          </span>
        ),
      },
      {
        header: "Status",
        render: (lead) => (
          <span
            className={cn(
              "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
              statusStyles[lead.status],
            )}
          >
            {lead.status}
          </span>
        ),
      },
      {
        header: "Score",
        render: (lead) => (
          <span className={cn("font-medium", scoreColor(lead.score))}>
            {lead.score}/100
          </span>
        ),
      },
      {
        header: "Assigned",
        accessor: "assignedTo",
        className: "text-slate-700",
      },
      {
        header: "Created",
        accessor: "createdDate",
        className: "text-slate-700",
      },
      {
        header: "Last Activity",
        accessor: "lastActivity",
        className: "text-slate-500",
        headerClassName: "hidden xl:table-cell",
        // hidden on smaller screens, className needs it too
      },
      {
        header: "Actions",
        align: "left" as const,
        render: () => (
          <div className="inline-flex items-left gap-1">
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
            Lead Management
          </h1>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span>{summary.total} leads</span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              {summary.new}
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              {summary.contacted}
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {summary.qualified}
            </span>
          </div>
        </div>

        <ExportMenu data={filteredLeads} filename="leads" />
      </div>

      <div className="border border-slate-200 bg-white p-3">
        <div
          className={cn(
            "mb-3 grid gap-2",
            isSidebarCollapsed
              ? "grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto_auto]"
              : "grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto_auto]",
          )}
        >
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search leads..."
          />

          <Dropdown
            options={statusOptions}
            value={status}
            onChange={setStatus}
            className="min-w-[152px]"
          />

          <Dropdown
            options={sourceOptions}
            value={source}
            onChange={setSource}
            className="min-w-[152px]"
          />

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatus("All");
              setSource("All");
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

        <DataTable<LeadRow>
          data={filteredLeads}
          columns={columns}
          keyExtractor={(row) => row.id}
          storageKey="lead_table_settings"
          totalCount={leads.length}
          emptyMessage="No leads found for current filters."
          minWidth={isSidebarCollapsed ? "min-w-[1020px]" : "min-w-[1160px]"}
        />
      </div>
    </section>
  );
}
