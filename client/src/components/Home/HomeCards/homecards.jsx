import React from "react";
import style from "./HomeCards.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
// import { connect } from "react-redux";

export default function HomeCards({
  id,
  name,
  image,
  imageback,
  types,
  closeCard,
}) {
  const images = [image, imageback];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const changeCard = (direction) => {
    if (direction === "left") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? prevIndex - 1 : prevIndex + 1
      );
    } else if (direction === "right") {
      setCurrentImageIndex((prevIndex) =>
        direction === "left"
          ? prevIndex === 0
            ? images.length - 1
            : prevIndex - 1
          : prevIndex === images.length - 1
          ? 0
          : prevIndex + 1
      );
    }
  };
  console.log(images[currentImageIndex]);
  return (
    <div className={style.cardContainer}>
      {closeCard ? (
        <button className={style.closeButton} onClick={() => closeCard(id)}>
          X
        </button>
      ) : null}
      <div className={style.images}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={style.arrowIcon}
          onClick={() => changeCard("left")}
        />
        <Link to={`/detail/${id}`}>
          <img
            className={style.cardImage}
            src={images[currentImageIndex]}
            alt={name}
          />
        </Link>
        <FontAwesomeIcon
          icon={faArrowRight}
          className={style.arrowIcon}
          onClick={() => changeCard("right")}
        />
      </div>
      <h2 className={style.cardInfo}>{name}</h2>
      {types.map((type) => (
        <Link to={`/type/${type.id}`} typeId={type.id} className={style.type}>
          {type.name}
        </Link>
      ))}
    </div>
  );
}
