// import passport from "passport";
// import Strategy from "passport-local";
// import { userDetails } from "../utiliti/containsValues.mjs";

/*passport.serializeUser((user, done) => {
    console.log("Inside serialize user");
    console.log(user);
    done(null, user.id);    
});

passport.deserializeUser((id, done) =>{
    console.log("Inside deserialize");
    try {
        const findUser = userDetails.find((user) => user.id === id);
        if(!findUser) throw new Error("user Not Found");
        done(null, findUser);
    } catch (error) {
        done(err, null);
    }
    
});*/

// export default passport.use(
//     new Strategy((name, password, done) =>{
//         console.log(name, password);
//         try {
//             const findUser = userDetails.find((user) => user.name === name);
//             if(!findUser || findUser.password !== password) throw new Error("user not found");            
//             done(null, findUser);
//         } catch (error) {
//             done(error, null);
//         }
//     })
// );