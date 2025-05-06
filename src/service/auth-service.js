import { prismaClient } from '../application/database.js';
import {v4 as uuid} from "uuid"

const findOrCreateUser = async (request) => {
    const userExist = await prismaClient.user.count({
        where: {googleId: request.googleId}
    })

    const tokens = uuid().toString();

    if (userExist === 1) {
        await prismaClient.user.update({
            where: {
                googleId: request.googleId
            },
            data: {
                token: tokens
            }
        })
        return;
    }

    if (userExist !== 1) {
        await prismaClient.user.create({
            data: {
                googleId: request.id,
                email: request.email,
                name: request.name,
                token: tokens
            }
        })
        return;
    }
};

const logout = async (request) => {

    return await prismaClient.user.update({
        where: {
            id: request
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