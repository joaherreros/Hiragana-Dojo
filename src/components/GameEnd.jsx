import React from "react";

export default function GameEnd({ actualizarPantalla, respuestasCorrectas }) {
  const handleMainMenu = () => {
    actualizarPantalla("Bienvenida");
  };

  return (
    <>
      <h1>Game Over!</h1>
      <h2>Final score: {respuestasCorrectas} points.</h2>
      <button onClick={handleMainMenu} className="MenuItem">
        Main Menu
      </button>
    </>
  );
}
