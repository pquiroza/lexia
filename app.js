const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')

const mongoose = require('mongoose');
var tunnel = require('tunnel-ssh');
const Schema = mongoose.Schema;

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
app.get('/api/user/login', (req, res) => {
   res.send('Hello World!')
})


var config = {
  username:'i861127',
  host: '181.43.91.104',
  agent : process.env.SSH_AUTH_SOCK,
  port: 22,
  dstPort: 27017,
  password: '123456',

};






var datosSchema = new Schema({
  mes: String,
  dia: String,
  count: String
});

app.post('/api/getdatos',(req,res)=> {
  var server = tunnel(config, function (error, server) {
      if(error){
          console.log("SSH connection error: " + error);
      }
      mongoose.connect('mongodb://127.0.0.1/lexia');

      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'DB connection error:'));
      db.once('open', function() {
          // we're connected!
          console.log("DB connection successful");
      });
  });

  var datosModel = mongoose.model('datosdias',datosSchema);

  datosModel.find({'mes':'Jul'},'mes dia count',function(err,datos){
    console.log(datos);
    return res.status(200).json({
      status: 'success',
      data: datos
    })
  })
//  db.disconnect();
})



app.listen(3000, () => console.log('blog server running on port 3000!'))
