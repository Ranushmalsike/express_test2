import {  Router } from "express";
import { query, validationResult, body, matchedData, checkSchema } from "express-validator";
import { userDetails } from "../utiliti/containsValues.mjs";
import { getTheidOfuser } from "../middleware/middleware.mjs";
import  { uservalidation } from "../utiliti/validaionUser.mjs";
// import { signedCookie } from "cookie-parser";
const router = Router();





router.get('/api/user/:id', (req, res) => {
    // console.log(req.params.id);
    console.log(req.session.id);
    req.sessionStore.get(req.session.id, (err, sessionData) =>{
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(sessionData);
    });
    
    const Id = parseInt(req.params.id);
    if (isNaN(Id)) {
        return res.status(400).send({ msg: 'Invalid ID' });
    }
    const filterID = userDetails.find((user) => user.id === Id);
    if (!filterID) {
        return res.status(404).send({ msg: 'Not found' });
    }
    return res.send(filterID);
});
// Get the filter values through get query
    router.get('/api/user', query('filter').isString().notEmpty().withMessage('Does not must be empty').isLength({ min: 3, max: 10}).withMessage('must be length 3 between 10'), (req, res) => {
    // console.log(validationResult(req));
    const resultOfValidation = validationResult(req);
      if(!resultOfValidation.isEmpty()) return res.status(400).send({error: resultOfValidation.array()});
        const mwtcherror = matchedData(resultOfValidation);
      const {
        query: {filter, value}
    } = req

    if(!filter && !value) return res.send(userDetails);

    if(filter && value) return res.send(userDetails.filter((user) => user[filter].includes(value)));
    
    return res.send(userDetails);
    
});

router.post('/api/user', checkSchema(uservalidation)
, (req, res) => {
    const resultOfValidation = validationResult(req);
      if(!resultOfValidation.isEmpty()) return res.status(400).send({error: resultOfValidation.array()});
        const mwtcherror = matchedData(resultOfValidation);
    
    //  console.log(req.body);
    const {  body  } = req;
    // console.log(body);
    const addValue = { id: userDetails[userDetails.length - 1].id+ 1, ...body };
    userDetails.push(addValue);
     return res.send(addValue);
    
});

// put request
router.put('/api/user/:id', getTheidOfuser,  (req, res) => {
    const {
        body, findindex
     } = req;

     console.log(body);
     

     userDetails[findindex] = { id: userDetails[findindex].id, ...body };
      ///console.log('Updated User:', userDetails[findindex]);
     return res.sendStatus(200);
});

// patch request
router.patch('/api/user/:id', getTheidOfuser, (req, res) => {
    const {
        body, findindex
    } = req;
    if(findindex === -1) return res.sendStatus(404);

});

// Delete The values according to came id 
router.delete('/api/user/:id', (req, res) => {
    const {
        params: { id }
    } = req;
    
    const parseid = parseInt(id);
    if(isNaN(parseid)) return res.sendStatus(400);
    const findindex = userDetails.findIndex((user) => user.id === parseid);
    if(findindex === -1) return res.sendStatus(404);
    userDetails.splice(findindex, 1);
    return res.sendStatus(200);
});
export default router; 
