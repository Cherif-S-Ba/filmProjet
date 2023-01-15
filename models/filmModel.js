const mongoose = require('mongoose')

const Schema =mongoose.Schema

const filmSchema = new Schema({
    title: {
    type :String,
    required:true
    },
    release_year:{
        type:Number,
        required:true
    },
    score:{
            type:String,
            required:true
    },
    main_genre:{
        type:String,
        required:true
    },
    main_production:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('film',filmSchema)