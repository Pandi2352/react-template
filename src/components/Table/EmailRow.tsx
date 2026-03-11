import {
  Archive,
  Clock,
  FolderOpen,
  HardDrive,
  MailOpen,
  Mail,
  Paperclip,
  Reply,
  Star,
  Trash2,
} from "lucide-react";
import type { EmailItem } from "@/types/email";
import { TableCell, TableRow } from "@/components/Table/table";

/* ── Avatar color palette based on first char ── */
const avatarColors: Record<string, string> = {
  A: "from-rose-400 to-pink-500",
  B: "from-orange-400 to-amber-500",
  C: "from-amber-400 to-yellow-500",
  D: "from-lime-400 to-green-500",
  E: "from-emerald-400 to-teal-500",
  F: "from-teal-400 to-cyan-500",
  G: "from-cyan-400 to-sky-500",
  H: "from-sky-400 to-blue-500",
  I: "from-blue-400 to-indigo-500",
  J: "from-indigo-400 to-violet-500",
  K: "from-violet-400 to-purple-500",
  L: "from-purple-400 to-fuchsia-500",
  M: "from-fuchsia-400 to-pink-500",
  N: "from-rose-400 to-red-500",
  O: "from-orange-400 to-red-500",
  P: "from-blue-400 to-violet-500",
  Q: "from-emerald-400 to-cyan-500",
  R: "from-cyan-400 to-blue-500",
  S: "from-violet-400 to-indigo-500",
  T: "from-teal-400 to-emerald-500",
  U: "from-amber-400 to-orange-500",
  V: "from-pink-400 to-rose-500",
  W: "from-sky-400 to-indigo-500",
  X: "from-slate-400 to-gray-500",
  Y: "from-lime-400 to-emerald-500",
  Z: "from-red-400 to-orange-500",
};

function getAvatarGradient(name: string) {
  const char = name.charAt(0).toUpperCase();
  return avatarColors[char] ?? "from-slate-400 to-slate-500";
}

const priorityStyles: Record<string, { dot: string; ring: string }> = {
  high: { dot: "bg-red-500", ring: "ring-red-500/20" },
  medium: { dot: "bg-amber-400", ring: "ring-amber-400/20" },
  low: { dot: "bg-slate-300", ring: "ring-slate-300/20" },
};

const categoryStyles: Record<string, string> = {
  primary: "bg-blue-50 text-blue-600 ring-1 ring-blue-500/10",
  promotions: "bg-violet-50 text-violet-600 ring-1 ring-violet-500/10",
  social: "bg-pink-50 text-pink-600 ring-1 ring-pink-500/10",
  updates: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/10",
  forums: "bg-orange-50 text-orange-600 ring-1 ring-orange-500/10",
};

const sourceStyles: Record<string, { label: string; color: string }> = {
  gmail: { label: "Gmail", color: "bg-red-50 text-red-600 ring-1 ring-red-500/10" },
  outlook: { label: "Outlook", color: "bg-blue-50 text-blue-600 ring-1 ring-blue-500/10" },
  slack: { label: "Slack", color: "bg-purple-50 text-purple-600 ring-1 ring-purple-500/10" },
  github: { label: "GitHub", color: "bg-slate-800 text-white ring-0" },
  direct: { label: "Direct", color: "bg-slate-50 text-slate-500 ring-1 ring-slate-500/10" },
};

const folderStyles: Record<string, string> = {
  inbox: "text-blue-500",
  sent: "text-emerald-500",
  drafts: "text-amber-500",
  spam: "text-red-500",
  trash: "text-slate-400",
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface EmailRowProps {
  email: EmailItem;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onToggleStar: (id: string) => void;
  onToggleRead: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onOpen: (email: EmailItem) => void;
}

export function EmailRow({
  email,
  isSelected,
  onToggleSelect,
  onToggleStar,
  onToggleRead,
  onArchive,
  onDelete,
  onOpen,
}: EmailRowProps) {
  const priority = priorityStyles[email.priority];

  return (
    <TableRow
      className={`group cursor-pointer transition-all duration-150 ${
        !email.isRead
          ? "bg-white hover:bg-blue-50/30"
          : "bg-slate-50/30 hover:bg-slate-50/80"
      } ${isSelected ? "!bg-blue-50/60 ring-1 ring-inset ring-blue-200/50" : ""}`}
      onClick={() => onOpen(email)}
    >
      {/* Checkbox + Priority + Unread indicator */}
      <TableCell className="w-[52px] pl-4">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(email.id)}
              onClick={(e) => e.stopPropagation()}
              className="h-[18px] w-[18px] rounded-[5px] border-slate-300/80 text-blue-600 shadow-sm transition-shadow focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0"
            />
          </div>
          <span
            className={`h-2 w-2 shrink-0 rounded-full ring-2 ${priority.dot} ${priority.ring}`}
            title={`${email.priority} priority`}
          />
        </div>
      </TableCell>

      {/* Star */}
      <TableCell className="w-[36px] px-0">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onToggleStar(email.id); }}
          className="rounded-md p-1 transition-colors hover:bg-amber-50"
        >
          <Star
            className={`h-[15px] w-[15px] transition-all duration-200 ${
              email.isStarred
                ? "fill-amber-400 text-amber-400 drop-shadow-[0_1px_2px_rgba(251,191,36,0.4)]"
                : "text-slate-300 hover:text-slate-400"
            }`}
          />
        </button>
      </TableCell>

      {/* From */}
      <TableCell className="min-w-[170px] max-w-[200px]">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-bold text-white shadow-sm ${getAvatarGradient(email.from.name)}`}
          >
            {email.from.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className={`truncate text-[13px] leading-tight ${!email.isRead ? "font-semibold text-slate-900" : "font-medium text-slate-600"}`}>
                {email.from.name}
              </p>
              {!email.isRead && (
                <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-blue-500" />
              )}
            </div>
            {email.hasReplied && (
              <span className="mt-0.5 flex items-center gap-0.5 text-[10px] text-slate-400">
                <Reply className="h-2.5 w-2.5" /> replied
              </span>
            )}
          </div>
        </div>
      </TableCell>

      {/* Subject + Preview */}
      <TableCell>
        <div className="min-w-0 max-w-[420px]">
          <div className="flex items-center gap-2">
            <p className={`truncate text-[13px] leading-tight ${!email.isRead ? "font-semibold text-slate-900" : "font-normal text-slate-600"}`}>
              {email.subject}
            </p>
            {email.attachments.length > 0 && (
              <span className="flex shrink-0 items-center gap-0.5 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                <Paperclip className="h-2.5 w-2.5" />
                {email.attachments.length}
              </span>
            )}
          </div>
          <p className="mt-0.5 truncate text-xs leading-normal text-slate-400">
            {email.preview}
          </p>
        </div>
      </TableCell>

      {/* Category */}
      <TableCell className="w-[100px]">
        <span className={`inline-flex rounded-md px-2 py-[3px] text-[10px] font-semibold capitalize ${categoryStyles[email.category] ?? "bg-slate-50 text-slate-500"}`}>
          {email.category}
        </span>
      </TableCell>

      {/* Labels */}
      <TableCell className="w-[130px]">
        <div className="flex flex-wrap gap-1">
          {email.labels.slice(0, 2).map((label) => (
            <span
              key={label}
              className="rounded-md bg-slate-100/80 px-1.5 py-[2px] text-[10px] font-medium text-slate-500"
            >
              {label}
            </span>
          ))}
          {email.labels.length > 2 && (
            <span className="rounded-md bg-slate-100/80 px-1.5 py-[2px] text-[10px] font-medium text-slate-400">
              +{email.labels.length - 2}
            </span>
          )}
        </div>
      </TableCell>

      {/* Size */}
      <TableCell className="w-[70px]">
        <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
          <HardDrive className="h-3 w-3" />
          {email.size}
        </div>
      </TableCell>

      {/* Folder */}
      <TableCell className="w-[80px]">
        <div className="flex items-center gap-1.5">
          <FolderOpen className={`h-3.5 w-3.5 ${folderStyles[email.folder] ?? "text-slate-400"}`} />
          <span className="text-[11px] font-medium capitalize text-slate-500">{email.folder}</span>
        </div>
      </TableCell>

      {/* Source */}
      <TableCell className="w-[80px]">
        {(() => {
          const src = sourceStyles[email.source];
          return src ? (
            <span className={`inline-flex rounded-md px-2 py-[3px] text-[10px] font-bold ${src.color}`}>
              {src.label}
            </span>
          ) : null;
        })()}
      </TableCell>

      {/* Date / Hover actions */}
      <TableCell className="w-[130px] pr-4">
        <div className="flex items-center justify-end">
          {/* Date — hidden on row hover */}
          <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400 group-hover:hidden">
            <Clock className="h-3 w-3" />
            {formatDate(email.date)}
          </span>

          {/* Hover actions */}
          <div className="hidden items-center gap-0.5 group-hover:flex">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onToggleRead(email.id); }}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
              title={email.isRead ? "Mark unread" : "Mark read"}
            >
              {email.isRead ? <Mail className="h-3.5 w-3.5" /> : <MailOpen className="h-3.5 w-3.5" />}
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onArchive(email.id); }}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600"
              title="Archive"
            >
              <Archive className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onDelete(email.id); }}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
              title="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
