import { useEffect, useRef, useState } from "react";
import backgroundMusic from "@/assets/background-music.mp3";
import mewmewGif from "@/assets/mewmew.gif";
import lettersImg from "@/assets/letters.png";
import q3Img from "@/assets/q3.png";
import h1Img from "@/assets/h1.png";
import h3Img from "@/assets/h3.png";
import t2Img from "@/assets/t2.png";
import t5Img from "@/assets/t5.png";
import flower1 from "@/assets/flower1.jpg";
import flower2 from "@/assets/flower2.jpg";
import flower3 from "@/assets/flower3.jpg";
import flower4 from "@/assets/flower4.jpg";
import flower5 from "@/assets/flower5.jpg";

const messages = [
  {
    img: flower1,
    text: "Chị Oanh mãi đỉnk!!!",
  },
  {
    img: flower2,
    text: "Team Seedbee chúc chị 1 ngày 20/10 thật tuyệt vời!",
  },
  {
    img: flower3,
    text: "20/10 chúc nữ tước của Ngọc An luôn toả sáng như ánh mặt trời",
  },
  {
    img: flower4,
    text: "Chúc chị xjnh đẹp, thành đạt, giàu có 🫶",
  },
  {
    img: flower5,
    text: "Chúc chị lun vui vẻ và hạnh phúc bên gia đình và những người thân yêu!",
  },
];

const letterImages = [lettersImg, q3Img, h1Img, h3Img, t2Img, t5Img];

const WomensDay = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [centerText, setCenterText] = useState(
    "Ngày Phụ nữ Việt Nam\nMong chị Oanh luôn rạng rỡ như những bó hoa!"
  );
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startMusic = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Auto-play might be blocked, will play on user interaction
        });
      }
    };

    document.addEventListener("click", startMusic, { once: true });
    
    const letterInterval = setInterval(() => {
      createFallingLetter();
    }, 1000);

    return () => {
      clearInterval(letterInterval);
      document.removeEventListener("click", startMusic);
    };
  }, []);

  const createFallingLetter = () => {
    if (!containerRef.current) return;

    const letter = document.createElement("img");
    const randomImage = letterImages[Math.floor(Math.random() * letterImages.length)];
    letter.src = randomImage;
    letter.className = "absolute -top-24 w-12 md:w-16 cursor-pointer z-10 transition-transform duration-300 hover:scale-125";
    letter.style.left = Math.random() * (window.innerWidth - 50) + "px";
    letter.style.animation = "fall-sway 8s linear";
    letter.style.filter = "drop-shadow(0 5px 10px rgba(0, 0, 0, 0.2))";

    letter.addEventListener("click", (e) => {
      e.stopPropagation();
      createHeartExplosion(e.clientX, e.clientY);
      letter.style.animation = "none";
      letter.style.transform = "scale(0) rotate(720deg)";
      letter.style.transition = "all 0.6s ease-out";
      setTimeout(() => {
        handleShowPopup();
        letter.remove();
      }, 300);
    });

    containerRef.current.appendChild(letter);

    setTimeout(() => {
      letter.remove();
    }, 8000);
  };

  const createHeartExplosion = (x: number, y: number) => {
    const hearts = ["💗"];
    const numHearts = 12;

    for (let i = 0; i < numHearts; i++) {
      const heart = document.createElement("div");
      heart.textContent = hearts[0];
      heart.className = "fixed pointer-events-none text-2xl md:text-3xl z-50";
      
      const angle = (Math.PI * 2 / numHearts) * i;
      const distance = Math.random() * 80 + 40;
      
      heart.style.left = x + "px";
      heart.style.top = y + "px";
      heart.style.setProperty("--dx", Math.cos(angle) * distance + "px");
      heart.style.setProperty("--dy", Math.sin(angle) * distance + "px");
      heart.style.animation = "heart-explode 2s ease-out forwards";

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 2000);
    }
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    const message = messages[currentMessageIndex];
    setCenterText(message.text);
    setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    setShowPopup(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background"
    >
      {/* Center Message */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 max-w-[90%] md:max-w-2xl">
        <div className="bg-gradient-to-br from-white/95 to-secondary/90 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-white/30 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite] bg-clip-text text-transparent">
            Chúc mừng 20-10
          </h1>
          <p className="text-lg md:text-2xl text-primary font-medium whitespace-pre-line">
            {centerText}
          </p>
        </div>
      </div>

      {/* Bottom GIF */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-32 md:w-40 z-30 pointer-events-none">
        <img src={mewmewGif} alt="Decoration" className="w-full" />
      </div>

      {/* Popup */}
      {showPopup && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-[fadeInOverlay_0.3s_ease]"
            onClick={handleClosePopup}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md animate-[popup-show_0.5s_cubic-bezier(0.68,-0.55,0.265,1.55)]">
            <div className="bg-gradient-to-br from-white to-secondary/80 rounded-3xl p-6 md:p-8 shadow-2xl border-3 border-white/80 text-center">
              <img
                src={messages[currentMessageIndex].img}
                alt="Lời chúc"
                className="w-full rounded-2xl mb-6 shadow-lg border-3 border-white"
              />
              <p className="text-lg md:text-xl text-primary font-medium mb-6 leading-relaxed">
                {messages[currentMessageIndex].text}
              </p>
              <button
                onClick={handleClosePopup}
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Đóng
              </button>
            </div>
          </div>
        </>
      )}

      {/* Background Audio */}
      <audio ref={audioRef} src={backgroundMusic} loop />
    </div>
  );
};

export default WomensDay;
