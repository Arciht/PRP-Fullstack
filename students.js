const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamps');
const StudentSchema = new Schema({
    name:{type: String, default: ''},
    age:{type: Number , default:18},
    subject:{type : String , default: ''},
    marks:{type:Number , default:0},
});

StudentSchema.pre('save', (next)=>{
    this.update_at = Date.now();
    next();
});
StudentSchema.plugin(timestamps, {index: true});
module.exports = mongoose.model('student', StudentSchema);
