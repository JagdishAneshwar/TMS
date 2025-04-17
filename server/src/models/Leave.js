const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaveScehma = new Schema({
    user:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    leavereason:{
        type:String,
        require:true
    }, 
    comment:{
        type:String,
        require:true
    },    
    from:{
        type:String,
        require:true
    },    
    to:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    },
    adminsaw:{
        type:String
      },
      usersaw:{
        type:String
      },
})


module.exports = mongoose.model("leave", leaveScehma)