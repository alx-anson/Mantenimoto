//  Abrir modal desde añadir mantenimiento
const modal = new bootstrap.Modal(document.getElementById("miModal"));
const frmTipo = document.getElementById("frmTipo");

document.getElementsByClassName('table')[0].addEventListener('click', clickDropMenu);
function clickDropMenu(evt) {
    if (!evt.target.classList.contains('tableHead')) {
        modal.show(); 
    } 
 
}
