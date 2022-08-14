import React, { useState, useEffect } from "react";

function Scenary() {
  const [map, setMap] = useState(false);
  const [ship, setShip] = useState();
  const [small, setSmall] = useState([]);
  const [medium, setMedium] = useState([]);
  const [large, setLarge] = useState([]);

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  // Los barcos predeterminados de la IA (luego serán aleatorios)
  const ships = {
    small: ["A2", "A3"],
    medium: ["H4", "I4", "J4"],
    large: ["C2", "D2", "E2", "F2"],
  };

 
  // Escucha si están todos los barcos

  useEffect(() => {
    if (small.length == 1) {
      console.log("cambio");
    }
  });

  function jugar() {
    console.log(small);
    console.log(medium);
    console.log(large);
    console.log("Aparece 2º Panel");
  }

  // Para pintar los barcos
  function pintar(e) {
    // Saber que tabla es
    var table = document.querySelector(`.${e}`).parentNode.parentNode.parentNode
      .id;
    // Saber que cuadro es
    var color = document.querySelector(`#${table} .${e}`).style.background;

    //! ---------  BARCO SMALL  --------- //

    const smallPaint = color == "" && ship == "small" && small.length < 2;
    const smallClear = color == "rgb(203, 203, 203)" && ship == "small";

    if (smallPaint) {
      // Preparación de las coordenadas seleccionadas
      const newE = e.split("f");
      console.log(newE[0]);

      // coorLeter[0] la letra
      const coorLeter = newE[0].split(newE[0][1]);
      // coorNum[1] el numero
      const coorNum = newE[0].split(newE[0][0]);

      // Preparación de las coordenadas guardadas del barco // Si ya tiene una casilla elegida
      if (small.length >= 1) {
        // coorLeterShip[0] coordenadas sin la f
        const firstCoordShip = small[0].split("f");
        // coorLeterShip[0]la letra
        const coorLeterShip = firstCoordShip[0].split(firstCoordShip[0][1]);
        // coorNumShip[1] el número
        const coorNumShip = firstCoordShip[0].split(firstCoordShip[0][0]);

        const fila =
          coorLeterShip[0] + (parseInt(coorNumShip[1]) + 1) ==
            coorLeter[0] + parseInt(coorNum[1]) ||
          coorLeterShip[0] + (parseInt(coorNumShip[1]) - 1) ==
            coorLeter[0] + parseInt(coorNum[1]);

        const column =
          String.fromCharCode(coorLeterShip[0].charCodeAt() + 1) +
            coorNumShip[1] ==
            String.fromCharCode(coorLeter[0].charCodeAt()) + coorNum[1] ||
          String.fromCharCode(coorLeterShip[0].charCodeAt() - 1) +
            coorNumShip[1] ==
            String.fromCharCode(coorLeter[0].charCodeAt()) + coorNum[1];

        if (fila || column) {
          document.querySelector(`#${table} .${e}`).style.background =
            "rgb(203, 203, 203)";
          small.push(e);
          setSmall(small);
          // console.log(small);
          // console.log(yours.small);
        }
      } else {
        document.querySelector(`#${table} .${e}`).style.background =
          "rgb(203, 203, 203)";
        small.push(e);
        setSmall(small);
        // console.log(yours.small);
      }
    }

    if (smallClear) {
      document.querySelector(`#${table} .${e}`).style.background = "";
      var filtro = small.filter((item) => item !== e);
      setSmall(filtro);
      // console.log(yours.small);
    }

    //! --------- BARCO MEDIO ---------//

    const mediumPaint = color == "" && ship == "medium" && medium.length < 3;
    const mediumClear = color == "rgb(152, 152, 153)" && ship == "medium";

    if (mediumPaint) {
      // Preparación de las coordenadas seleccionadas
      const newEM = e.split("f");
      // console.log(newEM[0]);

      // coorLeter[0] la letra
      const coorLeterM = newEM[0].split(newEM[0][1]);
      // coorNum[1] el numero
      const coorNumM = newEM[0].split(newEM[0][0]);

      if (medium.length == 1) {
        // coorLeterShipM[0] coordenadas sin la f
        const firstCoordShipM = medium[0].split("f");
        // coorLeterShipM[0]la letra
        const coorLeterShipM = firstCoordShipM[0].split(firstCoordShipM[0][1]);
        // coorNumShipM[1] el número
        const coorNumShipM = firstCoordShipM[0].split(firstCoordShipM[0][0]);

        const filaM =
          coorLeterShipM[0] + (parseInt(coorNumShipM[1]) + 1) ==
            coorLeterM[0] + parseInt(coorNumM[1]) ||
          coorLeterShipM[0] + (parseInt(coorNumShipM[1]) - 1) ==
            coorLeterM[0] + parseInt(coorNumM[1]);

        const columnM =
          String.fromCharCode(coorLeterShipM[0].charCodeAt() + 1) +
            coorNumShipM[1] ==
            String.fromCharCode(coorLeterM[0].charCodeAt()) + coorNumM[1] ||
          String.fromCharCode(coorLeterShipM[0].charCodeAt() - 1) +
            coorNumShipM[1] ==
            String.fromCharCode(coorLeterM[0].charCodeAt()) + coorNumM[1];

        if (filaM || columnM) {
          document.querySelector(`#${table} .${e}`).style.background =
            "rgb(152, 152, 153)";
          medium.push(e);
          medium.sort();
          setMedium(medium);
          // console.log(yours.medium);
        }
      } else if (medium.length == 2) {
        //! Primera coordenada

        // coorLeterShipM[0] coordenadas sin la f
        const firstCoordShipM = medium[0].split("f");
        // coorLeterShipM[0] la letra
        const coorLeterShipM = firstCoordShipM[0].split(firstCoordShipM[0][1]);
        // coorNumShipM[1] el número
        const coorNumShipM = firstCoordShipM[0].split(firstCoordShipM[0][0]);

        //! Segunda coordenada

        // seCoordShipM[0] coordenadas sin la f
        const seCoordShipM = medium[1].split("f");
        // seCoorLeterShipM[0] la letra
        const seCoorLeterShipM = seCoordShipM[0].split(seCoordShipM[0][1]);
        // seCoorNumShipM[1] el número
        const seCoorNumShipM = seCoordShipM[0].split(seCoordShipM[0][0]);

        const orientationX = coorLeterShipM[0] == seCoorLeterShipM[0];
        const orientationY = coorNumShipM[1] == seCoorNumShipM[1];
        const direccionX = coorNumShipM[1] < seCoorNumShipM[1];
        const direccionY = coorLeterShipM[0] > seCoorLeterShipM[0];
        // console.log(direccionY)

        if (orientationX && direccionX == true) {
          const filaM =
            coorLeterShipM[0] + (parseInt(coorNumShipM[1]) - 1) ==
              coorLeterM[0] + parseInt(coorNumM[1]) ||
            coorLeterShipM[0] + (parseInt(coorNumShipM[1]) + 2) ==
              coorLeterM[0] + parseInt(coorNumM[1]);
          if (filaM) {
            document.querySelector(`#${table} .${e}`).style.background =
              "rgb(152, 152, 153)";
            medium.push(e);
            medium.sort();
            setMedium(medium);
            console.log(medium);
          }
        } else if (orientationX && direccionX == false) {
          const filaM =
            coorLeterShipM[0] + (parseInt(coorNumShipM[1]) + 1) ==
              coorLeterM[0] + parseInt(coorNumM[1]) ||
            coorLeterShipM[0] + (parseInt(coorNumShipM[1]) - 2) ==
              coorLeterM[0] + parseInt(coorNumM[1]);
          if (filaM) {
            document.querySelector(`#${table} .${e}`).style.background =
              "rgb(152, 152, 153)";
            medium.push(e);
            medium.sort();
            setMedium(medium);
            console.log(medium);
          }
        }

        if (orientationY && direccionY == true) {
          const columnM =
            String.fromCharCode(coorLeterShipM[0].charCodeAt() + 1) +
              coorNumShipM[1] ==
              String.fromCharCode(coorLeterM[0].charCodeAt()) + coorNumM[1] ||
            String.fromCharCode(coorLeterShipM[0].charCodeAt() - 2) +
              coorNumShipM[1] ==
              String.fromCharCode(coorLeterM[0].charCodeAt()) + coorNumM[1];

          console.log(
            String.fromCharCode(coorLeterShipM[0].charCodeAt() + 1) +
              coorNumShipM[1]
          );
          console.log(
            String.fromCharCode(coorLeterShipM[0].charCodeAt() - 2) +
              coorNumShipM[1]
          );

          if (columnM) {
            document.querySelector(`#${table} .${e}`).style.background =
              "rgb(152, 152, 153)";
            medium.push(e);
            medium.sort();
            setMedium(medium);
            console.log(medium);
          }
        } else if (orientationY && direccionY == false) {
          const columnM =
            String.fromCharCode(coorLeterShipM[0].charCodeAt() - 1) +
              coorNumShipM[1] ==
              String.fromCharCode(coorLeterM[0].charCodeAt()) + coorNumM[1] ||
            String.fromCharCode(coorLeterShipM[0].charCodeAt() + 2) +
              coorNumShipM[1] ==
              String.fromCharCode(coorLeterM[0].charCodeAt()) + coorNumM[1];

          console.log(
            String.fromCharCode(coorLeterShipM[0].charCodeAt() - 1) +
              coorNumShipM[1]
          );
          console.log(
            String.fromCharCode(coorLeterShipM[0].charCodeAt() + 2) +
              coorNumShipM[1]
          );
          if (columnM) {
            document.querySelector(`#${table} .${e}`).style.background =
              "rgb(152, 152, 153)";
            medium.push(e);
            medium.sort();
            setMedium(medium);
            console.log(medium);
          }
        }
      } else {
        document.querySelector(`#${table} .${e}`).style.background =
          "rgb(152, 152, 153)";
        medium.push(e);
        medium.sort();
        setMedium(medium);
        console.log(medium);
      }
    }
    if (mediumClear) {
      if (medium.length == 3 && e == medium[1]) {
        for (let i = 0; i < medium.length; i++) {
          document.querySelector(`#${table} .${medium[i]}`).style.background =
            "";
        }
        setMedium([]);
        console.log(large);
        console.log("centro");
      } else {
        document.querySelector(`#${table} .${e}`).style.background = "";
        var filtro2 = medium.filter((item) => item !== e);
        setMedium(filtro2);
        // console.log(yours.medium);
      }
    }

    //! --------- BARCO LARGO ---------//

    const largePaint = color == "" && ship == "large" && large.length < 4;
    const largeClear = color == "rgb(65, 65, 65)" && ship == "large";

    if (largeClear) {
      if (large.length == 3 && e == large[1]) {
        for (let i = 0; i < large.length; i++) {
          document.querySelector(`#${table} .${large[i]}`).style.background =
            "";
        }

        setLarge([]);
        console.log(large);
        console.log("centro");
      } else if ((large.length == 4 && e == large[1]) || e == large[2]) {
        for (let i = 0; i < large.length; i++) {
          document.querySelector(`#${table} .${large[i]}`).style.background =
            "";
        }
        setLarge([]);
        console.log(large);
        console.log("centro");
      } else {
        document.querySelector(`#${table} .${e}`).style.background = "";
        var filtro2 = large.filter((item) => item !== e);
        setLarge(filtro2);
      }
    }

    if (largePaint) {
      // Preparación de las coordenadas seleccionadas
      const newEL = e.split("f");
      // console.log(newEM[0]);

      // coorLeterL[0] la letra
      const coorLeterL = newEL[0].split(newEL[0][1]);
      // coorNumL[1] el numero
      const coorNumL = newEL[0].split(newEL[0][0]);

      if (large.length == 1) {
        // coorLeterShipM[0] coordenadas sin la f
        const firstCoordShipM = large[0].split("f");
        // coorLeterShipM[0]la letra
        const coorLeterShipM = firstCoordShipM[0].split(firstCoordShipM[0][1]);
        // coorNumShipM[1] el número
        const coorNumShipM = firstCoordShipM[0].split(firstCoordShipM[0][0]);

        const filaM =
          coorLeterShipM[0] + (parseInt(coorNumShipM[1]) + 1) ==
            coorLeterL[0] + parseInt(coorNumL[1]) ||
          coorLeterShipM[0] + (parseInt(coorNumShipM[1]) - 1) ==
            coorLeterL[0] + parseInt(coorNumL[1]);

        const columnM =
          String.fromCharCode(coorLeterShipM[0].charCodeAt() + 1) +
            coorNumShipM[1] ==
            String.fromCharCode(coorLeterL[0].charCodeAt()) + coorNumL[1] ||
          String.fromCharCode(coorLeterShipM[0].charCodeAt() - 1) +
            coorNumShipM[1] ==
            String.fromCharCode(coorLeterL[0].charCodeAt()) + coorNumL[1];

        if (filaM || columnM) {
          document.querySelector(`#${table} .${e}`).style.background =
            "rgb(65, 65, 65)";
          large.push(e);
          large.sort();
          setLarge(large);
          console.log(large);
        }
      } else if (large.length == 2) {
        //! Primera coordenada

        // coorLeterShipM[0] coordenadas sin la f
        const firstCoordShipM = large[0].split("f");
        // coorLeterShipM[0] la letra
        const coorLeterShipM = firstCoordShipM[0].split(firstCoordShipM[0][1]);
        // coorNumShipM[1] el número
        const coorNumShipM = firstCoordShipM[0].split(firstCoordShipM[0][0]);

        //! Segunda coordenada

        // seCoordShipM[0] coordenadas sin la f
        const seCoordShipM = large[1].split("f");
        // seCoorLeterShipM[0] la letra
        const seCoorLeterShipM = seCoordShipM[0].split(seCoordShipM[0][1]);
        // seCoorNumShipM[1] el número
        const seCoorNumShipM = seCoordShipM[0].split(seCoordShipM[0][0]);

        const orientationX = coorLeterShipM[0] == seCoorLeterShipM[0];
        const orientationY = coorNumShipM[1] == seCoorNumShipM[1];
        const direccionX = coorNumShipM[1] < seCoorNumShipM[1];
        const direccionY = coorLeterShipM[0] > seCoorLeterShipM[0];
        // console.log(direccionY)

        if (orientationX && direccionX == true) {
          const filaM =
            coorLeterShipM[0] + (parseInt(coorNumShipM[1]) - 1) ==
              coorLeterL[0] + parseInt(coorNumL[1]) ||
            coorLeterShipM[0] + (parseInt(coorNumShipM[1]) + 2) ==
              coorLeterL[0] + parseInt(coorNumL[1]);
          if (filaM) {
            document.querySelector(`#${table} .${e}`).style.background =
              "rgb(65, 65, 65)";
            large.push(e);
            large.sort();
            setLarge(large);
            console.log(large);
          }
        } else if (orientationX && direccionX == false) {
          const filaM =
            coorLeterShipM[0] + (parseInt(coorNumShipM[1]) + 1) ==
              coorLeterL[0] + parseInt(coorNumL[1]) ||
            coorLeterShipM[0] + (parseInt(coorNumShipM[1]) - 2) ==
              coorLeterL[0] + parseInt(coorNumL[1]);
          if (filaM) {
            document.querySelector(`#${table} .${e}`).style.background =
              "rgb(65, 65, 65)";
            large.push(e);
            large.sort();
            setLarge(large);
            console.log(large);
          }
        }

        if (orientationY && direccionY == true) {
          const columnM =
            String.fromCharCode(coorLeterShipM[0].charCodeAt() + 1) +
              coorNumShipM[1] ==
              String.fromCharCode(coorLeterL[0].charCodeAt()) + coorNumL[1] ||
            String.fromCharCode(coorLeterShipM[0].charCodeAt() - 2) +
              coorNumShipM[1] ==
              String.fromCharCode(coorLeterL[0].charCodeAt()) + coorNumL[1];

          if (columnM) {
            document.querySelector(`#${table} .${e}`).style.background =
              "rgb(65, 65, 65)";
            large.push(e);
            large.sort();
            setLarge(large);
            console.log(large);
          }
        } else if (orientationY && direccionY == false) {
          const columnM =
            String.fromCharCode(coorLeterShipM[0].charCodeAt() - 1) +
              coorNumShipM[1] ==
              String.fromCharCode(coorLeterL[0].charCodeAt()) + coorNumL[1] ||
            String.fromCharCode(coorLeterShipM[0].charCodeAt() + 2) +
              coorNumShipM[1] ==
              String.fromCharCode(coorLeterL[0].charCodeAt()) + coorNumL[1];

          if (columnM) {
            document.querySelector(`#${table} .${e}`).style.background =
              "rgb(65, 65, 65)";
            large.push(e);
            large.sort();
            setLarge(large);
            console.log(large);
          }
        }
      } else if (large.length == 3) {
        //! Primera coordenada

        // coorLeterShipM[0] coordenadas sin la f
        const firstCoordShipM = large[0].split("f");
        // coorLeterShipM[0] la letra
        const coorLeterShipM = firstCoordShipM[0].split(firstCoordShipM[0][1]);
        // coorNumShipM[1] el número
        const coorNumShipM = firstCoordShipM[0].split(firstCoordShipM[0][0]);

        //! Segunda coordenada

        // seCoordShipM[0] coordenadas sin la f
        const seCoordShipM = large[1].split("f");
        // seCoorLeterShipM[0] la letra
        const seCoorLeterShipM = seCoordShipM[0].split(seCoordShipM[0][1]);
        // seCoorNumShipM[1] el número
        const seCoorNumShipM = seCoordShipM[0].split(seCoordShipM[0][0]);

        //! Tercera coordenada
        // seCoordShipM[0] coordenadas sin la f.
        const teCoordShipM = large[2].split("f");
        // teCoorLeterShipM[0] la letra.
        const teCoorLeterShipM = teCoordShipM[0].split(teCoordShipM[0][1]);
        // teCoorNumShipM[1] el número.
        const teCoorNumShipM = teCoordShipM[0].split(teCoordShipM[0][0]);

        //! Orientación X e Y

        // coorNumShipM[1] : es el numero de la primera posición.
        // coorLeterL[0]: La letra ultima clickeada || coorNumL[1]: EL número de la última clickeada.
        const orientationX = coorLeterShipM[0] == coorLeterL[0];
        const orientationY = coorNumShipM[1] == coorNumL[1];

        // teCoorNumShipM[1]: El numero de la tercera || teCoorLeterShipM[0]: La letra de la tercera.
        const direccionX = coorNumShipM[1] < teCoorNumShipM[1];
        const direccionY = coorLeterShipM[0] > teCoorLeterShipM[0];

        if (orientationX && direccionX == true) {
          const filaL =
            coorLeterShipM[0] + (parseInt(coorNumShipM[1]) - 1) ==
              coorLeterL[0] + parseInt(coorNumL[1]) ||
            coorLeterShipM[0] + (parseInt(coorNumShipM[1]) + 3) ==
              coorLeterL[0] + parseInt(coorNumL[1]);
          if (filaL) {
            document.querySelector(`#${table} .${e}`).style.background =
              "rgb(65, 65, 65)";
            large.push(e);
            large.sort();
            setLarge(large);
            console.log(large);
          }
        } else if (orientationX && direccionX == false) {
          const filaL =
            coorLeterShipM[0] + (parseInt(coorNumShipM[1]) + 1) ==
              coorLeterL[0] + parseInt(coorNumL[1]) ||
            coorLeterShipM[0] + (parseInt(coorNumShipM[1]) - 3) ==
              coorLeterL[0] + parseInt(coorNumL[1]);
          if (filaL) {
            document.querySelector(`#${table} .${e}`).style.background =
              "rgb(65, 65, 65)";
            large.push(e);
            large.sort();
            setLarge(large);
            console.log(large);
          }
        }

        if (orientationY && direccionY == true) {
          const columnM =
            String.fromCharCode(coorLeterShipM[0].charCodeAt() + 1) +
              coorNumShipM[1] ==
              String.fromCharCode(coorLeterL[0].charCodeAt()) + coorNumL[1] ||
            String.fromCharCode(coorLeterShipM[0].charCodeAt() - 3) +
              coorNumShipM[1] ==
              String.fromCharCode(coorLeterL[0].charCodeAt()) + coorNumL[1];

          if (columnM) {
            document.querySelector(`#${table} .${e}`).style.background =
              "rgb(65, 65, 65)";
            large.push(e);
            large.sort();
            setLarge(large);
            console.log(large);
          }
        } else if (orientationY && direccionY == false) {
          const columnM =
            String.fromCharCode(coorLeterShipM[0].charCodeAt() - 1) +
              coorNumShipM[1] ==
              String.fromCharCode(coorLeterL[0].charCodeAt()) + coorNumL[1] ||
            String.fromCharCode(coorLeterShipM[0].charCodeAt() + 3) +
              coorNumShipM[1] ==
              String.fromCharCode(coorLeterL[0].charCodeAt()) + coorNumL[1];

          if (columnM) {
            document.querySelector(`#${table} .${e}`).style.background =
              "rgb(65, 65, 65)";
            large.push(e);
            large.sort();
            setLarge(large);
            console.log(large);
          }
        }
      } else {
        document.querySelector(`#${table} .${e}`).style.background =
          "rgb(65, 65, 65)";
        large.push(e);
        large.sort();
        setLarge(large);
        console.log(large);
      }
    }
  }
  //! Cuando se marca en el tablero los barcos

  function mark(e) {
    // [!map] Para que aparezca solo el primer tablero // [e.length >= 3]: Para que no se clikee en los numeros y letras
    if (!map && e.length >= 3) {
      if (ship == "small") {
        pintar(e);
      } else if (ship == "medium") {
        pintar(e);
      } else {
        pintar(e);
      }
    } else if (
      document.querySelector(`.${e}`).parentNode.parentNode.parentNode.id ==
      "atack"
    ) {
      var table = document.querySelector(`.${e}`).parentNode.parentNode
        .parentNode.id;
      console.log(table);
      var color = document.querySelector(`#atack .${e}`).style.background;

      if (color == "grey") {
        document.querySelector(`#atack .${e}`).style.background = "";
      }
      if (color == "") {
        document.querySelector(`#atack .${e}`).style.background = "grey";
      }
    }
  }

  // La fila de números de la tabla
  const listNumbers = numbers.map((number) => {
    return <th key={number.toString()}>{number}</th>;
  });

  // Crear cada fila vacia con el inicio de cada letra: cada celda tiene su letra+Numero+f (la f diferencia la clase de las celdas de la tabla atack)
  const voids = letters.map((letter) => {
    return (
      <tr key={letter}>
        <td key={letter} className="letra">
          {letter}
        </td>
        {numbers
          ? numbers.map((n) => (
              <td
                key={n}
                className={letter + n + "f"}
                onClick={(e) => mark(e.target.className)}
              ></td>
            ))
          : null}
      </tr>
    );
  });

  const voids2 = letters.map((letter) => {
    return (
      <tr key={letter}>
        <td key={letter} className="letra">
          {letter}
        </td>
        {numbers
          ? numbers.map((n) => (
              <td
                key={n}
                className={letter + n}
                onClick={(e) => mark(e.target.className)}
              ></td>
            ))
          : null}
      </tr>
    );
  });

  return (
    <div>
     

      <h2>FLOTA</h2>
      <div>
        <table id="flota">
          <tbody>
            <tr>
              <th></th>
              {listNumbers}
            </tr>
            {voids}
          </tbody>
        </table>
        
        <button onClick={() => jugar()}>JUGAR</button>
      </div>

      <br></br>
      <br></br>

      <div id="barcos">
        <div id="small">
          <span>Small</span>
          <div>1</div>
          <div>2</div>
          <button value="small" onClick={(e) => setShip("small")}>
            Select
          </button>
        </div>
        <div id="medium">
          <span>Medium</span>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <button value="medium" onClick={(e) => setShip("medium")}>
            Select
          </button>
        </div>

        <div id="large">
          <span>Large</span>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <button value="large" onClick={(e) => setShip("large")}>
            Select
          </button>
        </div>
      </div>

      <br></br>
      <br></br>

      {map ? (
        <div>
          <h2>ATACK</h2>
          <table id="atack">
            <tbody>
              <tr>
                <th></th>
                {listNumbers}
              </tr>
              {voids2}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Scenary;
