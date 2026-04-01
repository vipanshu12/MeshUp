import mongoose from "mongoose";

const connectDb = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('databse connected'))
       await mongoose.connect(`${process.env.MONGODB_URL}/pingup`)

    }catch(error) {
        console.log(error.message)

    }
}
export default connectDb