import { useState, useRef, useEffect } from "react";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";

const translations = {
  kr: {
    badge: "SANKTYÈ • LAPÈ • SAJÈS",
    title1: "KONSEY",
    title2: "ESPIRITYÈL",
    subtitle: "Yon espas prive kote ou ka pale san pè, san jijman.",
    explainer: "Ekri sa ki sou kè w — ou pral resevwa yon repons ki pote sajès, lapè, ak direksyon pou ede w jwenn limyè nan moman difisil yo.",
    comfortLine: "Ou pa pou kont ou.",
    label: "Kisa k ap pase nan lespri w?",
    helperText: "Sa rete ant ou menm ak Bondye.",
    placeholder: "Mwen la pou m koute w...",
    sendButton: "CHÈCHE LAPÈ",
    loadingButton: "M AP KOUTE...",
    responseHeader: "Yon pawòl pou ou",
    placeholderBox: "Repons ou ap parèt isit la avèk dousè ak sajès.",
    footer: "LAFWA • LAPÈ • SAJÈS",
    upgradeButton: "✨ Vin yon manm Lafwa — $7/mwa",
    paidBadge: "✨ Manm Lafwa",
    signIn: "Konekte",
    signOut: "Dekonekte",
    freeLimit: "Ou rive nan limit gratis la (5 mesaj). Vin yon manm Lafwa pou $7/mwa pou pale san limit. 🙏",
    langScreen: {
      title: "Chwazi lang ou",
      subtitle: "Sanktyè pale ak ou nan lang ou pito.",
    }
  },
  en: {
    badge: "SANCTUARY • PEACE • WISDOM",
    title1: "SPIRITUAL",
    title2: "GUIDANCE",
    subtitle: "A private space where you can speak freely, without fear or judgment.",
    explainer: "A safe space to reflect, find clarity, and strengthen your personal connection with God through prayer.",
    comfortLine: "You are not alone.",
    label: "What's on your heart?",
    helperText: "It stays between you and God.",
    placeholder: "I am here to listen...",
    sendButton: "SEEK PEACE",
    loadingButton: "LISTENING...",
    responseHeader: "A word for you",
    placeholderBox: "Your response will appear here with gentleness and wisdom.",
    footer: "FAITH • PEACE • WISDOM",
    upgradeButton: "✨ Upgrade to Lafwa — $7/mo",
    paidBadge: "✨ Lafwa Member",
    signIn: "Sign in",
    signOut: "Sign out",
    freeLimit: "You've reached the free limit of 5 messages. Upgrade to Lafwa ($7/month) for unlimited conversations. 🙏",
    langScreen: {
      title: "Choose your language",
      subtitle: "Sanktyè will speak with you in your preferred language.",
    }
  },
  fr: {
    badge: "SANCTUAIRE • PAIX • SAGESSE",
    title1: "GUIDANCE",
    title2: "SPIRITUELLE",
    subtitle: "Un espace privé où vous pouvez parler librement, sans peur ni jugement.",
    explainer: "Un espace sacré pour réfléchir, trouver la clarté et renforcer votre connexion personnelle avec Dieu dans la prière.",
    comfortLine: "Vous n'êtes pas seul.",
    label: "Qu'est-ce qui vous pèse sur le cœur?",
    helperText: "Cela reste entre vous et Dieu.",
    placeholder: "Je suis là pour vous écouter...",
    sendButton: "CHERCHER LA PAIX",
    loadingButton: "J'ÉCOUTE...",
    responseHeader: "Une parole pour vous",
    placeholderBox: "Votre réponse apparaîtra ici avec douceur et sagesse.",
    footer: "FOI • PAIX • SAGESSE",
    upgradeButton: "✨ Passer à Lafwa — 7$/mois",
    paidBadge: "✨ Membre Lafwa",
    signIn: "Se connecter",
    signOut: "Se déconnecter",
    freeLimit: "Vous avez atteint la limite gratuite de 5 messages. Passez à Lafwa (7$/mois) pour des conversations illimitées. 🙏",
    langScreen: {
      title: "Choisissez votre langue",
      subtitle: "Sanktyè vous parlera dans votre langue préférée.",
    }
  },
  es: {
    badge: "SANTUARIO • PAZ • SABIDURÍA",
    title1: "GUÍA",
    title2: "ESPIRITUAL",
    subtitle: "Un espacio privado donde puedes hablar libremente, sin miedo ni juicio.",
    explainer: "Un espacio sagrado para reflexionar, encontrar claridad y fortalecer tu conexión personal con Dios a través de la oración.",
    comfortLine: "No estás solo.",
    label: "¿Qué llevas en el corazón?",
    helperText: "Queda entre tú y Dios.",
    placeholder: "Estoy aquí para escucharte...",
    sendButton: "BUSCAR LA PAZ",
    loadingButton: "ESCUCHANDO...",
    responseHeader: "Una palabra para ti",
    placeholderBox: "Tu respuesta aparecerá aquí con gentileza y sabiduría.",
    footer: "FE • PAZ • SABIDURÍA",
    upgradeButton: "✨ Mejorar a Lafwa — $7/mes",
    paidBadge: "✨ Miembro Lafwa",
    signIn: "Iniciar sesión",
    signOut: "Cerrar sesión",
    freeLimit: "Has alcanzado el límite gratuito de 5 mensajes. Mejora a Lafwa ($7/mes) para conversaciones ilimitadas. 🙏",
    langScreen: {
      title: "Elige tu idioma",
      subtitle: "Sanktyè hablará contigo en tu idioma preferido.",
    }
  }
};

export default function Home() {
  const { isSignedIn, user } = useUser();
  const [lang, setLang] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isUpgradeHovered, setIsUpgradeHovered] = useState(false);
  const [history, setHistory] = useState([]);
  const [isPaid, setIsPaid] = useState(false);
  const [checkingPlan, setCheckingPlan] = useState(false);
  const textAreaRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("sanktyeLang");
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }, [userInput]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success")) {
      setIsPaid(true);
      window.history.replaceState({}, "", "/");
    }
  }, []);

  const handleLangSelect = (code) => {
    setLang(code);
    localStorage.setItem("sanktyeLang", code);
  };

  const handleUpgrade = async () => {
    if (!isSignedIn) return;
    setCheckingPlan(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error("Upgrade error:", error);
    } finally {
      setCheckingPlan(false);
    }
  };

  const handleConsultation = async () => {
    if (!userInput.trim()) return;
    const t = translations[lang];

    if (!isPaid && history.filter(m => m.role === "user").length >= 15) {
      setHistory([...history, { role: "assistant", content: t.freeLimit }]);
      return;
    }

    setIsLoading(true);
    const newHistory = [...history, { role: "user", content: userInput }];
    setHistory(newHistory);
    setUserInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory, lang }),
      });
      const data = await res.json();
      const reply = data.text || translations[lang].placeholder;
      setHistory([...newHistory, { role: "assistant", content: reply }]);
    } catch (error) {
      setHistory([...newHistory, { role: "assistant", content: translations[lang].freeLimit }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleConsultation();
    }
  };

  // Language selection screen
  if (!lang) {
    return (
      <div style={styles.container}>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Inter:wght@300;400;600&display=swap');
          html, body { margin: 0; padding: 0; background: #fcfaf6; font-family: 'Inter', sans-serif; overflow-x: hidden; }
          * { box-sizing: border-box; }
          @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes floatAura { 0% { transform: translate(0, 0) scale(1); } 50% { transform: translate(15px, -20px) scale(1.03); } 100% { transform: translate(0, 0) scale(1); } }
        `}</style>

        <div style={styles.auraLeft} />
        <div style={styles.auraRight} />
        <div style={styles.auraCenter} />

        <div style={{ ...styles.content, animation: "fadeUp 1s ease-out" }}>
          <h1 style={{ ...styles.title, marginBottom: "8px" }}>
            KONSEY <br /><span style={styles.titleAccent}>ESPIRITYÈL</span>
          </h1>
          <p style={{ fontSize: "13px", letterSpacing: "3px", color: "#aa8b3f", fontWeight: "700", marginBottom: "48px" }}>
            SANKTYÈ
          </p>

          <p style={{ fontSize: "18px", color: "#2D264B", fontWeight: "600", marginBottom: "8px" }}>
            Choose your language
          </p>
          <p style={{ fontSize: "14px", color: "#5e5873", marginBottom: "40px", fontWeight: "300" }}>
            Sanktyè will speak with you in your preferred language.
          </p>

          <div style={styles.langGrid}>
            {[
              { code: "kr", label: "🇭🇹 Kreyòl Ayisyen" },
              { code: "en", label: "🇺🇸 English" },
              { code: "fr", label: "🇫🇷 Français" },
              { code: "es", label: "🇪🇸 Español" },
            ].map(({ code, label }) => (
              <button
                key={code}
                style={styles.langButton}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                onClick={() => handleLangSelect(code)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const t = translations[lang];

  return (
    <div style={styles.container}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Inter:wght@300;400;600&display=swap');
        html, body { margin: 0; padding: 0; background: #fcfaf6; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        * { box-sizing: border-box; }
        textarea::placeholder { color: #8f8a9f; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatAura { 0% { transform: translate(0, 0) scale(1); } 50% { transform: translate(15px, -20px) scale(1.03); } 100% { transform: translate(0, 0) scale(1); } }
        .msg-enter { animation: fadeUp 0.6s ease-out forwards; }
      `}</style>

      <div style={styles.auraLeft} />
      <div style={styles.auraRight} />
      <div style={styles.auraCenter} />

      {/* Language switcher + auth bar */}
      <div style={styles.authBar}>
        {isSignedIn ? (
          <div style={styles.authRow}>
            {!isPaid && (
              <button
                style={{ ...styles.upgradeButton, ...(isUpgradeHovered ? styles.upgradeButtonHover : {}) }}
                onMouseEnter={() => setIsUpgradeHovered(true)}
                onMouseLeave={() => setIsUpgradeHovered(false)}
                onClick={handleUpgrade}
                disabled={checkingPlan}
              >
                {checkingPlan ? "..." : t.upgradeButton}
              </button>
            )}
            {isPaid && <span style={styles.paidBadge}>{t.paidBadge}</span>}
            <span style={styles.authName}>👤 {user.firstName || user.emailAddresses[0].emailAddress}</span>
            <SignOutButton><button style={styles.authButton}>{t.signOut}</button></SignOutButton>
          </div>
        ) : (
          <div style={styles.authRow}>
            <button style={styles.langSwitchButton} onClick={() => { setLang(null); localStorage.removeItem("sanktyeLang"); }}>🌐</button>
            <SignInButton mode="modal"><button style={styles.authButton}>{t.signIn}</button></SignInButton>
          </div>
        )}
      </div>

      <main style={styles.content}>
        <div style={styles.badge}>{t.badge}</div>
        <h1 style={styles.title}>
          {t.title1} <br /><span style={styles.titleAccent}>{t.title2}</span>
        </h1>
        <p style={styles.subtitle}>{t.subtitle}</p>
        <p style={styles.explainer}>{t.explainer}</p>
        <p style={styles.comfortLine}>{t.comfortLine}</p>

        <div style={styles.card}>
          <div style={styles.labelRow}>
            <label style={styles.label}>{t.label}</label>
            <span style={styles.helperText}>{t.helperText}</span>
          </div>

          {history.length > 0 && (
            <div style={styles.chatHistory}>
              {history.map((msg, i) => (
                <div key={i} className="msg-enter" style={msg.role === "user" ? styles.userBubble : styles.assistantBubble}>
                  {msg.role === "assistant" && <div style={styles.responseHeader}>{t.responseHeader}</div>}
                  <p style={msg.role === "user" ? styles.userText : styles.responseText}>{msg.content}</p>
                </div>
              ))}
              {isLoading && (
                <div style={styles.assistantBubble}>
                  <div style={styles.responseHeader}>{t.responseHeader}</div>
                  <p style={{ ...styles.responseText, opacity: 0.5, fontStyle: "italic" }}>
                    {lang === "kr" ? "M ap koute w..." : lang === "fr" ? "J'écoute..." : lang === "es" ? "Escuchando..." : "Listening..."}
                  </p>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}

          {history.length === 0 && !isLoading && (
            <div style={styles.placeholderBox}>{t.placeholderBox}</div>
          )}

          <textarea
            ref={textAreaRef}
            style={styles.textArea}
            placeholder={t.placeholder}
            rows="3"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            style={{
              ...styles.button,
              ...(isHovered && userInput && !isLoading ? styles.buttonHover : {}),
              opacity: isLoading || !userInput ? 0.7 : 1,
              cursor: isLoading || !userInput ? "not-allowed" : "pointer",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleConsultation}
            disabled={isLoading || !userInput}
          >
            {isLoading ? t.loadingButton : t.sendButton}
          </button>
        </div>

        <footer style={styles.footer}>{t.footer}</footer>
      </main>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", padding: "40px 20px" },
  authBar: { position: "absolute", top: "20px", right: "24px", zIndex: 20 },
  authRow: { display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", justifyContent: "flex-end" },
  authName: { fontSize: "13px", color: "#5e5873" },
  authButton: { padding: "8px 18px", borderRadius: "100px", border: "1px solid rgba(133,120,195,0.4)", background: "rgba(255,255,255,0.9)", color: "#564f73", fontSize: "13px", fontWeight: "600", cursor: "pointer" },
  langSwitchButton: { padding: "8px 12px", borderRadius: "100px", border: "1px solid rgba(133,120,195,0.4)", background: "rgba(255,255,255,0.9)", fontSize: "16px", cursor: "pointer" },
  upgradeButton: { padding: "8px 18px", borderRadius: "100px", border: "none", background: "linear-gradient(135deg, #d4bd7d, #b08f43)", color: "#fff", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all 0.3s ease", boxShadow: "0 4px 12px rgba(176,143,67,0.3)" },
  upgradeButtonHover: { transform: "translateY(-1px)", boxShadow: "0 6px 16px rgba(176,143,67,0.4)" },
  paidBadge: { padding: "6px 14px", borderRadius: "100px", background: "linear-gradient(135deg, #d4bd7d, #b08f43)", color: "#fff", fontSize: "12px", fontWeight: "700" },
  auraLeft: { position: "absolute", top: "5%", left: "-10%", width: "450px", height: "450px", background: "radial-gradient(circle, rgba(171,153,224,0.15), transparent 70%)", filter: "blur(60px)", animation: "floatAura 18s ease-in-out infinite", pointerEvents: "none" },
  auraRight: { position: "absolute", bottom: "5%", right: "-10%", width: "450px", height: "450px", background: "radial-gradient(circle, rgba(212,189,125,0.12), transparent 70%)", filter: "blur(60px)", animation: "floatAura 22s ease-in-out infinite reverse", pointerEvents: "none" },
  auraCenter: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", maxWidth: "800px", height: "600px", background: "radial-gradient(circle, rgba(255,255,255,0.8), transparent 65%)", pointerEvents: "none" },
  content: { position: "relative", zIndex: 10, maxWidth: "660px", width: "100%", textAlign: "center", animation: "fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1)" },
  badge: { display: "inline-block", padding: "8px 20px", borderRadius: "100px", background: "#fff", border: "1px solid rgba(197,172,101,0.22)", color: "#aa8b3f", fontSize: "11px", fontWeight: "700", letterSpacing: "2.5px", marginBottom: "24px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" },
  title: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(50px, 8vw, 82px)", lineHeight: "0.92", color: "#2D264B", marginBottom: "18px", fontWeight: "700" },
  titleAccent: { color: "#a99ae0", fontStyle: "italic", fontWeight: "600" },
  subtitle: { fontSize: "20px", color: "#2D264B", marginBottom: "10px", fontWeight: "600" },
  explainer: { fontSize: "16px", color: "#5e5873", lineHeight: "1.7", marginBottom: "20px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", fontWeight: "300" },
  comfortLine: { color: "#8f7f5e", fontSize: "16px", fontWeight: "600", fontStyle: "italic", marginBottom: "35px" },
  card: { background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)", borderRadius: "32px", padding: "32px", border: "1px solid rgba(133,120,195,0.15)", boxShadow: "0 25px 50px rgba(61,49,103,0.08)", textAlign: "left" },
  labelRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "10px" },
  label: { fontSize: "15px", fontWeight: "600", color: "#564f73" },
  helperText: { fontSize: "12px", color: "#aaa4bc" },
  chatHistory: { marginBottom: "24px", display: "flex", flexDirection: "column", gap: "16px", maxHeight: "400px", overflowY: "auto", paddingRight: "4px" },
  userBubble: { alignSelf: "flex-end", background: "linear-gradient(135deg, #b6acdf 0%, #9e92d6 100%)", borderRadius: "20px 20px 4px 20px", padding: "14px 18px", maxWidth: "85%" },
  assistantBubble: { background: "linear-gradient(to bottom, #ffffff, #f9f7ff)", borderRadius: "20px 20px 20px 4px", padding: "20px 22px", border: "1px solid #eee9f8", borderLeft: "4px solid #d4bd7d", maxWidth: "95%" },
  userText: { fontSize: "16px", lineHeight: "1.6", color: "#fff", margin: 0 },
  responseHeader: { fontSize: "11px", fontWeight: "700", color: "#b08f43", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "8px" },
  responseText: { fontSize: "17px", lineHeight: "1.8", color: "#3f385e", margin: 0 },
  placeholderBox: { padding: "22px", textAlign: "center", color: "#b0aac2", fontSize: "15px", fontStyle: "italic", border: "1px dashed #dcd6f0", borderRadius: "20px", marginBottom: "24px" },
  textArea: { width: "100%", minHeight: "80px", padding: "20px", borderRadius: "20px", border: "1px solid #ddd5ef", background: "rgba(255,255,255,0.9)", fontSize: "18px", lineHeight: "1.6", fontFamily: "inherit", outline: "none", resize: "none", color: "#353246", marginBottom: "24px", transition: "border-color 0.3s ease, box-shadow 0.3s ease", overflow: "hidden" },
  button: { width: "100%", padding: "18px", borderRadius: "100px", border: "none", background: "linear-gradient(135deg, #b6acdf 0%, #9e92d6 100%)", color: "#fff", fontSize: "16px", fontWeight: "700", letterSpacing: "1.8px", boxShadow: "0 10px 25px rgba(158,146,214,0.3)", transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", marginBottom: "0" },
  buttonHover: { transform: "translateY(-2px) scale(1.01)", boxShadow: "0 15px 30px rgba(158,146,214,0.4)" },
  footer: { marginTop: "45px", fontSize: "12px", letterSpacing: "6px", color: "#9b9169", fontWeight: "600", opacity: 0.8 },
  langGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", maxWidth: "400px", margin: "0 auto" },
  langButton: { padding: "18px 24px", borderRadius: "20px", border: "1px solid rgba(133,120,195,0.25)", background: "rgba(255,255,255,0.85)", color: "#2D264B", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "all 0.3s ease", boxShadow: "0 8px 24px rgba(61,49,103,0.06)", backdropFilter: "blur(10px)" },
};
