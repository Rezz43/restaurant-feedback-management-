import { useEffect, useRef, useState } from 'react';
import { config } from './config';
import {
  COUPON_CODE, DISHES, FOOD_BAD, FOOD_GOOD, GOOGLE_REVIEW_URL, MENU_CATS, SERVICE_BAD, SERVICE_GOOD, TX,
  localNum, type Copy, type Lang, type Pair,
} from './content';
import { submitFeedback } from './submit';

type Screen = 'welcome' | 'tags' | 'review' | 'thanks';
type RatingKey = 'overall' | 'food' | 'service';
const SCREENS: Screen[] = ['welcome', 'tags', 'review', 'thanks'];
const LAST = SCREENS.length - 1;

const THEME_COLOR: Record<Screen, string> = { welcome: '#1a120c', tags: '#f3f2f2', review: '#f3f2f2', thanks: '#141838' };

export default function App() {
  const [lang, setLang] = useState<Lang>(config.startLang);
  const [idx, setIdx] = useState(0);
  const [ratings, setRatings] = useState<Record<RatingKey, number>>({ overall: 0, food: 0, service: 0 });
  const [pop, setPop] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [privateMsg, setPrivateMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const popTimer = useRef<number>();

  const t = TX[lang];
  const screen = SCREENS[idx];
  const n = (v: number | string) => localNum(lang, v);
  const negative = config.privateNote && Object.values(ratings).some((v) => v > 0 && v <= 2);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.querySelector('meta[name=theme-color]')?.setAttribute('content', THEME_COLOR[screen]);
  }, [screen]);

  const rate = (key: RatingKey, v: number) => {
    setRatings((r) => ({ ...r, [key]: v }));
    setPop(key + v);
    clearTimeout(popTimer.current);
    popTimer.current = window.setTimeout(() => setPop(null), 200);
  };
  const toggle = (id: string) => setTags((ts) => (ts.includes(id) ? ts.filter((x) => x !== id) : [...ts, id]));

  const submit = async () => {
    setSubmitting(true);
    setError(false);
    try {
      await submitFeedback({
        ...ratings, tags, comment: comment.trim(),
        privateNote: negative ? privateMsg.trim() : '',
        needsAttention: Object.values(ratings).some((v) => v > 0 && v <= 2),
        lang, submittedAt: new Date().toISOString(),
      });
      setIdx(LAST);
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const valid: Record<Screen, boolean> = {
    welcome: !!(ratings.overall && ratings.food && ratings.service),
    tags: true,
    review: !submitting,
    thanks: true,
  };
  const ctaLabel = screen === 'tags' ? (tags.length || comment ? t.cont : t.skip)
    : screen === 'review' ? (submitting ? t.sending : t.submit) : t.cont;
  const onCta = screen === 'review' ? submit : () => setIdx(idx + 1);
  const pad = (v: number) => n(String(v).padStart(2, '0'));

  return (
    <div className={`app app--${screen}`}>
      {(screen === 'tags' || screen === 'review') && (
        <header className="topbar">
          <div className="topbar-row">
            <button className="icon-btn" aria-label={t.back} onClick={() => setIdx(Math.max(0, idx - 1))}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
            </button>
            <div className="topbar-title">
              <div className="topbar-brand">{t.brand}</div>
              <div className="topbar-step">{t.step} {pad(idx + 1)}/{pad(LAST)}</div>
            </div>
            <LangSwitch lang={lang} setLang={setLang} />
          </div>
          <div className="progress">
            {Array.from({ length: LAST }, (_, i) => <div key={i} className={i <= idx ? 'on' : ''} />)}
          </div>
        </header>
      )}

      <main className="screen">
        {screen === 'welcome' && (
          <div className="enter">
            <div className="hero">
              <img src="./assets/meghboroni-hero.jpg" alt="Meghboroni" />
              <div className="hero-lang"><LangSwitch lang={lang} setLang={setLang} dark /></div>
            </div>
            <div className="welcome-intro">
              <h1>{t.h1}</h1>
              <p>{t.sub}</p>
            </div>
            <div className="rule welcome-rule" />
            <div className="welcome-rows">
              {(['overall', 'food', 'service'] as const).map((k) => (
                <StarRow key={k} q={t[`${k}Q`]} value={ratings[k]} onRate={(v) => rate(k, v)}
                  pop={pop?.startsWith(k) ? Number(pop.slice(k.length)) : 0} t={t} n={n} />
              ))}
              <div className="muted-note">{t.noSignup}</div>
            </div>
          </div>
        )}

        {screen === 'tags' && (
          <div className="section enter">
            <h2>{t.s2Title}</h2>
            <p className="lede">{t.s2Sub}</p>
            <div className="kicker-row">
              <div className="kicker">{t.ordered}</div>
              <div className="kicker-aside">{t.signature}</div>
            </div>
            <div className="dish-grid">
              {DISHES.map(([en, bn, slug]) => {
                const on = tags.includes(en);
                const name = lang === 'bn' ? bn : en;
                return (
                  <button key={en} className={`dish${on ? ' on' : ''}`} aria-pressed={on} onClick={() => toggle(en)}>
                    <span className="dish-check">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="square"><path d="M4.5 12.5l5 5L19.5 7" /></svg>
                    </span>
                    <img src={`./assets/dish-${slug}.png`} alt="" />
                    <span className="dish-name">{name}</span>
                  </button>
                );
              })}
            </div>
            <div className="also">{t.alsoHad}</div>
            <Chips list={MENU_CATS} lang={lang} tags={tags} toggle={toggle} small />
            {([[t.food, FOOD_GOOD, FOOD_BAD], [t.service, SERVICE_GOOD, SERVICE_BAD]] as const).map(([label, good, bad]) => (
              <div key={label} className="tag-group">
                <div className="kicker">{label}</div>
                <TagRow sub={t.loved} icon="+" good list={good} lang={lang} tags={tags} toggle={toggle} />
                <TagRow sub={t.improve} icon="−" list={bad} lang={lang} tags={tags} toggle={toggle} />
              </div>
            ))}
            <div className="comment-block">
              <label htmlFor="comment" className="comment-label">{t.anything}<span>{t.optional}</span></label>
              <textarea id="comment" rows={3} value={comment} placeholder={t.commentPh} onChange={(e) => setComment(e.target.value)} />
            </div>
          </div>
        )}

        {screen === 'review' && (
          <div className="section enter">
            <h2>{t.s3Title}</h2>
            <p className="lede">{t.s3Sub}</p>
            <div className="summary">
              {([['overall', t.overall], ['food', t.food], ['service', t.service]] as const).map(([k, l]) => (
                <div key={k} className="summary-cell">
                  <div className="summary-k">{l}</div>
                  <div className={`summary-v${ratings[k] && ratings[k] <= 2 ? ' low' : ''}`}>
                    {ratings[k] ? n(ratings[k]) : '—'}<span>/{n(5)}</span>
                  </div>
                </div>
              ))}
            </div>
            {negative && (
              <div className="private">
                <div className="private-title">{t.sorry}</div>
                <div className="private-note">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  {t.private}
                </div>
                <textarea rows={3} value={privateMsg} placeholder={t.privatePh} aria-label={t.private} onChange={(e) => setPrivateMsg(e.target.value)} />
              </div>
            )}
            <div className="google">
              <div className="google-k">{t.googleK}</div>
              <div className="google-title">{t.googleTitle}</div>
              <p>{t.googleBody}</p>
              <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener" className="google-btn">{t.googleBtn}<ArrowUpRight /></a>
            </div>
            {error && <div className="error" role="alert">{t.sendFailed}</div>}
          </div>
        )}

        {screen === 'thanks' && (
          <div className="thanks">
            <div className="streak streak-1" />
            <div className="streak streak-2" />
            <div className="thanks-logo"><img src="./assets/logo-wordmark.png" alt="মেঘবরণী" /></div>
            <div className="thanks-check">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M4.5 12.5l5 5L19.5 7" stroke="#141838" strokeWidth="3" strokeLinecap="square" strokeDasharray="24" strokeDashoffset="24" /></svg>
            </div>
            <h1 className="thanks-h">{t.thanksH}</h1>
            <p className="thanks-sub">{t.thanksSub}</p>
            <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener" className="thanks-google">{t.googleBtn}<ArrowUpRight /></a>
            <div className="thanks-google-note">{t.googleThanks}</div>
            {config.showIncentive && (
              <div className="incentive-wrap">
                <div className="incentive">
                  <div className="kicker">{t.incK}</div>
                  <div className="incentive-title">{t.incTitle}</div>
                  <div className="coupon">{COUPON_CODE}<span>{t.incShow}</span></div>
                  <p>{t.incNote}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {screen !== 'thanks' && (
        <footer className="cta-bar">
          <button className="cta" onClick={onCta} disabled={!valid[screen]}>
            {ctaLabel}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </button>
        </footer>
      )}
    </div>
  );
}

function LangSwitch({ lang, setLang, dark }: { lang: Lang; setLang: (l: Lang) => void; dark?: boolean }) {
  return (
    <div className={`lang${dark ? ' lang--dark' : ''}`} role="group" aria-label="Language">
      {([['en', 'EN'], ['bn', 'বাং']] as const).map(([k, l]) => (
        <button key={k} className={lang === k ? 'on' : ''} aria-pressed={lang === k} onClick={() => setLang(k)} lang={k}>{l}</button>
      ))}
    </div>
  );
}

function StarRow({ q, value, onRate, pop, t, n }: {
  q: string; value: number; onRate: (v: number) => void; pop: number; t: Copy; n: (v: number) => string;
}) {
  const wordCls = value === 0 ? 'none' : value <= 2 ? 'low' : '';
  return (
    <div className="star-row">
      <div className="star-head">
        <div className="star-q">{q}</div>
        <div className={`star-word ${wordCls}`}>{value ? t.labels[value] : t.tap}</div>
      </div>
      <div className="stars" role="radiogroup" aria-label={q}>
        {[1, 2, 3, 4, 5].map((v) => (
          <button key={v} role="radio" aria-checked={v === value} aria-label={`${n(v)} ${t.ofFive}`}
            className={v <= value ? 'on' : ''} onClick={() => onRate(v)}>
            <span className="star-num">{n(v)}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" className={pop === v ? 'pop' : ''}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

function Chips({ list, lang, tags, toggle, solid, small }: {
  list: readonly Pair[]; lang: Lang; tags: string[]; toggle: (id: string) => void; solid?: boolean; small?: boolean;
}) {
  return (
    <div className={`chips${small ? ' chips--small' : ''}`}>
      {list.map(([en, bn]) => {
        const on = tags.includes(en);
        return (
          <button key={en} aria-pressed={on} className={`chip${on ? (solid ? ' on solid' : ' on') : ''}`} onClick={() => toggle(en)}>
            {lang === 'bn' ? bn : en}
          </button>
        );
      })}
    </div>
  );
}

function TagRow({ sub, icon, good, ...chips }: {
  sub: string; icon: string; good?: boolean; list: readonly Pair[]; lang: Lang; tags: string[]; toggle: (id: string) => void;
}) {
  return (
    <div className="tag-row">
      <div className="tag-sub"><span className={`tag-icon${good ? '' : ' bad'}`}>{icon}</span>{sub}</div>
      <Chips {...chips} solid={!good} />
    </div>
  );
}

function ArrowUpRight() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>;
}
