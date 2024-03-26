import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
})

const UserModel1 = mongoose.model('User', UserSchema)

export default UserModel1