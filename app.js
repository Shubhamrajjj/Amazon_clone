const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
let users = require('./database').userDB;

const app = express();
const server = http.createServer(app);
app.use(express.static('static'))
app.use('/static', express.static('static'))


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./static')));


app.get('/',(req,res) => {
    const name = req.query.uname;
    if (!name) {
        res.redirect('/login');
    }
    // res.render('index')
    res.sendFile(path.join(__dirname,'./public/index.html'));
});


app.get('/index.html',(req,res) => {
    const name = req.query.uname;
    if (!name) {
        res.redirect('/login');
    }
    // res.render('index')
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.get('/shopping1.html',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/shopping1.html'));
});

app.get('/shopping2.html',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/shopping2.html'));
});

app.get('/shopping3.html',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/shopping3.html'));
});

app.get('/shopping4.html',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/shopping4.html'));
});

app.get('/shopping5.html',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/shopping5.html'));
});

app.get('/shopping6.html',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/shopping6.html'));
});

app.get('/shopping7.html',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/shopping7.html'));
});

app.get('/shopping8.html',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/shopping8.html'));
});

// app.get('/users', (req, res) => {
//     res.render('users', { users })
// }


app.get('/login',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/login.html'));
});

app.get('/register',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/newaccount.html'));
});


app.post('/register', async (req, res) => {
        let foundUser = users.find((data) => req.body.username === data.username);
        if (!foundUser) {
        
            let newUser = {
                id: Date.now(),
                username: req.body.username,
                password: req.body.password,
            };
            users = [...users, newUser];
            console.log('User list', users);
            let redirect_url = `/?uname=${newUser.username}`
            res.redirect(redirect_url)
            // res.send("<d//iv align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='/login'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
        } else {
            // res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='/register'>Register again</a></div>");
        }
});

app.post('/login', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.username == data.username);
        if (foundUser) {
    
            let submittedPass = req.body.password; 
            let storedPass = foundUser.password; 
    
            // const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (submittedPass == storedPass) {
                console.log("found!")
                let usrname = foundUser.username;
                let redirect_url = `/?uname=${usrname}`
                res.redirect(redirect_url)
            } else {
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='/login'>login again</a></div>");
            }
        }
        else {
    
            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);
    
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        }
    } catch{
        res.send("Internal server error");
    }
});

server.listen(3000, function(){
    console.log("server is listening on port: 3000");
});
