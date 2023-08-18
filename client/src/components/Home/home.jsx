import React, { useState } from "react";
import HomeCards from "./HomeCards/homecards.jsx";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  filter,
  filterCards,
  orderCards,
  reset,
} from "../../redux/actions/actions.js";
export default function Home(props) {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const [booleano, setBooleano] = useState(false);

  function handleOrder(event) {
    dispatch(orderCards(event.target.value));
    setBooleano(!booleano);
  }
  function handleFilter(event) {
    if (event.target.value === "ALL") {
      dispatch(reset());
    } else {
      dispatch(filterCards(event.target.value));
    }
  }
  function handleFilter1(event) {
    if (event.target.value === "ALL") {
      dispatch(reset());
    } else {
      dispatch(filter(event.target.value));
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.selects}>
        <select className={styles.select} onChange={handleOrder}>
          <option value="A">A...Z</option>
          <option value="Z">Z...A</option>
          <option value="ATTACK+">Attack(+ -)</option>
          <option value="ATTACK-">Attack(- +)</option>
        </select>

        <select className={styles.select} onChange={handleFilter1}>
          <option value="ALL">ALL</option>
          <option value="api">API</option>
          <option value="db">DB</option>
        </select>

        <select className={styles.select} onChange={handleFilter}>
          <option value="ALL">ALL</option>
          <option value="normal">NORMAL</option>
          <option value="fighting">FIGHTING</option>
          <option value="flying">FLYING</option>
          <option value="poison">POISON</option>
          <option value="ground">GROUND</option>
          <option value="rock">ROCK</option>
          <option value="bug">BUG</option>
          <option value="ghost">GHOST</option>
          <option value="steel">STEEL</option>
          <option value="fire">FIRE</option>
          <option value="water">WATER</option>
          <option value="grass">GRASS</option>
          <option value="electric">ELECTRIC</option>
          <option value="psychic">PSYCHIC</option>
          <option value="ice">ICE</option>
          <option value="dragon">DRAGON</option>
          <option value="dark">DARK</option>
          <option value="fairy">FAIRY</option>
          <option value="unknown">UNKNOWN</option>
          <option value="shadow">SHADOW</option>
        </select>
      </div>
      <div className={styles.cardcontainer}>
        {pokemons?.map((p) => (
          <HomeCards
            key={p.id}
            id={p.id}
            name={p.name}
            image={p.image}
            imageback={p.imageback}
            types={p.types}
            closeCard={props.closeCard}
          />
        ))}
      </div>
    </div>
  );
}
