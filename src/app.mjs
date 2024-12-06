import express from "express";
import  RouterPath  from "./router/index.mjs";
import cookieParser from "cookie-parser"; 
import session, {  } from "express-session";
import { userDetails } from "./utiliti/containsValues.mjs";
// npm i passport passport-local
// import passport from "passport";
// import "./strategies/loca-strategy.mjs";

const PORT = process.env.PORT || 3000;
const app = express();
// for capture the data from request through body
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser("holloWorld"));
app.use(
    session({
        secret: "abc the dev",
        saveUninitialized: false,
        resave: false,
        cookie:{
            maxAge: 60000 * 60,
        }
    })
);


//router use from ../router/router.mjs
app.use(RouterPath);

// This is only structure how use cookie in website
app.get('/', (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    // this line use for prevent the modify session id once time
    req.session.visited = true;
    
   res.cookie('hello', "World", { maxAge: 100000, signed: true });
    
   res.send(userDetails); 
});


// real How to use session and cookies in website after login
app.post('/api/auth', (req, res) => {
    const {
        body: { name, password }
    } = req;
    const isAvalableUser = userDetails.find((user) => user.name === name);
    if(!isAvalableUser || isAvalableUser.password !== password) 
        return res.status(401).send({ msg : "Credential Error" });
    req.session.user = isAvalableUser;
    return res.status(200).send(isAvalableUser);
});

app.get('/api/auth/status', (req, res) => {
    req.sessionStore.get(req.session.id, (err, sessionData) =>{
        console.log(req.session);
        
    });
    return req.session.user 
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg : "Not Authenticated" });
});

// How to use session for virtual card 
// How to add item for virtual card
app.post('/api/card', (req, res) => {
    if(!req.session.user) return res.sendStatus(401);
    const { body: item } = req;
    const { card } = req.session;

    if(card){
        card.push(item);
    }
    else{
        req.session.card = [item]
    }
    return res.status(201).send(item);
});

app.get('/api/card', (req, res) => {
    if(!req.session.user) return res.sendStatus(401);
    return res.send(req.session.card ?? []); // this use ?? is empty or not
});



app.listen(PORT, () => {
    console.log(`Server working on PORT ${PORT}`);
});
