import React from "react";

export default function GameEnd({actualizarPantalla}) {

  const handleMainMenu = () =>{
    actualizarPantalla("Bienvenida")
  }

  const handlePlayAgain = () =>{
    actualizarPantalla("Bienvenida")
  }

  return (
    <>
      <h1>Game Over!</h1>
      <h2>You made</h2>
      <h1>XX</h1>
      <h2>points!</h2>
      <button onClick={handlePlayAgain} className="MenuItem">Play Again</button>
      <button onClick={handleMainMenu} className="MenuItem">Main Menu</button>
    </>
  );
}
