import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { p360Path } from '../../utils/product360';
import Icon from '../Icon';

// Placeholder copy shown on every division page until real content is written
const SAMPLE_TEXT =
  'ఇది నమూనా వచనం. ఈ విభాగానికి సంబంధించిన పూర్తి సమాచారం, వివరణలు మరియు మార్గదర్శకాలు త్వరలో ఇక్కడ చేర్చబడతాయి. ' +
  'ప్రస్తుతం ఈ వచనం పేజీ రూపకల్పన మరియు అమరికను చూపించడానికి మాత్రమే ఉపయోగించబడింది. ' +
  'అసలు కంటెంట్ సిద్ధమైన తర్వాత ఈ భాగాన్ని మార్చవచ్చు.';

function DivisionView({ base, seg, layer, cat, catIdx, divIdx, theme }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      // clipboard blocked — nothing else to do
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-6">
        <button
          type="button"
          onClick={share}
          className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full px-6 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:brightness-110 sm:w-auto motion-safe:animate-fade-up"
          style={{ background: theme.gradient, boxShadow: theme.glow }}
        >
          <Icon name={copied ? 'Check' : 'Share2'} strokeWidth={2.4} className="h-4 w-4" />
          {copied ? 'Link copied' : 'షేర్ చేయండి'}
        </button>

        <article
          className="surface-card relative overflow-hidden p-7 md:p-9 motion-safe:animate-fade-up"
          style={{ animationDelay: '80ms' }}
        >
          <div className="absolute inset-x-0 top-0 h-1" style={{ background: theme.gradient }}></div>
          <div
            className="absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-[0.08] blur-2xl"
            style={{ background: theme.g2 }}
          ></div>

          <div className="relative flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: theme.pale, color: theme.g2, boxShadow: `inset 0 0 0 1px ${theme.g2}22` }}
            >
              <Icon name="FileText" className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">Sample Text</h2>
          </div>

          <p lang="te" className="relative mt-6 text-[15.5px] leading-[2] text-slate-600 md:text-[17px]">
            {SAMPLE_TEXT}
          </p>
        </article>
      </div>

      <aside
        className="surface-card self-start p-3 md:sticky md:top-6 motion-safe:animate-fade-up"
        style={{ animationDelay: '140ms' }}
      >
        <div className="flex items-center justify-between px-2.5 pb-3 pt-1.5">
          <span className="eyebrow">In this category</span>
          <span className="rounded-full bg-slate-900/5 px-2 py-0.5 text-[11px] font-bold text-slate-500 tabular-nums">
            {cat.divs.length}
          </span>
        </div>
        <div className="max-h-[70vh] space-y-1 overflow-y-auto">
          {cat.divs.map((d, i) => {
            const active = i === divIdx;
            return (
              <Link
                key={i}
                to={p360Path(base, { seg, layer, catIdx, divIdx: i })}
                className={`group relative flex items-start gap-3 rounded-xl px-2.5 py-2.5 transition duration-200 ${active ? '' : 'hover:bg-slate-900/[0.03]'}`}
                style={active ? { background: theme.pale } : undefined}
                aria-current={active ? 'page' : undefined}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold tabular-nums transition ${active ? 'text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}`}
                  style={active ? { background: theme.gradient } : undefined}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`line-clamp-2 pt-1 text-[13px] leading-snug ${active ? 'font-bold text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                  {d.name}
                </span>
              </Link>
            );
          })}
        </div>
      </aside>
    </div>
  );
}

export default DivisionView;
