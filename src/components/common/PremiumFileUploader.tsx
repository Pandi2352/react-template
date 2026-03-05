import { useState, useRef, type ChangeEvent } from 'react';
import { Upload, X, FileText, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/utils';

interface FileUpload {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  errorMessage?: string;
}

export function PremiumFileUploader() {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = (id: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => prev.map(f => 
          f.id === id ? { ...f, progress: 100, status: 'completed' } : f
        ));
      } else {
        setFiles(prev => prev.map(f => 
          f.id === id ? { ...f, progress } : f
        ));
      }
    }, 400);
  };

  const handleFiles = (incomingFiles: File[]) => {
    const newFiles: FileUpload[] = incomingFiles.map(file => {
      const id = Math.random().toString(36).substring(7);
      simulateUpload(id);
      return {
        id,
        file,
        progress: 0,
        status: 'uploading'
      };
    });
    setFiles(prev => [...newFiles, ...prev]);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const incomingFiles = Array.from(e.dataTransfer.files);
    handleFiles(incomingFiles);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="w-6 h-6 text-blue-500" />;
    return <FileText className="w-6 h-6 text-gray-500" />;
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative group border-2 border-dashed rounded-3xl p-12 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-4 text-center",
          isDragging ? "border-blue-500 bg-blue-50/50 scale-[1.01]" : "border-gray-200 hover:border-blue-400 hover:bg-gray-50",
          files.length > 0 ? "py-8" : "py-16"
        )}
      >
        <div className={cn(
          "w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white",
          isDragging && "scale-110 bg-blue-600 text-white"
        )}>
          <Upload className="w-7 h-7" />
        </div>
        
        <div className="space-y-1">
          <p className="text-lg font-black text-gray-900 tracking-tight">Drop files to upload</p>
          <p className="text-sm font-medium text-gray-500">Max file size 25MB. Supports Images, PDF, and Archives.</p>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          multiple
          className="hidden"
        />
        
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gray-100 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-gray-100 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-gray-100 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gray-100 rounded-br-lg" />
      </div>

      {files.length > 0 && (
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-500">
          <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Currently Uploading</h4>
          <div className="flex flex-col gap-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                   {getFileIcon(file.file.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-bold text-gray-900 truncate pr-4">{file.file.name}</p>
                    <span className="text-[10px] font-black text-gray-400 uppercase tabular-nums">
                      {file.status === 'completed' ? 'Done' : `${file.progress}%`}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full transition-all duration-300 rounded-full",
                          file.status === 'completed' ? "bg-green-500" : "bg-blue-500"
                        )}
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-gray-500 whitespace-nowrap">{formatSize(file.file.size)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                   {file.status === 'completed' ? (
                     <CheckCircle2 className="w-5 h-5 text-green-500" />
                   ) : file.status === 'error' ? (
                     <AlertCircle className="w-5 h-5 text-red-500" />
                   ) : (
                     <button 
                        onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                        className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                     >
                       <X className="w-4 h-4" />
                     </button>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
