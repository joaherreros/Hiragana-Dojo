import React, { useState } from "react";
import Modal from "react-modal";
import Respuesta from "./Respuesta";
import Vidas from "./Lives";
import Hiragana from "./hiragana";
import CorrectSFX from "../assets/sfx/correctsfx.mp3";
import WrongSFX from "../assets/sfx/wrongsfx.mp3";
import hiraganas from "./hiraganas";
import GameEnd from "./GameEnd";

export default function Game({ actualizarPantalla }) {
  const hiraganaKeys = Object.keys(hiraganas);

  const [hiraganaRandom, setHiraganaRandom] = useState("あ");
  const [respuesta, setRespuesta] = useState(hiraganas[hiraganaRandom]);
  const [lives, setLives] = useState(["❤️", "❤️", "❤️"]);
  const [ansCount, setAnsCount] = useState(0);
  const [WrongAudio] = useState(new Audio(WrongSFX));
  const [CorrectAudio] = useState(new Audio(CorrectSFX));
  const [showGameEndModal, setShowGameEndModal] = useState(false);
  const [testingMode, setTestingMode] = useState(false);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState([]);

  const randomizar = () => {
    const randomIndex = Math.floor(Math.random() * hiraganaKeys.length);
    const randomHiragana = hiraganaKeys[randomIndex];
    setHiraganaRandom(randomHiragana);
    setRespuesta(hiraganas[randomHiragana]);
  };

  const handleGoBack = () => {
    actualizarPantalla("Bienvenida");
  };

  const takeLife = () => {
    if (lives.length > 1) {
      const newLives = [...lives];
      newLives.pop();
      setLives(newLives);
    } else {
      setShowGameEndModal(true);
    }
    WrongAudio.play();
  };

  const sumRightAns = () => {
    setAnsCount(ansCount + 1);
    CorrectAudio.play();
    setRespuestasCorrectas([...respuestasCorrectas, respuesta]);
  };

  const handleToggleTestingMode = () => {
    setTestingMode(!testingMode);
  };

  return (
    <>
      <button onClick={handleGoBack}>Back to Menu</button>
      <Vidas lives={lives} />
      <label>
        Testing Mode:
        <input
          type="checkbox"
          checked={testingMode}
          onChange={handleToggleTestingMode}
        />
      </label>

      <Hiragana hiraganaRandom={hiraganaRandom} />

      {testingMode && <p>Right answer: {respuesta}</p>}

      <Respuesta
        randomizar={randomizar}
        correctAnswer={respuesta}
        takeLife={takeLife}
        sumRightAns={sumRightAns}
      />
      <p>Right answers: {ansCount}</p>

      <Modal
        isOpen={showGameEndModal}
        onRequestClose={() => setShowGameEndModal(false)}
        contentLabel="Game Over"
        shouldCloseOnOverlayClick={false}
        style={{
          content: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#242424",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            maxWidth: "100%",
            maxHeight: "100%",
            overflow: "auto",
            padding: 100,
            borderRadius: "30px",
          },
        }}
      >
        <GameEnd
          actualizarPantalla={actualizarPantalla}
          respuestasCorrectas={ansCount}
        />
      </Modal>
    </>
  );
}
