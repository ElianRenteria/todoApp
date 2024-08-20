import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePassword = (password:string, hashedPassword:string) => {
    return bcrypt.compare(password, hashedPassword);
}

export const hashPassword = (password:string) => {
    return bcrypt.hash(password, 3);
}

export const createJWT = (user:any) => {
    const token = jwt.sign({
            id: user.id, 
            username: user.username
        }, 
        process.env.JWT_SECRET || 'default-secret',
        { expiresIn: '6h' }
    )
    return token;
}

export const protect = (req:any, res:any, next:any) => {
    const bearer = req.headers.authorization;
    if(!bearer){
        res.status(401);
        res.json({message: 'Unauthorized'});
        return;
    }
    const [, token] = bearer.split(' ');
    if (!token){
        res.status(401);
        res.json({message: 'not valid token'});
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET || 'default-secret');
        req.user = user;
        next();
    } catch (e) {
        res.status(401);
        res.json({message: 'not valid signed token'});
        return;
    }
}