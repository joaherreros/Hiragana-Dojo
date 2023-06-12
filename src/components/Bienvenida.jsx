import React, { useState } from "react";
import HiraganaRain from "./HiraganaRain";
import Modal from "react-modal";
import hiratable from "../assets/img/hiratable.jpg";

function Bienvenida({ actualizarPantalla }) {
  const [showTable, setShowTable] = useState(false);

  const handleIniciarJuego = () => {
    actualizarPantalla("Game");
  };

  const handleTimeChallenge = () => {
    actualizarPantalla("TimeChallenge");
  };

  const handleOpenTable = () => {
    setShowTable(true);
  };

  const handleCloseTable = () => {
    setShowTable(false);
  };

  return (
    <div>
      <h1 className="title">Hiragana Dojo</h1>
      <h3>By: Joaquín Herreros</h3>
      <button className="MenuItem" onClick={handleIniciarJuego}>
        Start Game
      </button>
      <button className="MenuItem" onClick={handleTimeChallenge}>
        Time Challenge
      </button>
      <button className="MenuItem" onClick={handleOpenTable}>
        Hiragana Table
      </button>
      <HiraganaRain />

      <Modal
  isOpen={showTable}
  onRequestClose={handleCloseTable}
  contentLabel="Hiragana Table"
  style={{
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "5b5b5c",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      overflow: "auto",
      padding: 100,
      borderRadius: "20px",
    },
  }}
>
  <button onClick={handleCloseTable}>Close</button>
  <img
    src={hiratable}
    alt="Hiragana Table"
    style={{ width: "100%", height: "auto" }}
  />
</Modal>

    </div>
  );
}

export default Bienvenida;
