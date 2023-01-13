//---Modal---
const modal = new bootstrap.Modal(document.getElementById("miModal"));
const btnCancelar = document.getElementById("btnModCancelar")
const btnGuardar = document.getElementById('btnModGuardar');
// Abrir modal desde añadir mantenimiento
document.getElementsByClassName('navAddMantenimiento')[0].addEventListener('click', clickAddMantenimiento);
function clickAddMantenimiento(evt) {
    btnCancelar.innerHTML = 'Cancelar';
    modal.show();
}



