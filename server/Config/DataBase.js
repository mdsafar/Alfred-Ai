import mongoose from "mongoose"

const ConnectDataBase = () => {
    mongoose.connect(process.env.DB_URL).then((data) => {
      console.log(`Mongodb Connected : ${data.connection.host}`)
   }).catch((err) => {
      console.error(err)
      process.exit(1)
   })
}

export default ConnectDataBase