import { prismaClient } from '../application/database.js';

// ini juga bisa menjadi function register / login
const findOrCreateUser = async (request) => {
    

    const userExist = await prismaClient.user.count({
        where: {email: request.email}
    })
    
    if (userExist === 1) {
        await prismaClient.user.update({
            where: {
                email: request.email
            },
            data: {
                token: request.token
            }
        })
    }

    if (!userExist) {
        await prismaClient.user.create({
            data: {
                googleId: request.googleId,
                email: request.email,
                name: request.name,
                token: request.token
            }
        })
    }
};

const logout = async (request) => {

    // hapus token di db
    return await prismaClient.user.update({
        where: {
            googleId: request
        },
        data: {
            token: null
        },
        select: {
            googleId: true
        }
    });
}

export default {
    findOrCreateUser,
    logout
}