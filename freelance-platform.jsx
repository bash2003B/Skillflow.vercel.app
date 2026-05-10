import { useState } from "react";

const COLORS = {
  bg: "#0a0a0f",
  surface: "#13131a",
  card: "#1a1a24",
  border: "#2a2a3a",
  accent: "#6c63ff",
  accentLight: "#8b83ff",
  accentGlow: "rgba(108,99,255,0.18)",
  gold: "#f5c842",
  text: "#f0eeff",
  muted: "#8888aa",
  success: "#3ecf8e",
  danger: "#ff5c5c",
};

const plans = [
  {
    name: "Starter",
    price: 9,
    color: COLORS.muted,
    features: ["Post up to 3 jobs/mo", "Browse 50 freelancers", "Basic support", "1 active contract"],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: 29,
    color: COLORS.accent,
    badge: "Most Popular",
    features: ["Unlimited job posts", "Browse all freelancers", "Priority support", "10 active contracts", "Escrow payments", "Analytics dashboard"],
    cta: "Go Pro",
  },
  {
    name: "Business",
    price: 79,
    color: COLORS.gold,
    features: ["Everything in Pro", "Dedicated account manager", "Custom contracts", "Team collaboration", "API access", "White-label option"],
    cta: "Scale Up",
  },
];

const categories = ["Design", "Development", "Writing", "Marketing", "Video", "Music", "Finance", "Admin"];

const freelancers = [
  { name: "Aria Chen", role: "UI/UX Designer", rate: 85, rating: 4.9, jobs: 142, avatar: "AC", color: "#e879f9" },
  { name: "Marcus Lee", role: "Full Stack Dev", rate: 120, rating: 5.0, jobs: 98, avatar: "ML", color: "#38bdf8" },
  { name: "Sofia Reyes", role: "Content Writer", rate: 55, rating: 4.8, jobs: 210, avatar: "SR", color: "#fb923c" },
  { name: "James Obi", role: "SEO Specialist", rate: 70, rating: 4.7, jobs: 167, avatar: "JO", color: COLORS.success },
  { name: "Luna Park", role: "Video Editor", rate: 90, rating: 4.9, jobs: 88, avatar: "LP", color: COLORS.gold },
  { name: "Dev Patel", role: "Mobile Dev", rate: 110, rating: 5.0, jobs: 73, avatar: "DP", color: "#f43f5e" },
];

// ---------- AUTH MODAL ----------
function AuthModal({ mode, onClose, onAuth }) {
  const [tab, setTab] = useState(mode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!email || !password) return;
    onAuth({ name: name || email.split("@")[0], email });
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(10,10,15,0.85)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{
        background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 20,
        padding: "40px 36px", width: 400, maxWidth: "90vw", position: "relative",
        boxShadow: `0 0 60px ${COLORS.accentGlow}`
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, background: "none",
          border: "none", color: COLORS.muted, fontSize: 22, cursor: "pointer"
        }}>×</button>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: COLORS.accent, fontWeight: 700 }}>
            SkillFlow
          </span>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: COLORS.surface, borderRadius: 10, padding: 4, marginBottom: 28 }}>
          {["login", "signup"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "10px 0", borderRadius: 8, border: "none", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
              background: tab === t ? COLORS.accent : "transparent",
              color: tab === t ? "#fff" : COLORS.muted, transition: "all 0.2s"
            }}>
              {t === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {tab === "signup" && (
            <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)}
              style={inputStyle} />
          )}
          <input placeholder="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)}
            style={inputStyle} />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}
            style={inputStyle} />
        </div>

        <button onClick={handleSubmit} style={{
          marginTop: 22, width: "100%", padding: "14px 0",
          background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
          border: "none", borderRadius: 10, color: "#fff", fontFamily: "'DM Sans', sans-serif",
          fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: 0.3
        }}>
          {tab === "login" ? "Log In" : "Create Account"}
        </button>

        <p style={{ textAlign: "center", color: COLORS.muted, fontSize: 12, marginTop: 18 }}>
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 10,
  padding: "13px 16px", color: COLORS.text, fontFamily: "'DM Sans', sans-serif",
  fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box"
};

// ---------- PAYMENT MODAL ----------
function PaymentModal({ plan, onClose, onPay }) {
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paid, setPaid] = useState(false);

  const handlePay = () => {
    if (!card || !expiry || !cvv) return;
    setPaid(true);
    setTimeout(() => { onPay(plan); onClose(); }, 1800);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(10,10,15,0.85)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{
        background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 20,
        padding: "40px 36px", width: 420, maxWidth: "90vw", position: "relative",
        boxShadow: `0 0 60px ${COLORS.accentGlow}`
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, background: "none",
          border: "none", color: COLORS.muted, fontSize: 22, cursor: "pointer"
        }}>×</button>

        {paid ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <h2 style={{ color: COLORS.success, fontFamily: "'Playfair Display', serif", marginBottom: 8 }}>Payment Successful!</h2>
            <p style={{ color: COLORS.muted, fontFamily: "'DM Sans', sans-serif" }}>
              You're now on the <strong style={{ color: COLORS.text }}>{plan.name}</strong> plan.
            </p>
          </div>
        ) : (
          <>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: COLORS.text, marginBottom: 4 }}>
              Subscribe to {plan.name}
            </h2>
            <p style={{ color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", fontSize: 14, marginBottom: 24 }}>
              ${plan.price}/month · Cancel anytime
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input placeholder="Card number (e.g. 4242 4242 4242 4242)" value={card}
                onChange={e => setCard(e.target.value)} style={inputStyle} />
              <div style={{ display: "flex", gap: 12 }}>
                <input placeholder="MM/YY" value={expiry} onChange={e => setExpiry(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }} />
                <input placeholder="CVV" value={cvv} onChange={e => setCvv(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }} />
              </div>
            </div>

            <div style={{
              marginTop: 20, background: COLORS.surface, borderRadius: 10, padding: "14px 16px",
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <span style={{ color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>Total due today</span>
              <span style={{ color: COLORS.text, fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700 }}>
                ${plan.price}.00
              </span>
            </div>

            <button onClick={handlePay} style={{
              marginTop: 18, width: "100%", padding: "14px 0",
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
              border: "none", borderRadius: 10, color: "#fff",
              fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer"
            }}>
              Pay ${plan.price}/mo
            </button>

            <p style={{ textAlign: "center", color: COLORS.muted, fontSize: 12, marginTop: 14 }}>
              🔒 Secured by 256-bit SSL encryption
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ---------- MAIN APP ----------
export default function App() {
  const [page, setPage] = useState("home");
  const [authModal, setAuthModal] = useState(null);
  const [payModal, setPayModal] = useState(null);
  const [user, setUser] = useState(null);
  const [activePlan, setActivePlan] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Design");

  const filteredFreelancers = freelancers;

  const navItems = ["home", "browse", "pricing", ...(user ? ["dashboard"] : [])];

  return (
    <div style={{
      minHeight: "100vh", background: COLORS.bg, color: COLORS.text,
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 3px; }
        button { transition: all 0.18s; }
        button:hover { filter: brightness(1.12); transform: translateY(-1px); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        @keyframes pulse { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,10,15,0.85)", backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${COLORS.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: 64
      }}>
        <span onClick={() => setPage("home")} style={{
          fontFamily: "'Playfair Display', serif", fontSize: 22,
          color: COLORS.accent, fontWeight: 700, cursor: "pointer", letterSpacing: -0.5
        }}>
          SkillFlow
        </span>

        <div style={{ display: "flex", gap: 6 }}>
          {navItems.map(p => (
            <button key={p} onClick={() => setPage(p)} style={{
              padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer",
              background: page === p ? COLORS.accentGlow : "transparent",
              color: page === p ? COLORS.accentLight : COLORS.muted,
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
              textTransform: "capitalize"
            }}>
              {p}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {activePlan && (
                <span style={{
                  background: COLORS.accentGlow, color: COLORS.accentLight,
                  border: `1px solid ${COLORS.accent}`, borderRadius: 20,
                  padding: "4px 12px", fontSize: 12, fontWeight: 600
                }}>
                  {activePlan.name} Plan
                </span>
              )}
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 13, cursor: "pointer"
              }} onClick={() => setPage("dashboard")}>
                {user.name[0].toUpperCase()}
              </div>
              <button onClick={() => { setUser(null); setActivePlan(null); setPage("home"); }} style={{
                padding: "8px 16px", borderRadius: 8, border: `1px solid ${COLORS.border}`,
                background: "transparent", color: COLORS.muted, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 13
              }}>
                Log out
              </button>
            </div>
          ) : (
            <>
              <button onClick={() => setAuthModal("login")} style={{
                padding: "9px 20px", borderRadius: 8, border: `1px solid ${COLORS.border}`,
                background: "transparent", color: COLORS.text, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500
              }}>Log In</button>
              <button onClick={() => setAuthModal("signup")} style={{
                padding: "9px 20px", borderRadius: 8, border: "none",
                background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
                color: "#fff", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600
              }}>Sign Up</button>
            </>
          )}
        </div>
      </nav>

      {/* ===== HOME PAGE ===== */}
      {page === "home" && (
        <div>
          {/* Hero */}
          <div style={{
            minHeight: "88vh", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", textAlign: "center",
            padding: "80px 24px", position: "relative", overflow: "hidden"
          }}>
            {/* Glow orbs */}
            <div style={{
              position: "absolute", top: "20%", left: "15%", width: 400, height: 400,
              borderRadius: "50%", background: "rgba(108,99,255,0.09)", filter: "blur(80px)",
              animation: "float 6s ease-in-out infinite"
            }} />
            <div style={{
              position: "absolute", bottom: "20%", right: "15%", width: 300, height: 300,
              borderRadius: "50%", background: "rgba(245,200,66,0.07)", filter: "blur(60px)",
              animation: "float 8s ease-in-out infinite 2s"
            }} />

            <div style={{
              display: "inline-block", background: COLORS.accentGlow, border: `1px solid ${COLORS.accent}`,
              borderRadius: 20, padding: "6px 18px", marginBottom: 28,
              color: COLORS.accentLight, fontSize: 13, fontWeight: 600,
              animation: "pulse 3s ease-in-out infinite"
            }}>
              ✦ The freelance platform that pays you monthly
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(42px, 7vw, 88px)", fontWeight: 900,
              lineHeight: 1.08, marginBottom: 24, maxWidth: 820,
              animation: "fadeUp 0.8s ease both"
            }}>
              Hire any skill.<br />
              <span style={{
                background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.gold})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>
                Pay once. Grow always.
              </span>
            </h1>

            <p style={{
              color: COLORS.muted, fontSize: 18, maxWidth: 520, lineHeight: 1.7,
              marginBottom: 40, animation: "fadeUp 0.8s 0.2s ease both", opacity: 0,
              animationFillMode: "forwards"
            }}>
              SkillFlow connects you with top freelancers across every skill. One subscription,
              unlimited possibilities.
            </p>

            <div style={{
              display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center",
              animation: "fadeUp 0.8s 0.4s ease both", opacity: 0, animationFillMode: "forwards"
            }}>
              <button onClick={() => { setPage("browse"); }} style={{
                padding: "16px 36px", borderRadius: 12,
                background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
                border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer",
                boxShadow: `0 8px 32px ${COLORS.accentGlow}`
              }}>
                Browse Freelancers →
              </button>
              <button onClick={() => setPage("pricing")} style={{
                padding: "16px 36px", borderRadius: 12, border: `1px solid ${COLORS.border}`,
                background: "transparent", color: COLORS.text, fontSize: 16, fontWeight: 600, cursor: "pointer"
              }}>
                View Pricing
              </button>
            </div>

            {/* Stats */}
            <div style={{
              display: "flex", gap: 60, marginTop: 72, flexWrap: "wrap", justifyContent: "center",
              animation: "fadeUp 0.8s 0.6s ease both", opacity: 0, animationFillMode: "forwards"
            }}>
              {[["12,000+", "Freelancers"], ["98%", "Satisfaction"], ["$0", "Hidden Fees"]].map(([n, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: COLORS.accent }}>{n}</div>
                  <div style={{ color: COLORS.muted, fontSize: 14, marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Pills */}
          <div style={{ padding: "60px 40px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, marginBottom: 32 }}>
              Every skill you need
            </h2>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              {categories.map(c => (
                <button key={c} onClick={() => { setActiveCategory(c); setPage("browse"); }} style={{
                  padding: "12px 24px", borderRadius: 40, border: `1px solid ${COLORS.border}`,
                  background: COLORS.surface, color: COLORS.text, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500
                }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== BROWSE PAGE ===== */}
      {page === "browse" && (
        <div style={{ padding: "60px 40px", maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, marginBottom: 8 }}>Browse Freelancers</h2>
          <p style={{ color: COLORS.muted, marginBottom: 32 }}>Find the perfect expert for any job</p>

          {/* Category filter */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)} style={{
                padding: "8px 20px", borderRadius: 30, border: `1px solid ${activeCategory === c ? COLORS.accent : COLORS.border}`,
                background: activeCategory === c ? COLORS.accentGlow : "transparent",
                color: activeCategory === c ? COLORS.accentLight : COLORS.muted,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500
              }}>
                {c}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {filteredFreelancers.map(f => (
              <div key={f.name} style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16,
                padding: 24, transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${COLORS.accentGlow}`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${f.color}44, ${f.color})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: 16, color: "#fff"
                  }}>{f.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{f.name}</div>
                    <div style={{ color: COLORS.muted, fontSize: 13 }}>{f.role}</div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ color: COLORS.gold, fontSize: 13 }}>★ {f.rating}</span>
                    <span style={{ color: COLORS.muted, fontSize: 12, marginLeft: 8 }}>({f.jobs} jobs)</span>
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: COLORS.accent }}>
                    ${f.rate}<span style={{ fontSize: 12, color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>/hr</span>
                  </div>
                </div>
                <button onClick={() => user ? null : setAuthModal("signup")} style={{
                  marginTop: 16, width: "100%", padding: "11px 0", borderRadius: 10,
                  border: `1px solid ${COLORS.accent}`, background: "transparent",
                  color: COLORS.accentLight, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600
                }}>
                  {user ? "Hire Now" : "Sign up to Hire"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== PRICING PAGE ===== */}
      {page === "pricing" && (
        <div style={{ padding: "80px 40px", maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, marginBottom: 12 }}>
            Simple, transparent pricing
          </h2>
          <p style={{ color: COLORS.muted, fontSize: 17, marginBottom: 56 }}>
            One flat subscription. No commissions. No surprises.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {plans.map(plan => (
              <div key={plan.name} style={{
                background: plan.name === "Pro" ? `linear-gradient(160deg, ${COLORS.card}, #1e1a33)` : COLORS.card,
                border: `1px solid ${plan.name === "Pro" ? COLORS.accent : COLORS.border}`,
                borderRadius: 20, padding: 32, position: "relative", textAlign: "left",
                boxShadow: plan.name === "Pro" ? `0 0 40px ${COLORS.accentGlow}` : "none",
                transform: plan.name === "Pro" ? "scale(1.04)" : "none"
              }}>
                {plan.badge && (
                  <div style={{
                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                    background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentLight})`,
                    color: "#fff", padding: "4px 18px", borderRadius: 20,
                    fontSize: 12, fontWeight: 700, whiteSpace: "nowrap"
                  }}>{plan.badge}</div>
                )}
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, marginBottom: 6, color: plan.color }}>
                  {plan.name}
                </div>
                <div style={{ fontSize: 46, fontWeight: 900, fontFamily: "'Playfair Display', serif", marginBottom: 4 }}>
                  ${plan.price}
                  <span style={{ fontSize: 16, color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>/mo</span>
                </div>
                <div style={{ height: 1, background: COLORS.border, margin: "20px 0" }} />
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: COLORS.muted }}>
                      <span style={{ color: COLORS.success, fontSize: 16 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => {
                  if (!user) { setAuthModal("signup"); }
                  else { setPayModal(plan); }
                }} style={{
                  width: "100%", padding: "13px 0", borderRadius: 10, border: "none", cursor: "pointer",
                  background: plan.name === "Pro"
                    ? `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`
                    : COLORS.surface,
                  color: plan.name === "Pro" ? "#fff" : COLORS.text,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700
                }}>
                  {activePlan?.name === plan.name ? "✓ Current Plan" : plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== DASHBOARD ===== */}
      {page === "dashboard" && user && (
        <div style={{ padding: "60px 40px", maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38 }}>
              Welcome back, {user.name} 👋
            </h2>
            <p style={{ color: COLORS.muted, marginTop: 6 }}>{user.email}</p>
          </div>

          {/* Plan status */}
          <div style={{
            background: COLORS.card, border: `1px solid ${activePlan ? COLORS.accent : COLORS.border}`,
            borderRadius: 16, padding: 28, marginBottom: 28,
            boxShadow: activePlan ? `0 0 30px ${COLORS.accentGlow}` : "none"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 6 }}>Current Plan</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700 }}>
                  {activePlan ? activePlan.name : "Free"}
                </div>
                {activePlan && (
                  <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 4 }}>
                    ${activePlan.price}/month · Renews June 10, 2026
                  </div>
                )}
              </div>
              <button onClick={() => setPage("pricing")} style={{
                padding: "12px 24px", borderRadius: 10, border: `1px solid ${COLORS.accent}`,
                background: "transparent", color: COLORS.accentLight, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600
              }}>
                {activePlan ? "Manage Plan" : "Upgrade Now →"}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
            {[
              { label: "Active Contracts", value: activePlan ? "3" : "0", icon: "📋" },
              { label: "Total Spent", value: activePlan ? `$${activePlan.price}` : "$0", icon: "💳" },
              { label: "Freelancers Hired", value: activePlan ? "2" : "0", icon: "🧑‍💻" },
              { label: "Jobs Completed", value: activePlan ? "5" : "0", icon: "✅" },
            ].map(s => (
              <div key={s.label} style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: 14, padding: "22px 20px"
              }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700 }}>{s.value}</div>
                <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {!activePlan && (
            <div style={{
              background: COLORS.accentGlow, border: `1px solid ${COLORS.accent}`,
              borderRadius: 14, padding: 24, textAlign: "center"
            }}>
              <p style={{ color: COLORS.accentLight, fontWeight: 600, marginBottom: 12 }}>
                You don't have an active subscription yet.
              </p>
              <button onClick={() => setPage("pricing")} style={{
                padding: "12px 28px", borderRadius: 10, border: "none",
                background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
                color: "#fff", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 700
              }}>
                Choose a Plan
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODALS */}
      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onAuth={(u) => { setUser(u); setAuthModal(null); setPage("dashboard"); }}
        />
      )}
      {payModal && (
        <PaymentModal
          plan={payModal}
          onClose={() => setPayModal(null)}
          onPay={(p) => setActivePlan(p)}
        />
      )}
    </div>
  );
}
