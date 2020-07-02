const express=require('express');
const path= require('path');
const mongoose=require('mongoose');
const Handlebars=require('handlebars')
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const index=require('./controller/index');
const user=require('./controller/user');
const app=express();


//DB Config
const db = require('./model/db').mongourl
//Connect to Mongo
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology: true})
    .then(()=> console.log(`Mongodb Connected`))
    .catch((err)=> console.log(err));

//set the body-parse middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Set the template engine 
app.set('views',path.join(__dirname,'/views/'));
app.engine('handlebars', exphbs({handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine','handlebars');

//Router
app.use('/',index);
app.use('/user/',user);

const Port=process.env.Port ||3500;
app.listen(Port,()=>{ console.log(`Server is runnig at port no ${Port}`);
})