import { useEffect, useRef, useState } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/utils';

declare global {
  interface Window {
    gtranslateSettings?: {
      default_language: string;
      native_language_names: boolean;
      languages: string[];
      wrapper_selector: string;
    };
    doGTranslate?: (langPair: string) => void;
  }
}

interface LanguageOption {
  code: string;
  label: string;
  flag: string;
}

const LANGUAGE_MAP: Record<string, LanguageOption> = {
  en: { code: 'en', label: 'English', flag: '🇬🇧' },
  hi: { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  gu: { code: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' },
  ta: { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
  ar: { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  fr: { code: 'fr', label: 'Français', flag: '🇫🇷' },
  es: { code: 'es', label: 'Español', flag: '🇪🇸' },
  de: { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  pt: { code: 'pt', label: 'Português', flag: '🇧🇷' },
  zh: { code: 'zh', label: '中文', flag: '🇨🇳' },
  ja: { code: 'ja', label: '日本語', flag: '🇯🇵' },
  ko: { code: 'ko', label: '한국어', flag: '🇰🇷' },
  ru: { code: 'ru', label: 'Русский', flag: '🇷🇺' },
};

interface GTranslateProps {
  /** Hosts that should show a restricted language set (no Arabic). */
  restrictedHosts?: string[];
  /** Languages for restricted hosts. @default ['en','gu','hi','ta'] */
  restrictedLanguages?: string[];
  /** Languages for all other hosts. @default ['en','gu','hi','ta','ar'] */
  defaultLanguages?: string[];
  className?: string;
}

const GTRANSLATE_SCRIPT_ID = 'gtranslate-script';
const GTRANSLATE_SCRIPT_SRC = 'https://cdn.gtranslate.net/widgets/latest/float.js';

function getStoredLang(): string {
  // gtranslate stores the selected language in a cookie named "googtrans"
  const match = document.cookie.match(/googtrans=\/en\/(\w+)/);
  return match?.[1] ?? 'en';
}

export function GTranslate({
  restrictedHosts = ['sterlingaccuris.com', 'uat-prod.sterlingaccuris.com'],
  restrictedLanguages = ['en', 'gu', 'hi', 'ta'],
  defaultLanguages = ['en', 'gu', 'hi', 'ta', 'ar'],
  className,
}: GTranslateProps) {
  const isRestricted = restrictedHosts.includes(window.location.host);
  const languages = isRestricted ? restrictedLanguages : defaultLanguages;

  const [isOpen, setIsOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(getStoredLang);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Load gtranslate engine once
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Polyfill window.location.origin for older browsers
    if (!window.location.origin) {
      (window.location as unknown as Record<string, string>).origin =
        window.location.protocol +
        '//' +
        window.location.hostname +
        (window.location.port ? ':' + window.location.port : '');
    }

    window.gtranslateSettings = {
      default_language: 'en',
      native_language_names: true,
      languages,
      wrapper_selector: '.gtranslate_wrapper',
    };

    if (!document.getElementById(GTRANSLATE_SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = GTRANSLATE_SCRIPT_ID;
      script.src = GTRANSLATE_SCRIPT_SRC;
      script.defer = true;
      document.body.appendChild(script);
    }

    // Session iframe token sync
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const interval = setInterval(() => {
        if (localStorage.getItem('session_loaded')) {
          const iframe = document.getElementById('session-iframe') as HTMLIFrameElement | null;
          if (iframe?.contentWindow) {
            iframe.contentWindow.postMessage(
              { type: 'access_token', value: accessToken },
              '*',
            );
            clearInterval(interval);
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [languages]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const handleSelect = (code: string) => {
    if (code === activeLang) {
      setIsOpen(false);
      return;
    }
    setActiveLang(code);
    setIsOpen(false);

    // Trigger gtranslate language switch
    if (window.doGTranslate) {
      window.doGTranslate(`en|${code}`);
    }
  };

  const current = LANGUAGE_MAP[activeLang] ?? LANGUAGE_MAP['en']!;
  const options = languages
    .map((code) => LANGUAGE_MAP[code])
    .filter((opt): opt is LanguageOption => !!opt);

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      {/* Hidden wrapper for gtranslate engine */}
      <div className="gtranslate_wrapper" style={{ display: 'none' }} />

      {/* Trigger button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-gray-600 transition-colors hover:bg-gray-100',
          isOpen && 'bg-gray-100 text-gray-900',
        )}
        aria-label="Change language"
      >
        <Globe className="h-[18px] w-[18px]" />
        <span className="hidden text-xs font-semibold uppercase tracking-wide sm:inline">
          {current.code}
        </span>
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 text-gray-400 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1.5 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          {/* Header */}
          <div className="border-b border-gray-100 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Language
            </p>
          </div>

          {/* Options */}
          <div className="py-1">
            {options.map((lang) => {
              const isActive = activeLang === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={cn(
                    'flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors',
                    isActive
                      ? 'bg-primary/5 text-primary'
                      : 'text-gray-700 hover:bg-gray-50',
                  )}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-100 text-sm leading-none">
                    {lang.flag}
                  </span>
                  <span className={cn('flex-1', isActive && 'font-medium')}>
                    {lang.label}
                  </span>
                  {isActive && <Check className="h-4 w-4 text-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
