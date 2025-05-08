const getUser = (req, res, next) => {
    try {
        res.send('Success')
    } catch (error) {
        next(error)
    }
}

export default {
    getUser
}