var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Esquema para las revisiones de la motocicleta
var serviceRecordSchema = new Schema({
    motorcycleId: { type: Schema.Types.ObjectId, ref: 'Motorcycle', required: true }, // ID de la motocicleta
    serviceDate: { type: Date, required: true },
    odometer: { type: Number, required: true }, // Lectura total del cuentakilómetros
    serviceType: { // Regular, Oil change, Tire replacement, etc.
        type: String, 
        required: true,
        enum: ['Frenos', 'Aceite', 'ITV', 'Ruedas', 'Mantenimiento']
    },
    appointmentReminder: { type: Boolean, default: false, required: false }, // Recordatorio de cita
}, {collection:'ServiceRecord'});

module.exports = mongoose.model('ServiceRecord', serviceRecordSchema);