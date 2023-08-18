import React, { useState } from "react";
import style from "./Form.module.css";

export default function Form(props) {
  const initialState = {
    id: "",
    name: "",
    image: "",
    imageback: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  };
  const [pokemonData, setPokemonData] = useState(initialState);
  const [errors, setErrors] = useState({});

  let id = 1303;

  function handleSubmit(event) {
    pokemonData.id = id;
    id++;
    event.preventDefault();
    props.enviarForm(pokemonData);
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      // Si es un checkbox, manejar la selección de tipos
      if (checked) {
        setPokemonData({
          ...pokemonData,
          types: [...pokemonData.types, value], // Agregar el tipo seleccionado
        });
      } else {
        setPokemonData({
          ...pokemonData,
          types: pokemonData.types.filter((type) => type !== value), // Remover el tipo deseleccionado
        });
      }
    } else {
      // Si no es un checkbox, manejar otros campos
      setPokemonData({
        ...pokemonData,
        [name]: value,
      });
      setErrors(validate({ ...pokemonData, [name]: value }));
    }
  }
  function limpiarCampos() {
    setPokemonData(initialState);
  }
  function validate(datos) {
    const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    let incorrect = {};
    if (datos.name.length <= 4) {
      incorrect.name = "Name must be 5 characters long at least";
    } else if (!regex.test(datos.image)) {
      incorrect.image = "You must enter a valid url";
    }
    if (!regex.test(datos.imageback)) {
      incorrect.imageback = "You must enter a valid url";
    }
    if (datos.life > 260 || datos.life < 0) {
      incorrect.life = "Life must be between 0 and 100";
    }
    if (datos.attack > 200 || datos.attack < 0) {
      incorrect.attack = "Attack must be between 0 and 200";
    }
    if (datos.defense > 260 || datos.defense < 0) {
      incorrect.defense = "Defense must be between 0 and 260";
    }
    if (datos.speed > 150 || datos.speed < 0) {
      incorrect.speed = "Speed must be between 0 and 150";
    }
    if (datos.height > 180 || datos.height < 0) {
      incorrect.height = "Height must be between 0 and 180";
    }
    if (datos.weight > 3000 || datos.weight < 0) {
      incorrect.weight = "Weight must be between 0 and 3000";
    }
    return incorrect;
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>Name</label>
        <input
          key="1"
          name="name"
          onChange={handleChange}
          value={pokemonData.name}
          type="text"
          placeholder="name..."
        />

        {errors.name ? (
          <span className={style.error}>{errors.name}</span>
        ) : null}
        <div className={style.columns}>
          <div className={style.column}>
            <label className={style.label}>Front Image</label>
            <input
              key="2"
              name="image"
              onChange={handleChange}
              value={pokemonData.image}
              type="url"
              placeholder="url de la imagen..."
            />

            {errors.image ? (
              <span className={style.error}>{errors.image}</span>
            ) : null}

            <label className={style.label}>Back Image</label>
            <input
              key="3"
              name="imageback"
              onChange={handleChange}
              value={pokemonData.imageback}
              type="url"
              placeholder="back image..."
            />
            {errors.imageback ? (
              <span className={style.error}>{errors.imageback}</span>
            ) : null}

            <label className={style.label}>Life</label>
            <input
              key="4"
              name="life"
              onChange={handleChange}
              value={pokemonData.life}
              type="number"
              placeholder="life..."
            />

            {errors.life ? (
              <span className={style.error}>{errors.life}</span>
            ) : null}

            <label className={style.label}>Attack</label>
            <input
              key="5"
              name="attack"
              onChange={handleChange}
              value={pokemonData.attack}
              type="number"
              placeholder="attack..."
            />

            {errors.attack ? (
              <span className={style.error}>{errors.attack}</span>
            ) : null}
          </div>
          <div className={style.column}>
            <label className={style.label}>Defense</label>
            <input
              key="6"
              name="defense"
              onChange={handleChange}
              value={pokemonData.defense}
              type="number"
              placeholder="defense..."
            />

            {errors.defense ? (
              <span className={style.error}>{errors.defense}</span>
            ) : null}
            <label className={style.label}>Speed</label>
            <input
              key="7"
              name="speed"
              onChange={handleChange}
              value={pokemonData.speed}
              type="number"
              placeholder="speed..."
            />
            {errors.speed ? (
              <span className={style.error}>{errors.speed}</span>
            ) : null}
            <label className={style.label}>Height</label>
            <input
              key="8"
              name="height"
              onChange={handleChange}
              value={pokemonData.height}
              type="number"
              placeholder="height..."
            />
            {errors.height ? (
              <span className={style.error}>{errors.height}</span>
            ) : null}
            <label className={style.label}>Weight</label>
            <input
              key="9"
              name="weight"
              onChange={handleChange}
              value={pokemonData.weight}
              type="number"
              placeholder="weight..."
            />
            {errors.weight ? (
              <span className={style.error}>{errors.weight}</span>
            ) : null}
          </div>
        </div>
        <div className={style.containerCB}>
          <label className={style.label}>Types:</label>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              value="fire"
              onChange={handleChange}
              checked={pokemonData.types.includes("fire")}
            />
            <label className={style.label}>Fire</label>
          </div>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              value="normal"
              onChange={handleChange}
              checked={pokemonData.types.includes("normal")}
            />
            <label className={style.label}>Normal</label>
          </div>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              value="fighting"
              onChange={handleChange}
              checked={pokemonData.types.includes("fighting")}
            />
            <label className={style.label}>Fighting</label>
          </div>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              value="poison"
              onChange={handleChange}
              checked={pokemonData.types.includes("poison")}
            />
            <label className={style.label}>Poison</label>
          </div>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              value="ground"
              onChange={handleChange}
              checked={pokemonData.types.includes("ground")}
            />
            <label className={style.label}>Ground</label>
          </div>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              value="rock"
              onChange={handleChange}
              checked={pokemonData.types.includes("rock")}
            />
            <label className={style.label}>Rock</label>
          </div>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              value="bug"
              onChange={handleChange}
              checked={pokemonData.types.includes("bug")}
            />
            <label className={style.label}>Bug</label>
          </div>
          <div>
            <input
              type="checkbox"
              value="ghost"
              onChange={handleChange}
              checked={pokemonData.types.includes("ghost")}
            />
            <label className={style.label}>Ghost</label>
          </div>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              value="steel"
              onChange={handleChange}
              checked={pokemonData.types.includes("steel")}
            />
            <label className={style.label}>Steel</label>
          </div>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              value="water"
              onChange={handleChange}
              checked={pokemonData.types.includes("water")}
            />
            <label className={style.label}>Water</label>
          </div>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              value="grass"
              onChange={handleChange}
              checked={pokemonData.types.includes("grass")}
            />
            <label className={style.label}>Grass</label>
          </div>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              value="electric"
              onChange={handleChange}
              checked={pokemonData.types.includes("electric")}
            />
            <label className={style.label}>Electric</label>
          </div>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              value="psychic"
              onChange={handleChange}
              checked={pokemonData.types.includes("psychic")}
            />
            <label className={style.label}>Psychic</label>
          </div>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              value="ice"
              onChange={handleChange}
              checked={pokemonData.types.includes("ice")}
            />
            <label className={style.label}>Ice</label>
          </div>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              value="dragon"
              onChange={handleChange}
              checked={pokemonData.types.includes("dragon")}
            />
            <label className={style.label}>Dragon</label>
          </div>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              value="dark"
              onChange={handleChange}
              checked={pokemonData.types.includes("dark")}
            />
            <label className={style.label}>Dark</label>
          </div>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              value="fairy"
              onChange={handleChange}
              checked={pokemonData.types.includes("fairy")}
            />
            <label className={style.label}>Fairy</label>
          </div>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              value="unknown"
              onChange={handleChange}
              checked={pokemonData.types.includes("unknown")}
            />
            <label className={style.label}>Unkown</label>
          </div>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              value="shadow"
              onChange={handleChange}
              checked={pokemonData.types.includes("shadow")}
            />
            <label className={style.label}>Shadow</label>
          </div>
        </div>
        <div className={style.buttons}>
          <button className={style.submitButton} onClick={limpiarCampos}>
            Limpiar
          </button>
          <input className={style.submitButton} type="submit"></input>
        </div>
      </form>
    </div>
  );
}
