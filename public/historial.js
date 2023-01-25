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
        prepararCamposModal(mantenimiento);
        modal.show();
    }
}

function prepararCamposModal(mantenimiento) {
    btnCancelar.innerHTML = "Eliminar";
    btnGuardar.innerHTML = "Actualizar";
    btnGuardar.disabled = false;
    frmTipo.value = mantenimiento.tipo;
    frmFecha.value = new Date(mantenimiento.fecha).toISOString().slice(0, 10);
    frmDescripcion.value = mantenimiento.descripcion;
    frmOdometro.value = mantenimiento.odometro;
    frmCoste.value = mantenimiento.coste.$numberDecimal;
}

btnBuscar.addEventListener('click', clickBuscar);
function clickBuscar(evt) {
    cargarTabla();
}

ordenCronologico.addEventListener('click', clickOrden);
function clickOrden(evt) {
    cargarTabla();
}

btnTotalGastado.addEventListener('click', async (evt) => {
    let mantenimientos = await findMantenimientos("none", "");
    totalGastado.innerHTML = obtenerTotal(mantenimientos) + "€";
})

function obtenerTotal(mantenimientos) {
    let total = 0;
    mantenimientos.forEach(coste => total += parseFloat(coste.coste.$numberDecimal));
    return total.toFixed(2);
}

// Necesito estas funciones porque manejo el modal desde el otro script, aquí tengo el id de la fila
// que tengo que usar para eliminar o actualizar.
async function eliminarMantenimiento() {
    await deleteMantenimiento(idFila);
}

async function actualizarMantenimiento(mantenimientoData) {
    mantenimientoData.id = idFila;
    await updateMantenimiento(mantenimientoData);
};

