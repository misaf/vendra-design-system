import './card-runtime.js';
const { Button, Badge, Chip, ProductCard } = window.VendraDesignSystem;
// Generation and checks come from templates/_shared/tenant-theme.js — the same code the build uses for tokens/tenants/<slug>.css.
const T = window.VF_TENANT_THEME, TENANTS = window.VF_TENANTS || {};
const START = {vendra: T.VENDRA, ...TENANTS};
const label = key => key === 'vendra' ? 'Vendra (default)' : key.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
// Hand-tuned shades belong to the colour they were tuned against; a new base colour drops them.
const OWN = Object.fromEntries(Object.entries(T.RAMPS).map(([k, r]) => [k, [r.base, ...Object.keys(r.steps)]]));
const clone = spec => JSON.parse(JSON.stringify({description: '', overrides: {}, ...spec}));
function Row({label,children}){return <div className="tb-row"><label>{label}</label>{children}</div>;}
function App(){
  const [start,setStart]=React.useState('vendra');const [s,setS]=React.useState(clone(T.VENDRA));const [slug,setSlug]=React.useState('my-florist');const [copied,setCopied]=React.useState(false);
  const open=key=>{setStart(key);setS(clone(START[key]));if(key!=='vendra')setSlug(key);};
  const colour=k=>e=>{const overrides={...s.overrides};OWN[k].forEach(n=>delete overrides[n]);setS({...s,colours:{...s.colours,[k]:e.target.value.toUpperCase()},overrides});};
  const pick=k=>e=>setS({...s,character:{...s.character,[k]:e.target.value}});
  const t=T.tokens(s);const cs=T.checks(s);const fails=cs.filter(c=>!c.pass).length;const kept=Object.keys(s.overrides).length;
  const json=()=>{const {description,overrides,colours,character}=s;return JSON.stringify({description,colours,character,overrides},null,2)+'\n';};
  const copy=()=>{navigator.clipboard&&navigator.clipboard.writeText(json());setCopied(true);setTimeout(()=>setCopied(false),1400);};
  return <div className="tb">
    <div className="tb-c">
      <Row label="Start from"><select value={start} onChange={e=>open(e.target.value)}>{Object.keys(START).map(k=><option key={k} value={k}>{label(k)}</option>)}</select></Row>
      <div className="tb-k">Colour</div>
      <Row label="Accent"><input type="color" value={s.colours.accent.toLowerCase()} onChange={colour('accent')}/></Row>
      <Row label="Neutral"><input type="color" value={s.colours.neutral.toLowerCase()} onChange={colour('neutral')}/></Row>
      <Row label="Ink"><input type="color" value={s.colours.ink.toLowerCase()} onChange={colour('ink')}/></Row>
      <Row label="Footer"><input type="color" value={s.colours.footer.toLowerCase()} onChange={colour('footer')}/></Row>
      {kept>0&&<div className="tb-note"><span>{kept} hand-tuned shade{kept>1?'s':''} kept</span><button onClick={()=>setS({...s,overrides:{}})}>Reset</button></div>}
      <div className="tb-k">Character</div>
      <Row label="Headings"><select value={s.character.headings} onChange={pick('headings')}><option value="serif">Instrument Serif</option><option value="sans">Jost</option><option value="vazir">Vazirmatn</option></select></Row>
      <Row label="Case"><select value={s.character.case} onChange={pick('case')}><option value="none">Sentence</option><option value="uppercase">Uppercase</option></select></Row>
      <Row label="Accent word"><select value={s.character.accentWord} onChange={pick('accentWord')}><option value="italic">Italic</option><option value="upright">Upright</option></select></Row>
      <Row label="Controls"><select value={s.character.controls} onChange={pick('controls')}><option value="pill">Pill</option><option value="square">Squared</option></select></Row>
      <Row label="Image frame"><select value={s.character.frame} onChange={pick('frame')}><option value="arch">Arch</option><option value="soft">Soft top</option><option value="square">Square</option></select></Row>
      <div className="tb-k">Export</div>
      <Row label="Slug"><input value={slug} onChange={e=>setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,''))} style={{font:'inherit',fontSize:12,height:26,width:110,border:'1px solid var(--border-input)',borderRadius:4,padding:'0 6px'}}/></Row>
      <button onClick={copy} title={'Save as tokens/tenants/'+slug+'.json, then run npm --prefix templates run build'} style={{font:'inherit',height:32,borderRadius:4,border:0,background:'var(--ink-900)',color:'var(--petal-50)',cursor:'pointer'}}>{copied?'Copied':'Copy '+slug+'.json'}</button>
    </div>
    <div className="tb-p" style={t.all}>
      <h2 className="tb-h">Wild things, <em>gathered.</em></h2>
      <div className="tb-r"><Button variant="primary" size="sm">Add to bag</Button><Button variant="secondary" size="sm">Shop</Button><Button variant="soft" size="sm">Gift card</Button></div>
      <div className="tb-r"><Chip selected>Roses</Chip><Chip>Orchids</Chip><Badge tone="accent">New</Badge><Badge tone="neutral">Seasonal</Badge></div>
      <div className="tb-g"><ProductCard name="Ivory ribbon box" price="4,100,000 Toman" placeholder="Photo" frame="arch"/>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          <div className="tb-ch">{cs.map(c=><React.Fragment key={c.label}><span>{c.label}</span><span>{c.ratio.toFixed(1)}:1</span><span className={c.pass?'tb-ok':'tb-bad'}>{c.pass?'Pass':'Fail'}</span></React.Fragment>)}</div>
          <div className="tb-inv">{fails?`${fails} check${fails>1?'s':''} failing — adjust before launch.`:'All contrast checks pass.'}</div>
        </div>
      </div>
    </div>
  </div>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
