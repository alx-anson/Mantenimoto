const modal = new bootstrap.Modal(document.getElementById("miModal"));

// Abrir modal desde añadir mantenimiento
document.getElementsByClassName('navAddMantenimiento')[0].addEventListener('click', clickAddMantenimiento);

function clickAddMantenimiento(evt) {
    modal.show();
}