//  Abrir modal desde tabla
const cuerpoTabla = document.getElementById("cuerpoTabla");
const buscador = document.getElementById("buscador");
const ordenCronologico = document.getElementById("inputFecha");
const btnBuscar = document.getElementById("btnBuscar");

let idFila = undefined;

async function cargarTabla() {
    let orden = ordenCronologico.value;
    let busqueda = buscador.value;
    cuerpoTabla.innerHTML = plantillaMantenimientos({ mantenimientos: await findMantenimientos(orden, busqueda) });
}

cargarTabla();

document.getElementsByClassName('table')[0].addEventListener('click', clickRowTable);
function clickRowTable(evt) {
    if (!evt.target.classList.contains('tableHead')) {
        idFila = evt.target.closest("tr").dataset.id;
        btnCancelar.innerHTML = "Eliminar";
        modal.show();
    }
}

btnBuscar.addEventListener('click', clickBuscar);
function clickBuscar(evt) {
    cargarTabla();
}

btnCancelar.addEventListener('click', clickEliminarMantenimiento);
function clickEliminarMantenimiento(evt) {
    if (evt.innerHTML != 'Eliminar') {
        // deleteMantenimiento(idFila);
        alert(idFila);
    }

}



ordenCronologico.addEventListener('click', clickOrden);
function clickOrden(evt) {
    cargarTabla();
}