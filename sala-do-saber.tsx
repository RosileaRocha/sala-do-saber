import { useState, useEffect } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://kevwjouvkpjwtenzpcoz.supabase.co";
const SUPABASE_KEY = "sb_publishable_mqFB2UXdZOyAVQFS1O_EHw_uGiykMiH";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const NIVEIS = ["Ensino Fundamental I", "Ensino Fundamental II", "Ensino Médio"];
const TIPOS = [
  { id: "multipla", label: "Múltipla Escolha", icon: "☑️" },
  { id: "dissertativa", label: "Dissertativa", icon: "✍️" },
  { id: "pratica", label: "Atividade Prática", icon: "🔬" },
  { id: "redacao", label: "Redação / Texto", icon: "📝" },
];
const DIFICULDADES = ["Fácil", "Médio", "Difícil"];

const seriesPorNivel = {
  "Ensino Fundamental I": ["1º Ano", "2º Ano", "3º Ano", "4º Ano", "5º Ano"],
  "Ensino Fundamental II": ["6º Ano", "7º Ano", "8º Ano", "9º Ano"],
  "Ensino Médio": ["1ª Série", "2ª Série", "3ª Série"],
};

// ─── ESTILOS ────────────────────────────────────────────────────────────────
const inputStyle = {
  width: "100%", padding: "10px 12px", borderRadius: 9,
  border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.08)",
  color: "#fff", fontSize: 13, outline: "none", boxSizing: "border-box",
};
const selectStyle = { ...inputStyle };
const btnPrimary = {
  width: "100%", padding: "14px", borderRadius: 12, border: "none",
  background: "linear-gradient(135deg, #f59e0b, #ef4444)",
  color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
  boxShadow: "0 4px 20px rgba(245,158,11,0.4)",
};
const btnSecondary = {
  width: "100%", padding: "12px", borderRadius: 12,
  border: "2px solid rgba(255,255,255,0.25)", background: "transparent",
  color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 10,
};
const cardStyle = {
  background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)",
  borderRadius: 16, border: "1px solid rgba(255,255,255,0.12)", padding: "20px 22px",
};

// ─── COMPONENTES AUXILIARES ──────────────────────────────────────────────────
function Card({ title, children }) {
  return (
    <div style={cardStyle}>
      {title && <h3 style={{ color: "#fff", margin: "0 0 16px", fontSize: 15, fontWeight: 600 }}>{title}</h3>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>
    </div>
  );
}
function Field({ label, children }) {
  return (
    <div>
      <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.4 }}>{label}</label>
      {children}
    </div>
  );
}
function Toggle({ label, checked, onChange }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
      <div onClick={() => onChange(!checked)} style={{ width: 40, height: 22, borderRadius: 11, background: checked ? "#22c55e" : "rgba(255,255,255,0.2)", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
        <div style={{ position: "absolute", top: 3, left: checked ? 20 : 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
      </div>
      <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{label}</span>
    </label>
  );
}

// ─── TELA DE LOGIN ───────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErro(""); setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) {
      setErro("E-mail ou senha incorretos. Verifique seus dados.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1e3a5f 0%, #2d6a9f 50%, #1a8c6e 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg, #f59e0b, #ef4444)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 16px" }}>🎓</div>
          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: 0 }}>Sala do Saber</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", marginTop: 6, fontSize: 14 }}>Gerador de Atividades com Inteligência Artificial</p>
        </div>

        <Card>
          <Field label="E-mail">
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="seu@email.com" style={inputStyle} />
          </Field>
          <Field label="Senha">
            <input value={senha} onChange={e => setSenha(e.target.value)} type="password" placeholder="••••••••" style={inputStyle} onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </Field>
          {erro && <p style={{ color: "#f87171", fontSize: 13, margin: 0, textAlign: "center" }}>⚠️ {erro}</p>}
          <button onClick={handleLogin} disabled={loading || !email || !senha} style={{ ...btnPrimary, opacity: loading || !email || !senha ? 0.6 : 1, marginTop: 4 }}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </Card>

        {/* Planos */}
        <div style={{ marginTop: 28 }}>
          <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", fontSize: 13, marginBottom: 16 }}>Ainda não tem acesso? Escolha um plano:</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <PlanCard tipo="Mensal" preco="R$ 39,90" periodo="/mês" destaque={false} />
            <PlanCard tipo="Anual" preco="R$ 247" periodo="/ano" destaque={true} economia="Economize 48%" />
          </div>
          <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", fontSize: 11, marginTop: 14 }}>
            Após o pagamento, você receberá seu acesso por e-mail em até 24h.
          </p>
        </div>
      </div>
    </div>
  );
}

function PlanCard({ tipo, preco, periodo, destaque, economia }) {
  return (
    <div style={{ background: destaque ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.07)", border: `2px solid ${destaque ? "#f59e0b" : "rgba(255,255,255,0.15)"}`, borderRadius: 14, padding: "16px 14px", textAlign: "center", position: "relative" }}>
      {economia && <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "#f59e0b", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>{economia}</div>}
      <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{tipo}</div>
      <div style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>{preco}</div>
      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>{periodo}</div>
    </div>
  );
}

// ─── APP PRINCIPAL ───────────────────────────────────────────────────────────
function AppPrincipal({ user, onLogout }) {
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    nivel: "", serie: "", disciplina: "", tema: "", contexto: "",
    tipo: "", dificuldade: "Médio", qtdQuestoes: 5,
    areaConhecimento: "", objetivos: "", observacoes: "",
    includeBNCC: false, includeGabarito: true,
  });

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }));
  const isFormValid = form.nivel && form.serie && form.disciplina && form.tema && form.tipo;

  const buildPrompt = () => {
    const tipoLabel = TIPOS.find(t => t.id === form.tipo)?.label || form.tipo;
    return `Você é um especialista em educação brasileira. Crie uma ${tipoLabel} completa:
- Nível: ${form.nivel} - ${form.serie}
- Disciplina: ${form.disciplina}
- Tema: ${form.tema}
${form.contexto ? `- Contexto: ${form.contexto}` : ""}
- Dificuldade: ${form.dificuldade}
${form.tipo === "multipla" || form.tipo === "dissertativa" ? `- Questões: ${form.qtdQuestoes}` : ""}
${form.objetivos ? `- Objetivos: ${form.objetivos}` : ""}
${form.observacoes ? `- Observações: ${form.observacoes}` : ""}
${form.includeBNCC ? "- Inclua habilidades da BNCC" : ""}
${form.includeGabarito ? "- Inclua gabarito ao final" : "- Sem gabarito"}
${form.tipo === "multipla" ? "- 4 alternativas (A, B, C, D) por questão" : ""}
${form.tipo === "redacao" ? "- Inclua textos motivadores e proposta completa" : ""}
${form.tipo === "pratica" ? "- Inclua materiais, procedimentos e questões de análise" : ""}
A atividade deve ser contextualizada, com linguagem adequada ao nível, título atrativo e pronta para impressão.`;
  };

  const gerarAtividade = async () => {
    setLoading(true); setStep("result"); setResult("");
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: buildPrompt() }],
        }),
      });
      const data = await response.json();
      setResult(data.content?.map(c => c.text || "").join("\n") || "Erro ao gerar.");
    } catch { setResult("❌ Erro ao conectar com a IA. Tente novamente."); }
    finally { setLoading(false); }
  };

  const handleCopy = () => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handlePrint = () => {
    const win = window.open("", "_blank");
    win.document.write(`<html><head><title>Sala do Saber</title><style>body{font-family:Arial,sans-serif;padding:30px;max-width:800px;margin:auto;line-height:1.7}pre{white-space:pre-wrap;font-family:inherit}</style></head><body><pre>${result}</pre></body></html>`);
    win.document.close(); win.print();
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1e3a5f 0%, #2d6a9f 50%, #1a8c6e 100%)", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.15)", padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 11, background: "linear-gradient(135deg, #f59e0b, #ef4444)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎓</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 17 }}>Sala do Saber</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>{user?.email}</div>
        </div>
        {step === "result" && (
          <button onClick={() => { setStep("form"); setResult(""); }} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 13 }}>← Nova</button>
        )}
        <button onClick={onLogout} style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 13 }}>Sair</button>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 20px" }}>
        {step === "form" && (
          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: 0 }}>Criar Atividade Personalizada</h2>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, marginTop: 4 }}>Preencha as informações e a IA gera a atividade completa</p>
            </div>

            <Card title="📚 Informações Básicas">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Field label="Nível de Ensino *">
                  <select value={form.nivel} onChange={e => { update("nivel", e.target.value); update("serie", ""); }} style={selectStyle}>
                    <option value="">Selecione...</option>
                    {NIVEIS.map(n => <option key={n}>{n}</option>)}
                  </select>
                </Field>
                <Field label="Série / Ano *">
                  <select value={form.serie} onChange={e => update("serie", e.target.value)} style={selectStyle} disabled={!form.nivel}>
                    <option value="">Selecione...</option>
                    {(seriesPorNivel[form.nivel] || []).map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Disciplina *">
                <input value={form.disciplina} onChange={e => update("disciplina", e.target.value)} placeholder="Ex: Matemática, Português, Ciências..." style={inputStyle} />
              </Field>
              <Field label="Tema / Conteúdo *">
                <input value={form.tema} onChange={e => update("tema", e.target.value)} placeholder="Ex: Frações, Interpretação de Texto, Revolução Industrial..." style={inputStyle} />
              </Field>
              <Field label="Contexto / Situação-problema (opcional)">
                <textarea value={form.contexto} onChange={e => update("contexto", e.target.value)} placeholder="Descreva uma situação real para contextualizar a atividade..." rows={3} style={{ ...inputStyle, resize: "vertical" }} />
              </Field>
            </Card>

            <Card title="⚙️ Tipo e Configurações">
              <Field label="Tipo de Atividade *">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {TIPOS.map(t => (
                    <button key={t.id} onClick={() => update("tipo", t.id)} style={{ padding: "12px 10px", borderRadius: 10, border: `2px solid ${form.tipo === t.id ? "#f59e0b" : "rgba(255,255,255,0.15)"}`, background: form.tipo === t.id ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.05)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: form.tipo === t.id ? 600 : 400 }}>
                      {t.icon} {t.label}
                    </button>
                  ))}
                </div>
              </Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Field label="Dificuldade">
                  <div style={{ display: "flex", gap: 8 }}>
                    {DIFICULDADES.map(d => (
                      <button key={d} onClick={() => update("dificuldade", d)} style={{ flex: 1, padding: "8px 4px", borderRadius: 8, border: `2px solid ${form.dificuldade === d ? "#22c55e" : "rgba(255,255,255,0.15)"}`, background: form.dificuldade === d ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.05)", color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: form.dificuldade === d ? 700 : 400 }}>
                        {d}
                      </button>
                    ))}
                  </div>
                </Field>
                {(form.tipo === "multipla" || form.tipo === "dissertativa") && (
                  <Field label="Nº de Questões">
                    <input type="number" min={1} max={20} value={form.qtdQuestoes} onChange={e => update("qtdQuestoes", Number(e.target.value))} style={inputStyle} />
                  </Field>
                )}
              </div>
            </Card>

            <Card title="🎯 Objetivos e Personalização">
              <Field label="Objetivos de Aprendizagem">
                <textarea value={form.objetivos} onChange={e => update("objetivos", e.target.value)} placeholder="Ex: Desenvolver raciocínio lógico, interpretar gráficos..." rows={2} style={{ ...inputStyle, resize: "vertical" }} />
              </Field>
              <Field label="Observações Especiais">
                <textarea value={form.observacoes} onChange={e => update("observacoes", e.target.value)} placeholder="Ex: Linguagem simples, adaptar para necessidades especiais..." rows={2} style={{ ...inputStyle, resize: "vertical" }} />
              </Field>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                <Toggle label="Incluir habilidades da BNCC" checked={form.includeBNCC} onChange={v => update("includeBNCC", v)} />
                <Toggle label="Incluir gabarito / resposta" checked={form.includeGabarito} onChange={v => update("includeGabarito", v)} />
              </div>
            </Card>

            <button onClick={gerarAtividade} disabled={!isFormValid} style={{ ...btnPrimary, opacity: isFormValid ? 1 : 0.5, cursor: isFormValid ? "pointer" : "not-allowed" }}>
              ✨ Gerar Atividade com IA
            </button>
            {!isFormValid && <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: -12 }}>* Preencha os campos obrigatórios</p>}
          </div>
        )}

        {step === "result" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <h2 style={{ color: "#fff", margin: 0, fontSize: 18 }}>✅ Atividade Gerada</h2>
                <p style={{ color: "rgba(255,255,255,0.5)", margin: "3px 0 0", fontSize: 12 }}>{form.nivel} • {form.serie} • {form.disciplina}</p>
              </div>
              {!loading && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={handleCopy} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", background: copied ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer", fontSize: 13 }}>{copied ? "✅ Copiado!" : "📋 Copiar"}</button>
                  <button onClick={handlePrint} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer", fontSize: 13 }}>🖨️ Imprimir</button>
                </div>
              )}
            </div>
            <div style={{ background: "rgba(255,255,255,0.97)", borderRadius: 16, padding: 28, minHeight: 300, boxShadow: "0 8px 40px rgba(0,0,0,0.3)" }}>
              {loading ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 260, gap: 16 }}>
                  <div style={{ width: 48, height: 48, border: "4px solid #e5e7eb", borderTop: "4px solid #2d6a9f", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  <p style={{ color: "#6b7280", fontSize: 14 }}>Gerando sua atividade...</p>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
              ) : (
                <pre style={{ whiteSpace: "pre-wrap", fontFamily: "'Segoe UI', sans-serif", fontSize: 14, lineHeight: 1.7, color: "#1f2937", margin: 0 }}>{result}</pre>
              )}
            </div>
            {!loading && <button onClick={() => { setStep("form"); setResult(""); }} style={btnSecondary}>← Criar Nova Atividade</button>}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setChecking(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1e3a5f, #2d6a9f, #1a8c6e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 56, height: 56, border: "4px solid rgba(255,255,255,0.2)", borderTop: "4px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>Carregando...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return user ? <AppPrincipal user={user} onLogout={handleLogout} /> : <LoginScreen />;
}
