import React, { useState } from "react";
import style from "./SearchBar.module.css";

export default function SearchBar(props) {
  console.log(props);
  const [name, setName] = useState("");

  const handleChange = (evento) => {
    // console.log("funciona el handle", evento.target.value);
    setName(evento.target.value);
  };

  return (
    <div className={style.container}>
      <input
        className={style.input}
        type="text"
        placeholder="Agrega un pokemon..."
        onChange={handleChange}
        value={name}
      />
      <button
        className={style.button}
        onClick={() => {
          props.onSearch(name);
        }}
      >
        Add pokemon
      </button>
    </div>
  );
}
