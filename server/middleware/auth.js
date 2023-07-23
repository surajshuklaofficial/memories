import jwt from 'jsonwebtoken';

// wants to like a post 
// click the like button => auth middleware (next) => like controller ...
const secret = 'test';

const auth = async (req, res, next) => { 
    try {

        const token = req.headers.authorization.split(" ")[1];

        const isCustomAuth = token.length < 500;

        let decodedData;

        // if custom authorization
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, secret); // give verification after verification

            req.userId = decodedData?.id;

        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }  

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;