var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fishSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        type: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            default: 1.5
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('fish', fishSchema);