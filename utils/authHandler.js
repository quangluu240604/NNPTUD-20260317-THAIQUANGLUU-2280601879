let userController = require('../controllers/users')
let { verifyToken } = require('./jwtVerify')
module.exports = {
    CheckLogin: async function (req, res, next) {
        let key = req.headers.authorization;
        if (!key) {
            if (req.cookies.LOGIN_NNPTUD_S3) {
                key = req.cookies.LOGIN_NNPTUD_S3;
            } else {
                res.status(404).send("ban chua dang nhap")
                return;
            }

        }

        try {
            let result = verifyToken(key);
            if (result.exp * 1000 < Date.now()) {
                res.status(404).send("ban chua dang nhap")
                return;
            }
            let user = await userController.GetUserById(result.id);
            if (!user) {
                res.status(404).send("ban chua dang nhap")
                return;
            }
            req.user = user;
            next();
        } catch (error) {
            res.status(404).send("ban chua dang nhap")
            return;
        }

    }
}