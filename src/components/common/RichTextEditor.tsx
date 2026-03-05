import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Undo, 
  Redo, 
  Link as LinkIcon,
  Unlink 
} from 'lucide-react';
import { cn } from '@/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const MenuButton = ({ 
  onClick, 
  isActive = false, 
  disabled = false, 
  children,
  title
}: { 
  onClick: () => void; 
  isActive?: boolean; 
  disabled?: boolean;
  children: React.ReactNode;
  title?: string;
}) => (
  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    disabled={disabled}
    title={title}
    className={cn(
      'p-2 rounded-lg transition-all duration-200',
      isActive 
        ? 'bg-primary/10 text-primary shadow-sm' 
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900',
      'disabled:opacity-30 disabled:cursor-not-allowed'
    )}
  >
    {children}
  </button>
);

export function RichTextEditor({ value, onChange, placeholder = 'Write something amazing...', className }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary hover:underline cursor-pointer',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none max-w-none min-h-[200px] px-4 py-3 leading-relaxed text-gray-800',
          'prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-a:text-primary'
        ),
      },
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className={cn(
      'w-full flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300',
      className
    )}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-100 bg-gray-50/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-1 pr-2 border-r border-gray-200">
          <MenuButton 
            onClick={() => editor.chain().focus().toggleBold().run()} 
            isActive={editor.isActive('bold')}
            title="Bold"
          >
            <Bold className="w-5 h-5" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().toggleItalic().run()} 
            isActive={editor.isActive('italic')}
            title="Italic"
          >
            <Italic className="w-5 h-5" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().toggleUnderline().run()} 
            isActive={editor.isActive('underline')}
            title="Underline"
          >
            <UnderlineIcon className="w-5 h-5" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().toggleStrike().run()} 
            isActive={editor.isActive('strike')}
            title="Strikethrough"
          >
            <span className="w-5 h-5 flex items-center justify-center font-bold text-lg leading-none mt-[-2px] line-through decoration-2">S</span>
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-gray-200">
          <MenuButton 
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
            isActive={editor.isActive('heading', { level: 1 })}
            title="H1"
          >
            <Heading1 className="w-5 h-5" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
            isActive={editor.isActive('heading', { level: 2 })}
            title="H2"
          >
            <Heading2 className="w-5 h-5" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
            isActive={editor.isActive('heading', { level: 3 })}
            title="H3"
          >
            <Heading3 className="w-5 h-5" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-gray-200">
          <MenuButton 
            onClick={() => editor.chain().focus().toggleBulletList().run()} 
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List className="w-5 h-5" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().toggleOrderedList().run()} 
            isActive={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <ListOrdered className="w-5 h-5" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().toggleBlockquote().run()} 
            isActive={editor.isActive('blockquote')}
            title="Blockquote"
          >
            <Quote className="w-5 h-5" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-gray-200">
          <MenuButton 
            onClick={toggleLink} 
            isActive={editor.isActive('link')}
            title="Add Link"
          >
            <LinkIcon className="w-5 h-5" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().unsetLink().run()} 
            disabled={!editor.isActive('link')}
            title="Remove Link"
          >
            <Unlink className="w-5 h-5" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-gray-200">
          <MenuButton 
            onClick={() => editor.chain().focus().toggleCodeBlock().run()} 
            isActive={editor.isActive('codeBlock')}
            title="Code Block"
          >
            <Code className="w-5 h-5" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 pl-2 ml-auto">
          <MenuButton 
            onClick={() => editor.chain().focus().undo().run()} 
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo className="w-5 h-5" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().redo().run()} 
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo className="w-5 h-5" />
          </MenuButton>
        </div>
      </div>

      {/* Editor Surface */}
      <div className="bg-white overflow-hidden">
        <EditorContent editor={editor} className="min-h-[200px]" />
      </div>

      {/* Footer / Word Count (Optional) */}
      <div className="px-4 py-2 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between text-[10px] sm:text-xs text-gray-400 font-medium">
        <div className="flex gap-4">
          <span>{editor.state.doc.textContent.length} characters</span>
          <span>{editor.state.doc.textContent.split(/\s+/).filter(Boolean).length} words</span>
        </div>
        <div className="italic">Powered by TipTap + Tailwind</div>
      </div>
    </div>
  );
}
