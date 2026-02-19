import { useMemo, useState } from 'react';
import {
  Columns3,
  Filter,
  MoreVertical,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Upload,
} from 'lucide-react';
import { cn } from '@/utils';
import { useUI } from '@/hooks';

type DealStage = 'Prospect' | 'MQL' | 'SQL';

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
    company: 'Wipro',
    companyDot: 'bg-red-500',
    dealNo: 'DEAL-000032',
    dealName: 'TCS - Auth',
    serviceInterest: 'Skillzen',
    contactName: '-',
    contactEmail: '-',
    contactPhone: '-',
    stage: 'Prospect',
    value: '₹9.0 L',
    closeDate: '-',
    createdDate: '18 Feb 2026',
    score: 20,
    lastContact: '-',
    assigned: '-',
  },
  {
    id: 2,
    company: 'Wipro',
    companyDot: 'bg-orange-500',
    dealNo: 'DEAL-000031',
    dealName: 'Wipro - Auth',
    serviceInterest: 'Auth',
    contactName: 'Joe',
    contactEmail: 'rakeshan.joseelva@ski...',
    contactPhone: '9791605240',
    stage: 'Prospect',
    value: '₹6.0 L',
    closeDate: '-',
    createdDate: '17 Feb 2026',
    score: 10,
    lastContact: '1d ago',
    assigned: 'Sethupathy',
  },
  {
    id: 3,
    company: 'TCS',
    companyDot: 'bg-orange-500',
    dealNo: 'DEAL-000030',
    dealName: 'TCS - Auth',
    serviceInterest: 'Auth',
    contactName: 'Royston D',
    contactEmail: 'royston.d@skil-mine...',
    contactPhone: '8838524693',
    stage: 'Prospect',
    value: '-',
    closeDate: '-',
    createdDate: '17 Feb 2026',
    score: 20,
    lastContact: 'Today',
    assigned: 'Sethupathy',
  },
  {
    id: 4,
    company: 'TCS',
    companyDot: 'bg-orange-500',
    dealNo: 'DEAL-000029',
    dealName: 'TCS - Skillzen1',
    serviceInterest: 'Skillzen',
    contactName: 'Lakshmi A',
    contactEmail: 'anna.lakshmi@skil-mi...',
    contactPhone: '9288228222',
    stage: 'MQL',
    value: '₹50.0 L',
    closeDate: '-',
    createdDate: '17 Feb 2026',
    score: 20,
    lastContact: '-',
    assigned: 'Sethupathy',
  },
  {
    id: 5,
    company: 'TCS',
    companyDot: 'bg-orange-500',
    dealNo: 'DEAL-000028',
    dealName: 'TCS - Skillzen',
    serviceInterest: 'Skillzen',
    contactName: 'Kumaran K',
    contactEmail: 'kumaran.k@skil-mine...',
    contactPhone: '7538826754',
    stage: 'SQL',
    value: '₹3.0 L',
    closeDate: '-',
    createdDate: '16 Feb 2026',
    score: 30,
    lastContact: '2d ago',
    assigned: 'Sethupathy',
  },
];

const stagePillStyles: Record<DealStage, string> = {
  Prospect: 'bg-blue-100 text-blue-700 border border-blue-200',
  MQL: 'bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200',
  SQL: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
};

export function AllDeals() {
  const { isSidebarCollapsed } = useUI();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'All' | DealStage>('All');

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      const matchesSearch =
        deal.company.toLowerCase().includes(search.toLowerCase()) ||
        deal.dealNo.toLowerCase().includes(search.toLowerCase()) ||
        deal.dealName.toLowerCase().includes(search.toLowerCase()) ||
        deal.contactName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === 'All' || deal.stage === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const summary = useMemo(
    () => ({
      total: deals.length,
      prospect: deals.filter((d) => d.stage === 'Prospect').length,
      mql: deals.filter((d) => d.stage === 'MQL').length,
      sql: deals.filter((d) => d.stage === 'SQL').length,
    }),
    [],
  );

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Pipeline Overview</h1>
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

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
        >
          <Upload className="h-4 w-4" />
          Import from LOQ
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div
          className={cn(
            'mb-3 grid gap-2',
            isSidebarCollapsed
              ? 'grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto]'
              : 'grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto]',
          )}
        >
          <label className="relative min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search deals..."
              className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400"
            />
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'All' | DealStage)}
            className="h-10 min-w-[136px] rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition-colors focus:border-blue-400"
          >
            <option value="All">All Status</option>
            <option value="Prospect">Prospect</option>
            <option value="MQL">MQL</option>
            <option value="SQL">SQL</option>
          </select>

          <button
            type="button"
            onClick={() => {
              setSearch('');
              setStatus('All');
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
            <Columns3 className="h-4 w-4" />
            Columns (12/12)
          </button>

          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table
            className={cn(
              'w-full table-auto border-collapse text-sm',
              isSidebarCollapsed ? 'min-w-[1120px]' : 'min-w-[1260px]',
            )}
          >
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="whitespace-nowrap border-b border-slate-200 px-3 py-3 text-left font-semibold">S.No</th>
                <th className="whitespace-nowrap border-b border-slate-200 px-3 py-3 text-left font-semibold">Company</th>
                <th className="whitespace-nowrap border-b border-slate-200 px-3 py-3 text-left font-semibold">Deal No</th>
                <th className="whitespace-nowrap border-b border-slate-200 px-3 py-3 text-left font-semibold">Deal Name</th>
                <th className="whitespace-nowrap border-b border-slate-200 px-3 py-3 text-left font-semibold">Service Interest</th>
                <th className="whitespace-nowrap border-b border-slate-200 px-3 py-3 text-left font-semibold">Contact</th>
                <th className="whitespace-nowrap border-b border-slate-200 px-3 py-3 text-left font-semibold">Stage</th>
                <th className="whitespace-nowrap border-b border-slate-200 px-3 py-3 text-left font-semibold">Value</th>
                <th className="hidden whitespace-nowrap border-b border-slate-200 px-3 py-3 text-left font-semibold xl:table-cell">Close Date</th>
                <th className="whitespace-nowrap border-b border-slate-200 px-3 py-3 text-left font-semibold">Created Date</th>
                <th className="whitespace-nowrap border-b border-slate-200 px-3 py-3 text-left font-semibold">Score</th>
                <th className="hidden whitespace-nowrap border-b border-slate-200 px-3 py-3 text-left font-semibold 2xl:table-cell">Last Contact</th>
                <th className="hidden whitespace-nowrap border-b border-slate-200 px-3 py-3 text-left font-semibold xl:table-cell">Assigned</th>
                <th className="whitespace-nowrap border-b border-slate-200 px-3 py-3 text-left font-semibold" />
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map((deal) => (
                <tr key={deal.id} className="border-b border-slate-100 align-top hover:bg-slate-50/60">
                  <td className="px-3 py-3 text-slate-500">{deal.id}</td>
                  <td className="px-3 py-3">
                    <div className="inline-flex items-center gap-2 font-semibold text-slate-900">
                      <span className={cn('h-2 w-2 rounded-full', deal.companyDot)} />
                      {deal.company}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <button type="button" className="font-medium text-blue-600 hover:underline">
                      {deal.dealNo}
                    </button>
                  </td>
                  <td className="px-3 py-3 text-slate-900">{deal.dealName}</td>
                  <td className="px-3 py-3">
                    <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
                      {deal.serviceInterest}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="min-w-[132px] max-w-[190px]">
                      <p className="text-slate-900">{deal.contactName}</p>
                      <p className="truncate text-xs text-slate-500">{deal.contactEmail}</p>
                      <p className="text-xs text-slate-500">{deal.contactPhone}</p>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', stagePillStyles[deal.stage])}>
                      {deal.stage}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-medium text-slate-900">{deal.value}</td>
                  <td className="hidden px-3 py-3 text-slate-600 xl:table-cell">{deal.closeDate}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-slate-900">{deal.createdDate}</td>
                  <td className="px-3 py-3 text-rose-600">{deal.score}/100</td>
                  <td className="hidden px-3 py-3 text-slate-500 2xl:table-cell">{deal.lastContact}</td>
                  <td className="hidden px-3 py-3 text-slate-900 xl:table-cell">{deal.assigned}</td>
                  <td className="px-3 py-3 text-right">
                    <button type="button" className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredDeals.length === 0 && (
                <tr>
                  <td colSpan={20} className="px-3 py-10 text-center text-sm text-slate-500">
                    No deals found for current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredDeals.length} of {deals.length} deals</span>
          <button type="button" className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Table Settings
          </button>
        </div>
      </div>
    </section>
  );
}
