const express = require('express')
var mysql = require('mysql')
const bodyParser = require('body-parser')
const path = require('path');
const multer = require('multer'); 

const app = express()
const port = 3000

app.use(express.static('library'))
app.use(express.static('views'))
app.use(express.static('images'))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','pug');


app.get('/', function (req, res) {
    res.sendFile('index.html', {root : __dirname})
  });
  
app.get('/AboutUs', function (req, res) {
    res.sendFile('views/AboutUs.html')
});
app.get('/AlcoholEthanol', function (req, res) {
  res.sendFile('views/AlcoholEthanol.html')
});
app.get('/Career', function (req, res) {
  res.sendFile('views/Career.html')
});
app.get('/Contact', function (req, res) {
  res.sendFile('views/Contact.html')
});
app.get('/Dryers', function (req, res) {
  res.sendFile('views/Dryers.html')
});
app.get('/Evaporation', function (req, res) {
  res.sendFile('views/Evaporation.html')
});
app.get('/Starch', function (req, res) {
  res.sendFile('views/Starch.html')
});



  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rutuja@123',
    database: 'contact',
    insecureAuth : true
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    
  });



  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype =='application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });
  

app.post('/submit' , upload.single('file'), function(req,res){
    console.log(req.body);
    
    var sql="insert into svcareer values(null,'"+req.body.fname+"', '"+req.body.lname+"', '"+req.body.email+"', "+req.body.phno+",'"+req.body.bdate+"','"+req.body.position+"','"+req.body.status+"')";
    connection.query(sql, function (err) {
        if (err) throw err
      
        res.redirect('Career.html')
      })

      connection.end();
})

//connection.end();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

