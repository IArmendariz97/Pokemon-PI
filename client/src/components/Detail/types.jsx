import TypeCards from "./TypeCards/typecards.jsx";
import styles from "./Types.module.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPokemonsTypes } from "../../redux/actions/actions.js";
import axios from "axios";

export default function Type() {
  const pokemonsTypes = useSelector((state) => state.pokemonsTypes);
  const location = useLocation();
  const pathname = location.pathname;
  const dispatch = useDispatch();
  // Para extraer el type ID de la URL
  const parts = pathname.split("/");
  const typeId = parts[2];
  console.log(typeId);
  useEffect(() => {
    // Llamar a cargaTypes solo cuando el componente se monte
    async function fetchData() {
      try {
        const backRequest = await axios(
          `http://localhost:3001/types/${typeId}`
        );
        dispatch(setPokemonsTypes(backRequest.data));
      } catch (error) {
        alert(error);
      }
    }

    fetchData();
  }, [dispatch, typeId]);
  console.log(pokemonsTypes);
  return (
    <div className={styles.container}>
      <div>
        {pokemonsTypes[0]?.types.map((type) => {
          if (type.id === typeId) {
            return <h1> {type.name}</h1>;
          }
          return null;
        })}
      </div>
      <div className={styles.cardcontainer}>
        {pokemonsTypes?.map((p) => (
          <TypeCards
            key={p.id}
            id={p.id}
            name={p.name}
            image={p.image}
            imageback={p.imageback}
            types={p.types}
          />
        ))}
      </div>
    </div>
  );
}
