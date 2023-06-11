import React from "react";
import HiraganaRain from "./HiraganaRain"

function Bienvenida({ actualizarPantalla }) {
  const handleIniciarJuego = () => {
    actualizarPantalla("Game");
  };
  
  const handleTimeChallenge = () => {
    actualizarPantalla("TimeChallenge");
  }

  return (
    <div>
      <h1 className="title">Hiragana Dojo</h1>
      <h3>By: Joaquín Herreros</h3>
      <button className="MenuItem" onClick={handleIniciarJuego}>Start Game</button>
      <button className="MenuItem" onClick={handleTimeChallenge}>Time Challenge</button>
      <HiraganaRain/>
    </div>
  );
}

export default Bienvenida;
