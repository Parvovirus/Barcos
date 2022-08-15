import React, { useState } from "react";

function Scenary() {
  const [map, setMap] = useState(false);
  const [ship, setShip] = useState();

  const [small, setSmall] = useState([]);
  const [medium, setMedium] = useState([]);
  const [large, setLarge] = useState([]);

  const [smallHundido, setSmallHundido] = useState([]);
  const [mediumHundido, setMediumHundido] = useState([]);
  const [largeHundido, setLargeHundido] = useState([]);
  // Los barcos predeterminados de la IA (luego serán aleatorios)
  const [shipIA, setShipIA] = useState({
    small: ["A2", "A3"],
    medium: ["H4", "I4", "J4"],
    large: ["C2", "D2", "E2", "F2"],
  });

  const [msmSmall, setMsmSmall] = useState();
  const [msmMedium, setMsmMedium] = useState();
  const [msmLarge, setMsmLarge] = useState();

  const [btn, setBtn] = useState(true);
  const [turn, setTurn] = useState(false);

  const [ataque, setAtaque] = useState([]);
  const [posibilidades, setPosibilidades] = useState([]);

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const [count, setCount] = useState(100);

  var smallRoto = [];
  var mediumRoto = [];
  var largeRoto = [];

  function empezar() {
    setBtn(true);
    setMap(false);
    for (let i = 0; i < small.length; i++) {
      document.querySelector(`.${small[i]}`).style.background = "";
    }
    for (let i = 0; i < medium.length; i++) {
      document.querySelector(`.${medium[i]}`).style.background = "";
    }
    for (let i = 0; i < large.length; i++) {
      document.querySelector(`.${large[i]}`).style.background = "";
    }
    setSmall([]);
    setMedium([]);
    setLarge([]);
    // Resetear tablero, colores y poner todas las casillas
    var casillas = [];
    for (let i = 0; i < letters.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        document.querySelector(
          `.${letters[i] + numbers[j] + "f"}`
        ).style.background = "";
        casillas.push(letters[i] + numbers[j]);
      }
    }
    setPosibilidades(casillas);
  }

  // Escucha si están todos los barcos

  function jugar() {
    // Para ir quitando casillas al atacar a la IA

    var casillas = [];
    for (let i = 0; i < letters.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        casillas.push(letters[i] + numbers[j]);
      }
    }
    setPosibilidades(casillas);

    const play = small.length == 2 && medium.length == 3 && large.length == 4;
    if (play) {
      setMap(true);
      setBtn(false);
      setTurn(true);
    } else if (!play) {
      if (small.length < 1) {
        setMsmSmall("Incompleto barco Small");
      }
      if (medium.length < 1) {
        setMsmMedium("Incompleto barco Medium");
      }
      if (large.length < 1) {
        setMsmLarge("Incompleto barco Large");
      }
    }
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
        }
      } else {
        document.querySelector(`#${table} .${e}`).style.background =
          "rgb(203, 203, 203)";
        small.push(e);
        setSmall(small);
      }
    }

    if (smallClear) {
      document.querySelector(`#${table} .${e}`).style.background = "";
      var filtro = small.filter((item) => item !== e);
      setSmall(filtro);
    }

    //! --------- BARCO MEDIO ---------//

    const mediumPaint = color == "" && ship == "medium" && medium.length < 3;
    const mediumClear = color == "rgb(152, 152, 153)" && ship == "medium";

    if (mediumPaint) {
      // Preparación de las coordenadas seleccionadas
      const newEM = e.split("f");

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

          if (columnM) {
            document.querySelector(`#${table} .${e}`).style.background =
              "rgb(152, 152, 153)";
            medium.push(e);
            medium.sort();
            setMedium(medium);
          }
        } else if (orientationY && direccionY == false) {
          const columnM =
            String.fromCharCode(coorLeterShipM[0].charCodeAt() - 1) +
              coorNumShipM[1] ==
              String.fromCharCode(coorLeterM[0].charCodeAt()) + coorNumM[1] ||
            String.fromCharCode(coorLeterShipM[0].charCodeAt() + 2) +
              coorNumShipM[1] ==
              String.fromCharCode(coorLeterM[0].charCodeAt()) + coorNumM[1];

          if (columnM) {
            document.querySelector(`#${table} .${e}`).style.background =
              "rgb(152, 152, 153)";
            medium.push(e);
            medium.sort();
            setMedium(medium);
          }
        }
      } else {
        document.querySelector(`#${table} .${e}`).style.background =
          "rgb(152, 152, 153)";
        medium.push(e);
        medium.sort();
        setMedium(medium);
      }
    }
    if (mediumClear) {
      if (medium.length == 3 && e == medium[1]) {
        for (let i = 0; i < medium.length; i++) {
          document.querySelector(`#${table} .${medium[i]}`).style.background =
            "";
        }
        setMedium([]);
      } else {
        document.querySelector(`#${table} .${e}`).style.background = "";
        var filtro2 = medium.filter((item) => item !== e);
        setMedium(filtro2);
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
      } else if ((large.length == 4 && e == large[1]) || e == large[2]) {
        for (let i = 0; i < large.length; i++) {
          document.querySelector(`#${table} .${large[i]}`).style.background =
            "";
        }
        setLarge([]);
      } else {
        document.querySelector(`#${table} .${e}`).style.background = "";
        var filtro2 = large.filter((item) => item !== e);
        setLarge(filtro2);
      }
    }

    if (largePaint) {
      // Preparación de las coordenadas seleccionadas
      const newEL = e.split("f");

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
          }
        }
      } else {
        document.querySelector(`#${table} .${e}`).style.background =
          "rgb(65, 65, 65)";
        large.push(e);
        large.sort();
        setLarge(large);
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
      var color = document.querySelector(`#atack .${e}`).style.background;

      if (color == "grey") {
        document.querySelector(`#atack .${e}`).style.background = "";
      }
      if (color == "") {
        document.querySelector(`#atack .${e}`).style.background = "grey";
      }
    }
  }

  //! ------ ATACK ------

  function atack(e) {
    const vacio = document.querySelector(`.${e}`).style.background == "";
    const verde =
      document.querySelector(`.${e}`).style.background == "rgb(51, 255, 0)";
    if (vacio && ataque == "") {
      document.querySelector(`.${e}`).style.background = "rgb(51, 255, 0)";
      setAtaque([e]);
    } else if (verde) {
      const vacio = (document.querySelector(`.${e}`).style.background = "");
      setAtaque([]);
    }
  }

  //! ------ TURNO Verificar ataque  -------

  function turno() {
    // Condición de victotia, se comparan los estados de los barcos y los hundidos

    if (ataque.length > 0) {
      console.log(shipIA.medium);

      var searchSmall = shipIA.small.filter((item) => item == ataque[0]);
      var searchMedium = shipIA.medium.filter((item) => item == ataque[0]);
      var searchLarge = shipIA.large.filter((item) => item == ataque[0]);

      //! --------- TOCADO ---------
      if (searchSmall != "" || searchMedium != "" || searchLarge != "") {
        console.log("tocado");
        document.querySelector(`.${ataque[0]}`).style.background = "yellow";
        if (searchSmall != "") {
          searchSmall = shipIA.small.filter((item) => item != ataque[0]);
          shipIA.small = searchSmall;
        }
        if (searchMedium != "") {
          searchMedium = shipIA.medium.filter((item) => item != ataque[0]);
          shipIA.medium = searchMedium;
        }
        if (searchLarge != "") {
          searchLarge = shipIA.large.filter((item) => item != ataque[0]);
          shipIA.large = searchLarge;
        }

        setAtaque([]);
        setTurn(false);

        var victoria =
          shipIA.small.length == 0 &&
          shipIA.medium.length == 0 &&
          shipIA.large.length == 0;
        if (victoria) {
          alert("GANASTE");
          empezar();
          setShipIA({
            small: ["A2", "A3"],
            medium: ["H4", "I4", "J4"],
            large: ["C2", "D2", "E2", "F2"],
          });
        } else {
          //! FASE DE LA MAQUINA //

          setTimeout(() => {
            console.log("IA");
            function randonNumber(max) {
              var caos = Math.floor(Math.random() * max);
              return caos;
            }

            // Casilla aleatoria y se van quitando posibilidades
            var ale = randonNumber(count);
            const atakaIa = posibilidades[ale];
            setCount(count - 1);

            // Busco el atakaIA en mis coordenadas de mis barcos
            const tocadoSmall = small.filter(
              (casilla) => casilla == atakaIa + "f"
            );
            const tocadoMedium = medium.filter(
              (casilla) => casilla == atakaIa + "f"
            );
            const tocadoLarge = large.filter(
              (casilla) => casilla == atakaIa + "f"
            );
            var tocado =
              tocadoSmall.length > 0 ||
              tocadoMedium.length > 0 ||
              tocadoLarge.length > 0;

            if (tocado) {
              document.querySelector(`.${atakaIa + "f"}`).style.background =
                "yellow";
              if (tocadoSmall.length > 0) {
                const tocadoSmall = small.filter(
                  (casilla) => casilla != atakaIa + "f"
                );
                console.log("entrra");
                setSmall(tocadoSmall);
              }
              if (tocadoMedium.length > 0) {
                const tocadoMedium = medium.filter(
                  (casilla) => casilla != atakaIa + "f"
                );
                console.log("entrra");
                setMedium(tocadoMedium);
              }
              if (tocadoLarge.length > 0) {
                const tocadoLarge = medium.filter(
                  (casilla) => casilla != atakaIa + "f"
                );
                console.log("entrra");
                setLarge(tocadoLarge);
              }
            } else {
              console.log("agua");
              document.querySelector(`.${atakaIa + "f"}`).style.background =
                "blue";
            }

            // Quito de la lista la casilla bombardeada (agua o tocado)
            const result = posibilidades.filter(
              (casilla) => casilla != atakaIa
            );
            setPosibilidades(result);
            setTurn(true);
            //Condición DERROTA
            var derrota =
              small.length == 0 && medium.length == 0 && large.length == 0;
            if (derrota) {
              alert("HAS PERDIDO");
              empezar();
              setShipIA({
                small: ["A2", "A3"],
                medium: ["H4", "I4", "J4"],
                large: ["C2", "D2", "E2", "F2"],
              });
            }
          }, 500);
        }
        //! -------- AGUA ---------
      } else if (searchSmall == "" || searchMedium == "" || searchLarge == "") {
        console.log("agua");
        document.querySelector(`.${ataque[0]}`).style.background = "blue";
        setAtaque([]);
        setTurn(false);

        //! Condición de Victoria

        var victoria =
          shipIA.small.length == 0 &&
          shipIA.medium.length == 0 &&
          shipIA.large.length == 0;
        if (victoria) {
          alert("GANASTE");
          empezar();
          setShipIA({
            small: ["A2", "A3"],
            medium: ["H4", "I4", "J4"],
            large: ["C2", "D2", "E2", "F2"],
          });
        } else {
          //! FASE DE LA MAQUINA //

          setTimeout(() => {
            console.log("Turno de la IA:");
            function randonNumber(max) {
              var caos = Math.floor(Math.random() * max);
              return caos;
            }

            console.log(count);
            var ale = randonNumber(count);
            console.log(ale);
            const atakaIa = posibilidades[ale];
            setCount(count - 1);
            console.log(atakaIa);
            console.log(posibilidades);

            // Busco el atakaIA en mis coordenadas de mis barcos
            const tocadoSmall = small.filter(
              (casilla) => casilla == atakaIa + "f"
            );
            const tocadoMedium = medium.filter(
              (casilla) => casilla == atakaIa + "f"
            );
            const tocadoLarge = large.filter(
              (casilla) => casilla == atakaIa + "f"
            );

            var tocado =
              tocadoSmall.length > 0 ||
              tocadoMedium.length > 0 ||
              tocadoLarge.length > 0;

            // console.log(tocado);

            if (tocado) {
              document.querySelector(`.${atakaIa + "f"}`).style.background =
                "yellow";
              if (tocadoSmall.length > 0) {
                const tocadoSmall = small.filter(
                  (casilla) => casilla != atakaIa + "f"
                );
                console.log("entrra");
                setSmall(tocadoSmall);
              }
              if (tocadoMedium.length > 0) {
                const tocadoSmall = medium.filter(
                  (casilla) => casilla != atakaIa + "f"
                );
                console.log("entrra");
                setMedium(tocadoSmall);
              }
              if (tocadoLarge.length > 0) {
                const tocadoLarge = medium.filter(
                  (casilla) => casilla != atakaIa + "f"
                );
                console.log("entrra");
                setLarge(tocadoLarge);
              }
            } else {
              console.log("agua");
              document.querySelector(`.${atakaIa + "f"}`).style.background =
                "blue";
            }

            // Quito de la lista la casilla bombardeada (agua o tocado)
            const result = posibilidades.filter(
              (casilla) => casilla != atakaIa
            );
            setPosibilidades(result);
            setTurn(true);

            //Condición DERROTA
            var derrota =
              small.length == 0 && medium.length == 0 && large.length == 0;
            if (derrota) {
              alert("HAS PERDIDO");
              empezar();
              setShipIA({
                small: ["A2", "A3"],
                medium: ["H4", "I4", "J4"],
                large: ["C2", "D2", "E2", "F2"],
              });
            }
          }, 500);
        }
      }
    } else {
      alert("Selecciona una casilla de ataque");
    }
  }

  // La fila de números de la tabla
  const listNumbers = numbers.map((number) => {
    return (
      <th className={"l" + number.toString()} key={number.toString()}>
        {number}
      </th>
    );
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

  // Preparando la tabla de ataque
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
                onClick={(e) => atack(e.target.className)}
              ></td>
            ))
          : null}
      </tr>
    );
  });

  return (
    <div>
      <h1>HUNDIR LA FLOTA</h1>
      <div id="div-flota">
        {/* TABLERO DE NUESTROS BARCOS POSICIONADOS */}
        <table id="flota">
          <tbody>
            <tr>
              <th></th>
              {listNumbers}
            </tr>
            {voids}
            <tr>
              <td colSpan="11">FLOTA</td>
            </tr>
          </tbody>
        </table>
        {/* TABLERO DE ATACAR A LA IA */}
        {map ? (
          <table id="atack">
            <tbody>
              <tr>
                <th></th>
                {listNumbers}
              </tr>
              {voids2}
              <tr>
                <td colSpan="11">ATACK</td>
              </tr>
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>

      {/* Los tres botones JUGAR, RESETEAR Y TURNO */}

      <button id="btn-jugar" onClick={() => jugar()}>
        JUGAR
      </button>
      <button id="btn-reset" onClick={() => empezar()}>
        RESETEAR
      </button>
      {turn ? (
        <button id="btn-reset" onClick={() => turno()}>
          TURNO
        </button>
      ) : (
        ""
      )}

      <br></br>
      <br></br>

      {/* Es las selección de los tres tipos de barcos */}
      {btn ? (
        <div>
          <div>
            <div id="small">
              <span>Small</span>
              <div>1</div>
              <div>2</div>
              <button
                id="btn-small"
                value="small"
                onClick={(e) => setShip("small")}
              >
                Select
              </button>
            </div>
            <br></br>
            <div id="medium">
              <span>Medium</span>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <button
                id="btn-medium"
                value="medium"
                onClick={(e) => setShip("medium")}
              >
                Select
              </button>
            </div>
            <br></br>
            <div id="large">
              <span>Large</span>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>{" "}
              <button
                id="btn-large"
                value="large"
                onClick={(e) => setShip("large")}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* Pinta los mensajes de incompletos los barcos */}
      {btn ? (
        <div>
          {msmSmall ? <p>{msmSmall}</p> : ""}
          {msmMedium ? <p>{msmMedium}</p> : ""}
          {msmLarge ? <p>{msmLarge}</p> : ""}
        </div>
      ) : (
        ""
      )}

      <br></br>
      <br></br>
    </div>
  );
}

export default Scenary;
