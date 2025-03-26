import jwt from 'jsonwebtoken';
import AuthCoordinator from '../coordinators/auth.coordinator.js';

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await AuthCoordinator.loginUser(username, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create the token payload
        const tokenPayload = {
            username: user.username,
            organization: user.organizationID,
            isAdmin: user.isAdmin,  // Assuming `isAdmin` is a boolean property of `user`
        };

        // Sign the token with the payload
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Respond with the token
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const signup = async (req, res) => {
    try {
        const result = await AuthCoordinator.addUser(req.body);
        if (result.isDupe) {
            res.status(200).json(result);
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

