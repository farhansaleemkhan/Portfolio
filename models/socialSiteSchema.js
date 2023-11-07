import mongoose from "mongoose";

//schemaOfSocialSites = SOSS
const SOSS = new mongoose.Schema({
    title : {
        type : String,
        minLength : 5, 
        maxLength : 25,
        required : true,
    },
    link : {
        type : String,
        validate: /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
        unique:true,
        required: true,
    },
    iconLink : {
        type : String,
        validate: /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
        required : true,
    },

});


const SocialModel = mongoose.model('Social',SOSS);

export default SocialModel;
