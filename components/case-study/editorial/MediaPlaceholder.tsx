import type { EditorialMedia } from '@/content/case-studies/editorial-types';
import { sitePath } from '@/lib/site-path';

function Lines({ count = 3 }: { count?: number }) {
  return <div className="sp-lines">{Array.from({ length: count }, (_, i) => <i key={i} />)}</div>;
}
function Photo({ small = false }: { small?: boolean }) {
  return <div className={`sp-photo ${small ? 'sp-photo-small' : ''}`}><span>▧</span><small>Space imagery</small></div>;
}
function Map() {
  return <div className="sp-map"><svg viewBox="0 0 500 400" preserveAspectRatio="none" fill="none">
    <path d="M320 0C270 90 390 125 310 218S360 315 285 400H500V0Z" fill="#dce6ec" />
    <path d="M0 75L215 120L300 0M0 230L230 195L440 290M90 0L145 210L100 400M215 400L235 190L410 130M0 335L300 345" stroke="#fff" strokeWidth="12" />
    <path d="M0 75L215 120L300 0M0 230L230 195L440 290M90 0L145 210L100 400M215 400L235 190L410 130M0 335L300 345" stroke="#ccd5d8" strokeWidth="1" />
  </svg><i className="map-pin pin-a">A</i><i className="map-pin pin-b">B</i><i className="map-pin pin-c">C</i><span className="map-caption">Schematic map</span></div>;
}
function Screen({ active, children }: { active: string; children: React.ReactNode }) {
  return <div className="sp-screen"><div className="sp-top"><b>speiz<span>↗</span></b><div className="sp-tabs">{['Classic Search', 'Speiz Picks', 'AI Matches'].map(tab => <span className={tab === active ? 'sp-tab-active' : ''} key={tab}>{tab}</span>)}</div><span className="sp-avatar">○</span></div>{children}</div>;
}
function Space({ name, actions = false }: { name: string; actions?: boolean }) {
  return <div className="sp-space"><Photo small /><div className="sp-space-info"><b>{name}</b><p>Location · Area · Availability</p><Lines count={2} />{actions && <div className="sp-actions"><span className="sp-action-dark">Accept</span><span>Reject</span><span>Comment +</span></div>}</div></div>;
}
function Filters() {
  return <div className="sp-filters"><b>Refine your search</b>{['Location', 'Area', 'Property type', 'Size'].map(item => <div key={item}><span>{item}</span><span>⌄</span></div>)}<div className="sp-actions"><span className="sp-action-dark">Apply filters</span></div></div>;
}
function Search() {
  return <Screen active="Classic Search"><div className="sp-search-title"><h4>Find the right space.</h4><span>Map + results</span></div><div className="sp-search-layout"><Filters /><div className="sp-results"><Space name="Space A" /><Space name="Space B" /><Space name="Space C" /></div><Map /></div></Screen>;
}
function PicksOverview() {
  return <Screen active="Speiz Picks"><div className="sp-picks-intro"><span className="sp-overline">A shortlist shaped around your needs</span><h4>A little guidance.<br />A clearer direction.</h4><div className="sp-picks-steps">{['Personal call', 'Market analysis', 'Review'].map((item,i) => <div key={item}><span className="sp-step-symbol">{['↗','⌕','✓'][i]}</span><b>{item}</b>{i < 2 && <span className="sp-step-arrow">→</span>}</div>)}</div><div className="sp-actions"><span className="sp-action-dark">Share your requirements ↗</span></div></div></Screen>;
}
function PicksResults() {
  return <Screen active="Speiz Picks"><div className="sp-picks-results"><aside className="sp-request"><span className="sp-overline">Original request</span><h4>Your space brief</h4>{['Location', 'Size', 'Operational needs'].map(x => <div key={x}><b>{x}</b><Lines count={1} /></div>)}<span className="sp-note">Request context stays with the shortlist.</span></aside><div className="sp-curated"><h4>Spaces to consider</h4><p>Curated for your request</p><Space name="Suggested space A" actions /><Space name="Suggested space B" actions /><div className="sp-feedback">Add your feedback <span>↗</span></div></div></div></Screen>;
}
function AIStarter() {
  return <Screen active="AI Matches"><div className="sp-ai-start"><span className="sp-ai-mark">✳</span><h4>Start with what<br />your business needs.</h4><div className="sp-prompt"><p>Describe your ideal warehouse…</p><span>Location, size, access, timing, and what matters most.</span><i>↑</i></div><div className="sp-examples"><span>Location + size ↗</span><span>Loading access + office needs ↗</span><span>Timing + operational constraints ↗</span></div></div></Screen>;
}
function Signals() {
  return <div className="sp-signals"><div><b>Good</b><p>Matching requirements</p><Lines count={2} /></div><div><b>Missing</b><p>Requirements to clarify</p><Lines count={2} /></div></div>;
}
function Score() { return <div className="sp-score"><strong>—</strong><span>Match score</span><small>Illustrative value</small></div>; }
function AIResults() {
  return <Screen active="AI Matches"><div className="sp-ai-results"><aside className="sp-request"><span className="sp-overline">Your brief</span><h4>What matters<br />to your business</h4><Lines count={4} /><div className="sp-criteria">{['Location', 'Size', 'Loading access', 'Move-in timing'].map(x => <div key={x}>{x}<span>—</span></div>)}</div><div className="sp-actions"><span>Refine criteria ↗</span></div></aside><div className="sp-ranked"><div className="sp-ranked-title"><h4>Your matching spaces</h4><span>Ranked shortlist</span></div><div className="sp-match"><div className="sp-match-top"><div><span className="sp-overline">Recommended option</span><h4>Space A</h4></div><Score /></div><Photo /><div className="sp-match-body"><b>Why it fits</b><p>How this option relates to your brief</p><Lines count={2} /><Signals /><div className="sp-sources"><b>Supporting sources</b><span>Property information ↗</span><span>Source reference ↗</span></div></div></div><div className="sp-more"><span>Space B</span><Lines count={1} /><span>→</span></div><div className="sp-actions"><span className="sp-action-dark">Accept direction</span><span>Request more options ↗</span></div></div></div></Screen>;
}
function Details() {
  return <Screen active="Classic Search"><div className="sp-details"><div className="sp-details-title"><div><span className="sp-overline">Space details</span><h4>A closer look at Space A</h4></div><span>♡ &nbsp; Connect ↗</span></div><div className="sp-photo-grid"><Photo /><div><Photo small /><Photo small /></div></div><div className="sp-details-bottom"><div><h4>The details that matter.</h4><div className="sp-specifications">{['Specifications','Availability','Pricing context','Facilities'].map(x => <div key={x}><b>{x}</b><Lines count={2} /></div>)}</div></div><aside><b>Location</b><Map /></aside></div></div></Screen>;
}
function Decisions() {
  return <div className="sp-decision-examples"><div><span className="sp-overline">Lightweight interest</span><Space name="Space to explore" /><div className="sp-actions"><span>♡ Like</span><span>Dislike</span></div></div><div><span className="sp-overline">Curated recommendation</span><Space name="Space to review" /><div className="sp-actions"><span className="sp-action-dark">Accept</span><span>Reject</span></div></div><div><span className="sp-overline">Follow-up</span><h4>Take the next step.</h4><Lines count={3} /><div className="sp-actions"><span className="sp-action-dark">Connect ↗</span></div></div></div>;
}
function Research() {
  return <div className="sp-research"><div className="sp-comparison"><span className="sp-overline">Comparison structure · illustrative</span><div className="sp-comparison-head"><b>Market review</b>{['A','B','C','D','E'].map(x => <span key={x}>{x}</span>)}</div>{['Coverage','Specifications','Availability','Guidance'].map(x => <div className="sp-comparison-row" key={x}><span>{x}</span>{[0,1,2,3,4].map(i => <i key={i}>—</i>)}</div>)}<small>No competitor ratings are represented.</small></div><div className="sp-findings">{['Coverage matters','Information quality matters','Guidance matters'].map(x => <div key={x}><span>↗</span><b>{x}</b></div>)}</div></div>;
}
function IA() {
  return <div className="sp-ia"><div className="sp-ia-root">Tenant experience</div><div className="sp-ia-branches">{['Discovery','Evaluation','Decision'].map((x,i) => <div key={x}><b>{x}</b>{[['Classic Search','Speiz Picks','AI Matches'],['Space details','Specifications','Availability'],['Review options','Express interest','Connect']][i].map(y => <span key={y}>{y}</span>)}</div>)}</div></div>;
}
function Wireframe() {
  return <div className="sp-wireframes">{['Browse','Review','Connect'].map((x,i) => <div key={x}><span className="sp-overline">{x}</span><div className="sp-wire-top" /><div className="sp-wire-content">{i === 0 ? <><div className="sp-wire-filter" /><div><Lines count={4} /><Lines count={3} /></div></> : <div><div className="sp-wire-image" /><Lines count={3} /><span className="sp-wire-button" /></div>}</div></div>)}</div>;
}
function Closeup({ focus }: { focus?: string }) {
  switch (focus) {
    case 'score': return <><Score /><p>Match signals at a glance</p><Lines count={2} /></>;
    case 'reason': return <><span className="sp-overline">Why it fits</span><h4>Reasoning, made visible.</h4><Lines count={3} /><Signals /></>;
    case 'sources': return <><span className="sp-overline">Supporting sources</span><h4>A basis for the recommendation.</h4><div className="sp-sources"><span>Property information ↗</span><span>Source reference ↗</span></div><Lines count={2} /></>;
    case 'criteria': return <><span className="sp-overline">Refine criteria</span><h4>Keep the brief in your hands.</h4><div className="sp-criteria">{['Location','Size','Operational needs'].map(x => <div key={x}>{x}<span>⌄</span></div>)}</div></>;
    case 'imagery': return <><Photo /><span className="sp-note">Space imagery</span></>;
    default: return <><span className="sp-overline">Space details</span><h4>{({specifications:'Specifications',availability:'Availability',pricing:'Pricing context',facilities:'Facilities'} as Record<string,string>)[focus ?? '']}</h4><div className="sp-criteria">{(focus === 'specifications' ? ['Area','Property type','Size'] : focus === 'availability' ? ['Availability','Move-in timing'] : focus === 'pricing' ? ['Pricing information','Terms to review'] : ['Loading access','Office space','Operational requirements']).map(x => <div key={x}>{x}<span>—</span></div>)}</div></>;
  }
}
function HeroComposition() {
  return <div className="sp-hero-composition"><div className="sp-hero-search"><Search /></div><div className="sp-hero-guidance"><span className="sp-overline">Speiz Picks</span><h4>Human expertise.</h4><div className="sp-hero-mini-steps"><span>Personal call</span><span>Market analysis</span><span>Review</span></div></div><div className="sp-hero-ai"><span className="sp-overline">✳ AI Matches</span><h4>Your brief.<br />Explained options.</h4><div className="sp-hero-input">Describe what you need <span>↑</span></div><Lines count={2} /></div></div>;
}
export function MediaPlaceholder({ media }: { media: EditorialMedia }) {
  const content = () => {
    switch (media.variant) {
      case 'hero': return <HeroComposition />;
      case 'search': return <Search />;
      case 'picks-overview': return <PicksOverview />;
      case 'picks-results': return <PicksResults />;
      case 'ai-starter': return <AIStarter />;
      case 'ai-results': return <AIResults />;
      case 'details': return <Details />;
      case 'decisions': return <Decisions />;
      case 'research': return <Research />;
      case 'ia': return <IA />;
      case 'wireframe': return <Wireframe />;
      case 'closeup': return <div className="sp-closeup"><Closeup focus={media.focus} /></div>;
    }
  };
  return <figure className={`editorial-media media-variant-${media.variant}`} data-media-reveal>
    {media.image ? <img className="editorial-real-image" src={sitePath(media.image.src)} alt={media.image.alt} width={media.image.width} height={media.image.height} loading="lazy" /> :
      <div className="editorial-placeholder" role="img" aria-label={`${media.title}. Illustrative placeholder interface, not an original Speiz design.`}><div className="sp-art" aria-hidden="true">{content()}</div></div>}
    <figcaption><span>{media.title}</span>{!media.image && <small>Illustrative UI · not an original screen</small>}{media.caption && <p>{media.caption}</p>}</figcaption>
  </figure>;
}
