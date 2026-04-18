import { useState, useEffect } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simulating the AI response for your building phase
  const handleConsultation = async () => {
    if (!userInput) return;
    setIsLoading(true);
    setTimeout(() => {
      setResponse("Nan mitan boulvès, silans la se yon refij. Koute vwa ki nan fon kè w, lapè w ap jwenn wout li. ✨");
      setIsLoading(false);
    }, 2500);
  };

  return (
    <div style={styles.container}>
      {/* 1. Global Font and Animation Injector */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          font-family: 'Outfit', sans-serif;
          background: #0f1014;
          overflow-x: hidden;
        }

        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -50px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* 2. Animated Background Auras */}
      <div style={styles.auraBlue} />
      <div style={styles.auraGold} />

      {/* 3. Main Content */}
      <main style={styles.content}>
        <div style={styles.headerSection}>
          <div style={styles.badge}>
            <span style={styles.badgeDot}></span>
            MODÈN • ENTÈLIJANS • ESPIRITYÈL
          </div>
          <h1 style={styles.title}>
            KONSEY <span style={styles.titleGradient}>ESPIRITYÈL</span>
          </h1>
          <p style={styles.subtitle}>
            Yon refij prive pou klète nan lespri w ak fòs nan kè w. 
            Eksperyans AI ki pi avanse pou kominote Ayisyen an.
          </p>
        </div>

        {/* 4. Glassmorphism Input Card */}
        <div style={styles.glassCard}>
          <textarea
            style={styles.textArea}
            placeholder="Ki sa ki peze kè w jodi a..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button 
            style={{
              ...styles.sendButton,
              backgroundColor: userInput ? "#CBA135" : "rgba(255,255,255,0.1)",
              cursor: userInput ? "pointer" : "not-allowed"
            }}
            onClick={handleConsultation}
            disabled={isLoading || !userInput}
          >
            {isLoading ? "..." : "PALE AVÈ M"}
          </button>
        </div>

        {/* 5. Dynamic Response Section */}
        {response && (
          <div style={styles.responseContainer}>
            <div style={styles.responseIcon}>✦</div>
            <p style={styles.responseText}>{response}</p>
          </div>
        )}

        {/* 6. Footer */}
        <footer style={styles.footer}>
          LAFWA • LAPÈ • SAJÈS 🇭🇹
        </footer>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    color: "#fff",
    padding: "20px",
    boxSizing: "border-box",
  },
  auraBlue: {
    position: "absolute",
    top: "-10%",
    left: "-10%",
    width: "70vw",
    height: "70vh",
    background: "radial-gradient(circle, rgba(0, 242, 254, 0.12) 0%, rgba(0,0,0,0) 70%)",
    filter: "blur(60px)",
    animation: "float 20s infinite ease-in-out",
    zIndex: 0,
  },
  auraGold: {
    position: "absolute",
    bottom: "-10%",
    right: "-10%",
    width: "60vw",
    height: "60vh",
    background: "radial-gradient(circle, rgba(203, 161, 53, 0.1) 0%, rgba(0,0,0,0) 70%)",
    filter: "blur(60px)",
    animation: "float 25s infinite ease-in-out reverse",
    zIndex: 0,
  },
  content: {
    zIndex: 10,
    maxWidth: "800px",
    width: "100%",
    textAlign: "center",
    animation: "fadeIn 1.2s ease-out forwards",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255, 255, 255, 0.05)",
    padding: "8px 16px",
    borderRadius: "100px",
    fontSize: "11px",
    letterSpacing: "2px",
    color: "#CBA135",
    border: "1px solid rgba(203, 161, 53, 0.2)",
    marginBottom: "24px",
  },
  badgeDot: {
    width: "6px",
    height: "6px",
    background: "#CBA135",
    borderRadius: "50%",
    boxShadow: "0 0 10px #CBA135",
  },
  title: {
    fontSize: "clamp(40px, 8vw, 72px)",
    fontWeight: "800",
    margin: "0 0 20px 0",
    lineHeight: "1",
    letterSpacing: "-2px",
  },
  titleGradient: {
    background: "linear-gradient(to right, #CBA135, #ffebad)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "18px",
    color: "rgba(255,255,255,0.6)",
    fontWeight: "300",
    lineHeight: "1.6",
    maxWidth: "600px",
    margin: "0 auto 50px auto",
  },
  glassCard: {
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "32px",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  },
  textArea: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "20px",
    fontFamily: "inherit",
    outline: "none",
    resize: "none",
    minHeight: "120px",
    fontWeight: "300",
  },
  sendButton: {
    padding: "18px",
    borderRadius: "18px",
    border: "none",
    color: "#000",
    fontWeight: "700",
    fontSize: "14px",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
  },
  responseContainer: {
    marginTop: "40px",
    padding: "30px",
    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)",
    borderRadius: "24px",
    borderLeft: "4px solid #CBA135",
    textAlign: "left",
    animation: "fadeIn 0.8s ease-out",
  },
  responseIcon: {
    color: "#CBA135",
    fontSize: "24px",
    marginBottom: "10px",
  },
  responseText: {
    fontSize: "18px",
    lineHeight: "1.7",
    color: "#efefef",
    margin: 0,
    fontWeight: "300",
  },
  footer: {
    marginTop: "60px",
    fontSize: "12px",
    letterSpacing: "4px",
    color: "rgba(255,255,255,0.3)",
    fontWeight: "400",
  }
};
