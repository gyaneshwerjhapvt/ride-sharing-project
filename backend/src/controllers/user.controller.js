
const User = require('../models/User.js');

exports.registerUser = async (req, res) => {
    try {
        const { full_name, email, phone, password, role, license_number } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        const existPhone = await User.findOne({where: {phone}});
        if (existingUser && existPhone) {
            return res.status(400).json({ message: "Email or phone already exists" });
        }
        const newUser = await User.create({
            full_name,
            email,
            phone,
            password,
            role,
            license_number
        });
        res.status(201).json({
            message: "User registered successfully",
            user: newUser
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }
        res.json({
            message: "Login successful",
            user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const allowedFields = ['full_name', 'email', 'phone', 'password', 'role', 'license_number'];
        const payload = {};
        for (const field of allowedFields) {
            if (Object.prototype.hasOwnProperty.call(req.body, field)) {
                payload[field] = req.body[field];
            }
        }
        await user.update(payload);
        res.json({
            message: 'User updated successfully (PUT)',
            user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.patchUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const allowedFields = ['full_name', 'email', 'phone', 'password', 'role', 'license_number'];
        const payload = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                payload[field] = req.body[field];
            }
        }
        if (Object.keys(payload).length === 0) {
            return res.status(400).json({ message: 'No valid fields provided for PATCH' });
        }
        await user.update(payload);
        res.json({
            message: 'User updated successfully (PATCH)',
            user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
