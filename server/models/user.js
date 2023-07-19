import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, requried: true},
    email: { type: String, requried: true},
    password: { type: String, requried: true},
    id: { type: String}
})

export default mongoose.model("User", userSchema);