import React, { useState } from "react";

export default function Respuesta({ randomizar, correctAnswer, takeLife, sumRightAns }) {
  const [respuesta, setRespuesta] = useState("");
  

  const handleChange = (event) => {
    setRespuesta(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (respuesta.trim() === "") {
      return;
    }
    checkAnswer();
    setRespuesta("");
    randomizar();
  };

  const checkAnswer = () =>{
    if(respuesta.toLowerCase() === correctAnswer){
      sumRightAns()
    } else{
      takeLife()
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingresa tu respuesta"
          value={respuesta}
          onChange={handleChange}
        />
        <button type="submit" disabled={respuesta.trim() === ""}>
          Enviar
        </button>
      </form>
    </div>
  );
}
