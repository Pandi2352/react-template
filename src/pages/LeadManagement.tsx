import { useCallback, useEffect, useMemo, useState } from "react";
import { Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import { cn } from "@/utils";
import {
  Button,
  ExportMenu,
  Modal,
  SearchInput,
  DataTable,
  Dropdown,
  Input,
  type DataTableColumn,
  type DropdownOption,
} from "@/components/common";
import { useUI } from "@/hooks";
import { leadsService } from "@/services";
import type { Lead, LeadSource, LeadStatus } from "@/services";

/* ── Styles ── */

const statusStyles: Record<LeadStatus, string> = {
  New: "bg-sky-100 text-sky-800 border border-sky-200",
  Contacted: "bg-amber-100 text-amber-800 border border-amber-200",
  Qualified: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  Unqualified: "bg-slate-100 text-slate-700 border border-slate-200",
};

const sourceStyles: Record<LeadSource, string> = {
  Website: "bg-violet-50 text-violet-700 border-violet-200",
  Referral: "bg-teal-50 text-teal-700 border-teal-200",
  LinkedIn: "bg-blue-50 text-blue-700 border-blue-200",
  "Cold Call": "bg-orange-50 text-orange-700 border-orange-200",
  Event: "bg-pink-50 text-pink-700 border-pink-200",
};

/* ── Filter Options ── */

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

const sourceFormOptions: DropdownOption<LeadSource>[] = [
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

/* ── Empty form ── */
const emptyForm = { name: "", email: "", phone: "", company: "", designation: "", source: "Website" as LeadSource };

/* ── Component ── */

export function LeadManagement() {
  const { isSidebarCollapsed, addToast } = useUI();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"All" | LeadStatus>("All");
  const [source, setSource] = useState<"All" | LeadSource>("All");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);

  /* ── Fetch leads from API ── */
  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await leadsService.getAll({
        search: search || undefined,
        status: status !== "All" ? status : undefined,
        source: source !== "All" ? source : undefined,
      });
      const paginated = res.data.data;
      setLeads(paginated.data);
      setTotalCount(paginated.total);
    } catch {
      addToast({ type: "error", message: "Failed to load leads" });
    } finally {
      setIsLoading(false);
    }
  }, [search, status, source, addToast]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  /* ── Create / Update ── */
  function openCreate() {
    setEditingLead(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(lead: Lead) {
    setEditingLead(lead);
    setForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      designation: lead.designation,
      source: lead.source,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.name.trim() || !form.email.trim()) {
      addToast({ type: "error", message: "Name and email are required" });
      return;
    }
    setIsSaving(true);
    try {
      if (editingLead) {
        await leadsService.update(editingLead.id, form);
        addToast({ type: "success", message: "Lead updated" });
      } else {
        await leadsService.create(form);
        addToast({ type: "success", message: "Lead created" });
      }
      setModalOpen(false);
      fetchLeads();
    } catch {
      addToast({ type: "error", message: "Failed to save lead" });
    } finally {
      setIsSaving(false);
    }
  }

  /* ── Delete ── */
  async function handleDelete(id: number) {
    try {
      await leadsService.delete(id);
      addToast({ type: "success", message: "Lead deleted" });
      fetchLeads();
    } catch {
      addToast({ type: "error", message: "Failed to delete lead" });
    }
  }

  /* ── Summary ── */
  const summary = useMemo(
    () => ({
      total: totalCount,
      new: leads.filter((l) => l.status === "New").length,
      contacted: leads.filter((l) => l.status === "Contacted").length,
      qualified: leads.filter((l) => l.status === "Qualified").length,
    }),
    [leads, totalCount],
  );

  /* ── Columns ── */
  const columns: DataTableColumn<Lead>[] = useMemo(
    () => [
      { header: "S.No", accessor: "id", className: "text-slate-500" },
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
      { header: "Company", accessor: "company", className: "font-medium text-slate-900" },
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
          <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-xs font-medium", sourceStyles[lead.source])}>
            {lead.source}
          </span>
        ),
      },
      {
        header: "Status",
        render: (lead) => (
          <span className={cn("inline-flex rounded-full px-2 py-0.5 text-xs font-medium", statusStyles[lead.status])}>
            {lead.status}
          </span>
        ),
      },
      {
        header: "Score",
        render: (lead) => (
          <span className={cn("font-medium", scoreColor(lead.score))}>{lead.score}/100</span>
        ),
      },
      { header: "Assigned", accessor: "assignedTo", className: "text-slate-700" },
      { header: "Created", accessor: "createdDate", className: "text-slate-700" },
      {
        header: "Actions",
        align: "left" as const,
        render: (lead) => (
          <div className="inline-flex items-center gap-1">
            <button type="button" onClick={() => openEdit(lead)}
              className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600" title="Edit">
              <Pencil className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => handleDelete(lead.id)}
              className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600" title="Delete">
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Lead Management</h1>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span>{summary.total} leads</span>
            <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-sky-500" />{summary.new}</span>
            <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" />{summary.contacted}</span>
            <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" />{summary.qualified}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={openCreate}>
            <Plus className="mr-1.5 h-4 w-4" /> Add Lead
          </Button>
          <ExportMenu data={leads} filename="leads" />
        </div>
      </div>

      <div className="border border-slate-200 bg-white p-3">
        <div className={cn(
          "mb-3 grid gap-2",
          isSidebarCollapsed
            ? "grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto]"
            : "grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto_auto_auto]",
        )}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search leads..." />
          <Dropdown options={statusOptions} value={status} onChange={setStatus} className="min-w-[152px]" />
          <Dropdown options={sourceOptions} value={source} onChange={setSource} className="min-w-[152px]" />
          <button type="button" onClick={() => { setSearch(""); setStatus("All"); setSource("All"); }}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 px-3 text-slate-600 transition-colors hover:bg-slate-50"
            aria-label="Reset filters">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        <DataTable<Lead>
          data={leads}
          columns={columns}
          keyExtractor={(row) => row.id}
          storageKey="lead_table_settings"
          totalCount={totalCount}
          emptyMessage={isLoading ? "Loading leads..." : "No leads found for current filters."}
          minWidth={isSidebarCollapsed ? "min-w-[1020px]" : "min-w-[1160px]"}
        />
      </div>

      {/* ── Create/Edit Modal ── */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingLead ? "Edit Lead" : "Create Lead"}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} isLoading={isSaving}>
              {editingLead ? "Update" : "Create"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input id="lead-name" label="Name" placeholder="Full name" required
              value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <Input id="lead-email" label="Email" type="email" placeholder="email@example.com" required
              value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input id="lead-phone" label="Phone" placeholder="9876543210"
              value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
            <Input id="lead-company" label="Company" placeholder="Company name"
              value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input id="lead-designation" label="Designation" placeholder="Job title"
              value={form.designation} onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))} />
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Source</label>
              <Dropdown options={sourceFormOptions} value={form.source}
                onChange={(v) => setForm((f) => ({ ...f, source: v as LeadSource }))} />
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}
