import {
  Archive,
  ArrowLeft,
  Calendar,
  Download,
  FileText,
  Forward,
  Paperclip,
  Reply,
  ReplyAll,
  Star,
  Trash2,
  X,
} from "lucide-react";
import type { EmailItem } from "@/types/email";

const priorityBadge: Record<string, string> = {
  high: "bg-red-50 text-red-600 ring-1 ring-red-500/15",
  medium: "bg-amber-50 text-amber-600 ring-1 ring-amber-500/15",
  low: "bg-slate-50 text-slate-500 ring-1 ring-slate-500/10",
};

const fileIconColors: Record<string, { bg: string; text: string }> = {
  pdf: { bg: "bg-red-50", text: "text-red-500" },
  xlsx: { bg: "bg-emerald-50", text: "text-emerald-600" },
  docx: { bg: "bg-blue-50", text: "text-blue-600" },
  md: { bg: "bg-slate-50", text: "text-slate-600" },
  txt: { bg: "bg-slate-50", text: "text-slate-500" },
};

interface EmailDetailPanelProps {
  email: EmailItem;
  onClose: () => void;
  onToggleStar: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export function EmailDetailPanel({
  email,
  onClose,
  onToggleStar,
  onArchive,
  onDelete,
}: EmailDetailPanelProps) {
  const formattedDate = new Date(email.date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="flex h-full flex-col border-l border-slate-200/60 bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => onToggleStar(email.id)}
            className="rounded-lg p-2 transition-colors hover:bg-amber-50"
            title="Star"
          >
            <Star
              className={`h-4 w-4 ${
                email.isStarred
                  ? "fill-amber-400 text-amber-400 drop-shadow-[0_1px_2px_rgba(251,191,36,0.4)]"
                  : "text-slate-400"
              }`}
            />
          </button>
          <button
            type="button"
            onClick={() => onArchive(email.id)}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600"
            title="Archive"
          >
            <Archive className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(email.id)}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <div className="mx-1 h-5 w-px bg-slate-200" />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Subject + Meta */}
      <div className="border-b border-slate-100 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-[17px] font-bold leading-snug text-slate-900">
            {email.subject}
          </h2>
          <span
            className={`shrink-0 rounded-md px-2 py-[3px] text-[10px] font-bold uppercase tracking-wide ${priorityBadge[email.priority]}`}
          >
            {email.priority}
          </span>
        </div>
        {email.labels.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {email.labels.map((label) => (
              <span
                key={label}
                className="rounded-md bg-slate-100/80 px-2 py-[3px] text-[10px] font-semibold text-slate-500"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Sender */}
      <div className="border-b border-slate-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-md shadow-blue-500/20">
              {email.from.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-900">
                {email.from.name}
              </p>
              <p className="text-[11px] text-slate-400">{email.from.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-slate-50 px-2.5 py-1.5 text-[11px] font-medium text-slate-400">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
          <span className="font-medium text-slate-500">To:</span>
          <span>{email.to}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="whitespace-pre-wrap text-[13px] leading-[1.75] text-slate-700">
          {email.body}
        </div>

        {/* Attachments */}
        {email.attachments.length > 0 && (
          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-slate-700">
              <Paperclip className="h-4 w-4 text-slate-400" />
              {email.attachments.length} Attachment{email.attachments.length > 1 ? "s" : ""}
            </div>
            <div className="grid gap-2">
              {email.attachments.map((att) => {
                const colors = fileIconColors[att.type] ?? { bg: "bg-slate-50", text: "text-slate-400" };
                return (
                  <div
                    key={att.name}
                    className="group/att flex items-center justify-between rounded-xl border border-slate-200/60 bg-slate-50/50 px-4 py-3 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${colors.bg}`}>
                        <FileText className={`h-4 w-4 ${colors.text}`} />
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-slate-700">
                          {att.name}
                        </p>
                        <p className="text-[11px] text-slate-400">{att.size}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-white hover:text-slate-600 group-hover/att:text-slate-400"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Reply Footer */}
      <div className="border-t border-slate-100 px-6 py-4">
        <div className="flex gap-2">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-medium text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-none"
          >
            <Reply className="h-4 w-4" /> Reply
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:shadow-none"
          >
            <ReplyAll className="h-4 w-4" /> Reply All
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:shadow-none"
          >
            <Forward className="h-4 w-4" /> Forward
          </button>
        </div>
      </div>
    </div>
  );
}
