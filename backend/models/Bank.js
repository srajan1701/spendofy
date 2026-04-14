import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({

 userId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 },

 bankName:{
  type:String,
  required:true
 },

 gmail:{
  type:String
 },

 connected:{
  type:Boolean,
  default:true
 }

});

export default mongoose.model("Bank",bankSchema);