// middleware function
export const getTheidOfuser = (req, res, next) => {
    const {
        params: { id },
     } = req;

     const parseid = parseInt(id);
     if(isNaN(parseid)) return res.sendStatus(400);
     
     const findindex = userDetails.findIndex((user) => user.id === parseid);
     if(findindex === -1) return res.sendStatus(404);
     req.findindex = findindex;
     next();
}