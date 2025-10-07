import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { ChevronRight, ArrowRight, ArrowLeft, Smartphone, Laptop, Gamepad2, Headphones as HeadphonesIcon, Music2, Monitor, Cpu, Keyboard, ScanFace, Camera, Speaker, Mic, Upload, Phone, Info, ArrowUpDown } from "lucide-react";
import './App.css';

/**
 * Pay More Free Quote Shopify Widget — r13.1 PREVIEW (bugfix)
 *
 * Fixes
 * - Resolved unterminated string constant and several small JSX typos.
 * - Completed Step 2 form markup and actions.
 * - Ensured every string/prop is properly closed and component compiles.
 *
 * Highlights
 * - "Upload Photo or Scan Barcode" flow (file upload + BarcodeDetector when available)
 * - Voice input (Web Speech API) with a prominent mic button
 * - Optional fields truly optional (you can continue to Page 2)
 * - Rewards code + rewards pop‑up
 * - Hero icon + grading legend
 * - 10‑minute quote hold timer + sound/coin celebration, then redirect
 */

// ---------------- Business rules ----------------
const MIN_PURCHASE = 100; // CAD buy floor
const MIN_RESALE = 200;   // CAD resale floor

const STORE_NAME = "PayMore Toronto Downtown";
const PAYMORE_LOCAL_E164 = "+14168154588";
const PAYMORE_LOCAL_HUMAN = "(416) 815-4588";
const STORE_GOOGLE_MAPS = "https://www.google.com/maps/search/?api=1&query=PayMore+Toronto+Downtown";

// Theme
// const CTA_GREEN = "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500";

// Google Sheet webhook (Apps Script). Override at runtime via window.PAYMORE_SHEET_WEBHOOK
const SHEET_WEBHOOK = (typeof window !== "undefined" && (window as any).PAYMORE_SHEET_WEBHOOK) || null;

// Thank-you + audio configuration (override at runtime with window.*)
const THANKYOU_URL = (typeof window !== "undefined" && (window as any).PAYMORE_THANKYOU_URL) || "/thank-you/quote-locked";
const SOUND_URL = (typeof window !== "undefined" && (window as any).PAYMORE_SOUND_URL) || "/assets/locked-chime.mp3"; // ~3s chime
const CASH_SOUND_URL = (typeof window !== "undefined" && (window as any).PAYMORE_CASH_SOUND_URL) || "/assets/cash-register.mp3";
const SOUND_START = (typeof window !== "undefined" && (window as any).PAYMORE_SOUND_START_SEC) || 0; // seconds
const SOUND_DURATION_MS = (typeof window !== "undefined" && (window as any).PAYMORE_SOUND_DURATION_MS) || 3000;
const COIN_URL = (typeof window !== "undefined" && (window as any).PAYMORE_COIN_URL) || "/assets/paymore-coin.png";

// Barcode Lookup (optional)
const BARCODELOOKUP_KEY = (typeof window !== "undefined" && (window as any).PAYMORE_BARCODELOOKUP_API_KEY) || null;
const BARCODELOOKUP_URL = (typeof window !== "undefined" && (window as any).PAYMORE_BARCODELOOKUP_URL) || "https://api.barcodelookup.com/v3/products";
const BARCODELOOKUP_PROXY = (typeof window !== "undefined" && (window as any).PAYMORE_BARCODELOOKUP_PROXY) || null; // if you deploy Apps Script proxy

// ---------------- Tiny UI primitives ----------------
const cn = (...x: Array<string | false | null | undefined>) => x.filter(Boolean).join(" ");
const SafeIcon = ({ Comp, className = "" }: { Comp: any; className?: string }) => (typeof Comp === "function" ? <Comp className={className} /> : <span className={cn("inline-block rounded bg-zinc-200", className)} />);

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="paymore-container">
    <div className="paymore-main">
      <div className="paymore-header">
        <div className="paymore-header-content">
          <div className="paymore-header-left">
            <h1 className="paymore-header-title">
              <img src="/logo.png" alt="PayMore Logo" />
            </h1>
          </div>
          <div className="paymore-header-right">
            <div className="paymore-header-info-item">
              <Phone className="paymore-header-info-icon" />
              Phone
              <div className="paymore-header-info-tooltip">
                {PAYMORE_LOCAL_HUMAN}
              </div>
            </div>
            <div className="paymore-header-info-item">
              <Info className="paymore-header-info-icon" />
              Address
              <div className="paymore-header-info-tooltip">
                577 Yonge St #102, Toronto
              </div>
            </div>
          </div>
        </div>
        <div className="paymore-header-nav">
          <span className="paymore-header-nav-item">Trade‑In</span>
          <span className="paymore-header-nav-arrow">
            <ArrowUpDown size={12} />
          </span>
          <span className="paymore-header-nav-item active">Live Preview</span>
        </div>
      </div>
      <div className="paymore-content">{children}</div>
    </div>
  </div>
);

const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <div className={cn("paymore-card", className)}>{children}</div>
);
const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="px-5 pt-5">{children}</div>;
const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (<div className={cn("text-base font-semibold text-zinc-900", className)}>{children}</div>);
const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (<div className={cn("px-5 pb-5", className)}>{children}</div>);
const Badge: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <span className={cn("paymore-badge", className)}>{children}</span>
);
// const Pill: React.FC<{ className?: string; color?: 'zinc' | 'green' | 'yellow' | 'orange' | 'red'; children: React.ReactNode }> = ({ className = "", color = "zinc", children }) => (
//   <span className={cn("inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-semibold border",
//     color === 'zinc' && "text-zinc-700 bg-zinc-50 border-zinc-200",
//     color === 'green' && "text-green-700 bg-green-50 border-green-200",
//     color === 'yellow' && "text-yellow-700 bg-yellow-50 border-yellow-200",
//     color === 'orange' && "text-orange-700 bg-orange-50 border-orange-200",
//     color === 'red' && "text-red-700 bg-red-50 border-red-200",
//     className)}>{children}</span>
// );
const Button: React.FC<{ variant?: 'solid' | 'ghost' | 'outline'; className?: string; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ variant = "solid", className = "", children, ...props }) => (
  <button {...props} className={cn(
    "paymore-button",
    variant === "solid" && "paymore-button-solid",
    variant === "ghost" && "paymore-button-ghost",
    variant === "outline" && "paymore-button-outline",
    className
  )}>{children}</button>
);
const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (<label className="grid gap-1"><span className="paymore-field-label">{label}</span>{children}</label>);
const Money: React.FC<{ amount: number; currency?: string }> = ({ amount, currency = "CAD" }) => (<span className="tabular-nums">{Number(amount||0).toLocaleString("en-CA", { style: "currency", currency })}</span>);

// ---------------- Icons + Categories ----------------
const ICONS: Record<string, any> = { smartphone: Smartphone, laptop: Laptop, gamepad2: Gamepad2, headphones: HeadphonesIcon, music: Music2, monitor: Monitor, cpu: Cpu, keyboard: Keyboard, scanface: ScanFace, camera: Camera, speaker: Speaker };
const DeviceIcon: React.FC<{ name?: string }> = ({ name }) => <SafeIcon Comp={ICONS[name || 'smartphone'] || Smartphone} className="h-6 w-6 text-zinc-700" />;

const CATALOG_BASE = {
  // Phones
  apple_iphones: { label: "Apple iPhones", items: [
    { key: 'iphone_15_pro_128', label: 'iPhone 15 Pro 128GB', brand: 'Apple', model: 'A3101', gtin: '', mpn: 'A3101', buy_min: 450, resale_floor: 800, icon: 'smartphone' }
  ]},
  android_smartphones: { label: "Android Smartphones", items: [
    { key: 's24_ultra_256', label: 'Samsung S24 Ultra 256GB', brand: 'Samsung', model: 'SM-S928W', gtin: '', mpn: 'SM-S928W', buy_min: 500, resale_floor: 900, icon: 'smartphone' }
  ]},

  // MacBooks & laptops
  apple_macbooks: { label: "Apple MacBooks", subcategories: {
    macbook_air: { label: 'MacBook Air', items: [
      { key: 'mba_m2_13_256', label: `MacBook Air 13" M2 256GB (2022)`, brand: 'Apple', model: 'A2681', gtin: '', mpn: 'A2681', buy_min: 700, resale_floor: 1100, icon: 'laptop' },
    ]},
    macbook_pro: { label: 'MacBook Pro', items: [
      { key: 'mbp_14_2021', label: `MacBook Pro 14" (2021)`, brand: 'Apple', model: 'A2442', gtin: '', mpn: 'A2442', buy_min: 900, resale_floor: 1500, icon: 'laptop' },
    ]},
  }},
  laptops: { label: "Laptops", items: [
    { key: 'dell_xps_13_9310', label: 'Dell XPS 13 (9310)', brand: 'Dell', model: '9310', gtin: '', mpn: '9310', buy_min: 350, resale_floor: 650, icon: 'laptop' },
  ]},

  // Gaming (separate top-level)
  gaming_consoles: { label: "Gaming Consoles", items: [
    { key: 'ps5_disc', label: 'PlayStation 5 (Disc)', brand: 'Sony', model: 'CFI-1215A', gtin: '', mpn: 'CFI-1215A', buy_min: 250, resale_floor: 420, icon: 'gamepad2' },
    { key: 'xbox_series_x', label: 'Xbox Series X', brand: 'Microsoft', model: 'RRT-00001', gtin: '', mpn: 'RRT-00001', buy_min: 220, resale_floor: 380, icon: 'gamepad2' },
    { key: 'switch_oled', label: 'Nintendo Switch OLED', brand: 'Nintendo', model: 'HEG-001', gtin: '', mpn: 'HEGSKAAAA', buy_min: 180, resale_floor: 320, icon: 'gamepad2' },
    { key: 'steam_deck_256', label: 'Steam Deck 256GB', brand: 'Valve', model: 'Steam Deck', gtin: '', mpn: 'V004287-30', buy_min: 220, resale_floor: 380, icon: 'gamepad2' },
  ]},

  // VR/AR & Streaming
  vr_ar_streaming: { label: "VR/AR & Streaming", items: [
    { key: 'meta_quest_2_128', label: 'Meta Quest 2 128GB', brand: 'Meta', model: 'Quest 2', gtin: '', mpn: '899-00183-02', buy_min: 160, resale_floor: 300, icon: 'scanface' },
    { key: 'vision_pro_256', label: 'Apple Vision Pro 256GB', brand: 'Apple', model: 'A2781', gtin: '', mpn: 'A2781', buy_min: 1800, resale_floor: 3000, icon: 'scanface' },
    { key: 'roku_stick_4k', label: 'Roku Streaming Stick 4K', brand: 'Roku', model: '3820R', gtin: '', mpn: '3820R', buy_min: 100, resale_floor: 210, icon: 'scanface' }
  ]},

  // Headphones
  headphones: { label: "Headphones", items: [
    { key: 'sony_xm5', label: 'Sony WH-1000XM5', brand: 'Sony', model: 'WH-1000XM5', gtin: '', mpn: 'WH1000XM5/B', buy_min: 120, resale_floor: 260, icon: 'headphones' },
    { key: 'airpods_pro_2', label: 'AirPods Pro (2nd Gen)', brand: 'Apple', model: 'A2698', gtin: '', mpn: 'A2698', buy_min: 110, resale_floor: 240, icon: 'headphones' },
    { key: 'logi_g_pro_x', label: 'Logitech G Pro X Gaming Headset', brand: 'Logitech', model: 'G Pro X', gtin: '', mpn: '981-000818', buy_min: 110, resale_floor: 230, icon: 'headphones' }
  ]},

  // DJ & Audio
  dj_audio: { label: "DJ & Audio", items: [
    { key: 'pioneer_ddj_400', label: 'Pioneer DJ DDJ-400 Controller', brand: 'Pioneer DJ', model: 'DDJ-400', gtin: '', mpn: 'DDJ-400', buy_min: 120, resale_floor: 260, icon: 'music' },
    { key: 'scarlett_2i2_3rd', label: 'Focusrite Scarlett 2i2 3rd Gen', brand: 'Focusrite', model: '2i2 3rd', gtin: '', mpn: 'SCARLETT-2I2-3G', buy_min: 130, resale_floor: 240, icon: 'music' },
    { key: 'shure_sm58', label: 'Shure SM58 Dynamic Vocal Microphone', brand: 'Shure', model: 'SM58', gtin: '', mpn: 'SM58S', buy_min: 110, resale_floor: 210, icon: 'music' }
  ]},

  // Desktop All‑in‑Ones
  desktop_aio: { label: "Desktop All‑in‑Ones", items: [
    { key: 'hp_pavilion_27_aio', label: 'HP Pavilion 27 All‑in‑One', brand: 'HP', model: 'Pavilion 27 AIO', gtin: '', mpn: '27-AIO-2023', buy_min: 400, resale_floor: 750, icon: 'monitor' },
    { key: 'dell_inspiron_24_aio', label: 'Dell Inspiron 24 AIO', brand: 'Dell', model: 'Inspiron 24', gtin: '', mpn: '24-5415', buy_min: 250, resale_floor: 430, icon: 'monitor' }
  ]},

  // PC Cards
  pc_cards: { label: "PC Cards", items: [
    { key: 'rtx_3060_12gb', label: 'NVIDIA GeForce RTX 3060 12GB', brand: 'NVIDIA', model: 'RTX 3060 12GB', gtin: '', mpn: 'RTX3060-12G', buy_min: 220, resale_floor: 380, icon: 'cpu' },
    { key: 'elgato_hd60x', label: 'Elgato HD60 X Capture Card', brand: 'Elgato', model: 'HD60 X', gtin: '', mpn: '10GBE9901', buy_min: 120, resale_floor: 230, icon: 'cpu' },
    { key: 'creative_ae5', label: 'Creative Sound BlasterX AE-5', brand: 'Creative', model: 'AE-5', gtin: '', mpn: '70SB174000000', buy_min: 110, resale_floor: 220, icon: 'cpu' },
    { key: 'intel_x520_da2', label: 'Intel X520-DA2 10GbE NIC', brand: 'Intel', model: 'X520-DA2', gtin: '', mpn: 'E10G42BTDA', buy_min: 100, resale_floor: 220, icon: 'cpu' }
  ]},

  // PC Gear & Accessories
  pc_gear_accessories: { label: "PC Gear & Accessories", items: [
    { key: 'logi_mx_keys', label: 'Logitech MX Keys', brand: 'Logitech', model: 'MX Keys', gtin: '', mpn: '920-009295', buy_min: 110, resale_floor: 220, icon: 'keyboard' },
    { key: 'logi_mx_master_3', label: 'Logitech MX Master 3', brand: 'Logitech', model: 'MX Master 3', gtin: '', mpn: '910-005647', buy_min: 100, resale_floor: 210, icon: 'keyboard' },
    { key: 'logi_c920', label: 'Logitech C920 HD Pro Webcam', brand: 'Logitech', model: 'C920', gtin: '', mpn: '960-000764', buy_min: 100, resale_floor: 205, icon: 'keyboard' },
    { key: 'tplink_ax55', label: 'TP‑Link Archer AX55 AX3000 Router', brand: 'TP‑Link', model: 'AX55', gtin: '', mpn: 'AX55', buy_min: 100, resale_floor: 210, icon: 'keyboard' },
    { key: 'anker_usb_c_dock', label: 'Anker USB‑C Docking Station 11‑in‑1', brand: 'Anker', model: 'A8381', gtin: '', mpn: 'A8381', buy_min: 110, resale_floor: 220, icon: 'keyboard' }
  ]},

  // Art Monitors & Screens
  art_monitors_screens: { label: "Art Monitors & Screens", items: [
    { key: 'benq_pd2700u', label: `BenQ PD2700U 27" 4K Designer Monitor`, brand: 'BenQ', model: 'PD2700U', gtin: '', mpn: 'PD2700U', buy_min: 200, resale_floor: 360, icon: 'monitor' },
    { key: 'lg_27un850', label: `LG 27UN850 27" 4K IPS`, brand: 'LG', model: '27UN850', gtin: '', mpn: '27UN850-W', buy_min: 160, resale_floor: 300, icon: 'monitor' },
    { key: 'wacom_cintiq_16', label: 'Wacom Cintiq 16 Pen Display', brand: 'Wacom', model: 'DTK1660K0A', gtin: '', mpn: 'DTK-1660', buy_min: 220, resale_floor: 400, icon: 'monitor' }
  ]},

  // Cameras & Speakers remain
  digital_cameras_lenses: { label: "Digital Cameras & Lenses", items: [
    { key: 'sony_a7iii_body', label: 'Sony A7 III (body)', brand: 'Sony', model: 'ILCE-7M3', gtin: '', mpn: 'ILCE7M3/B', buy_min: 800, resale_floor: 1300, icon: 'camera' }
  ]},
  speakers_audio: { label: "Speakers & Audio", items: [
    { key: 'jbl_flip6', label: 'JBL Flip 6 Portable Speaker', brand: 'JBL', model: 'Flip 6', gtin: '', mpn: 'JBLFLIP6BLK', buy_min: 110, resale_floor: 210, icon: 'speaker' }
  ]},
};
const CATALOG: typeof CATALOG_BASE = (typeof window !== 'undefined' && (window as any).PAYMORE_CATALOG) || CATALOG_BASE as any;

// ---------------- Utilities ----------------
async function postToSheet(payload: any){
  if (!SHEET_WEBHOOK) return { ok: false, message: 'No webhook configured' };
  try {
    await fetch(SHEET_WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), mode: 'no-cors' });
    return { ok: true };
  } catch (e) { console.error('Sheet POST failed', e); return { ok: false, message: String(e) }; }
}

function buildBarcodeLookupUrl(code: string){
  if (BARCODELOOKUP_PROXY) return `${BARCODELOOKUP_PROXY}?barcode=${encodeURIComponent(code)}`;
  if (BARCODELOOKUP_KEY) return `${BARCODELOOKUP_URL}?barcode=${encodeURIComponent(code)}&key=${encodeURIComponent(BARCODELOOKUP_KEY)}`;
  return null;
}

// Category hero icon mapping
const CATEGORY_ICON: Record<string,string> = {
  apple_iphones: 'smartphone',
  android_smartphones: 'smartphone',
  apple_macbooks: 'laptop',
  laptops: 'laptop',
  gaming_consoles: 'gamepad2',
  vr_ar_streaming: 'scanface',
  headphones: 'headphones',
  dj_audio: 'music',
  desktop_aio: 'monitor',
  pc_cards: 'cpu',
  pc_gear_accessories: 'keyboard',
  art_monitors_screens: 'monitor',
  digital_cameras_lenses: 'camera',
  speakers_audio: 'speaker'
};

// ---------------- Main App ----------------
export default function App(){
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<'sell'|'buy'>('sell');
  const [category, setCategory] = useState<string>(Object.keys(CATALOG)[0] || 'apple_iphones');
  const [subcategory, setSubcategory] = useState('');
  const [selected, setSelected] = useState<any>(null);

  // device details
  const [hasCharger, setHasCharger] = useState(false);
  const [hasBox, setHasBox] = useState(false);
  const [battery, setBattery] = useState(90);
  const [condition, setCondition] = useState<'Like New'|'Good'|'Fair'>('Like New');
  const [selectedCondition, setSelectedCondition] = useState<string>('');

  // customer
  const [isBusiness, setIsBusiness] = useState(false);
  const [bizQty, setBizQty] = useState(1);
  const [agree, setAgree] = useState(false);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // search + model code
  const [q, setQ] = useState('');
  const [showList, setShowList] = useState(false);
  const [modelCode, setModelCode] = useState(''); // UPC/GTIN/MPN free text

  // identifiers
  const [imei, setImei] = useState('');
  const [serial, setSerial] = useState('');

  // barcode lookup state
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [lookup, setLookup] = useState<any>(null);

  // voice
  const [listening, setListening] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [showLow, setShowLow] = useState(false);

  // celebration + audio
  const [celebrate, setCelebrate] = useState(false);
  const [bannerText, setBannerText] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const cashAudioRef = useRef<HTMLAudioElement>(null);

  // rewards
  const [rewardCode, setRewardCode] = useState('');
  const [showRewards, setShowRewards] = useState(false);

  // 10-minute lock timer
  const [timeLeft, setTimeLeft] = useState(0);
  const [quoteExpired, setQuoteExpired] = useState(false);

  // start at step 1
  useEffect(() => { setStep(1); setMode('sell'); }, []);

  // handle subcategory defaults
  const catSpec: any = useMemo(() => (CATALOG as any)[category] || {}, [category]);
  const subcatKeys = useMemo(() => Object.keys(catSpec.subcategories || {}), [catSpec]);
  useEffect(() => {
    if (subcatKeys.length) setSubcategory(subcatKeys[0]); else setSubcategory('');
    setSelected(null);
    setShowList(false);
  }, [category, subcatKeys]);

  // items visible
  const items = useMemo(() => {
    const spec: any = (CATALOG as any)[category] || {};
    let list: any[] = [];
    if (spec.subcategories && subcategory && spec.subcategories[subcategory]) list = spec.subcategories[subcategory].items || [];
    else list = spec.items || [];
    const minGated = (list || []).filter(d => Number(d.buy_min||0) >= MIN_PURCHASE && Number(d.resale_floor||0) >= MIN_RESALE);
    const query = q.trim().toLowerCase();
    if (!query) return minGated;
    return minGated.filter(d => [d.label, d.brand, d.model].filter(Boolean).join(' ').toLowerCase().includes(query));
  }, [category, subcategory, q]);

  const lowMatches = useMemo(() => {
    const spec: any = (CATALOG as any)[category] || {};
    let list: any[] = [];
    if (spec.subcategories && subcategory && spec.subcategories[subcategory]) list = spec.subcategories[subcategory].items || [];
    else list = spec.items || [];
    const query = q.trim().toLowerCase();
    const lows = (list || []).filter((d: any) => {
      const match = !query || [d.label, d.brand, d.model].filter(Boolean).join(' ').toLowerCase().includes(query);
      const ok = Number(d.buy_min||0) >= MIN_PURCHASE && Number(d.resale_floor||0) >= MIN_RESALE;
      return match && !ok;
    });
    return lows;
  }, [category, subcategory, q]);

  // payout
  const payout = useMemo(() => {
    if (!selected || mode !== 'sell') return 0;
    let base = Number(selected.buy_min||0);
    if (battery < 85) base -= 50;
    if (battery >= 95) base += 20;
    if (condition === 'Good') base -= 40;
    if (condition === 'Fair') base -= 120;
    if (hasCharger) base += 10;
    if (hasBox) base += 10;
    if (isBusiness) base *= Math.max(1, Math.min(30, bizQty));
    return Math.max(base, 0);
  }, [selected, mode, battery, condition, hasCharger, hasBox, isBusiness, bizQty]);

  const eligible = useMemo(()=> selected ? (Number(selected.buy_min||0) >= MIN_PURCHASE && Number(selected.resale_floor||0) >= MIN_RESALE) : false, [selected]);

  // lock timer when step3 sell
  useEffect(() => {
    let t: any;
    const run = (step === 3 && mode === 'sell');
    if (run) {
      setQuoteExpired(false);
      setTimeLeft(10 * 60); // 10 minutes
      t = setInterval(() => {
        setTimeLeft(s => {
          if (s <= 1) { clearInterval(t); setQuoteExpired(true); return 0; }
          return s - 1;
        });
      }, 1000);
    }
    return () => { if (t) clearInterval(t); };
  }, [step, mode]);

  // basic self-tests
  useEffect(() => {
    try {
      const url = buildBarcodeLookupUrl('0123456789012');
      if ((BARCODELOOKUP_KEY || BARCODELOOKUP_PROXY) && (!url || !/barcode=0123456789012/.test(url!))) console.warn('[PayMore Widget] buildBarcodeLookupUrl failed');
      if (MIN_PURCHASE >= MIN_RESALE) console.warn('[PayMore Widget] MIN_PURCHASE should be < MIN_RESALE');
    } catch (e) { console.warn('[PayMore Widget] self-test error', e); }
  }, []);

  function mmss(sec: number){
    const m = Math.floor(sec / 60).toString().padStart(2,'0');
    const s = (sec % 60).toString().padStart(2,'0');
    return `${m}:${s}`;
  }

  function buildExportPayload(){
    const eligible = selected ? (Number(selected.buy_min||0) >= MIN_PURCHASE && Number(selected.resale_floor||0) >= MIN_RESALE) : false;
    return {
      store: STORE_NAME,
      mode,
      category,
      subcategory: subcategory || null,
      device_key: selected?.key || null,
      device_label: selected?.label || null,
      brand: selected?.brand || null,
      model: selected?.model || null,
      gtin: selected?.gtin || null,
      mpn: selected?.mpn || null,
      model_code_entered: modelCode || null,
      thresholds: { MIN_PURCHASE, MIN_RESALE, eligible },
      pricing: { buy_min: selected?.buy_min || null, resale_floor: selected?.resale_floor || null },
      details: { battery, condition, hasCharger, hasBox },
      identifiers: { imei: imei || null, serial: serial || null },
      barcode_lookup: lookup ? {
        barcode: lookup.barcode || null,
        title: lookup.title || null,
        brand: lookup.brand || null,
        model: lookup.model || null,
        mpn: lookup.mpn || null,
        category: lookup.category || null,
      } : null,
      rewards: { code: rewardCode || null },
      quote_cad: payout,
      customer: { first, last, email, phone, isBusiness, bizQty },
      created_at: new Date().toISOString(),
    };
  }

  const doBarcodeLookup = useCallback(async (raw: string) => {
    const code = String(raw||'').replace(/[^0-9]/g,'');
    if (!code) { setLookup(null); setLookupError(''); return; }
    const url = buildBarcodeLookupUrl(code);
    if (!url) { setLookupError('BarcodeLookup API key or proxy not configured'); return; }
    try {
      setLookupLoading(true); setLookupError('');
      const res = await fetch(url, { method:'GET' });
      const text = await res.text();
      let json: any = {};
      try { json = JSON.parse(text); } catch {}
      const p = (json.products && json.products[0]) || json.product || null;
      if (!p) { setLookup(null); setLookupError('No product found for this code'); return; }
      const normalized = {
        barcode: p.barcode_number || p.barcode || code,
        title: p.product_name || p.title || p.product_title || '',
        brand: p.brand || p.manufacturer || '',
        model: p.model || p.model_number || '',
        mpn: p.mpn || p.part_number || '',
        category: p.category || p.category_name || '',
      };
      setLookup(normalized);
      const qHint = [normalized.brand, normalized.model].filter(Boolean).join(' ').trim();
      if (qHint) setQ(qHint);
      if (!modelCode && normalized.mpn) setModelCode(normalized.mpn);
      try { const u = new SpeechSynthesisUtterance(`Found ${normalized.brand || ''} ${normalized.model || ''}`.trim()); u.lang = 'en-CA'; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);} catch {}
    } catch (e){
      console.log('BarcodeLookup error', e);
      setLookup(null); setLookupError('Lookup failed. Try again or enter details manually.');
    } finally { setLookupLoading(false); }
  }, [modelCode]);

  // auto-lookup when 12–14 digits present
  useEffect(() => {
    const d = String(modelCode||'').replace(/[^0-9]/g,'');
    if (!lookup && !lookupLoading && d.length >= 12 && d.length <= 14 && (BARCODELOOKUP_KEY || BARCODELOOKUP_PROXY)) {
      doBarcodeLookup(d);
    }
  }, [modelCode, lookup, lookupLoading, doBarcodeLookup]);

  // Image upload helper
  async function handleImageUpload(file?: File | null){
    if (!file) return;
    if (typeof (window as any).BarcodeDetector === 'function'){
      try{
        const img = await createImageBitmap(file);
        const detector = new (window as any).BarcodeDetector({ formats:["ean_13","upc_a","upc_e","ean_8","code_128","code_39","qr_code"] });
        const codes = await detector.detect(img);
        if (codes && codes[0] && codes[0].rawValue){
          setModelCode(codes[0].rawValue);
          doBarcodeLookup(codes[0].rawValue);
          return;
        }
      }catch(e){ console.warn('Barcode detect failed from image', e); }
    }
    setLookupError('Could not read a barcode from the photo. Try a clearer barcode photo or enter the code.');
  }

  // Voice (Web Speech API)
  function startVoice(){
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { alert('Voice not supported in this browser.'); return; }
    const r = new SR(); r.lang = 'en-CA'; r.interimResults = false; r.maxAlternatives = 1; setListening(true);
    r.onresult = (ev: any) => { const text = ev.results[0][0].transcript || ''; setQ(text); if (searchRef.current) searchRef.current.focus(); try{ const u = new SpeechSynthesisUtterance(`Looking up ${text}`); u.lang='en-CA'; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);}catch{} };
    r.onerror = () => setListening(false);
    r.onend = () => setListening(false);
    r.start();
  }

  function next(){ setStep(s => Math.min(3, s + 1)); }
  function back(){ setStep(s => Math.max(1, s - 1)); }

  function resetAll(){
    setStep(1); setMode('sell');
    setCategory(Object.keys(CATALOG)[0] || 'apple_iphones'); setSubcategory(''); setSelected(null);
    setHasCharger(false); setHasBox(false); setBattery(90); setCondition('Like New');
    setIsBusiness(false); setBizQty(1); setAgree(false);
    setFirst(''); setLast(''); setEmail(''); setPhone('');
    setModelCode(''); setQ(''); setImei(''); setSerial('');
    setLookup(null); setLookupError(''); setLookupLoading(false);
    setRewardCode('');
  }

  async function submit(){
    const payload = buildExportPayload();
    if (!SHEET_WEBHOOK) {
      // Fallback: download sample JSON for testing
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob); const a = document.createElement('a');
      a.href = url; a.download = 'paymore_quote_sample.json'; a.click(); URL.revokeObjectURL(url);
    } else {
      await postToSheet(payload);
    }
    // Reward sequence
    setBannerText('Your cash payment has been locked down for 24 hours.');
    setCelebrate(true);
    try {
      if (audioRef.current) { audioRef.current.currentTime = SOUND_START; await audioRef.current.play(); }
      setTimeout(() => { if (cashAudioRef.current) cashAudioRef.current.play().catch(()=>{}); }, 400);
    } catch {}
    setTimeout(() => { if (typeof window !== 'undefined') window.location.assign(THANKYOU_URL); }, SOUND_DURATION_MS + 800);
  }

  // const canContinue = useMemo(() => {
  //   if (step === 1) return true; // optional step
  //   if (step === 2) return true;
  //   const hasContact = (agree && first && last && email && phone);
  //   return hasContact && !!selected; // require device to lock
  // }, [step, selected, agree, first, last, email, phone]);

  const summaryMuted = step < 3;

  return (
    <Shell>
      {/* Celebration overlay */}
      {celebrate && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={COIN_URL} alt="PayMore coin" className="h-28 w-28 animate-spin-slow drop-shadow-xl" />
          </div>
        </div>
      )}
      <audio ref={audioRef} src={SOUND_URL} preload="auto" />
      <audio ref={cashAudioRef} src={CASH_SOUND_URL} preload="auto" />

      {/* Stepper */}
      <div className="paymore-stepper">
        <div className="paymore-stepper-container">
          <div className="paymore-step-item">
            <div className={cn("paymore-step-number", step === 1 ? "paymore-step-number-active" : "paymore-step-number-inactive")}>1</div>
            <div className="paymore-step-content">
              <div className={cn("paymore-step-title", step !== 1 && "paymore-step-title-inactive")}>Select device</div>
            </div>
            <div className="paymore-step-info">
              i
              <div className="paymore-step-tooltip">
                <div className="paymore-step-tooltip-title">Select Device</div>
                <div className="paymore-step-tooltip-description">Pick a category, then choose the model. Use search or photo/scan.</div>
              </div>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 paymore-step-arrow" />
          <div className="paymore-step-item">
            <div className={cn("paymore-step-number", step === 2 ? "paymore-step-number-active" : "paymore-step-number-inactive")}>2</div>
            <div className="paymore-step-content">
              <div className={cn("paymore-step-title", step !== 2 && "paymore-step-title-inactive")}>Enter details</div>
            </div>
            <div className="paymore-step-info">
              i
              <div className="paymore-step-tooltip">
                <div className="paymore-step-tooltip-title">Enter Details</div>
                <div className="paymore-step-tooltip-description">We'll text/email your locked quote. Business toggle available.</div>
              </div>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 paymore-step-arrow" />
          <div className="paymore-step-item">
            <div className={cn("paymore-step-number", step === 3 ? "paymore-step-number-active" : "paymore-step-number-inactive")}>3</div>
            <div className="paymore-step-content">
              <div className={cn("paymore-step-title", step !== 3 && "paymore-step-title-inactive")}>Lock quote</div>
            </div>
            <div className="paymore-step-info">
              i
              <div className="paymore-step-tooltip">
                <div className="paymore-step-tooltip-title">Lock Quote</div>
                <div className="paymore-step-tooltip-description">10‑minute hold window.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select your category & device</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* Category */}
            <div className="grid gap-2">
              <Field label="Category">
                <select value={category} onChange={(e)=> setCategory(e.target.value)} className="paymore-select">
                  {Object.entries(CATALOG).map(([key, cat]: any) => (
                    <option key={key} value={key}>{cat.label || key}</option>
                  ))}
                </select>
              </Field>
              {!!subcatKeys.length && (
                <Field label="Subcategory">
                  <select value={subcategory} onChange={(e)=> setSubcategory(e.target.value)} className="paymore-select">
                    {subcatKeys.map((k: string) => (<option key={k} value={k}>{catSpec.subcategories[k].label}</option>))}
                  </select>
                </Field>
              )}
              <Field label="Search">
                <div className="flex items-center gap-2">
                  <input ref={searchRef} value={q} onChange={(e)=> setQ(e.target.value)} placeholder="Try: brand, model, capacity…" className="paymore-input" />
                  <Button type="button" variant="outline" onClick={startVoice}><Mic className="h-4 w-4"/> {listening ? 'Listening…' : 'Talk to AI'}</Button>
                </div>
              </Field>
            </div>

            {/* Identifier helpers */}
            <div className="grid gap-2">
              <Field label="Upload Photo or Scan Barcode (optional)">
                <div className="flex items-center gap-2">
                  <input id="pm-file" type="file" accept="image/*" capture="environment" className="hidden" onChange={(e)=> handleImageUpload(e.target.files && e.target.files[0])} />
                  <Button type="button" variant="outline" onClick={()=> (document.getElementById('pm-file') as HTMLInputElement)?.click()}><Upload className="h-4 w-4"/> Upload Photo</Button>
                </div>
              </Field>
              <Field label="GTIN / MPN / Model code (optional)">
                <div className="flex items-center gap-2">
                  <input value={modelCode} onChange={(e)=> setModelCode(e.target.value)} placeholder="UPC/GTIN, MPN, or model code" className="paymore-input"/>
                  <Button type="button" variant="outline" onClick={()=> doBarcodeLookup(modelCode)} disabled={!modelCode}>Search code</Button>
                </div>
              </Field>
              <div className="paymore-tip">
                <div className="paymore-tip-icon">!</div>
                <div className="paymore-tip-text">On phones, dial <span className="font-mono font-semibold">*#06#</span> to show IMEI, or go to Settings → About.</div>
              </div>
              <div className="grid gap-4">
                <Field label="IMEI (optional)"><input inputMode="numeric" value={imei} onChange={(e)=> setImei(e.target.value.replace(/\D/g,''))} placeholder="15 digits" className="paymore-input"/></Field>
                <Field label="Serial # (optional)"><input value={serial} onChange={(e)=> setSerial(e.target.value)} placeholder="From Settings → About or device label" className="paymore-input"/></Field>
              </div>
              {lookupLoading && <div className="text-xs text-zinc-600">Looking up…</div>}
              {lookupError && <div className="text-xs text-red-600">{lookupError}</div>}
              {lookup && (
                <div className="rounded-lg border border-zinc-200 p-2 text-xs grid gap-1 bg-zinc-50">
                  <div className="font-medium text-zinc-800">Found: {lookup.title || '—'}</div>
                  <div className="grid grid-cols-2 gap-x-3">
                    <div><span className="text-zinc-500">Brand:</span> {lookup.brand || '—'}</div>
                    <div><span className="text-zinc-500">Model:</span> {lookup.model || '—'}</div>
                    <div><span className="text-zinc-500">MPN:</span> {lookup.mpn || '—'}</div>
                    <div><span className="text-zinc-500">GTIN:</span> {lookup.barcode || '—'}</div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Button type="button" variant="outline" onClick={()=> setQ([lookup.brand, lookup.model].filter(Boolean).join(' ').trim())}>Search these keywords</Button>
                    <Button type="button" variant="ghost" onClick={()=> setLookup(null)}>Clear</Button>
                  </div>
                </div>
              )}
            </div>

            {/* Category hero when list is hidden */}
            {!q.trim() && !showList && (
              <div className="paymore-category-hero">
                <div className="paymore-category-icon">
                  <img 
                    src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTUkMdMbWGpC7t-4GcTp9-iFscNprEBXqtaGAR1StT_Ec4N0MH6ktsLbUYSdCHPhg0rvXPO4j1MrAJ4Fh1x4IyeXDgYfUAf-fiZh9F9MawX02J-SuGPOxIvihYOa70EoIyqtRY63UsyhQ&usqp=CAc" 
                    alt="Apple iPhone"
                    onError={(e) => {
                      // Fallback to icon if image fails to load
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.innerHTML = '<DeviceIcon name="smartphone" />';
                      }
                    }}
                  />
                </div>
                <div className="paymore-category-content">
                  <h3 className="paymore-category-title">{(CATALOG as any)[category]?.label || 'Selected category'}</h3>
                  <p className="paymore-category-description">Start typing your model or use photo/scan. Eligible items meet Buy ≥ {MIN_PURCHASE} • Resale ≥ {MIN_RESALE}.</p>
                  <div className="paymore-category-button">
                    <Button type="button" variant="outline" onClick={()=> setShowList(true)}>Browse models</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Device condition grading legend */}
            <div className="paymore-device-condition-block">
              <div className="paymore-condition-title">Device Condition Guide</div>
              <div className="paymore-condition-items">
                <div 
                  className={`paymore-condition-item ${selectedCondition === 'ungraded' ? 'paymore-condition-selected' : ''}`}
                  onClick={() => setSelectedCondition(selectedCondition === 'ungraded' ? '' : 'ungraded')}
                >
                  <div className="paymore-condition-color paymore-condition-ungraded">
                    {selectedCondition === 'ungraded' && <div className="paymore-condition-check">✓</div>}
                  </div>
                  <div className="paymore-condition-info">
                    <div className="paymore-condition-label">Ungraded</div>
                    <div className="paymore-condition-tooltip">Not yet assessed by our team</div>
                  </div>
                </div>
                <div 
                  className={`paymore-condition-item ${selectedCondition === 'excellent' ? 'paymore-condition-selected' : ''}`}
                  onClick={() => setSelectedCondition(selectedCondition === 'excellent' ? '' : 'excellent')}
                >
                  <div className="paymore-condition-color paymore-condition-excellent">
                    {selectedCondition === 'excellent' && <div className="paymore-condition-check">✓</div>}
                  </div>
                  <div className="paymore-condition-info">
                    <div className="paymore-condition-label">Excellent</div>
                    <div className="paymore-condition-tooltip">Like new condition, minimal wear</div>
                  </div>
                </div>
                <div 
                  className={`paymore-condition-item ${selectedCondition === 'good' ? 'paymore-condition-selected' : ''}`}
                  onClick={() => setSelectedCondition(selectedCondition === 'good' ? '' : 'good')}
                >
                  <div className="paymore-condition-color paymore-condition-good">
                    {selectedCondition === 'good' && <div className="paymore-condition-check">✓</div>}
                  </div>
                  <div className="paymore-condition-info">
                    <div className="paymore-condition-label">Good</div>
                    <div className="paymore-condition-tooltip">Minor wear, fully functional</div>
                  </div>
                </div>
                <div 
                  className={`paymore-condition-item ${selectedCondition === 'fair' ? 'paymore-condition-selected' : ''}`}
                  onClick={() => setSelectedCondition(selectedCondition === 'fair' ? '' : 'fair')}
                >
                  <div className="paymore-condition-color paymore-condition-fair">
                    {selectedCondition === 'fair' && <div className="paymore-condition-check">✓</div>}
                  </div>
                  <div className="paymore-condition-info">
                    <div className="paymore-condition-label">Fair</div>
                    <div className="paymore-condition-tooltip">Visible wear, works well</div>
                  </div>
                </div>
                <div 
                  className={`paymore-condition-item ${selectedCondition === 'no-deal' ? 'paymore-condition-selected' : ''}`}
                  onClick={() => setSelectedCondition(selectedCondition === 'no-deal' ? '' : 'no-deal')}
                >
                  <div className="paymore-condition-color paymore-condition-no-deal">
                    {selectedCondition === 'no-deal' && <div className="paymore-condition-check">✓</div>}
                  </div>
                  <div className="paymore-condition-info">
                    <div className="paymore-condition-label">No Deal</div>
                    <div className="paymore-condition-tooltip">Below our minimum thresholds</div>
                  </div>
                </div>
                <div 
                  className={`paymore-condition-item ${selectedCondition === 'donate' ? 'paymore-condition-selected' : ''}`}
                  onClick={() => setSelectedCondition(selectedCondition === 'donate' ? '' : 'donate')}
                >
                  <div className="paymore-condition-color paymore-condition-donate">
                    {selectedCondition === 'donate' && <div className="paymore-condition-check">✓</div>}
                  </div>
                  <div className="paymore-condition-info">
                    <div className="paymore-condition-label">Donate/Recycle</div>
                    <div className="paymore-condition-tooltip">Free disposal service</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Items grid */}
            <div className="grid grid-cols-1 gap-2">
              {(showList || q.trim()) && items.map((d: any) => (
                <button key={d.key} onClick={()=> setSelected(d)} className={cn("flex items-center justify-between rounded-xl border px-3 py-3 text-left",
                  selected?.key===d.key ? "border-emerald-400 bg-emerald-50" : "border-zinc-200 hover:bg-zinc-50")}> 
                  <div className="flex items-center gap-3">
                    <DeviceIcon name={d.icon||CATEGORY_ICON[category]||'smartphone'} />
                    <div>
                      <div className="text-sm font-medium text-zinc-900">{d.label}</div>
                      <div className="text-xs text-zinc-500">Buy floor <Money amount={d.buy_min}/> • Resale floor <Money amount={d.resale_floor}/></div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-400" />
                </button>
              ))}
              {((showList || q.trim()) && !items.length) && (
                lowMatches.length > 0 ? (
                  <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 text-xs text-orange-800">
                    We found matches below our minimums. You can still select one to Donate or Recycle.
                    <div className="pt-2"><Button variant="outline" onClick={()=> setShowLow(true)}>Show lower‑value matches</Button></div>
                  </div>
                ) : (
                  <div className="text-xs text-zinc-500">No matches at this time. Try a different search or category.</div>
                )
              )}
              {showLow && (
                <div className="grid grid-cols-1 gap-2">
                  {lowMatches.map((d: any) => (
                    <button key={d.key} onClick={()=> setSelected(d)} className="flex items-center justify-between rounded-xl border px-3 py-3 text-left border-red-200 bg-red-50"> 
                      <div className="flex items-center gap-3">
                        <DeviceIcon name={d.icon||CATEGORY_ICON[category]||'smartphone'} />
                        <div>
                          <div className="text-sm font-medium text-zinc-900">{d.label}</div>
                          <div className="text-xs text-red-700">Below minimums — Donate or Recycle</div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-red-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="paymore-button-group">
              <div className="paymore-button-group-left">
                <Button variant="ghost" onClick={resetAll}><ArrowLeft className="h-4 w-4"/> Reset</Button>
              </div>
              <div className="paymore-button-group-right">
                <Button variant="outline" onClick={startVoice}><Mic className="h-4 w-4"/> {listening ? 'Listening…' : 'Talk to AI'}</Button>
                <Button onClick={next}>Continue <ArrowRight className="h-4 w-4"/></Button>
              </div>
            </div>
            <div className="paymore-help-section">
              <p className="paymore-help-text">
                No exact model? <button className="paymore-help-button" onClick={next}>Continue anyway</button> — we'll confirm in store.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Enter your details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-2">
              <Field label="First name"><input value={first} onChange={(e)=> setFirst(e.target.value)} className="paymore-input"/></Field>
              <Field label="Last name"><input value={last} onChange={(e)=> setLast(e.target.value)} className="paymore-input"/></Field>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Email"><input value={email} onChange={(e)=> setEmail(e.target.value)} className="paymore-input"/></Field>
              <Field label="Phone"><input value={phone} onChange={(e)=> setPhone(e.target.value)} className="paymore-input"/></Field>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" className="paymore-checkbox" checked={isBusiness} onChange={(e)=> setIsBusiness(e.target.checked)} /> Business</label>
              {isBusiness && (
                <Field label="Quantity (est.)"><input type="number" min={1} max={30} value={bizQty} onChange={(e)=> setBizQty(Number(e.target.value||1))} className="paymore-input"/></Field>
              )}
            </div>
            {/* device condition subset */}
            <div className="grid gap-2">
              <div className="grid grid-cols-2 gap-2">
                <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" className="paymore-checkbox" checked={hasCharger} onChange={(e)=> setHasCharger(e.target.checked)} /> Charger included</label>
                <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" className="paymore-checkbox" checked={hasBox} onChange={(e)=> setHasBox(e.target.checked)} /> Box included</label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Battery % (if applicable)"><input type="range" min={0} max={100} step={1} value={battery} onChange={(e)=> setBattery(Number(e.target.value))} className="paymore-range"/></Field>
                <Field label="Condition">
                  <select value={condition} onChange={(e)=> setCondition(e.target.value as any)} className="paymore-select">
                    <option>Like New</option><option>Good</option><option>Fair</option>
                  </select>
                </Field>
              </div>
            </div>
            <Field label="4‑digit commission / rewards code (optional)"><input value={rewardCode} maxLength={4} inputMode="numeric" onChange={(e)=> setRewardCode(e.target.value.replace(/\D/g,''))} placeholder="1234" className="paymore-input"/></Field>
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" className="paymore-checkbox" checked={agree} onChange={(e)=> setAgree(e.target.checked)} /> I agree to the store’s verification & payout policies.</label>
              <button type="button" className="paymore-rewards-button" onClick={()=> setShowRewards(true)}>View rewards</button>
            </div>
            <div className="paymore-button-group">
              <div className="paymore-button-group-left">
                <Button variant="ghost" onClick={back}><ArrowLeft className="h-4 w-4"/> Back</Button>
              </div>
              <div className="paymore-button-group-right">
                <Button variant="outline" onClick={startVoice}><Mic className="h-4 w-4"/> {listening ? 'Listening…' : 'Talk to AI'}</Button>
                <Button onClick={next}>Continue <ArrowRight className="h-4 w-4"/></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <CardTitle>Review & lock your quote</CardTitle>
              <Badge>{quoteExpired ? 'Quote expired' : `Hold expires in ${mmss(timeLeft)}`}</Badge>
            </div>
            {bannerText && (<div className="mt-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2 text-sm">{bannerText}</div>)}
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-1">
              <Row label="Item" value={selected?.label || '—'} muted={summaryMuted} />
              <Row label="Buy floor" value={<Money amount={selected?.buy_min || 0} />} muted={summaryMuted} />
              <Row label="Resale floor" value={<Money amount={selected?.resale_floor || 0} />} muted={summaryMuted} />
              <Row label="Battery" value={`${battery}%`} muted={summaryMuted} />
              <Row label="Condition" value={`${condition}`} muted={summaryMuted} />
              <Row label="Charger / Box" value={`${hasCharger ? 'Yes' : 'No'} • ${hasBox ? 'Yes' : 'No'}`} muted={summaryMuted} />
              <Row label="IMEI" value={`${imei || '—'}`} muted={summaryMuted} />
              <Row label="Serial" value={`${serial || '—'}`} muted={summaryMuted} />
              <Row label="Estimated payout" value={<Money amount={payout} />} muted={false} />
            </div>
            {selected && !eligible && (
              <div className="rounded-lg border border-red-200 bg-red-50 text-red-800 p-3 text-sm">
                This device is below our minimums for cash offers. We’d be happy to <span className="font-semibold">Donate or Recycle</span> it for you at the counter (certificate available for secure shred).
              </div>
            )}

            <div className="rounded-lg border border-zinc-200 p-3 text-xs">
              <div className="font-medium text-zinc-800">{STORE_NAME}</div>
              <div className="text-zinc-600">577 Yonge St #102, Toronto, ON M4Y 1Z2</div>
              <div className="flex items-center gap-3 pt-1">
                <a href={STORE_GOOGLE_MAPS} target="_blank" rel="noreferrer" className="underline">Open in Google Maps</a>
                <span>or</span>
                <a href={`tel:${PAYMORE_LOCAL_E164}`} className="underline">Call Us {PAYMORE_LOCAL_HUMAN}</a>
              </div>
            </div>

            <div className="paymore-button-group">
              <div className="paymore-button-group-left">
                <Button variant="ghost" onClick={back}><ArrowLeft className="h-4 w-4"/> Back</Button>
              </div>
              <div className="paymore-button-group-right">
                <Button onClick={submit} disabled={!agree || !selected || !eligible || quoteExpired}>Lock my quote</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rewards modal */}
      {showRewards && (
        <div className="paymore-rewards-overlay" onClick={()=> setShowRewards(false)}>
          <div className="paymore-rewards-modal" onClick={(e)=> e.stopPropagation()}>
            <div className="paymore-rewards-header">
              <div className="paymore-rewards-title">🎉 Earn Points & Rewards</div>
              <div className="paymore-rewards-subtitle">Unlock amazing benefits!</div>
            </div>
            <div className="paymore-rewards-content">
              <div className="paymore-rewards-item">
                <div className="paymore-rewards-icon">💰</div>
                <div className="paymore-rewards-text">
                  <div className="paymore-rewards-label">Close a quote</div>
                  <div className="paymore-rewards-points">+50 points</div>
                </div>
              </div>
              <div className="paymore-rewards-item">
                <div className="paymore-rewards-icon">📱</div>
                <div className="paymore-rewards-text">
                  <div className="paymore-rewards-label">Share on social</div>
                  <div className="paymore-rewards-points">+20 per engagement</div>
                </div>
              </div>
              <div className="paymore-rewards-item">
                <div className="paymore-rewards-icon">👥</div>
                <div className="paymore-rewards-text">
                  <div className="paymore-rewards-label">Refer a friend</div>
                  <div className="paymore-rewards-points">+30 points</div>
                </div>
              </div>
              <div className="paymore-rewards-item">
                <div className="paymore-rewards-icon">⭐</div>
                <div className="paymore-rewards-text">
                  <div className="paymore-rewards-label">Leave a review</div>
                  <div className="paymore-rewards-points">+15 points</div>
                </div>
              </div>
              <div className="paymore-rewards-item">
                <div className="paymore-rewards-icon">📱</div>
                <div className="paymore-rewards-text">
                  <div className="paymore-rewards-label">Upload more devices</div>
                  <div className="paymore-rewards-points">+10 each</div>
                </div>
              </div>
              <div className="paymore-rewards-item">
                <div className="paymore-rewards-icon">📷</div>
                <div className="paymore-rewards-text">
                  <div className="paymore-rewards-label">Barcode scans</div>
                  <div className="paymore-rewards-points">+5 points</div>
                </div>
              </div>
            </div>
            <div className="paymore-rewards-footer">
              <Button variant="outline" onClick={()=> setShowRewards(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}


function Row({ label, value, muted }: { label: string; value: React.ReactNode; muted?: boolean }){
  return (
    <div className="flex items-center justify-between text-sm">
      <div className={cn("", muted && "text-zinc-400")}>{label}</div>
      <div className={cn("", muted && "text-zinc-400")}>{value}</div>
    </div>
  );
}

function Legend({ label, className = "" }: { label: string; className?: string }){
  return <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold border", className)}>{label}</span>;
}

// simple spin css (inject once)
if (typeof document !== 'undefined' && !document.getElementById('pm-spin-style')){
  const style = document.createElement('style');
  style.id = 'pm-spin-style';
  style.innerHTML = `@keyframes spin-slow{from{transform:rotate(0)}to{transform:rotate(360deg)}}.animate-spin-slow{animation:spin-slow 1.6s linear infinite}`;
  document.head.appendChild(style);
}
