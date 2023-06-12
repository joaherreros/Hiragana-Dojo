import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Respuesta from "./Respuesta";
import Hiragana from "./hiragana";
import CorrectSFX from "../assets/sfx/correctsfx.mp3";
import WrongSFX from "../assets/sfx/wrongsfx.mp3";
import hiraganas from "./hiraganas";
import GameEnd from "./GameEnd";

export default function TimeChallenge({ actualizarPantalla }) {
  const hiraganaKeys = Object.keys(hiraganas);

  const [hiraganaRandom, setHiraganaRandom] = useState("あ");
  const [respuesta, setRespuesta] = useState(hiraganas[hiraganaRandom]);
  const [ansCount, setAnsCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [firstAnswerGiven, setFirstAnswerGiven] = useState(false);
  const [WrongAudio] = useState(new Audio(WrongSFX));
  const [CorrectAudio] = useState(new Audio(CorrectSFX));
  const [showGameEndModal, setShowGameEndModal] = useState(false);
  const [testingMode, setTestingMode] = useState(false);

  useEffect(() => {
    if (firstAnswerGiven) {
      if (timeRemaining === 0) {
        setShowGameEndModal(true);
      }

      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [timeRemaining, firstAnswerGiven]);

  const randomizar = () => {
    const randomIndex = Math.floor(Math.random() * hiraganaKeys.length);
    const randomHiragana = hiraganaKeys[randomIndex];
    setHiraganaRandom(randomHiragana);
    setRespuesta(hiraganas[randomHiragana]);
    setFirstAnswerGiven(true);
  };

  const handleGoBack = () => {
    actualizarPantalla("Bienvenida");
  };

  const takeLife = () => {
    WrongAudio.play();
  };

  const sumRightAns = () => {
    setAnsCount((prevCount) => prevCount + 1);
    CorrectAudio.play();
  };

  const handleToggleTestingMode = () => {
    setTestingMode(!testingMode);
  };

  return (
    <>
      <button onClick={handleGoBack}>Back to Menu</button>
      <p><b>Time Remaining: {timeRemaining}</b></p>
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
        sumRightAns={sumRightAns}
        takeLife={takeLife}
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
