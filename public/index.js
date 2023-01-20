//---Modal---
const audio = new Audio("/audio/sonido.mp3");
const modal = new bootstrap.Modal(document.getElementById("miModal"));
const btnCancelar = document.getElementById("btnModCancelar")
const btnGuardar = document.getElementById('btnModGuardar');

const frmTipo = document.getElementById("frmTipo");
const frmFecha = document.getElementById("frmFecha");
const frmDescripcion = document.getElementById("frmDescripcion");
const frmOdometro = document.getElementById("frmOdometro");
const frmCoste = document.getElementById("frmCoste");

const cards = document.getElementsByClassName("card-text");

const moto = document.getElementById("moto");
if (moto != null) {
    moto.addEventListener('mouseover', arrancarMoto);
    function arrancarMoto(evt) {
        audio.play();
    }
}
[frmTipo, frmFecha, frmOdometro, frmCoste].forEach((i) => {
    i.addEventListener("blur", () => {
        btnGuardar.disabled = false;
        [frmTipo, frmFecha, frmOdometro, frmCoste].forEach((j) => {
            if (!j.validity.valid) btnGuardar.disabled = true;
        });
    });
});

// Abrir modal desde añadir mantenimiento
document.getElementsByClassName('navAddMantenimiento')[0].addEventListener('click', clickAddMantenimiento);
function clickAddMantenimiento(evt) {
    limpiarModal();
    btnCancelar.innerHTML = 'Cancelar';
    btnGuardar.innerHTML = 'Guardar';

    btnGuardar.disabled = true;
    modal.show();
}

btnGuardar.addEventListener('click', async () => {
    const mantenimiento = {
        fecha: frmFecha.value,
        tipo: frmTipo.value,
        descripcion: frmDescripcion.value,
        odometro: frmOdometro.value,
        coste: parseFloat(frmCoste.value)
    }
    if (btnGuardar.innerHTML == 'Guardar') {
        await saveMantenimiento(mantenimiento);
    } else {
        actualizarMantenimiento(mantenimiento);
    }

    modal.hide();
    cargarTabla();
});

btnCancelar.addEventListener('click', evt => {
    if (btnCancelar.innerHTML == "Eliminar") {
        eliminarMantenimiento();
    }
    modal.hide();
    cargarTabla();
});

function limpiarModal() {
    frmTipo.value = "Otro";
    frmFecha.value = "";
    frmDescripcion.value = "";
    frmOdometro.value = "";
    frmCoste.value = "";
}


async function cargarCards () {
    twits = await findTwits();
    for (i = 0; i<=6; i++) {
        cards[i].innerHTML = twits[i].texto;
    }
    console.log(twits[1].texto);
}
cargarCards();

// ---- Fetch ------
async function enviarFetch(url, metodo = "GET", body) {
    try {
        let opts = { method: metodo };
        if (body) {
            opts.body = JSON.stringify(body);
            opts.headers = { "Content-type": "application/json" };
        }
        const resp = await fetch(url, opts);
        if (resp.ok) {
            const mimeType = resp.headers.get("content-type");
            if (mimeType && mimeType.startsWith("application/json"))
                return await resp.json();
            else return await resp.text();
        } else throw resp.statusText;
    } catch (err) {
        alert("Hubo un problema " + err)
    }
}

// ---- Funciones CRUD -----
async function findMantenimientos(orden, busqueda) {
    return await enviarFetch(
        `/mantenimientos?orden=${orden}&busqueda=${busqueda}`
    );
}
async function findMantenimiento(id) {
    return await enviarFetch(`/mantenimientos/${id}`);
}
async function saveMantenimiento(mantenimientoData) {
    return await enviarFetch("/mantenimientos", "POST", mantenimientoData);
}
async function updateMantenimiento(mantenimientoData) {
    return await enviarFetch(`/mantenimientos/${mantenimientoData.id}`, "PATCH", { mantenimiento: mantenimientoData });
}
async function deleteMantenimiento(id) {
    return await enviarFetch(`/mantenimientos/${id}`, "DELETE");
}

async function findTwits() {
    return await enviarFetch("/twits");
}