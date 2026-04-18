import { useState } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConsultation = async () => {
    if (!userInput) return;

    setIsLoading(true);

    setTimeout(() => {
      setResponse(
        "Nan moman ki pi lou yo, lapè pa toujou vini ak bri. Pafwa li vini dousman, tankou yon souf Bondye sou nanm ou. Pran tan ou. Limyè ap vini. ✨"
      );
      setIsLoading(false);
    }, 2200);
  };

  return (
    <div style={styles.container}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        html, body, #__next {
          margin: 0;
          padding: 0;
          min-height: 100%;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(180deg, #fcfaf6 0%, #f7f2fb 48%, #fdfbf8 100%);
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        textarea::placeholder {
          color: #9c98a8;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatAura {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(18px, -18px) scale(1.04); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>

      <div style={styles.auraLeft} />
      <div style={styles.auraRight} />
      <div style={styles.auraCenter} />

      <main style={styles.content}>
        <div style={styles.badge}>PRAN YON MOMAN • RESPIRE • LOUVRI KÈ W</div>

        <h1 style={styles.title}>
          KONSEY <br />
          <span style={styles.titleAccent}>ESPIRITYÈL</span>
        </h1>

        <p style={styles.subtitle}>
          Yon espas prive kote entèlijans rankontre lafwa. Resevwa pawòl ki pote
          kalm ak direksyon nan moman difisil yo.
        </p>

        <div style={styles.card}>
          <div style={styles.labelRow}>
            <label style={styles.label}>Kisa k ap pase nan lespri w?</label>
            <span style={styles.helperText}>Ekri lib, san jijman.</span>
          </div>

          <textarea
            style={styles.textArea}
            placeholder="Mwen la pou m koute w..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />

          <button
            style={{
              ...styles.button,
              opacity: isLoading || !userInput ? 0.7 : 1,
              cursor: isLoading || !userInput ? "not-allowed" : "pointer",
            }}
            onClick={handleConsultation}
            disabled={isLoading || !userInput}
          >
            {isLoading ? "MAP KOUTE..." : "CHÈCHE LAPÈ"}
          </button>

          <div style={styles.responseWrap}>
            {response ? (
              <div style={styles.responseBox}>
                <div style={styles.responseHeader}>Yon pawòl pou ou</div>
                <p style={styles.responseText}>{response}</p>
              </div>
            ) : (
              <div style={styles.placeholderBox}>
                Repons ou ap parèt isit la avèk dousè ak sajès.
              </div>
            )}
          </div>
        </div>

        <footer style={styles.footer}>LAFWA • LAPÈ • SAJÈS</footer>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "36px 18px",
    overflow: "hidden",
  },

  auraLeft: {
    position: "absolute",
    top: "6%",
    left: "-8%",
    width: "420px",
    height: "420px",
    background:
      "radial-gradient(circle, rgba(171,153,224,0.18) 0%, rgba(171,153,224,0.08) 34%, rgba(255,255,255,0) 72%)",
    filter: "blur(42px)",
    animation: "floatAura 16s ease-in-out infinite",
    pointerEvents: "none",
  },

  auraRight: {
    position: "absolute",
    bottom: "4%",
    right: "-8%",
    width: "400px",
    height: "400px",
    background:
      "radial-gradient(circle, rgba(212,189,125,0.14) 0%, rgba(212,189,125,0.06) 32%, rgba(255,255,255,0) 72%)",
    filter: "blur(42px)",
    animation: "floatAura 20s ease-in-out infinite reverse",
    pointerEvents: "none",
  },

  auraCenter: {
    position: "absolute",
    top: "34%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "360px",
    height: "360px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.28) 35%, rgba(255,255,255,0) 70%)",
    filter: "blur(30px)",
    pointerEvents: "none",
  },

  content: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "760px",
    textAlign: "center",
    animation: "fadeUp 0.9s ease-out forwards",
  },

  badge: {
    display: "inline-block",
    padding: "9px 16px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.72)",
    border: "1px solid rgba(197,172,101,0.22)",
    color: "#aa8b3f",
    fontSize: "11px",
    letterSpacing: "2.1px",
    fontWeight: "600",
    marginBottom: "22px",
    boxShadow: "0 8px 22px rgba(0,0,0,0.035)",
  },

  title: {
    margin: "0",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(52px, 8vw, 88px)",
    lineHeight: 0.92,
    fontWeight: "700",
    letterSpacing: "-1px",
    color: "#38315b",
  },

  titleAccent: {
    color: "#a99ae0",
    fontStyle: "italic",
    fontWeight: "600",
  },

  subtitle: {
    maxWidth: "650px",
    margin: "22px auto 34px auto",
    color: "#6d6881",
    fontSize: "18px",
    lineHeight: "1.8",
    fontWeight: "400",
  },

  card: {
    width: "100%",
    maxWidth: "650px",
    margin: "0 auto",
    background: "rgba(255,255,255,0.78)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(221,214,241,0.9)",
    borderRadius: "28px",
    padding: "28px",
    textAlign: "left",
    boxShadow:
      "0 20px 45px rgba(108,93,160,0.08), 0 8px 18px rgba(0,0,0,0.03)",
  },

  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
    gap: "12px",
    flexWrap: "wrap",
  },

  label: {
    color: "#5a5473",
    fontSize: "15px",
    fontWeight: "600",
  },

  helperText: {
    color: "#aaa4bc",
    fontSize: "12px",
    fontWeight: "500",
  },

  textArea: {
    width: "100%",
    minHeight: "150px",
    resize: "none",
    borderRadius: "18px",
    border: "1px solid #e7e1f4",
    background: "rgba(255,255,255,0.92)",
    padding: "18px",
    outline: "none",
    fontSize: "17px",
    lineHeight: "1.7",
    color: "#47425d",
    fontFamily: "'Inter', sans-serif",
    boxShadow: "inset 0 1px 4px rgba(0,0,0,0.02)",
    marginBottom: "18px",
  },

  button: {
    width: "100%",
    border: "none",
    borderRadius: "999px",
    padding: "16px 22px",
    background: "linear-gradient(135deg, #b6acdf 0%, #9e92d6 100%)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "700",
    letterSpacing: "1.6px",
    boxShadow: "0 10px 24px rgba(158,146,214,0.24)",
    marginBottom: "20px",
    transition: "all 0.3s ease",
  },

  responseWrap: {
    marginTop: "2px",
  },

  responseBox: {
    background: "linear-gradient(180deg, #fffdfd 0%, #faf7ff 100%)",
    border: "1px solid #eee7fb",
    borderLeft: "4px solid #d4bd7d",
    borderRadius: "18px",
    padding: "18px",
    animation: "fadeUp 0.7s ease-out",
  },

  responseHeader: {
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1.4px",
    color: "#b08f43",
    textTransform: "uppercase",
    marginBottom: "10px",
  },

  responseText: {
    margin: 0,
    color: "#4a4561",
    fontSize: "17px",
    lineHeight: "1.8",
  },

  placeholderBox: {
    minHeight: "84px",
    borderRadius: "18px",
    border: "1px dashed #e5ddf5",
    background: "rgba(252,249,255,0.82)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#9a94aa",
    fontSize: "15px",
    lineHeight: "1.7",
    padding: "18px",
    fontStyle: "italic",
  },

  footer: {
    marginTop: "28px",
    textAlign: "center",
    color: "#af9c67",
    letterSpacing: "5px",
    fontSize: "12px",
    fontWeight: "600",
  },
};
