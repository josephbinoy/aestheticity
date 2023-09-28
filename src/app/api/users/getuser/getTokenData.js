import jwt from "jsonwebtoken";

export default function getTokenData(request){
    try {
        let tokenData=null;
        let token=request.cookies.get('token');
        token=token&&token.value;
        if(token)
            tokenData=jwt.verify(token, process.env.JWT_KEY);
        return tokenData;
    } 
    catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}