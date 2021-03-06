const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

// @route   POST    api/users
// @dsc     Regiter a user
// @access  Public
router.post('/', [
                check('name', 'Please enter a name').not().isEmpty(),
                check('email','Please enter valid email').isEmail(),
                check('password','Please enter a password with 6 or charecters').isLength({min : 6})
            ] , async (req,res)=>{
                const errors = validationResult(req);
                if(!errors.isEmpty()){
                    return res.status(404).json({ errors : errors.array()})
                }
                const {name, email, password} = req.body;
                try{
                    let user = await User.findOne({ email })
                    if(user){
                        return res.status(400).json({ message : "User allready exists" });
                    }
                    user = new User({
                        name, email, password
                    })

                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(password, salt);
                    await user.save();

                    const payload = {
                        user : {
                            id : user.id
                        }
                    }

                    jwt.sign(payload, config.get('jwtSecret'), { 
                        expiresIn: 360000
                    }, (err, token)=> {
                        if(err) throw err;
                        res.json({ token })
                    } )

                }catch(err){
                    console.error(err.message);
                    return res.status(500).send('Server Error')
                }

            })


module.exports = router;
