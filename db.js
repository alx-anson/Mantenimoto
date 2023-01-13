const mongoose = require("mongoose");

const MantenimientoSchema = new mongoose.Schema(
    {
        fecha: { type: Date, default: new Date() },
        tipo: {
            type: String,
            required: true,
            enum: ["Motor", "Luces", "Suspensión", "Neumáticos", "Frenos", "Kit de arrastre", "Chapa", "Otro"],
        },
        descripcion: { type: String },
        odometro: { type: Number, min: 0 },
        coste: { type: Number, min: 0 },
    },
    {
        virtuals: {
            fechaString: {
              get() {
                return this.fecha.toLocaleDateString();
              },
            },
          },
          toJSON: { virtuals: true },
    }
);

const Mantenimiento = new mongoose.model("Mantenimiento", MantenimientoSchema);

exports.connect = async function () {
    mongoose.set("strictQuery", false);
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
};

exports.close = async function () {
    await mongoose.disconnect();
};

exports.find = async function (params) {
    const query = Mantenimiento.find();
    const palabras = params.busqueda
        .split(" ")
        .map((s) => s.trim())
        .filter((s) => s.lenght > 0);
    if (palabras.lenght > 0) {
        let patrones = [];
        palabras.forEach((palabra) => {
            patrones.push({ name: new RegExp(palabra, "i") });
        });
        query.or(patrones);
    }
    return await query.exec;
};

exports.findById = async function (mantenimientoId) {
    return await Mantenimiento.findById(mantenimientoId);
};

exports.save = async function (mantenimientoData) {
    try {
        const mantenimiento = new Mantenimiento(mantenimientoData);
        return await mantenimiento.save();
    } catch (err) {
        return undefined;
    }
};

exports.delete = async function (mantenimientoId) {
    return (await Mantenimiento.deleteOne({_id: mantenimientoId})).deletedCount == 1;
};
