import "./App.css";
import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [resultado, setResultado] = useState("");

  const onSubmit = (e) => {
    const operadores = ["+", "-", "*", "/", "^", "(", ")"];
    const sufijo = Array.from(value);
    const posfija = [];
    let pila = [];

    sufijo.forEach((item) => {
      if (operadores.includes(item)) {
        if (item !== ")") {
          if (pila.length > 0) {
            let dato = pila.pop();
            if (PE(item) > PP(dato)) {
              pila.push(dato);
              pila.push(item);
            } else {
              while (pila.length > 0 && PE(item) > PP(dato)) {
                posfija.push(dato);
                dato = pila.pop();
              }
              posfija.push(dato);
              pila.push(item);
            }
          } else {
            pila.push(item);
          }
        } else {
          let dato = pila.pop();
          while (pila.length > 0 && dato !== "(") {
            posfija.push(dato);
            dato = pila.pop();
          }
        }
      } else {
        posfija.push(item);
      }
    });

    // pila = pila.filter((item) => {
    //   if (item === "(") return false;
    //   return true;
    // });
    while (pila.length > 0) {
      const dato = pila.pop();
      posfija.push(dato);
    }

    // Set Resultado
    setResultado(posfija.join(""));

    e.preventDefault();
  };

  const PP = (value) => {
    if (value === "+" || value === "-") return 1;
    else if (value === "*" || value === "/") return 2;
    else if (value === "^") return 3;
    else return 0;
  };
  const PE = (value) => {
    if (value === "+" || value === "-") return 1;
    else if (value === "*" || value === "/") return 2;
    else if (value === "^") return 4;
    else if (value === "(") return 5;
    else return 0;
  };

  return (
    <div className="App">
      <div>
        <p> Pasar de infijo a posfijo </p>
        <br />
      </div>
      <form onSubmit={onSubmit}>
        <label>
          Infija:
          <input
            type="text"
            name="infija"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button type="submit">Pasar a posfija</button>
        <br />
        <br />

        <span>Resultado:</span>
        <span>{resultado}</span>
      </form>
    </div>
  );
}

export default App;
