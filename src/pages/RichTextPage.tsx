import { useState } from 'react';
import { RichTextEditor } from '@/components/common/RichTextEditor';
import { Button } from '@/components/common/Button';
import { Send, Eye, Code as CodeIcon } from 'lucide-react';
import { useUI } from '@/hooks';

export function RichTextPage() {
  const [content, setContent] = useState('<h1>Hello World!</h1><p>This is a <strong>modern</strong> and <em>powerful</em> rich text editor built with TipTap and Tailwind CSS.</p><ul><li><p>Supports Headings</p></li><li><p>Supports Lists</p></li><li><p>Supports Links</p></li></ul>');
  const [isPreview, setIsPreview] = useState(false);
  const { addToast } = useUI();

  const handleSave = () => {
    console.log('Saving content:', content);
    addToast({
      message: 'Content saved successfully!',
      type: 'success',
    });
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Rich Text Editor</h1>
          <p className="text-lg text-gray-500 mt-2">
            A premium WYSIWYG experience with TipTap & Lucide icons.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
            {isPreview ? <CodeIcon className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {isPreview ? 'Edit Source' : 'Preview Output'}
          </Button>
          <Button onClick={handleSave}>
            <Send className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {!isPreview ? (
          <div className="space-y-4">
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 text-sm text-blue-700 leading-relaxed">
              <strong>Tip:</strong> You can use standard keyboard shortcuts like <kbd className="bg-white border shadow-sm px-1.5 py-0.5 rounded text-xs">Cmd+B</kbd> for bold or <kbd className="bg-white border shadow-sm px-1.5 py-0.5 rounded text-xs">Cmd+I</kbd> for italics.
            </div>
            <RichTextEditor 
              value={content} 
              onChange={setContent}
              className="min-h-[400px]"
            />
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
             <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                <div 
                  className="prose prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
             </div>
             <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">HTML Output</h3>
                <pre className="p-4 bg-gray-900 text-gray-300 rounded-lg text-xs overflow-x-auto">
                  <code>{content}</code>
                </pre>
             </div>
          </div>
        )}
      </div>

      <section className="mt-12 pt-12 border-t border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
              <CodeIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Clean HTML Output</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              TipTap generates semantic HTML5 that looks perfect in any browser and is SEO-friendly.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 mb-4">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Real-time Preview</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Toggle between edit and preview mode to see exactly how your content will appear to users.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-4">
              <CodeIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Keyboard Shortcuts</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Full support for standard editing shortcuts, making it feel like a native desktop app.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
