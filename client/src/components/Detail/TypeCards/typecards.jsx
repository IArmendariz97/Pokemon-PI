import React from "react";
import style from "./TypeCards.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
// import { connect } from "react-redux";

export default function TypeCards({ id, name, image, imageback }) {
  const images = [image, imageback];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const changeCard = (direction) => {
    if (direction === "left") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? prevIndex + 1 : prevIndex - 1
      );
    } else if (direction === "right") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? prevIndex - 1 : prevIndex + 1
      );
    }
  };
  console.log(images[currentImageIndex]);
  return (
    <div className={style.cardContainer}>
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
    </div>
  );
}
