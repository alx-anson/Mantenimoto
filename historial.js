//  Abrir modal desde tabla
const frmTipo = document.getElementById("frmTipo");

document.getElementsByClassName('table')[0].addEventListener('click', clickRowTable);
function clickRowTable(evt) {
    if (!evt.target.classList.contains('tableHead')) {
        modal.show();
    }
}