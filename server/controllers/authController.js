const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const User =require('../models/User');


exports.signup=async(req,res)=>{
    try {
        
        const {name,email,password} =req.body;
        const existingUser =await User.findOne({email});
        
        if(existingUser) return res.status(400).json({message:'user already exists'});

        const hashedPassword =await bcrypt.hash(password,10);
        const user= await new User({name,email, password:hashedPassword}).save();

        res.status(201).json({message:'user registered successfully'});

    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }

}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid user' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user._id, name: user.name, email:user.email, message:'logged successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




