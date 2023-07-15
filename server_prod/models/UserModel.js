import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: [String],
            enum: ["user", "admin", "super_admin", "vendor"],
            default: ["user"],
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
