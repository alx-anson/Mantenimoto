const mongoose = require("mongoose");

const MantenimientoSchema = new mongoose.Schema(
    {
        fecha: {type: Date, default: new Date().toLocaleDateString()},
        tipo: {
            type: String,
            required: true,
            enum: ["Motor", "Luces", "Suspensión", "Neumáticos", "Frenos", "Kit de arrastre", "Chapa", "Otro"],
        },
        descripcion: {type: String},
        odometro: {type: Number, min: 0},
        coste: {type: Number, min: 0},
    }
)

const Mantenimiento = new mongoose.model("Mantenimiento", MantenimientoSchema);

exports.connect = async function () {
    mongoose.set("strictQuery", false);
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

exports.close = async function() {
    await mongoose.disconnect();
}

