import jwt from 'jsonwebtoken';
import { AppConfig } from '../configs/app-config';
/**
 *
 * @param userId
 */
export const createJWTDevToken = async (userId: string) => {
    const payload = {
        email: 'hanafi',
        userId: '867dv9dv'
    };

    const signedToken = jwt.sign(payload, AppConfig.JWT.secret ?? '', {
        issuer: AppConfig.JWT.issuer,
        keyid: AppConfig.JWT.issuer,
        algorithm: 'HS256',
        audience: 'napigo-web',
        expiresIn: 5000
    });

    return signedToken;
};
