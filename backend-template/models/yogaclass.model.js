const mongoose = require("mongoose")


const BATCH_1 = "6-7(AM)"
const BATCH_2 = "7-8(AM)"
const BATCH_3 = "8-9(AM)"
const BATCH_4 = "5-6(PM)"


// 6-7AM, 7-8AM, 8-9AM and 5-6PM.

const YogaClassSchema = new mongoose.Schema({
    Batch : {
        type : String,
        enum: [BATCH_1 , BATCH_2 , BATCH_3 , BATCH_4],
        default : BATCH_1
    },
} , {timestamps: true})


module.exports  = mongoose.model("yogaclass" , YogaClassSchema)