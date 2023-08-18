import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/Home/home.jsx";
import Landing from "./components/Landing/landing.jsx";
import Nav from "./components/NavBar/navbar.jsx";
import Form from "./components/Form/form.jsx";
import Detail from "./components/Detail/detail.jsx";
import Type from "./components/Detail/types.jsx";
import axios from "axios";

import {
  setPokemons,
  addPokemon,
  deletePokemon,
} from "./redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pokemonsIniciales = useSelector((state) => state.pokemonsIniciales);

  function logout() {
    navigate("/");
  }
  function logIn() {
    navigate("/home");
  }

  async function enviarForm(pokemonData) {
    try {
      const backResponse = await axios.post(
        "http://localhost:3001/pokemons",
        pokemonData
      );
      console.log(backResponse.data);
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
  }

  async function onSearch(name) {
    try {
      const backRequest = await axios(
        `http://localhost:3001/pokemons/name?name=${name}`
      );
      const isPokemonAlreadyAdded = pokemonsIniciales.some(
        (pokemon) => pokemon.id === backRequest.data.id
      );
      if (isPokemonAlreadyAdded) {
        alert("El personaje ya esta en pantalla");
      } else {
        dispatch(addPokemon(backRequest.data));
      }
    } catch (error) {
      alert(error.message, "Than name may not exist");
    }
  }

  async function cargaPokemons() {
    try {
      const backRequest = await axios(`http://localhost:3001/pokemons/`);
      dispatch(setPokemons(backRequest.data));
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    cargaPokemons();
  }, [dispatch]);

  async function onClose(id) {
    navigate(-1);
  }
  function closeCard(id) {
    dispatch(deletePokemon(id));
  }

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && (
        <Nav
          cargaPokemons={cargaPokemons}
          onSearch={onSearch}
          logout={logout}
        />
      )}
      <Routes>
        <Route path="/home" element={<Home closeCard={closeCard} />} />
        <Route path="/detail/:id" element={<Detail onClose={onClose} />} />
        <Route path="/create" element={<Form enviarForm={enviarForm} />} />
        <Route path="/" element={<Landing logIn={logIn} />} />
        <Route path="/type/:id" element={<Type />} />
      </Routes>
    </div>
  );
}

export default App;
