import React, { useState, useEffect } from "react";
import Respuesta from "./Respuesta";
import Hiragana from "./hiragana";
import CorrectSFX from "../assets/sfx/correctsfx.mp3";
import WrongSFX from "../assets/sfx/wrongsfx.mp3";

export default function TimeChallenge({ actualizarPantalla }) {
  const hiraganas = {
    あ: "a",
    い: "i",
    う: "u",
    え: "e",
    お: "o",
    か: "ka",
    き: "ki",
    く: "ku",
    け: "ke",
    こ: "ko",
    さ: "sa",
    し: "shi",
    す: "su",
    せ: "se",
    そ: "so",
    た: "ta",
    ち: "chi",
    つ: "tsu",
    て: "te",
    と: "to",
    な: "na",
    に: "ni",
    ぬ: "nu",
    ね: "ne",
    の: "no",
    は: "ha",
    ひ: "hi",
    ふ: "fu",
    へ: "he",
    ほ: "ho",
    ま: "ma",
    み: "mi",
    む: "mu",
    め: "me",
    も: "mo",
    や: "ya",
    ゆ: "yu",
    よ: "yo",
    ら: "ra",
    り: "ri",
    る: "ru",
    れ: "re",
    ろ: "ro",
    わ: "wa",
    を: "wo",
    ん: "n",
    が: "ga",
    ぎ: "gi",
    ぐ: "gu",
    げ: "ge",
    ご: "go",
    ざ: "za",
    じ: "ji",
    ず: "zu",
    ぜ: "ze",
    ぞ: "zo",
    だ: "da",
    ぢ: "ji",
    づ: "zu",
    で: "de",
    ど: "do",
    ば: "ba",
    び: "bi",
    ぶ: "bu",
    べ: "be",
    ぼ: "bo",
    ぱ: "pa",
    ぴ: "pi",
    ぷ: "pu",
    ぺ: "pe",
    ぽ: "po",
  };

  const [hiraganaRandom, setHiraganaRandom] = useState("あ");
  const [respuesta, setRespuesta] = useState(hiraganas[hiraganaRandom]);
  const [ansCount, setAnsCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60); // Tiempo restante en segundos
  const [firstAnswerGiven, setFirstAnswerGiven] = useState(false); // Variable para controlar la primera respuesta
  const [WrongAudio] = useState(new Audio(WrongSFX));
  const [CorrectAudio] = useState(new Audio(CorrectSFX));
  const [wrongCount, setWrongCount] = useState(0);

  useEffect(() => {
    if (firstAnswerGiven) {
      if (timeRemaining === 0) {
        actualizarPantalla("GameEnd"); // Finalizar el juego cuando el tiempo se agote
      }

      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1); // Actualizar el tiempo restante cada segundo
      }, 1000);

      return () => {
        clearInterval(timer); // Limpiar el intervalo cuando el componente se desmonte
      };
    }
  }, [timeRemaining, firstAnswerGiven, actualizarPantalla]);

  const hiraganaKeys = Object.keys(hiraganas);

  const randomizar = () => {
    const randomIndex = Math.floor(Math.random() * hiraganaKeys.length);
    const randomHiragana = hiraganaKeys[randomIndex];
    setHiraganaRandom(randomHiragana);
    setRespuesta(hiraganas[randomHiragana]);
    setFirstAnswerGiven(true); // Establecer que se ha dado la primera respuesta
  };

  const handleGoBack = () => {
    actualizarPantalla("Bienvenida");
  };

  const takeLife = () => {
    setWrongCount((prevCount) => prevCount + 1); // Incrementar el contador de respuestas incorrectas
  };

  const sumRightAns = () => {
    setAnsCount((prevCount) => prevCount + 1); // Incrementar el contador de respuestas correctas
    CorrectAudio.play();
  };

  return (
    <>
      <button onClick={handleGoBack}>Back to Menu</button>
      <p>Time Remaining: {timeRemaining}</p>
      <Hiragana hiraganaRandom={hiraganaRandom} />
      <Respuesta
        randomizar={randomizar}
        correctAnswer={respuesta}
        sumRightAns={sumRightAns}
        takeLife={takeLife}
      />
      <p>Correct answers: {ansCount}</p>
      <p>Wrong answers: {wrongCount}</p>
    </>
  );
}