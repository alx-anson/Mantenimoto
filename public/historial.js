//  Abrir modal desde tabla
const frmTipo = document.getElementById("frmTipo");

document.getElementsByClassName('table')[0].addEventListener('click', clickRowTable);
function clickRowTable(evt) {
    if (!evt.target.classList.contains('tableHead')) {
        btnCancelar.innerHTML = "Eliminar";
        modal.show();
    }
}

btnCancelar.addEventListener('click', clickEliminarMantenimiento);
function clickEliminarMantenimiento(evt) {
    if (evt.innerHTML != 'Eliminar') {
        return;
    }
    
}

document.getElementById("inputFecha")[0].addEventListener('click', caca);
function caca(evt) {
    if (evt.selected == '1') {
        alert("caca");
    }
}