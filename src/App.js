import { useState } from "react";
import umgIcono from "./umg.png";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [value, setValue] = useState("");
  const [resultado, setResultado] = useState("");

  const onSubmit = (e) => {
    const operadores = ["+", "-", "*", "/", "^", "(", ")"];
    const infija = Array.from(value);
    const posfija = [];
    let pila = [];

    infija.forEach((item) => {
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
    <Container className="px-4" >
      <br />
      <br />
      <Row className="d-flex justify-content-center">
        <Col md="6" lg="5">
          <Row>
            <Col>
              <img className="logo" src={umgIcono} alt="Único umg" />
            </Col>
            <Col className="d-flex align-content-center align-items-center">
              <h4> Pasar expresiones de Infijo a Posfijo </h4>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center mt-2">
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
            <Button type="submit" variant="primary">
              Pasar a posfija
            </Button>
          </Form>
          <br />
          <br />
          <Row>
            <Col>
              <span>Resultado: </span>
            </Col>
            <Col>
              <span className="text-danger font-weight-bold">{resultado}</span>
            </Col>
          </Row>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Row>
            <span className="text-dark px-2">Creado por:</span>
          </Row>
          <Row>
            <span className="text-info px-2">
              Denis Heberto Crisostomo Villeda
            </span>
          </Row>
          <Row>
            <span className="text-info px-2">Karla Sánchez Borrayes</span>
          </Row>
          <Row>
            <span className="text-info px-2">Edwin Antonio Lopez Tema</span>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
