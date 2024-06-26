import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['author', 'editor'],
        default: 'author'
    },
    address:{
        type: String
    },
},{
    timestamps: true
});

userSchema.methods = {
    generateTokens: function(){
        const payload = {
            userId: this._id,
            userRole: this.role,
            userName:this.username
        };
        const accessToken = jwt.sign(payload, process.env.Jwt_secret, { expiresIn: process.env.Jwt_Access_expiry });
        const refreshToken = jwt.sign(payload, process.env.Jwt_secret , { expiresIn: process.env.Jwt_Refresh_expiry });        

        return {accessToken , refreshToken};
    }
};

const User = model('User', userSchema);

export default User;