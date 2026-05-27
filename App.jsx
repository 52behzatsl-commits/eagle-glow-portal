import { useState } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');`;

const USERS = [
  { id: "admin", name: "Behzat", email: "behzat@eagleglow.com", password: "admin123", role: "admin" },
  { id: "c1", name: "Ahmet Yılmaz", email: "ahmet@ornek.com", password: "ahmet123", role: "client", company: "Yılmaz Deri" },
  { id: "c2", name: "Selin Kaya", email: "selin@ornek.com", password: "selin123", role: "client", company: "Kaya Tekstil" },
];

const INITIAL_CLIENTS = [
  {
    id: "c1", name: "Ahmet Yılmaz", company: "Yılmaz Deri", email: "ahmet@ornek.com",
    package: "Growth Pack", packageColor: "#c9a96e", since: "Oca 2025",
    platforms: ["Etsy", "Shopify"], progress: 65,
    services: [
      { id: "s1", title: "Etsy mağaza kurulumu", status: "done", date: "10 Oca" },
      { id: "s2", title: "10 listing copy yazımı", status: "done", date: "18 Oca" },
      { id: "s3", title: "Shopify kurulumu", status: "in_progress", date: "—" },
      { id: "s4", title: "Meta Ads kurulumu", status: "pending", date: "—" },
      { id: "s5", title: "Fotoğraf brief hazırlama", status: "pending", date: "—" },
    ],
    actions: [
      { id: "a1", title: "Etsy'e 10 listing'i yükle", detail: "Hazırlanan metinleri kendi Etsy hesabına gir.", status: "pending", urgent: true },
      { id: "a2", title: "Shopify ödeme yöntemini ekle", detail: "Shopify admin > Ayarlar > Ödemeler bölümünden iyzico entegrasyonunu tamamla.", status: "pending", urgent: false },
      { id: "a3", title: "Ürün fotoğraflarını gönder", detail: "Brief'e uygun 15 ürün fotoğrafını Drive'a yükle.", status: "done", urgent: false },
    ],
    files: [
      { id: "f1", name: "Etsy Listing Metinleri.docx", size: "48 KB", date: "18 Oca", type: "doc" },
      { id: "f2", name: "Fotoğraf Brief.pdf", size: "1.2 MB", date: "20 Oca", type: "pdf" },
      { id: "f3", name: "Shopify Kurulum Rehberi.pdf", size: "890 KB", date: "25 Oca", type: "pdf" },
    ],
    notes: "Ürün fotoğrafları için randevu Şubat ilk haftasına alındı.",
  },
  {
    id: "c2", name: "Selin Kaya", company: "Kaya Tekstil", email: "selin@ornek.com",
    package: "Starter Pack", packageColor: "#7eb8a4", since: "Şub 2025",
    platforms: ["Trendyol"], progress: 30,
    services: [
      { id: "s1", title: "Trendyol mağaza kurulumu", status: "done", date: "5 Şub" },
      { id: "s2", title: "20 listing yükleme", status: "in_progress", date: "—" },
      { id: "s3", title: "Sponsored ürün reklamı", status: "pending", date: "—" },
    ],
    actions: [
      { id: "a1", title: "Vergi levhasını gönder", detail: "Trendyol mağaza onayı için vergi levhası gerekiyor.", status: "pending", urgent: true },
      { id: "a2", title: "Ürün barkodlarını hazırla", detail: "Her ürün için barkod oluşturulması gerekiyor.", status: "pending", urgent: false },
    ],
    files: [
      { id: "f1", name: "Trendyol Başvuru Rehberi.pdf", size: "2.1 MB", date: "5 Şub", type: "pdf" },
    ],
    notes: "",
  },
];

const PLATFORMS_CALC = [
  { id: "etsy", name: "Etsy", color: "#b85c00", fees: [{ label: "İşlem ücreti", rate: 0.065 }, { label: "Ödeme ücreti", rate: 0.04 }, { label: "Listing ücreti", flat: 7 }] },
  { id: "amazon", name: "Amazon", color: "#b06000", fees: [{ label: "Referral fee", rate: 0.15 }, { label: "Closing fee", flat: 15 }] },
  { id: "shopify", name: "Shopify", color: "#2d6e1f", fees: [{ label: "İşlem ücreti", rate: 0.02 }, { label: "Abonelik (÷adet)", flat: "shopify" }] },
  { id: "trendyol", name: "Trendyol", color: "#a04400", fees: [{ label: "Komisyon", rate: 0.18 }, { label: "Hizmet bedeli", rate: 0.02 }] },
  { id: "hepsiburada", name: "Hepsiburada", color: "#164e8a", fees: [{ label: "Komisyon", rate: 0.16 }, { label: "Hizmet bedeli", rate: 0.025 }] },
  { id: "website", name: "Kendi sitesi", color: "#1a5e4a", fees: [{ label: "Ödeme altyapısı", rate: 0.025 }, { label: "Hosting (÷adet)", flat: "website" }] },
];

const statusConfig = {
  done: { label: "Tamamlandı", bg: "#e8f5f0", color: "#2d7a5a", icon: "✓" },
  in_progress: { label: "Devam ediyor", bg: "#fef6e4", color: "#a06000", icon: "◑" },
  pending: { label: "Bekliyor", bg: "#f2f2f2", color: "#888", icon: "○" },
};

function Badge({ status }) {
  const c = statusConfig[status];
  return <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 20, background: c.bg, color: c.color }}>{c.icon} {c.label}</span>;
}

function FileIcon({ type }) {
  const colors = { doc: "#4a7fd4", pdf: "#d44a4a", img: "#4ab88a" };
  return <div style={{ width: 36, height: 36, borderRadius: 8, background: colors[type] || "#888", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 600, flexShrink: 0 }}>{type?.toUpperCase().slice(0, 3)}</div>;
}

function ProgressBar({ value }) {
  return <div style={{ background: "#f0ece4", borderRadius: 99, height: 6, overflow: "hidden", width: "100%" }}><div style={{ width: `${value}%`, height: "100%", background: "#c9a96e", borderRadius: 99, transition: "width 0.6s ease" }} /></div>;
}

// ─── CALCULATOR ───────────────────────────────────────────────
function Calculator() {
  const [price, setPrice] = useState(500);
  const [cost, setCost] = useState(150);
  const [qty, setQty] = useState(30);
  const [shipping, setShipping] = useState(40);
  const [adDaily, setAdDaily] = useState(50);
  const [selected, setSelected] = useState(new Set(["etsy", "shopify"]));

  const calcPlatform = (p) => {
    let totalFees = 0;
    const breakdown = [];
    for (const fee of p.fees) {
      let amount = 0;
      if (fee.rate) {
        amount = Math.round(price * fee.rate);
        breakdown.push({ label: `${fee.label} (${(fee.rate * 100).toFixed(1)}%)`, value: -amount });
      } else {
        const flat = fee.flat === "shopify" ? Math.round(1000 / qty) : fee.flat === "website" ? Math.round(450 / qty) : fee.flat;
        breakdown.push({ label: fee.label, value: -flat });
        amount = flat;
      }
      totalFees += amount;
    }
    const adPerUnit = (adDaily * 30) / qty;
    breakdown.push({ label: "Maliyet", value: -Math.round(cost) });
    breakdown.push({ label: "Kargo", value: -Math.round(shipping) });
    breakdown.push({ label: "Reklam (÷adet)", value: -Math.round(adPerUnit), warn: true });
    const netPerUnit = price - cost - shipping - totalFees - adPerUnit;
    breakdown.push({ label: "Ürün başı net", value: Math.round(netPerUnit), total: true });
    return { netMonthly: Math.round(netPerUnit * qty), margin: Math.round((netPerUnit / price) * 100), breakdown, totalFees: Math.round(totalFees) };
  };

  const toggle = (id) => {
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const grandTotal = PLATFORMS_CALC.filter(p => selected.has(p.id)).reduce((sum, p) => sum + calcPlatform(p).netMonthly, 0);

  const inp = { width: "100%", padding: "8px 10px", background: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 7, color: "#f0ebe3", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "'Sora', sans-serif" };

  return (
    <div>
      <div style={{ fontSize: 13, color: "#8a7d6b", marginBottom: 16 }}>Müşteriyle birlikte doldur — her platformda net kazancı göster.</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[["Satış fiyatı (₺)", price, setPrice], ["Maliyet (₺)", cost, setCost], ["Aylık satış adedi", qty, setQty], ["Kargo (₺)", shipping, setShipping]].map(([label, val, setter]) => (
          <div key={label}>
            <div style={{ fontSize: 11, color: "#4a4035", marginBottom: 4, letterSpacing: "0.06em" }}>{label}</div>
            <input type="number" value={val} onChange={e => setter(Number(e.target.value))} style={inp} />
          </div>
        ))}
        <div style={{ gridColumn: "1 / -1" }}>
          <div style={{ fontSize: 11, color: "#4a4035", marginBottom: 4, letterSpacing: "0.06em" }}>Günlük reklam bütçesi (₺)</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input type="number" value={adDaily} onChange={e => setAdDaily(Number(e.target.value))} style={{ ...inp, flex: 1 }} />
            <span style={{ fontSize: 12, color: "#6b6057", whiteSpace: "nowrap" }}>= aylık ₺{(adDaily * 30).toLocaleString("tr-TR")}</span>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
        {PLATFORMS_CALC.map(p => {
          const r = calcPlatform(p);
          const isActive = selected.has(p.id);
          const netColor = r.netMonthly >= 0 ? "#2d7a5a" : "#c0503a";
          return (
            <div key={p.id} onClick={() => toggle(p.id)} style={{ background: isActive ? "rgba(201,169,110,0.06)" : "#111", border: `1px solid ${isActive ? p.color : "rgba(255,255,255,0.05)"}`, borderRadius: 10, padding: "12px", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: p.color, marginBottom: 2 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: "#4a4035", marginBottom: 8 }}>komisyon: ₺{r.totalFees}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: netColor, fontFamily: "'Lora', serif" }}>{r.netMonthly.toLocaleString("tr-TR")}₺</div>
              <div style={{ fontSize: 11, color: "#6b6057" }}>/ay · %{r.margin} marj</div>
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {r.breakdown.map((b, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, padding: "1px 0", color: b.total ? "#c9a96e" : b.warn ? "#c9843a" : b.value < 0 ? "#c0503a" : "#6b6057" }}>
                    <span>{b.label}</span><span>{b.value > 0 ? "+" : ""}{Math.round(b.value).toLocaleString("tr-TR")}₺</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selected.size > 0 && (
        <div style={{ marginTop: 14, padding: "14px 16px", background: "rgba(201,169,110,0.07)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, color: "#8a7d6b" }}>Seçili platformlar toplam aylık net</div>
          <div style={{ fontFamily: "'Lora', serif", fontSize: 24, color: grandTotal >= 0 ? "#c9a96e" : "#c0503a" }}>{grandTotal.toLocaleString("tr-TR")}₺</div>
        </div>
      )}
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const handle = () => {
    const user = USERS.find(u => u.email === email && u.password === pass);
    if (user) onLogin(user); else setError("E-posta veya şifre hatalı.");
  };
  const inp = { width: "100%", padding: "10px 14px", background: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#f0ebe3", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "'Sora', sans-serif" };
  return (
    <div style={{ minHeight: "100vh", background: "#0f0e0b", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora', sans-serif", padding: 20 }}>
      <style>{FONT}</style>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontFamily: "'Lora', serif", fontSize: 28, color: "#f0ebe3", marginBottom: 8 }}>Eagle Glow</div>
          <div style={{ fontSize: 12, color: "#6b6057", letterSpacing: "0.15em", textTransform: "uppercase" }}>Danışmanlık Portalı</div>
        </div>
        <div style={{ background: "#1a1815", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 32 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, color: "#8a7d6b", marginBottom: 6 }}>E-POSTA</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="ornek@firma.com" style={inp} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 12, color: "#8a7d6b", marginBottom: 6 }}>ŞİFRE</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} placeholder="••••••••" style={inp} />
          </div>
          {error && <div style={{ fontSize: 13, color: "#e07070", marginBottom: 16 }}>{error}</div>}
          <button onClick={handle} style={{ width: "100%", padding: 12, background: "#c9a96e", border: "none", borderRadius: 8, color: "#0f0e0b", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Sora', sans-serif" }}>Giriş Yap</button>
          <div style={{ marginTop: 20, padding: "12px 14px", background: "rgba(255,255,255,0.03)", borderRadius: 8, fontSize: 12, color: "#6b6057", lineHeight: 1.7 }}>
            <div style={{ marginBottom: 4, color: "#8a7d6b" }}>Test hesapları:</div>
            <div>Admin: behzat@eagleglow.com / admin123</div>
            <div>Müşteri: ahmet@ornek.com / ahmet123</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN ────────────────────────────────────────────────────
function AdminPanel({ user, onLogout }) {
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [selected, setSelected] = useState(clients[0].id);
  const [tab, setTab] = useState("services");
  const [showAddAction, setShowAddAction] = useState(false);
  const [newAction, setNewAction] = useState({ title: "", detail: "", urgent: false });
  const [showAddClient, setShowAddClient] = useState(false);
  const [addClientStep, setAddClientStep] = useState(1);

  const client = clients.find(c => c.id === selected);

  const updateClient = (id, updater) => setClients(prev => prev.map(c => c.id === id ? updater(c) : c));

  const toggleServiceStatus = (sId) => {
    updateClient(client.id, c => ({
      ...c,
      services: c.services.map(s => s.id === sId ? {
        ...s, status: s.status === "pending" ? "in_progress" : s.status === "in_progress" ? "done" : "pending"
      } : s)
    }));
  };

  const addAction = () => {
    if (!newAction.title) return;
    updateClient(client.id, c => ({ ...c, actions: [...c.actions, { id: Date.now().toString(), ...newAction, status: "pending" }] }));
    setNewAction({ title: "", detail: "", urgent: false });
    setShowAddAction(false);
  };

  const inp = (extra = {}) => ({ width: "100%", padding: "9px 12px", background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 7, color: "#f0ebe3", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "'Sora', sans-serif", ...extra });

  return (
    <div style={{ minHeight: "100vh", background: "#0f0e0b", fontFamily: "'Sora', sans-serif" }}>
      <style>{FONT}</style>
      {/* Topbar */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "'Lora', serif", fontSize: 18, color: "#c9a96e" }}>Eagle Glow</span>
          <span style={{ fontSize: 11, color: "#3a3028", letterSpacing: "0.12em" }}>ADMIN</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#6b6057" }}>{user.name}</span>
          <button onClick={onLogout} style={{ fontSize: 12, color: "#6b6057", background: "none", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontFamily: "'Sora', sans-serif" }}>Çıkış</button>
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 56px)" }}>
        {/* Sidebar */}
        <div style={{ width: 240, borderRight: "1px solid rgba(255,255,255,0.06)", padding: 16, overflowY: "auto", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: "#4a4035", letterSpacing: "0.1em", textTransform: "uppercase" }}>Müşteriler</span>
            <button onClick={() => { setShowAddClient(true); setAddClientStep(1); }} style={{ fontSize: 20, color: "#c9a96e", background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}>+</button>
          </div>
          {clients.map(c => (
            <div key={c.id} onClick={() => setSelected(c.id)} style={{ padding: "12px 14px", borderRadius: 10, marginBottom: 6, cursor: "pointer", background: selected === c.id ? "rgba(201,169,110,0.08)" : "transparent", border: selected === c.id ? "1px solid rgba(201,169,110,0.2)" : "1px solid transparent" }}>
              <div style={{ fontSize: 14, color: selected === c.id ? "#f0ebe3" : "#8a7d6b", fontWeight: selected === c.id ? 500 : 400, marginBottom: 2 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: "#4a4035" }}>{c.company}</div>
              <div style={{ marginTop: 8 }}><ProgressBar value={c.progress} /></div>
              <div style={{ fontSize: 11, color: "#6b6057", marginTop: 3 }}>%{c.progress} tamamlandı</div>
            </div>
          ))}

          {/* Add client modal */}
          {showAddClient && (
            <div style={{ marginTop: 12, background: "#1a1815", border: "1px solid rgba(201,169,110,0.2)", borderRadius: 12, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 13, color: "#c9a96e", fontWeight: 500 }}>
                  {addClientStep === 1 ? "Yeni müşteri" : "Gelir hesapla"}
                </div>
                <div style={{ fontSize: 11, color: "#4a4035" }}>{addClientStep}/2</div>
              </div>

              {addClientStep === 1 && (
                <div>
                  {["Ad Soyad", "Firma adı", "E-posta"].map(ph => (
                    <input key={ph} placeholder={ph} style={{ ...inp(), marginBottom: 8 }} />
                  ))}
                  <select style={{ ...inp(), marginBottom: 8, appearance: "none" }}>
                    <option>Starter Pack</option>
                    <option>Growth Pack</option>
                    <option>Full Brand Pack</option>
                  </select>
                  <button onClick={() => setAddClientStep(2)} style={{ width: "100%", padding: "8px", background: "#c9a96e", border: "none", borderRadius: 7, color: "#0f0e0b", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Sora', sans-serif" }}>
                    Devam → Gelir Hesapla
                  </button>
                </div>
              )}

              {addClientStep === 2 && (
                <div>
                  <div style={{ fontSize: 12, color: "#6b6057", marginBottom: 12, lineHeight: 1.5 }}>Müşterinin ürün bilgilerini gir, platforma göre potansiyel geliri göster.</div>
                  <Calculator />
                  <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                    <button onClick={() => { setShowAddClient(false); setAddClientStep(1); }} style={{ flex: 1, padding: "8px", background: "#c9a96e", border: "none", borderRadius: 7, color: "#0f0e0b", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Sora', sans-serif" }}>Müşteriyi Ekle</button>
                    <button onClick={() => setAddClientStep(1)} style={{ padding: "8px 12px", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 7, color: "#6b6057", fontSize: 13, cursor: "pointer", fontFamily: "'Sora', sans-serif" }}>← Geri</button>
                  </div>
                </div>
              )}

              <button onClick={() => setShowAddClient(false)} style={{ width: "100%", marginTop: 8, padding: "7px", background: "transparent", border: "none", color: "#4a4035", fontSize: 12, cursor: "pointer", fontFamily: "'Sora', sans-serif" }}>İptal</button>
            </div>
          )}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 24, color: "#f0ebe3", marginBottom: 4 }}>{client.name}</div>
              <div style={{ fontSize: 13, color: "#6b6057" }}>{client.company} · {client.email}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: "rgba(201,169,110,0.1)", color: client.packageColor, border: "1px solid rgba(201,169,110,0.2)" }}>{client.package}</span>
                {client.platforms.map(p => <span key={p} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: "rgba(255,255,255,0.04)", color: "#8a7d6b", border: "1px solid rgba(255,255,255,0.06)" }}>{p}</span>)}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "#4a4035", marginBottom: 6 }}>İlerleme</div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 32, color: "#c9a96e" }}>%{client.progress}</div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {[["services", "Hizmetler"], ["actions", "Aksiyonlar"], ["files", "Dosyalar"], ["calculator", "Gelir Hesapla"], ["notes", "Notlar"]].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} style={{ padding: "8px 16px", background: "none", border: "none", borderBottom: tab === id ? "2px solid #c9a96e" : "2px solid transparent", color: tab === id ? "#c9a96e" : "#6b6057", fontSize: 13, fontWeight: tab === id ? 500 : 400, cursor: "pointer", fontFamily: "'Sora', sans-serif", marginBottom: -1 }}>
                {label}
              </button>
            ))}
          </div>

          {tab === "services" && (
            <div>
              {client.services.map(s => (
                <div key={s.id} onClick={() => toggleServiceStatus(s.id)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "#1a1815", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, marginBottom: 8, cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.status === "done" ? "#2d7a5a" : s.status === "in_progress" ? "#a06000" : "#333", flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: s.status === "done" ? "#6b6057" : "#c9c4bc", textDecoration: s.status === "done" ? "line-through" : "none" }}>{s.title}</span>
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    {s.date !== "—" && <span style={{ fontSize: 12, color: "#4a4035" }}>{s.date}</span>}
                    <Badge status={s.status} />
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 12, color: "#4a4035", marginTop: 8 }}>* Durumu değiştirmek için tıkla</div>
            </div>
          )}

          {tab === "actions" && (
            <div>
              {client.actions.map(a => (
                <div key={a.id} style={{ padding: "16px 18px", background: "#1a1815", border: `1px solid ${a.urgent && a.status === "pending" ? "rgba(201,100,50,0.3)" : "rgba(255,255,255,0.05)"}`, borderRadius: 10, marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                        {a.urgent && a.status === "pending" && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "rgba(201,100,50,0.15)", color: "#d4704a", fontWeight: 600 }}>ACİL</span>}
                        <span style={{ fontSize: 14, color: a.status === "done" ? "#6b6057" : "#c9c4bc", fontWeight: 500, textDecoration: a.status === "done" ? "line-through" : "none" }}>{a.title}</span>
                      </div>
                      <div style={{ fontSize: 13, color: "#6b6057", lineHeight: 1.6 }}>{a.detail}</div>
                    </div>
                    <Badge status={a.status} />
                  </div>
                </div>
              ))}
              {showAddAction ? (
                <div style={{ padding: 18, background: "#1a1815", border: "1px solid rgba(201,169,110,0.2)", borderRadius: 10, marginTop: 12 }}>
                  <input value={newAction.title} onChange={e => setNewAction(p => ({ ...p, title: e.target.value }))} placeholder="Aksiyon başlığı" style={inp({ marginBottom: 10 })} />
                  <textarea value={newAction.detail} onChange={e => setNewAction(p => ({ ...p, detail: e.target.value }))} placeholder="Detay" rows={3} style={{ ...inp({ marginBottom: 10, resize: "vertical" }) }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <input type="checkbox" checked={newAction.urgent} onChange={e => setNewAction(p => ({ ...p, urgent: e.target.checked }))} />
                    <span style={{ fontSize: 13, color: "#8a7d6b" }}>Acil</span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={addAction} style={{ padding: "9px 20px", background: "#c9a96e", border: "none", borderRadius: 7, color: "#0f0e0b", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Sora', sans-serif" }}>Ekle</button>
                    <button onClick={() => setShowAddAction(false)} style={{ padding: "9px 16px", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 7, color: "#6b6057", fontSize: 13, cursor: "pointer", fontFamily: "'Sora', sans-serif" }}>İptal</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setShowAddAction(true)} style={{ marginTop: 12, padding: "10px 20px", background: "transparent", border: "1px dashed rgba(201,169,110,0.3)", borderRadius: 10, color: "#c9a96e", fontSize: 13, cursor: "pointer", fontFamily: "'Sora', sans-serif", width: "100%" }}>+ Yeni aksiyon ekle</button>
              )}
            </div>
          )}

          {tab === "files" && (
            <div>
              {client.files.map(f => (
                <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "#1a1815", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, marginBottom: 8 }}>
                  <FileIcon type={f.type} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: "#c9c4bc", marginBottom: 2 }}>{f.name}</div>
                    <div style={{ fontSize: 12, color: "#4a4035" }}>{f.size} · {f.date}</div>
                  </div>
                  <button style={{ fontSize: 12, padding: "6px 14px", background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: 7, color: "#c9a96e", cursor: "pointer", fontFamily: "'Sora', sans-serif" }}>İndir</button>
                </div>
              ))}
              <button style={{ marginTop: 12, padding: "10px 20px", background: "transparent", border: "1px dashed rgba(201,169,110,0.3)", borderRadius: 10, color: "#c9a96e", fontSize: 13, cursor: "pointer", fontFamily: "'Sora', sans-serif", width: "100%" }}>+ Dosya yükle</button>
            </div>
          )}

          {tab === "calculator" && (
            <div style={{ background: "#1a1815", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: 24 }}>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 18, color: "#f0ebe3", marginBottom: 4 }}>{client.name} — Gelir Tahmini</div>
              <Calculator />
            </div>
          )}

          {tab === "notes" && (
            <div>
              <textarea defaultValue={client.notes} rows={8} placeholder="Notlar..." style={{ width: "100%", padding: "14px 16px", background: "#1a1815", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, color: "#c9c4bc", fontSize: 14, lineHeight: 1.7, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "'Sora', sans-serif" }} />
              <button style={{ marginTop: 10, padding: "9px 20px", background: "#c9a96e", border: "none", borderRadius: 8, color: "#0f0e0b", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Sora', sans-serif" }}>Kaydet</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CLIENT PANEL ─────────────────────────────────────────────
function ClientPanel({ user, onLogout }) {
  const [client, setClient] = useState(INITIAL_CLIENTS.find(c => c.id === user.id) || INITIAL_CLIENTS[0]);
  const [tab, setTab] = useState("overview");

  const pendingActions = client.actions.filter(a => a.status === "pending");
  const urgentCount = pendingActions.filter(a => a.urgent).length;

  const completeAction = (id) => setClient(prev => ({ ...prev, actions: prev.actions.map(a => a.id === id ? { ...a, status: "done" } : a) }));

  return (
    <div style={{ minHeight: "100vh", background: "#0f0e0b", fontFamily: "'Sora', sans-serif" }}>
      <style>{FONT}</style>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <span style={{ fontFamily: "'Lora', serif", fontSize: 18, color: "#c9a96e" }}>Eagle Glow</span>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#6b6057" }}>{client.company}</span>
          <button onClick={onLogout} style={{ fontSize: 12, color: "#6b6057", background: "none", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontFamily: "'Sora', sans-serif" }}>Çıkış</button>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "28px 20px" }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: "'Lora', serif", fontSize: 26, color: "#f0ebe3", marginBottom: 4 }}>Merhaba, {user.name.split(" ")[0]}</div>
          <div style={{ fontSize: 13, color: "#6b6057" }}>{client.package} · {client.platforms.join(", ")}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 28 }}>
          {[
            { label: "İlerleme", value: `%${client.progress}`, sub: "tamamlandı" },
            { label: "Bekleyen Aksiyon", value: pendingActions.length, sub: urgentCount > 0 ? `${urgentCount} acil` : "aksiyon" },
            { label: "Tamamlanan", value: client.services.filter(s => s.status === "done").length, sub: `/ ${client.services.length} hizmet` },
            { label: "Dosyalar", value: client.files.length, sub: "hazır" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#1a1815", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, color: "#4a4035", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 28, color: "#c9a96e", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#6b6057", marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1a1815", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: "18px 20px", marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: "#8a7d6b" }}>Proje ilerlemesi</span>
            <span style={{ fontSize: 13, color: "#c9a96e" }}>%{client.progress}</span>
          </div>
          <ProgressBar value={client.progress} />
        </div>

        <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {[["overview", "Hizmetler"], ["actions", `Aksiyonlarım${pendingActions.length > 0 ? ` (${pendingActions.length})` : ""}`], ["files", "Dosyalar"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ padding: "8px 16px", background: "none", border: "none", borderBottom: tab === id ? "2px solid #c9a96e" : "2px solid transparent", color: tab === id ? "#c9a96e" : "#6b6057", fontSize: 13, fontWeight: tab === id ? 500 : 400, cursor: "pointer", fontFamily: "'Sora', sans-serif", marginBottom: -1 }}>
              {label}
            </button>
          ))}
        </div>

        {tab === "overview" && client.services.map(s => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "#1a1815", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.status === "done" ? "#2d7a5a" : s.status === "in_progress" ? "#a06000" : "#333", flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: s.status === "done" ? "#6b6057" : "#c9c4bc", textDecoration: s.status === "done" ? "line-through" : "none" }}>{s.title}</span>
            </div>
            <Badge status={s.status} />
          </div>
        ))}

        {tab === "actions" && (
          <div>
            {client.actions.map(a => (
              <div key={a.id} style={{ padding: "16px 18px", background: "#1a1815", border: `1px solid ${a.urgent && a.status === "pending" ? "rgba(201,100,50,0.25)" : "rgba(255,255,255,0.05)"}`, borderRadius: 10, marginBottom: 10, opacity: a.status === "done" ? 0.5 : 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                      {a.urgent && a.status === "pending" && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "rgba(201,100,50,0.15)", color: "#d4704a", fontWeight: 600 }}>ACİL</span>}
                      <span style={{ fontSize: 14, color: a.status === "done" ? "#6b6057" : "#f0ebe3", fontWeight: 500, textDecoration: a.status === "done" ? "line-through" : "none" }}>{a.title}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "#6b6057", lineHeight: 1.6 }}>{a.detail}</div>
                  </div>
                  {a.status === "pending" ? (
                    <button onClick={() => completeAction(a.id)} style={{ flexShrink: 0, padding: "7px 14px", background: "rgba(45,122,90,0.15)", border: "1px solid rgba(45,122,90,0.3)", borderRadius: 7, color: "#4a9e78", fontSize: 12, cursor: "pointer", fontFamily: "'Sora', sans-serif" }}>Tamamlandı ✓</button>
                  ) : <Badge status="done" />}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "files" && client.files.map(f => (
          <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "#1a1815", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, marginBottom: 8 }}>
            <FileIcon type={f.type} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: "#c9c4bc", marginBottom: 2 }}>{f.name}</div>
              <div style={{ fontSize: 12, color: "#4a4035" }}>{f.size} · {f.date}</div>
            </div>
            <button style={{ fontSize: 12, padding: "6px 14px", background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: 7, color: "#c9a96e", cursor: "pointer", fontFamily: "'Sora', sans-serif" }}>İndir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  if (!user) return <Login onLogin={setUser} />;
  if (user.role === "admin") return <AdminPanel user={user} onLogout={() => setUser(null)} />;
  return <ClientPanel user={user} onLogout={() => setUser(null)} />;
}
