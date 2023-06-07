import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    roles:[{
        ref: "Role",
        type: Schema.Types.ObjectId //QUIERO OBTENER EL ID DEL USUARIO, NO SU ROL 
    }]
},{
    timestamps: true,
    versionKey: false
})

export default userSchema