import {
  FILTER_ORIGIN,
  FILTER_CARDS,
  ORDER,
  RESET,
  ADD_POKEMON,
  SET_POKEMONS,
  DELETE_POKEMON,
  SET_POKEMONS_TYPES,
} from "../actions/types.js";

const initialGlobalState = {
  pokemons: [],
  pokemonsIniciales: [],
  pokemonsTypes: [],
};

export default function rootReducer(state = initialGlobalState, action) {
  // Nos fijabamos por el TYPE de la accion
  switch (action.type) {
    case SET_POKEMONS_TYPES:
      return {
        ...state,
        pokemonsTypes: action.payload,
      };
    case SET_POKEMONS:
      return {
        ...state,
        pokemonsIniciales: action.payload,
        pokemons: action.payload,
      };
    case DELETE_POKEMON:
      return {
        ...state,
        pokemonsIniciales: state.pokemonsIniciales.filter(
          (p) => p.id !== action.payload
        ),
        pokemons: state.pokemons.filter((p) => p.id !== action.payload),
      };
    case ADD_POKEMON:
      return {
        ...state,
        pokemonsIniciales: [...state.pokemonsIniciales, action.payload],
        pokemons: [...state.pokemons, action.payload],
      };
    case FILTER_CARDS:
      return {
        ...state,
        pokemons: state.pokemonsIniciales.filter((p) =>
          p.types.some((type) => type.name === action.payload)
        ),
      };
    case FILTER_ORIGIN:
      return {
        ...state,
        pokemons: state.pokemonsIniciales.filter(
          (p) => p.origin === action.payload
        ),
      };
    case ORDER:
      // [{id: 8},{id: 6},{id: 4},1,7]
      //    a.id    b.id

      let copy = state.pokemonsIniciales.sort((a, b) => {
        if (action.payload === "A") {
          // ordenar de menor a mayor
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0; // Si son iguales, no los muevo de posición.
        } else if (action.payload === "Z") {
          // ordenar de mayor a menor
          if (a.name > b.name) return -1;
          if (b.name > a.name) return 1;
          return 0; // Si son iguales, no los muevo de posición.
        } else if (action.payload === "ATTACK-") {
          // ordenar de mayor a menor
          console.log(state.pokemons);
          if (a.attack > b.attack) return 1;
          if (a.attack < b.attack) return -1;
          return 0; // Si son iguales, no los muevo de posición.
        } else {
          // ordenar de menor a mayor
          if (a.attack > b.attack) return -1;
          if (b.attack > a.attack) return 1;
          return 0; // Si son iguales, no los muevo de posición.
        }
      });

      return {
        ...state,
        pokemons: copy,
      };

    case RESET:
      return {
        ...state,
        pokemons: state.pokemonsIniciales,
      };
    default:
      return { ...state };
  }
}
