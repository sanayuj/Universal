const mongoose = require("mongoose")
mongoose.set('strictQuery', true)

module.exports = {

    dbConnect: async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URL).then(() => {
                console.log("Database connected succefully")
            })
        } catch (err) {
            console.log(err)
        }
    },


}