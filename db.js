const mongoose = require("mongoose");

const MantenimientoSchema = new mongoose.Schema(
    {
        fecha: { type: Date, default: new Date() },
        tipo: {
            type: String,
            required: true,
            trim: true,
            enum: ["Motor", "Luces", "Suspensión", "Neumáticos", "Frenos", "Kit de arrastre", "Chapa", "Otro"],
        },
        descripcion: { type: String },
        odometro: { type: Number, min: 0 },
        coste: { type: mongoose.Types.Decimal128, min: 0 },
    },
    {
        virtuals: {
            fechaString: {
                get() {
                    if (this.fecha) {
                        return this.fecha.toLocaleString("es-ES").slice(0, 9).replace(',','');
                    } else {
                        return "No definido.";
                    }
                },
            },
        },
        toJSON: { virtuals: true },
    }
);

const Mantenimiento = new mongoose.model("Mantenimiento", MantenimientoSchema);

exports.connect = async function () {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_URL);
};

exports.close = async function () {
    await mongoose.disconnect();
};

exports.find = async function (params) {
    try {
        const query = Mantenimiento.find();
        const orden = params.orden;
        if (params.busqueda) {
            const palabras = params.busqueda
                .split(" ")
                .map((s) => s.trim())
                .filter((s) => s.length > 0);
            if (palabras.length > 0) {
                let patronDescripcion = [];
                let patronTipo = [];
                palabras.forEach((palabra) => {
                    patronDescripcion.push({ descripcion: new RegExp(palabra, "i") });
                    patronTipo.push({ tipo: new RegExp(palabra, "i") });
                });
                query.or(patronDescripcion).or(patronTipo);
            }
        }
        if (orden && orden != "none") {
            query.sort([['fecha', orden]]);
        }
        return await query.exec();
    } catch (err) {
        return undefined;
    }
};

exports.findById = async function (mantenimientoId) {
    try {
        return await Mantenimiento.findById(mantenimientoId);
    } catch (err) {
        return undefined;
    }
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
    try {
    return (await Mantenimiento.deleteOne({ _id: mantenimientoId })).deletedCount == 1;
    } catch (err) {
        return undefined;
    }
};

exports.update = async function (mantenimientoData) {
    try {
        const filter = { _id: mantenimientoData.id }
        const update = {
            fecha: mantenimientoData.fecha,
            tipo: mantenimientoData.tipo,
            descripcion: mantenimientoData.descripcion,
            odometro: mantenimientoData.odometro,
            coste: mantenimientoData.coste
        }
        return await Mantenimiento.findOneAndUpdate(filter, update, { runValidators: true });
    } catch (err) {
        return undefined;
    }
}
