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
        mostrarAlerta("Hubo un problema: " + err);
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
