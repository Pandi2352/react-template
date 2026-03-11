export type EmailCategory = "primary" | "promotions" | "social" | "updates" | "forums";
export type EmailPriority = "high" | "medium" | "low";
export type EmailFolder = "inbox" | "sent" | "drafts" | "spam" | "trash";
export type EmailSource = "gmail" | "outlook" | "slack" | "github" | "direct";

export interface EmailAttachment {
  name: string;
  size: string;
  type: string;
}

export interface EmailItem {
  id: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
  };
  to: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
  category: EmailCategory;
  priority: EmailPriority;
  labels: string[];
  attachments: EmailAttachment[];
  hasReplied: boolean;
  size: string;
  folder: EmailFolder;
  source: EmailSource;
}
