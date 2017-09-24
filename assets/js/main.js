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

// In your Javascript (external .js resource or <script> tag)
$(document).ready(function() {
    $('.origin').select2();
    $('.destination').select2();
    console.log();
});