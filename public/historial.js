//  Abrir modal desde tabla
const cuerpoTabla = document.getElementById("cuerpoTabla");

let idFila = undefined;

document.getElementsByClassName('table')[0].addEventListener('click', clickRowTable);
function clickRowTable(evt) {
    if (!evt.target.classList.contains('tableHead')) {
        idFila = evt.target.closest("tr").dataset.id;
        btnCancelar.innerHTML = "Eliminar";
        modal.show();
    }
}

btnCancelar.addEventListener('click', clickEliminarMantenimiento);
function clickEliminarMantenimiento(evt) {
    if (evt.innerHTML != 'Eliminar') {
        // deleteMantenimiento(idFila);
        alert(idFila);
    }

}

const datosPrueba = [
    { _id: 1, fechaString: "12/12/2000", tipo: "Motor", descripcion: "mantenimiento1", odometro: 1, coste: 100 },
    { _id: 2, fechaString: "12/12/2001", tipo: "Frenos", descripcion: "mantenimiento2", odometro: 2, coste: 200 },
    { _id: 3, fechaString: "12/12/2002", tipo: "Luces", descripcion: "mantenimiento3", odometro: 3, coste: 300 },
    { _id: 4, fechaString: "12/12/2003", tipo: "Otro", descripcion: "mantenimiento4", odometro: 4, coste: 400 }
];


async function cargarTabla() {
    cuerpoTabla.innerHTML = plantillaMantenimientos({ mantenimientos: datosPrueba });
}

cargarTabla();

const ordenCronologico = document.getElementById("inputFecha");

ordenCronologico.addEventListener('click', clickOrden);
function clickOrden(evt) {
    let estado = ordenCronologico.value;
    // Ya tengo el valor, ahora sería pasarlo al find y volver a llamar a cargarTabla().
}