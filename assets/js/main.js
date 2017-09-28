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

let tableCancelHTML= '';
for (let i = 1; i<= row; i++) {
    celdas[i] = [];
    tableCancelHTML += `<tr>`;
    for (let j = 0; j< leters.length; j++) {
        if (j == 3)
            tableCancelHTML += `<td></td>`;
        else{
            tableCancelHTML += `<td class='td-cancel'>${i+leters[j]}</td>`;
        }
    }
    tableCancelHTML += `</tr>`;
}
let users = [];

$('#seats').append(tableVisualHTML);
$('#modal-seats').append(tableHTML);
$('#cancel-seats').append(tableCancelHTML);

function select(e){
    celdaActual = e.target;
    let text = e.target.textContent;
    console.log(text);
    $('#seat').val(text);
}
let celdaActual;
let celdaCancelActual = [];
let actual;
let celdasTd = document.getElementsByClassName('td-modal');
let celdasVisualTd = document.getElementsByClassName('td-visual');
let celdasCancelTd = document.getElementsByClassName('td-cancel');
function allTd (celdas) {

    for (let i = 0; i < celdas.length; i++) {
        celdaActual = celdas[i];
        celdaActual.addEventListener('click',select,false);
    }
}
function cancelTd (celdas) {
    for (let i = 0; i < celdas.length; i++) {
        // console.log( celdas[i].getAttribute('class'))
        // if(celdas[i].getAttribute('class') == 'td-cancel bg-red'){
            celdaCancelActual = celdas[i];
            celdaCancelActual.addEventListener('click',cancel,false)
        // }
    }
}
function cancel(e){
    let text = e.target.textContent;
    console.log( text)
    $('#cancel-seat').val(text);
    for (let i in users) {
        if (text == users[i].seat) {
            // console.log(users[i].name + '  '+users[i].last+' '+users[i].dni);
            $('#cancel-name').val(users[i].name);    
            $('#cancel-last').val(users[i].last);
            $('#cancel-dni').val(users[i].dni);
        }
    }
}
$('#reserved').click(function(){
    for (let i in users) {
        if ($('#cancel-seat').val() == users[i].seat) {
            // console.log(users[i].name + '  '+users[i].last+' '+users[i].dni);
            users.splice(i, 1);
        }
    }
    let userSeat = $('#seat').val();
    let userName = $('#name').val();    
    let userLast = $('#last').val();
    let userDni = $('#dni').val();
    let user = new User (userSeat,userName,userLast,userDni);
    users.push(user);
    listPass (users);
    $('#modal-reserved').modal('hide');
    $('#seat').val('');
    $('#name').val('');    
    $('#last').val('');
    $('#dni').val('');
    celdaActual.classList.add('bg-red');
    console.log(celdaActual.classList.contains('bg-red'));
    for (let i=0; i<celdasTd.length; i++) {
        console.log(celdasTd[i].classList.contains('bg-red'));
        if(celdasTd[i].classList.contains('bg-red')){
            celdasVisualTd[i].classList.add('bg-red');
            celdasCancelTd[i].classList.add('bg-red');
        }
    }
});

$('#cancel').click(function(){
    let text = $('#cancel-seat').val();
    console.log(celdaCancelActual)
    celdaCancelActual.classList.remove('bg-red');
    for (let i=0; i<celdasCancelTd.length; i++) {
        if(!celdasCancelTd[i].classList.contains('bg-red')){
            celdasVisualTd[i].classList.remove('bg-red');
            celdasTd[i].classList.remove('bg-red');
        }
    }
    
    $('#modal-cancel').modal('hide');
    for (let j in users) {
        if (text == users[j].seat) {
            users.splice(j,1)
        }
    }
});

//lista de pasajeros
function listPass (users){
    for (let i in users) {
        let listPassengers = `<div class='user'>
                            <p><b>Asiento:</b>${users[i].seat}</p>
                            <p><b>Nombre:</b>${users[i].name}</p>
                            <p><b>Apellido:</b>${users[i].last}</p>
                            <p><b>DNI:</b>${users[i].dni}</p>
                        </div>`;
        $('#passengers').html(listPassengers);
    }
}


$(document).ready(function() {
    $('.selection').select2();
    console.log();
    allTd(celdasTd);
    cancelTd(celdasCancelTd);
    listPass(users);
    
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