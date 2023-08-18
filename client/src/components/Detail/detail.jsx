import style from "./Detail.module.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

//"/detail/:id" --> 55

export default function Detail(props) {
  const { id } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`http://localhost:3001/pokemons/${id}`);
        const { data } = response;
        setPokemonDetail(data);
      } catch (error) {
        window.alert("Error al obtener los datos");
      }
    };

    fetchData();
  }, [id]);
  const backgroundImageUrl = pokemonDetail.image2 || pokemonDetail.image;
  const inlineStyle = {
    "--background-image-url": `url(${backgroundImageUrl})`,
  };
  return (
    <div
      className={`${style.container} ${style.backgroundImage}`}
      style={inlineStyle}
    >
      {props.onClose ? (
        <button className={style.closeButton} onClick={() => props.onClose(id)}>
          X
        </button>
      ) : null}

      <h3 className={style.nombre}>
        {pokemonDetail.name && pokemonDetail.name}
      </h3>

      <section>
        <span> Life: {pokemonDetail.life}</span>
        <span> Attack: {pokemonDetail.attack}</span>
        <span> Defense: {pokemonDetail.defense}</span>
        <span> Speed: {pokemonDetail.speed}</span>
        <span> Height: {pokemonDetail.height}</span>
        <span> Weight: {pokemonDetail.weight}</span>
      </section>
    </div>
  );
}
