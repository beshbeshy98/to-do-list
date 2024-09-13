const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
     useNewUrlParser: true ,
     useUnifiedTopology: true 
    }).then(()=>{
        console.log("Connected to MongoDB successfully");
    }).catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });

    const listSchema = new mongoose.Schema({
        text: { type: String, required: true },
      }, { timestamps: true });

const Item = mongoose.model("Item", listSchema);

module.exports = Item;