// Genera el código secreto al azar
let letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
let codigoSecreto = [];
while (codigoSecreto.length < 3) {
  let letra = letras[Math.floor(Math.random() * letras.length)];
  if (!codigoSecreto.includes(letra)) {
    codigoSecreto.push(letra);
  }
}
//console.log("Clave secreta: " + codigoSecreto[0] + " " + codigoSecreto[1] + " " + codigoSecreto[2]);

// Evalúa la respuesta del usuario
function calcula() {
    let respuesta = [];
    let inputs = document.querySelectorAll('.fila.activa input');
    inputs.forEach(input => {
        respuesta.push(input.value.toUpperCase());
    });
    let letrasCorrectas = 0;
    let posicionesCorrectas = 0;
    for (let i = 0; i < respuesta.length; i++) {
        if (respuesta[i] === codigoSecreto[i]) {
            posicionesCorrectas++;
            letrasCorrectas++;
        } else if (codigoSecreto.includes(respuesta[i])) {
            letrasCorrectas++;
        }
    }
    // Muestra los números en el tablero
    let numeros = document.querySelectorAll('.fila.activa .numero');
    numeros[0].textContent = letrasCorrectas;
    numeros[1].textContent = posicionesCorrectas;
    // Desactiva el renglón actual y activa el siguiente
    let filaActiva = document.querySelector('.fila.activa');
    filaActiva.classList.remove('activa');
    filaActiva.classList.add('inactiva');
    let siguienteFila = filaActiva.nextElementSibling;
    if (posicionesCorrectas === codigoSecreto.length) {
        muestraVictoria();
    } else if (!siguienteFila) {
        // El usuario ha agotado sus intentos
        alert('Lo siento, has agotado tus intentos. ¡Mejor suerte la próxima vez!');
    }
    if (siguienteFila) {
        siguienteFila.classList.remove('inactiva');
        siguienteFila.classList.add('activa');
    }
}

function muestraVictoria() {
  // Descubre la clave secreta
  let code = document.querySelectorAll('#secreto input');
  for (let i = 0; i < code.length; i++) {
    code[i].value = codigoSecreto[i];
  }
  //Muestra un mensaje de victoria
  alert('¡Felicidades! Has adivinado el código secreto:' + code[0].value + code[1].value + code[2].value);
}

function reiniciar() {
    // Limpia el tablero
    let inputs = document.querySelectorAll('.fila input');
    inputs.forEach(input => {
        input.value = '';
    });
    let numeros = document.querySelectorAll('.fila .numero');
    numeros.forEach(numero => {
        numero.textContent = '';
    });
    // Genera un nuevo código secreto
    codigoSecreto = [];
    while (codigoSecreto.length < 3) {
        let letra = letras[Math.floor(Math.random() * letras.length)];
        if (!codigoSecreto.includes(letra)) {
            codigoSecreto.push(letra);
        }
    }
    // Activa el primer renglón y desactiva los demás
    let filas = document.querySelectorAll('.fila');
    filas.forEach((fila, index) => {
        if (index === 1) {
            fila.classList.remove('inactiva');
            fila.classList.add('activa');
        } else {
            fila.classList.remove('activa');
            fila.classList.add('inactiva');
        }
    });
}

