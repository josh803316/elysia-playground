import {useState, useEffect, useRef} from 'react';

interface CodeExpanderProps {
  code: string;
  id: string;
  label?: string;
  /** Optional E2E/Playwright test snippet to show in a second expander */
  testCode?: string;
  testLabel?: string;
}

declare global {
  interface Window {
    Prism?: {highlightAllUnder: (el: Element) => void};
  }
}

function ExpanderPanel({
  open,
  onToggle,
  id,
  label,
  code,
  iconLabel = '</>',
}: {
  open: boolean;
  onToggle: () => void;
  id: string;
  label: string;
  code: string;
  iconLabel?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open && panelRef.current && window.Prism) {
      window.Prism.highlightAllUnder(panelRef.current);
    }
  }, [open]);
  return (
    <div style={{borderTop: '1px solid #e5e7eb', marginTop: '1rem'}}>
      <button
        type='button'
        onClick={onToggle}
        aria-controls={`${id}-panel`}
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          width: '100%',
          padding: '0.5rem 0.75rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.875rem',
          color: '#6b7280',
          textAlign: 'left',
          borderRadius: '0.375rem',
          transition: 'background 0.15s, color 0.15s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = '#f9fafb';
          (e.currentTarget as HTMLButtonElement).style.color = '#374151';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'none';
          (e.currentTarget as HTMLButtonElement).style.color = '#6b7280';
        }}
      >
        <span style={{fontFamily: 'monospace', color: '#9ca3af'}}>{iconLabel}</span>
        {label}
        <span
          style={{
            marginLeft: '0.25rem',
            display: 'inline-block',
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'none',
          }}
        >
          ▼
        </span>
      </button>
      {open && (
        <div id={`${id}-panel`} ref={panelRef}>
          <pre className='language-javascript' style={{margin: 0, borderRadius: '0.5rem', fontSize: '0.75rem'}}>
            <code className='language-javascript'>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

export function CodeExpander({
  code,
  id,
  label = 'React code',
  testCode,
  testLabel = 'E2E test (Playwright)',
}: CodeExpanderProps) {
  const [open, setOpen] = useState(false);
  const [testOpen, setTestOpen] = useState(false);
  return (
    <>
      <ExpanderPanel open={open} onToggle={() => setOpen((v) => !v)} id={id} label={label} code={code} />
      {testCode != null && testCode !== '' && (
        <ExpanderPanel
          open={testOpen}
          onToggle={() => setTestOpen((v) => !v)}
          id={`${id}-test`}
          label={testLabel}
          code={testCode}
          iconLabel='🧪'
        />
      )}
    </>
  );
}
