import { Inbox } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table/table";
import { EmailRow } from "@/components/Table/EmailRow";
import type { EmailItem } from "@/types/email";

interface EmailTableProps {
  emails: EmailItem[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onToggleStar: (id: string) => void;
  onToggleRead: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onOpen: (email: EmailItem) => void;
}

export function EmailTable({
  emails,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onToggleStar,
  onToggleRead,
  onArchive,
  onDelete,
  onOpen,
}: EmailTableProps) {
  if (emails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-sm">
          <Inbox className="h-7 w-7 text-slate-400" />
        </div>
        <p className="mt-5 text-sm font-semibold text-slate-700">No emails found</p>
        <p className="mt-1.5 max-w-[240px] text-center text-xs leading-relaxed text-slate-400">
          Try adjusting your search or filter criteria to find what you're looking for
        </p>
      </div>
    );
  }

  const allSelected = emails.length > 0 && emails.every((e) => selectedIds.has(e.id));

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b-slate-200/60">
          <TableHead className="w-[52px] pl-4">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={onSelectAll}
              className="h-[18px] w-[18px] rounded-[5px] border-slate-300/80 text-blue-600 shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0"
            />
          </TableHead>
          <TableHead className="w-[36px] px-0" />
          <TableHead className="min-w-[170px]">From</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead className="w-[100px]">Category</TableHead>
          <TableHead className="w-[130px]">Labels</TableHead>
          <TableHead className="w-[70px]">Size</TableHead>
          <TableHead className="w-[80px]">Folder</TableHead>
          <TableHead className="w-[80px]">Source</TableHead>
          <TableHead className="w-[130px] pr-4 text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {emails.map((email) => (
          <EmailRow
            key={email.id}
            email={email}
            isSelected={selectedIds.has(email.id)}
            onToggleSelect={onToggleSelect}
            onToggleStar={onToggleStar}
            onToggleRead={onToggleRead}
            onArchive={onArchive}
            onDelete={onDelete}
            onOpen={onOpen}
          />
        ))}
      </TableBody>
    </Table>
  );
}
