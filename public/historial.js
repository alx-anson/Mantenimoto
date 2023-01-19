//  Abrir modal desde tabla
const cuerpoTabla = document.getElementById("cuerpoTabla");
const buscador = document.getElementById("buscador");
const ordenCronologico = document.getElementById("inputFecha");
const btnBuscar = document.getElementById("btnBuscar");
const btnTotalGastado = document.getElementById("btnTotalGastado");
const totalGastado = document.getElementById("totalGastado");

let idFila = undefined;

async function cargarTabla() {
    let orden = ordenCronologico.value;
    let busqueda = buscador.value;
    cuerpoTabla.innerHTML = plantillaMantenimientos({ mantenimientos: await findMantenimientos(orden, busqueda) });
}

cargarTabla();

document.getElementsByClassName('table')[0].addEventListener('click', clickRowTable);
async function clickRowTable(evt) {
    if (!evt.target.classList.contains('tableHead')) {
        idFila = evt.target.closest("tr").dataset.id;
        let mantenimiento = await findMantenimiento(idFila);
        btnCancelar.innerHTML = "Eliminar";
        btnGuardar.innerHTML = "Actualizar";
        frmTipo.value = mantenimiento.tipo;
        frmFecha.value = new Date(mantenimiento.fecha).toISOString().slice(0, 10);
        frmDescripcion.value = mantenimiento.descripcion;
        frmOdometro.value = mantenimiento.odometro;
        frmCoste.value = mantenimiento.coste;
        btnGuardar.disabled = false;
        modal.show();
    }
}

function eliminarMantenimiento () {
    deleteMantenimiento(idFila);
}

function actualizarMantenimiento(mantenimientoData) {
    mantenimientoData.id = idFila;
    updateMantenimiento(mantenimientoData);
};

btnBuscar.addEventListener('click', clickBuscar);
function clickBuscar(evt) {
    cargarTabla();
}

ordenCronologico.addEventListener('click', clickOrden);
function clickOrden(evt) {
    cargarTabla();
}

btnTotalGastado.addEventListener('click', async (evt) => {
    let orden = "none";
    let busqueda = "";
    let mantenimientos = await findMantenimientos(orden, busqueda);
    totalGastado.innerHTML = obtenerTotal(mantenimientos) + "€";

})

function obtenerTotal(mantenimientos) {
    let total = 0;
    mantenimientos.forEach(coste => total+=coste.coste);
    return total.toFixed(2);
}