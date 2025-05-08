import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

// membuat token
const generateToken = (payload) => {
    return jwt.sign({username: payload}, process.env.JWT_SECRET, {
        expiresIn: '20m'
    });
}

// verifikasi token
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return {valid: true, decoded}
    } catch (error) {
        return {valid: false, errors: error.message};
    }
}

export default {
    generateToken,
    verifyToken
}