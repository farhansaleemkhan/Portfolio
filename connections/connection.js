import mongoose from "mongoose";

function myConnection() {
  mongoose
    .connect("mongodb+srv://syedahmadmasood:9oHAapkQwaPQNuX3@cluster0.icl9hxj.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully Connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

export default myConnection;
