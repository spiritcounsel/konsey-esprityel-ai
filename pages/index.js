import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [userInput]);

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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Inter:wght@300;400;600&display=swap');

        html, body {
          margin: 0;
          padding: 0;
          background: #fcfaf6;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        textarea::placeholder {
          color: #b0aac2;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatAura {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15px, -20px) scale(1.03); }
          100% { transform: translate(0, 0) scale(1); }
        }

        .response-enter {
          animation: fadeUp 0.8s ease-out forwards;
        }
      `}</style>

      <div style={styles.auraLeft} />
      <div style={styles.auraRight} />
      <div style={styles.auraCenter} />

      <main style={styles.content}>
        <div style={styles.badge}>SANKTYÈ • LAPÈ • SAJÈS</div>

        <h1 style={styles.title}>
          KONSEY <br />
          <span style={styles.titleAccent}>ESPIRITYÈL</span>
        </h1>

        <p style={styles.subtitle}>
          Yon espas prive kote entèlijans rankontre lafwa. <br />
          Resevwa pawòl ki pote kalm ak direksyon.
        </p>

        <p style={styles.comfortLine}>Ou pa pou kont ou.</p>

        <div style={styles.card}>
          <div style={styles.labelRow}>
            <label style={styles.label}>Kisa k ap pase nan lespri w?</label>
            <span style={styles.helperText}>Sa rete ant ou menm ak Bondye.</span>
          </div>

          <textarea
            ref={textAreaRef}
            style={styles.textArea}
            placeholder="Mwen la pou m koute w..."
            rows="3"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
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
            {isLoading ? "M AP KOUTE..." : "CHÈCHE LAPÈ"}
          </button>

          <div>
            {response ? (
              <div className="response-enter" style={styles.responseBox}>
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
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
  },

  auraLeft: {
    position: "absolute",
    top: "5%",
    left: "-10%",
    width: "450px",
    height: "450px",
    background: "radial-gradient(circle, rgba(171,153,224,0.15), transparent 70%)",
    filter: "blur(60px)",
    animation: "floatAura 18s ease-in-out infinite",
  },

  auraRight: {
    position: "absolute",
    bottom: "5%",
    right: "-10%",
    width: "450px",
    height: "450px",
    background: "radial-gradient(circle, rgba(212,189,125,0.12), transparent 70%)",
    filter: "blur(60px)",
    animation: "floatAura 22s ease-in-out infinite reverse",
  },

  auraCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "800px",
    height: "600px",
    background: "radial-gradient(circle, rgba(255,255,255,0.8), transparent 65%)",
    pointerEvents: "none",
  },

  content: {
    position: "relative",
    zIndex: 10,
    maxWidth: "660px",
    width: "100%",
    textAlign: "center",
    animation: "fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
  },

  badge: {
    display: "inline-block",
    padding: "8px 20px",
    borderRadius: "100px",
    background: "#fff",
    border: "1px solid rgba(197,172,101,0.22)",
    color: "#aa8b3f",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "2.5px",
    marginBottom: "24px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
  },

  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(52px, 8.5vw, 86px)",
    lineHeight: "0.92",
    color: "#2D264B",
    marginBottom: "18px",
    fontWeight: "700",
  },

  titleAccent: {
    color: "#a99ae0",
    fontStyle: "italic",
    fontWeight: "600",
  },

  subtitle: {
    fontSize: "18px",
    color: "#6d6881",
    lineHeight: "1.6",
    marginBottom: "15px",
    fontWeight: "300",
  },

  comfortLine: {
    color: "#8f7f5e",
    fontSize: "16px",
    fontWeight: "600",
    fontStyle: "italic",
    marginBottom: "35px",
  },

  card: {
    background: "rgba(255,255,255,0.82)",
    backdropFilter: "blur(20px)",
    borderRadius: "32px",
    padding: "32px",
    border: "1px solid rgba(133,120,195,0.15)",
    boxShadow: "0 25px 50px rgba(61,49,103,0.08)",
    textAlign: "left",
  },

  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
    gap: "12px",
    flexWrap: "wrap",
  },

  label: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#564f73",
  },

  helperText: {
    fontSize: "12px",
    color: "#aaa4bc",
  },

  textArea: {
    width: "100%",
    minHeight: "80px",
    padding: "20px",
    borderRadius: "20px",
    border: "1px solid #e7e1f4",
    background: "rgba(255,255,255,0.9)",
    fontSize: "18px",
    lineHeight: "1.6",
    fontFamily: "inherit",
    outline: "none",
    resize: "none",
    color: "#353246",
    marginBottom: "24px",
    transition: "border-color 0.3s ease",
    overflow: "hidden",
  },

  button: {
    width: "100%",
    padding: "18px",
    borderRadius: "100px",
    border: "none",
    background: "linear-gradient(135deg, #b6acdf 0%, #9e92d6 100%)",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "1.8px",
    boxShadow: "0 10px 25px rgba(158,146,214,0.3)",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    marginBottom: "28px",
  },

  buttonHover: {
    transform: "translateY(-2px) scale(1.01)",
    boxShadow: "0 15px 30px rgba(158,146,214,0.4)",
    filter: "brightness(1.05)",
  },

  responseBox: {
    background: "linear-gradient(to bottom, #ffffff, #f9f7ff)",
    borderRadius: "22px",
    padding: "26px",
    border: "1px solid #eee9f8",
    borderLeft: "5px solid #d4bd7d",
    boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
  },

  responseHeader: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#b08f43",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "10px",
  },

  responseText: {
    fontSize: "17.5px",
    lineHeight: "1.8",
    color: "#3f385e",
    margin: 0,
  },

  placeholderBox: {
    padding: "22px",
    textAlign: "center",
    color: "#b0aac2",
    fontSize: "15px",
    fontStyle: "italic",
    border: "1px dashed #dcd6f0",
    borderRadius: "20px",
  },

  footer: {
    marginTop: "45px",
    fontSize: "12px",
    letterSpacing: "6px",
    color: "#9b9169",
    fontWeight: "600",
    opacity: 0.8,
  },
};
