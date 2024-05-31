import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';

const jwt_secret = process.env.JWT_SECRET_KEY;

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, jwt_secret ? jwt_secret : 'some_default_value_that_can_be_used_when_nothing_is_seted', (err, user) => {
            if(err){
                return res.sendStatus(403);
            }

            req.user = user as UserPayload;
            console.log("User authenticated successfully!")
            next();
        });
    }
    else{
        console.log("User authentication failed!")
        res.sendStatus(401)
    }
}

export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        return res.sendStatus(403);
      }
  
      const hasRole = roles.some(role => role === req.user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
  
      if (!hasRole) {
        console.log("User attempting to access endpoint without access!")
        return res.sendStatus(403);
      }
  
      next();
    };
  };
  