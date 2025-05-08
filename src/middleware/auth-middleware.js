import jwtHelper from "../helper/jwt-helper.js";

// untuk authentication, jika berhasil login 
const authMiddleware = (req, res, next) => {
    // ambil token dari header authorzation
    // const authHader = req.headers['authorization'];
    // const token = authHader && authHader.split(' ')[1];
    
    const token = req.cookies.jwtTokens;
    if(!token) {
        res.status(401).json({
            errors: 'Unauthorized'
        }).end();
    }

    // jika token-nya ada
    try {
        // lakukan verifikasi token
        const decoded = jwtHelper.verifyToken(token, process.env.JWT_SECRET)
        req.user = decoded; //simpan data decoded ke user di request
        // jika token di simpan di db, bisa juga lakukan pengecekan di sini
        next();
    } catch (error) {
        res.clearCookie("jwtTokens");
        return res.redirect("/")
    }
}

export {
    authMiddleware
}