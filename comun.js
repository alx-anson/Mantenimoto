const modal = new bootstrap.Modal(document.getElementById("miModal"));

// Abrir modal desde añadir mantenimiento
document.getElementsByClassName('dropdown-menu')[0].addEventListener('click', clickDropMenu);
const frmFecha = document.getElementById('frmFecha');
const frmTipo = document.getElementById('frmTipo');
const frmOdometro = document.getElementById('frmOdometro');
const frmPrecio = document.getElementById('frmPrecio');
const frmDescripcion = document.getElementById('frmDescripcion');

function clickDropMenu(evt) {
    frmTipo.selected = "Motor" 
    modal.show();
}