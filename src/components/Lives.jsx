import React from "react";

export default function Vidas({ lives }) {
  return (
    <div>
      <p className="Lives">
        {lives.map((vida, index) => (
          <span key={index}>{vida}</span>
        ))}
      </p>
    </div>
  );
}
