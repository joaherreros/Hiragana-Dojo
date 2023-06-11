import React, { useState } from "react";
import Bienvenida from "./Bienvenida";
import Game from "./Game";
import TimeChallenge from "./TimeChallenge";
import GameEnd from "./GameEnd";

export default function CargadorPantallas() {
  const [pantallaActual, setPantalla] = useState("Bienvenida");

  const actualizarPantalla = (nuevaPantalla) => {
    setPantalla(nuevaPantalla);
  };

  if (pantallaActual == "Bienvenida") {
    return <Bienvenida actualizarPantalla={actualizarPantalla} />;
  } else if (pantallaActual == "Game") {
    return <Game actualizarPantalla={actualizarPantalla} />;
  } else if (pantallaActual == "TimeChallenge") {
    return <TimeChallenge actualizarPantalla={actualizarPantalla} />;
  } else if (pantallaActual == "GameEnd") {
    return <GameEnd actualizarPantalla={actualizarPantalla} />;
  }
  return <h1>Error al cargar la vista</h1>;
}
