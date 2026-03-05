import { useRef } from 'react';
import { Upload, FileText, Trash2, FileImage, File } from 'lucide-react';
import { Input, Dropdown } from '@/components/common';
import { cn } from '@/utils';
import { useUI } from '@/hooks';
import type { FinancialDocs, UploadedFile, FormErrors } from './types';
import { INCOME_OPTIONS, CURRENCY_OPTIONS } from './constants';

interface Props {
  data: FinancialDocs;
  errors: FormErrors;
  onChange: (u: Partial<FinancialDocs>) => void;
  clearError: (f: string) => void;
}

let fileId = 0;

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(type: string) {
  if (type.startsWith('image/')) return FileImage;
  return File;
}

export function FinancialDocsStep({ data, errors, onChange, clearError }: Props) {
  const { addToast } = useUI();
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const maxSize = 10 * 1024 * 1024; // 10MB
    const newDocs: UploadedFile[] = [];

    Array.from(files).forEach((file) => {
      if (file.size > maxSize) {
        addToast({ type: 'error', message: `${file.name} exceeds 10MB limit.` });
        return;
      }
      const entry: UploadedFile = {
        id: `file-${++fileId}`,
        name: file.name,
        size: file.size,
        type: file.type,
      };
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          entry.preview = reader.result as string;
          onChange({ documents: [...data.documents, ...newDocs] });
        };
        reader.readAsDataURL(file);
      }
      newDocs.push(entry);
    });

    if (newDocs.length > 0) {
      onChange({ documents: [...data.documents, ...newDocs] });
    }
  }

  function removeDoc(id: string) {
    onChange({ documents: data.documents.filter((d) => d.id !== id) });
  }

  return (
    <div className="space-y-6">
      {/* Income & Currency */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Annual Income Range <span className="text-error">*</span></label>
          <Dropdown
            options={INCOME_OPTIONS} value={data.incomeRange} placeholder="Select..."
            onChange={(v) => { onChange({ incomeRange: v }); clearError('incomeRange'); }}
          />
          {errors.incomeRange && <p className="mt-1 text-xs text-error">{errors.incomeRange}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Preferred Currency <span className="text-error">*</span></label>
          <Dropdown
            options={CURRENCY_OPTIONS} value={data.currency} placeholder="Select..."
            onChange={(v) => { onChange({ currency: v }); clearError('currency'); }}
          />
          {errors.currency && <p className="mt-1 text-xs text-error">{errors.currency}</p>}
        </div>
      </div>

      {/* Tax & PAN */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="taxId" label="Tax ID / SSN" placeholder="XXX-XX-XXXX"
          value={data.taxId}
          onChange={(e) => onChange({ taxId: e.target.value })}
        />
        <Input
          id="pan" label="PAN Number" placeholder="ABCDE1234F"
          value={data.panNumber}
          onChange={(e) => onChange({ panNumber: e.target.value.toUpperCase() })}
        />
      </div>

      {/* Bank Details */}
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="mb-4 text-sm font-semibold text-gray-800">Bank Details</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input
            id="bankName" label="Bank Name" placeholder="Chase Bank"
            value={data.bankName}
            onChange={(e) => onChange({ bankName: e.target.value })}
          />
          <Input
            id="accNo" label="Account Number" placeholder="XXXX XXXX XXXX"
            value={data.accountNumber}
            onChange={(e) => onChange({ accountNumber: e.target.value })}
          />
          <Input
            id="ifsc" label="IFSC / Routing Code" placeholder="ABCD0001234"
            value={data.ifscCode}
            onChange={(e) => onChange({ ifscCode: e.target.value.toUpperCase() })}
          />
        </div>
      </div>

      {/* File Upload Zone */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-800">
          Documents <span className="text-xs font-normal text-gray-400">(Resume, ID, Certificates — max 10MB each)</span>
        </label>
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 transition-colors hover:border-primary hover:bg-primary/5"
        >
          <Upload className="mb-2 h-10 w-10 text-gray-400" />
          <p className="text-sm font-medium text-gray-600">Drag & drop files or click to browse</p>
          <p className="mt-1 text-xs text-gray-400">PDF, DOC, JPG, PNG — up to 10MB</p>
        </div>
        <input ref={fileRef} type="file" multiple className="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Uploaded Files List */}
      {data.documents.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">{data.documents.length} file(s) uploaded</p>
          {data.documents.map((doc) => {
            const Icon = getFileIcon(doc.type);
            return (
              <div key={doc.id} className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
                {doc.preview ? (
                  <img src={doc.preview} alt={doc.name} className="h-10 w-10 rounded object-cover" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-200">
                    <Icon className="h-5 w-5 text-gray-500" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-800">{doc.name}</p>
                  <p className="text-xs text-gray-400">{formatSize(doc.size)}</p>
                </div>
                <button type="button" onClick={() => removeDoc(doc.id)}
                  className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-error">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
