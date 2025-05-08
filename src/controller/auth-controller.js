import { oauth2Client, scopes } from "../config/oauth.js";
import { google } from 'googleapis';
import authService from '../service/auth-service.js'
import crypto from 'crypto';
import jwtHelper from '../helper/jwt-helper.js';

const home = async (req, res, next) => {
    try {
        res.status(200).json({
            data: "OKE"
        })
    } catch (error) {
        
    }
}

const initateAuth = async (req, res, next) => {
    try {
        const state = crypto.randomBytes(32).toString('hex');
        req.session.state = state
        // authorzation utk url-nya
        const authorizationUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            include_granted_scopes: true,
            state: state
        });
        res.redirect(authorizationUrl)
    } catch (e) {
        next(e)
    }
};

const handleCallback = async (req, res, next) => {
    try {
        const {code} = req.query    // {code} => utk menangkap query hasil login user(berupa code/token)
        const {tokens} = await oauth2Client.getToken(code); // membuat token dari code yg dikirim google(hasil login)
        oauth2Client.setCredentials(tokens);    // membuat/men-set credential dari token diatas

        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });

        const {data} = await oauth2.userinfo.get(); // utk mendapatkan data user (diambil dari oauth2)

        const jwtTokens = jwtHelper.generateToken(data.name); // generate utk membuat token (payload => email)

        const request = {
            googleId: data.id,
            name: data.name,
            email: data.email,
            token: jwtTokens
        }

        const result = await authService.findOrCreateUser(request);
        res.cookie('jwtTokens', jwtTokens, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === 'true',
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000 //15m
        });
        res.redirect('/api/profile')
    } catch (e) {
        next(e)
    }
};

const logout = async (req, res, next) => {
   try {
    const result = await authService.logout(req.user.id);
    // req.session.destroy();
    res.clearCookie('jwtTokens')
    res.satus(200).json({
        data: "OK"
    })
   } catch (e) {
    next(e)
   }
    // logger.debug("userCredential: ", userCredential)
    // let postData = "token=" + userCredential;

    // // Post requset ke Google
    // let postOptions = {
    //     host: 'oauth2.googleapis.com',
    //     port: '443',
    //     path: '/revoke',
    //     method: 'POST', 
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Content-Length': Buffer.byteLength(postData)
    //     }
    // };

    // // Set up the request
    // const postReq = https.request(postOptions, function (res) {
    //     res.setEncoding('utf8');
    //     res.on('data', d => {
    //         console.log('Response : ' + d )
    //     });
    // });

    // // Jika terjadi error di saat membuat request
    // postReq.on('error', error => {
    //     console.log(error)
    // });

    // // Post the requset with data
    // postReq.write(postData);
    // postReq.end();
};

export default {
    home,
    initateAuth,
    handleCallback,
    logout
}