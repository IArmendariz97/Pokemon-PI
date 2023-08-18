import {
  FILTER_ORIGIN,
  FILTER_CARDS,
  ORDER,
  RESET,
  SET_POKEMONS,
  ADD_POKEMON,
  DELETE_POKEMON,
  SET_POKEMONS_TYPES,
} from "./types.js";

export function setPokemons(pokemons) {
  return { type: SET_POKEMONS, payload: pokemons };
}
export function setPokemonsTypes(pokemons) {
  return { type: SET_POKEMONS_TYPES, payload: pokemons };
}
export function addPokemon(pokemon) {
  return { type: ADD_POKEMON, payload: pokemon };
}

export function deletePokemon(id) {
  return { type: DELETE_POKEMON, payload: id };
}
export function filterCards(type) {
  return { type: FILTER_CARDS, payload: type };
}

export function filter(origin) {
  return { type: FILTER_ORIGIN, payload: origin };
}

export function orderCards(order) {
  return { type: ORDER, payload: order };
}

export function reset() {
  return { type: RESET };
}
