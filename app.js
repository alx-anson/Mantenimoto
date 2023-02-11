require("dotenv").config();
const db = require("./db.js");
const express = require("express");
const app = express();
const twitter = require("./twitter.js"); //*

const PORT = process.env.PORT || process.env.PUERTO;

app.use(express.json());
app.use(express.static("public"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err);
});

app.get("/mantenimientos", async (req, res) => {
    let params = {
        orden: req.query.orden,
        busqueda: req.query.busqueda,
    };
    const mantenimientos = await db.find(params);
    if (mantenimientos) res.json(mantenimientos);
});

app.get("/mantenimientos/:id", async (req, res) => {
    const mantenimiento = await db.findById(req.params.id);
    if (mantenimiento) res.json(mantenimiento);
    else res.status(404).send(`No existe un mantenimiento con ID=${req.params.id}.`);
});

app.post("/mantenimientos", async (req, res) => {
    const mantenimiento = await db.save(req.body);
    if (mantenimiento) res.location(`/mantenimientos/${mantenimiento._id}`).status(201).send("Mantenimiento creado");
    else res.status(400).send("Valores incorrectos para crear un mantenimiento.");
});

app.patch("/mantenimientos/:id", async (req, res) => {
    const mantenimiento = await db.update(req.body.mantenimiento);
    if (mantenimiento) res.sendStatus(204);
    else res.status(404).send(`Error al actualizar el mantenimiento con ID=${req.params.id}.`);
});

app.delete("/mantenimientos/:id", async (req, res) => {
    if (await db.delete(req.params.id)) res.sendStatus(204);
    else res.status(404).send(`No existe un mantenimiento con ID=${req.params.id}.`);
});

db.connect().then(() => {
    console.log("Conectado a la base de datos.");
    app.listen(PORT, () =>
        console.log("Servidor escuchando en el puerto " + PORT)
    );
});

app.get("/twits", async (req, res) => {
    res.json(await twitter.getTwits());
});

