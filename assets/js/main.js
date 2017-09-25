'use strict';

function seats () {}

function User (seat,name,last,dni) {
    this.seat = seat;    
    this.name = name;
    this.last = last;
    this.dni = dni;    
}

//abc jkl //10 asientos
const leters = ['A','B','C','','J','K','L'];
const row = 10;
let tableHTML= '';
for (let i = 1; i<= row; i++) {
    tableHTML += `<tr>`;
    for (let j = 0; j< leters.length; j++) {
        if (j == 3)
            tableHTML += `<td></td>`;
        else
            tableHTML += `<td onclick='select(this)'>${i+leters[j]}</td>`;
    }
    tableHTML += `</tr>`;
}
$('#seats').append(tableHTML);
$('#modal-seats').append(tableHTML);

// In your Javascript (external .js resource or <script> tag)
$(document).ready(function() {
    $('.selection').select2();
    console.log();
});

//funciones
function soloLetras(e) {
    let key = e.keyCode || e.which;
    let tecla = String.fromCharCode(key).toString();
    let letras = " áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ";//Se define todo el abecedario que se quiere que se muestre.
    let especiales = [8, 37, 39, 46, 6]; //Es la validación del KeyCodes, que teclas recibe el campo de texto.

    let tecla_especial = false
    for(var i in especiales) {
        if(key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if(letras.indexOf(tecla) == -1 && !tecla_especial){
        alert('Tecla no aceptada');
        return false;
      }
}

function SoloNumeros(evt){
    let keynum;
    if(window.event)//asignamos el valor de la tecla a keynum
        keynum = evt.keyCode; //IE
    else
        keynum = evt.which; //FF

    //comprobamos si se encuentra en el rango numérico y que teclas no recibirá.
    if((keynum > 47 && keynum < 58) || keynum == 8 || keynum == 13 || keynum == 6 )
        return true;
    else
        return false;
    
}