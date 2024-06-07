import jwt from 'jsonwebtoken'
import User from '../models/users.model.js';

export const isLoggedIn = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'You are not logged in!' });
        }

        const decodedToken = jwt.verify(token, process.env.Jwt_secret);
        const { userId, userRole } = decodedToken;
        if(userRole !== 'author'){
            return res.status(401).json({ error: 'Log in as author!' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (e) {
        res.status(500).send({ error: 'Internal server error' })
    }
};