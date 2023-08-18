import React from "react";
import SearchBar from "./SearchBar/searchbar.jsx";
import style from "./Nav.module.css";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  return (
    <div className={style.container}>
      <Link className={style.link} to="/home">
        HOME
      </Link>
      <Link className={style.link} to="/create">
        CREATE POKEMON
      </Link>
      <SearchBar className={style.searchbar} onSearch={props.onSearch} />
      <button className={style.btn1} onClick={props.cargaPokemons}>
        NEW POKEMONS
      </button>
      <button className={style.btn} onClick={props.logout}>
        LOGOUT
      </button>
    </div>
  );
}
