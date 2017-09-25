'use strict';

// function seats () {}

function User (seat,name,last,dni) {
    this.seat = seat;    
    this.name = name;
    this.last = last;
    this.dni = dni;    
}
let celdas = [];
//abc jkl //10 asientos
const leters = ['A','B','C','','J','K','L'];
const row = 10;
let tableHTML= '';
for (let i = 1; i<= row; i++) {
    celdas[i] = [];
    tableHTML += `<tr>`;
    for (let j = 0; j< leters.length; j++) {
        if (j == 3)
            tableHTML += `<td></td>`;
        else{
            tableHTML += `<td class='td-modal'>${i+leters[j]}</td>`;
            celdas[i][j] = i+leters[j];
        }
    }
    tableHTML += `</tr>`;
}

let tableVisualHTML= '';
for (let i = 1; i<= row; i++) {
    celdas[i] = [];
    tableVisualHTML += `<tr>`;
    for (let j = 0; j< leters.length; j++) {
        if (j == 3)
            tableVisualHTML += `<td></td>`;
        else{
            tableVisualHTML += `<td class='td-visual'>${i+leters[j]}</td>`;
        }
    }
    tableVisualHTML += `</tr>`;
}
let users = [];

$('#seats').append(tableVisualHTML);
$('#modal-seats').append(tableHTML);

function select(e){
    celdaActual = e.target;
    let text = e.target.textContent;
    console.log(text);
    $('#seat').val(text);
}
let celdaActual;
let celdaActualPantalla = [];
let actual;
let celdasTd = document.getElementsByClassName('td-modal');
let celdasVisualTd = document.getElementsByClassName('td-visual');
function allTd (celdas) {

    for (let i = 0; i < celdas.length; i++) {
        celdaActual = celdas[i];
        celdaActual.addEventListener('click',select,false);
    }
}

$('#reserved').click(function(){
    let userSeat = $('#seat').val();
    let userName = $('#name').val();    
    let userLast = $('#last').val();
    let userDni = $('#dni').val();
    let user = new User (userSeat,userName,userLast,userDni);
    users.push(user);
    $('#modal-reserved').modal('hide');
    $('#seat').val('');
    $('#name').val('');    
    $('#last').val('');
    $('#dni').val('');
    celdaActual.classList.add('bg-red');
    console.log(celdaActual.getAttribute('class'));
    for (let i in celdasVisualTd) {
        if(celdasTd[i].getAttribute('class') == 'td-modal bg-red'){
            celdasVisualTd[i].classList.add('bg-red');
        }
    }
});

// In your Javascript (external .js resource or <script> tag)
$(document).ready(function() {
    $('.selection').select2();
    console.log();
    allTd(celdasTd);
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
    if(letras.indexOf(tecla) == -1 && !tecla_especial)
        return false;
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