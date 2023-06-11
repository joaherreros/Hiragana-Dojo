import React, { useState } from "react";
import Respuesta from "./Respuesta";
import Vidas from "./Vidas";
import Hiragana from "./hiragana";
import CorrectSFX from "../assets/sfx/correctsfx.mp3"
import WrongSFX from "../assets/sfx/wrongsfx.mp3"

export default function Game({ actualizarPantalla }) {
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

  const hiraganaKeys = Object.keys(hiraganas);

  const [hiraganaRandom, setHiraganaRandom] = useState("あ");
  const [respuesta, setRespuesta] = useState(hiraganas[hiraganaRandom]);
  const [lives, setLives] = useState(["❤️", "❤️", "❤️"]);
  const [ansCount, setAnsCount] = useState(0);
  const [WrongAudio] = useState(new Audio(WrongSFX));
  const [CorrectAudio] = useState(new Audio(CorrectSFX));

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
      actualizarPantalla("GameEnd");
    }
    WrongAudio.play()
  };

  const sumRightAns = () => {
    setAnsCount(ansCount + 1);
    CorrectAudio.play()
  };

  return (
    <>
      <button onClick={handleGoBack}>Back to Menu</button>
      <Vidas lives={lives} />
      <Hiragana hiraganaRandom={hiraganaRandom} />
      <Respuesta
        randomizar={randomizar}
        correctAnswer={respuesta}
        takeLife={takeLife}
        sumRightAns={sumRightAns}
      />
      <p>Correct answers: {ansCount}</p>
    </>
  );
}
