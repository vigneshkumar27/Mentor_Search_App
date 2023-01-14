const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Mentor name is required"]
    },
    specialization: {
        type: String,
        required: [true, "Mentor area is required"]
    },
    description: {
        type: String,
        required: [true, "Mentor description is required"]
    },
    email: {
        type: String,
        default: "",
        required: [true, "Mentor email is required"]
    },
    skills: {
        type: Array,
        required: [true, "skill description is required"]
    },
    reviews: {
        type: String

    },
    price: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now

    }
})

module.exports = mongoose.model("mentor", productSchema)