import rootReducer from "./redux/reducers/index"; // Importa tu reducer
import * as types from "./redux/actions/types"; // Importa tus tipos de acciones

describe("Root Reducer", () => {
  const initialState = {
    pokemons: [],
    pokemonsIniciales: [],
    pokemonTypes: [],
  };

  it("should handle SET_POKEMONS action", () => {
    const action = {
      type: types.SET_POKEMONS,
      payload: [{ id: 1, name: "Pikachu" }],
    };

    // Act: Llamar al reducer con el estado inicial y la acción
    const newState = rootReducer(initialState, action);

    // Assert: Verificar que el estado se ha actualizado correctamente
    expect(newState.pokemons).toEqual(action.payload);
    expect(newState.pokemonsIniciales).toEqual(action.payload);
  });

  it("should handle DELETE_POKEMON action", () => {
    // Estado inicial con un Pokémon en la lista
    const stateWithPokemon = {
      ...initialState,
      pokemons: [{ id: 1, name: "Pikachu" }],
      pokemonsIniciales: [{ id: 1, name: "Pikachu" }],
    };
    const action = {
      type: types.DELETE_POKEMON,
      payload: 1,
    };

    // Act: Llamar al reducer con el estado modificado y la acción
    const newState = rootReducer(stateWithPokemon, action);

    // Assert: Verificar que el Pokémon ha sido eliminado
    expect(newState.pokemons).toEqual([]);
    expect(newState.pokemonsIniciales).toEqual([]);
  });
});
