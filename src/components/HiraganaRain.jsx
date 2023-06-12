import React, { useEffect, useState } from "react";
import hiraganas from "./hiraganas";

const HiraganaRain = () => {
  const numHiraganas = 40; // Número de hiraganas que caen
  const hiraganaChars = Object.keys(hiraganas); // Caracteres hiragana

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const hiraganaElements = Array.from({ length: numHiraganas }).map((_, index) => {
    const hiraganaChar = hiraganaChars[Math.floor(Math.random() * hiraganaChars.length)];
    const top = Math.random() < 0.5 ? -10 : windowHeight + 10; // Actualiza la posición vertical en función del tamaño de la ventana
    const left = Math.random() * 100; // Posición horizontal aleatoria (0-100%)
    const animationDuration = Math.random() * 5 + 2; // Duración de la animación (2-7 segundos)
    const animationDirection = top === -10 ? "fall" : "rise"; // Dirección de la animación (caída o subida)

    return (
      <div
        key={index}
        className={`hiragana-drop ${animationDirection}`}
        style={{
          top: `${top}px`,
          left: `${left}%`,
          animationDuration: `${animationDuration}s`,
        }}
      >
        {hiraganaChar}
      </div>
    );
  });

  return <div className="hiragana-rain">{hiraganaElements}</div>;
};

export default HiraganaRain;
