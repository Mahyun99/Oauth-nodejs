import * as dotenv from 'dotenv';
import { google } from "googleapis";

dotenv.config()
// configurasi utk oauth
export const oauth2Client = new google.auth.OAuth2(
    // parameter ini diambil dari env (didapat dari web gooogle console)
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
)

export const scopes = [
    // scope yg akan diminta ke user (di seting melalui web gooogle console)
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
]

