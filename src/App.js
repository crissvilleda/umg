import "./App.css";
import { useState } from "react";
import umgIcono from "./umg.png";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <Container>
        <br />
        <br />
      <Row className="justify-content-center">
        <div className="div-title">
          <p> Pasar de infijo a posfijo </p>
          <img className="logo" src={umgIcono} alt="Único umg" />
          <br />
        </div>
      </Row>
      <Row className="justify-content-center">
        <Col md="6" lg="5">
          <Form onSubmit={onSubmit}>
            <div className="justify-content-start">
              <Form.Label className="text-left">Expresión infija:</Form.Label>
            </div>
            <Form.Control
              type="text"
              name="infija"
              value={value}
              placeholder="ingrese expresión"
              onChange={(e) => setValue(e.target.value)}
            />

            <br />
            <br />
            <Button type="submit" variant="primary">
              Pasar a posfija
            </Button>
          </Form>
          <br />
          <br />

          <span>Resultado:</span>
          <span>{resultado}</span>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
