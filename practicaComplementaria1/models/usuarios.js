const mongoose= require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const usuariosCollection = 'usuarios'
const encryptHash= 10

const UsuarioSchema= new Schema({
    username: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    direccion: { type: String, required: true },
})

UsuarioSchema.pre('save',function(next){
    if(this.isNew || this.isModified('password')){
        const document=this
        bcrypt.hash(document.password,encryptHash,(err,hashedPassword)=>{
            if(err){
                next(err)
            }else{
                document.password = hashedPassword
                next() 
            }
        })
    }else{
        next()
    }
})

UsuarioSchema.methods.isCorrectPassword = function(password,done){
    bcrypt.compare(password, this.password, function(err,same){
        if (err) {
            done(err)
        } else {
            done(err,same)            
        }
    })
}
 
module.exports = mongoose.model(usuariosCollection,UsuarioSchema)