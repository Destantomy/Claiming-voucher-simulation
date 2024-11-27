const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcrypt');
const db = require('../database/connection');

const signup = async (req, res) => {
    try {
        // declare variables
        const { username, password, email, nama } = req.body;
        const tanggal_daftar = new Date().toISOString().slice(0, 10);
        // variables validate
        if(!username || !password || !email || !nama) {
            return res.status(400).json({error: 'please complete all fields'});
        }
        if(!validator.isEmail(email)) {
            return res.status(400).json({error: 'invalid email format'});
        }
        if(password.length < 10) {
            return res.status(400).json({error: 'password must be at least 10 characters'});
        }
        // checking email or username is registered
        const checkUserQuery = 'SELECT * FROM tb_user WHERE username = ? OR email = ?';
        db.query(checkUserQuery, [username, email], async(error, result) => {
            if (error) {
                console.error('error db : ', error)
                return res.status(500).json({error: 'internal server error'});
            }
            if(result.length > 0) {
                return res.status(400).json({error: 'username or email already exists'})
            }
            // if validation passed then save to db
            // hasing password
            const passwordHashed = await bcrypt.hash(password, 10);
            // insert new user data into db
            const insertUserQuery = `INSERT INTO tb_user (username, password, email, nama, tanggal_daftar) VALUES (?,?,?,?,?)`;
            db.query(insertUserQuery, [username, passwordHashed, email, nama, tanggal_daftar], (error) => {
                if(error) {
                    console.error('error db : ', error);
                    return res.status(500).json({error: 'internal server error'});
                }
            // succeed response
            res.status(201).json({
                    message: 'user registered successfully',
                });
            });
        });
    } catch (error) {
        console.error('error : ', error);
        res.status(500).json({error: 'internal server error'});
    }
}

const login = async (req, res) => {
    try {
        // declares variables
        const { username, password } = req.body;

        // variables validation
        if (!username || !password) {
            return res.status(400).json({error: 'please complete all fields'});
        }
        // check if there was exist user in db
        const checkUserQuery = 'SELECT * FROM tb_user WHERE username = ?';
        db.query(checkUserQuery, [username], async(error, result) => {
            if(error) {
                console.error('error db :', error);
                return res.status(500).json({error: 'internal server error'});
            }
            if(result.length === 0) {
                return res.status(400).json({error: 'username is incorrect'});
            }
            // taking the 1st unique username
            const user = result[0];

            // comparing hashed password user's
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(!passwordMatch) {
                return res.status(400).json({error: 'password is incorrect'});
            }
            // creating JWT token for login user
            const token = jwt.sign({
                userId : user.id,
                username: user.username,
            }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // succeed response with giving JWT token
            res.status(200).json({
                message: 'login successfuly',
                token: token,
            });
        });
    } catch (error) {
        console.error('error :', error);
        res.status(500).json({error: 'internal server error'});
    }
}

module.exports = { signup, login };