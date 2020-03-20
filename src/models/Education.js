const mongoose = require('mongoose');

const childSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    childFullName: { type: String },
    childAge: { type: String },
    payment: { type: String }
});

const parentSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    parentFirstName: { type: String },
    parentLastName: { type: String },
    parentEmail: { type: String },
    parentPhoneNumber: { type: String },
    children: [childSchema]
});



// const educationSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     parentFirstName: { type: String },
//     parentLastName: { type: String },
//     parentEmail: { type: String },
//     parentPhoneNumber: { type: String },
//     child1: { type: String },
//     child1Age: { type: String },
//     child1Payment: { type: String },
//     child2: { type: String },
//     child2Age: { type: String },
//     child2Payment: { type: String },
//     paymentChild2: { type: String },
//     child3: { type: String },
//     child3Age: { type: String },
//     child3Payment: { type: String },
//     child4: { type: String },
//     child4Age: { type: String },
//     child4Payment: { type: String }
// });

module.exports = mongoose.model('Education', parentSchema);
