import User from "../models/user.js";
import Livreur from "../models/livreur.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';
import Company from "../models/Company.js";


function generateIdentifiant() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let identifiant = '';
    for (let i = 0; i < 5; i++) {
        identifiant += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return identifiant;
}

function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,   
        pass: process.env.EMAIL_PASS    
    },
    tls: {
        rejectUnauthorized: true
    }
});



async function sendPasswordEmail(recipientEmail, password) {
    const mailOptions = {
        from: process.env.EMAIL_USER,   
        to: recipientEmail,             
        subject: 'Votre mot de passe pour l\'application',
        html: `
        <!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bangers&display=swap">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            border-radius: 10px;
        }
        .header {
            text-align: center;
            color: white;
            padding: 0;
            height: 80px; 
            border-radius: 25px 25px 0 0;
            overflow: hidden;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-image: url('https://img.freepik.com/photos-premium/service-livraison-rapide-gratuit-banniere-scooter-fond-jaune-courrier-livre-commande-nourriture-copier-espace-ai-generation_235573-2628.jpg');
            background-size: cover; 
            background-position: center -70px; 
        }
        .styled-text {
            font-family: 'Bangers', cursive;
            font-size: 2.25em; 
            font-weight: bold; 
            text-align: center; 
            text-transform: uppercase;
            color: white;
            text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.1),
                         2px 2px 0px rgba(0, 0, 0, 0.1),
                         1px 1px 0px rgba(0, 0, 0, 0.1); 
            margin-Left: 260px ;
            margin-Top : 18px ;
            position: relative;
            z-index: 2; 
            transform: translateX(50px); 
        }
        .header::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 165, 0, 0.8); 
            z-index: 1; 
        }
        .content {
            margin: 20px 0;
        }
        .content p {
            font-size: 16px;
            color: #333333;
        }
        .password-box {
            margin: 20px 0;
            padding: 15px;
            background-color: #f9f9f9;
            border-left: 4px solid #FFA500;
            font-size: 18px;
            font-weight: bold;
            color: #333333;
        }
        .footer {
            text-align: center;
            margin: 20px 0 0;
            font-size: 14px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="styled-text">
                Delivery Access
            </div>
        </div>
        <div class="content">
            <p>Bonjour,</p>
            <p>Merci de vous être inscrit à notre application. Voici votre mot de passe :</p>
            <div class="password-box">${password}</div>
            <p>Nous vous recommandons de changer votre mot de passe après votre première connexion.</p>
        </div>
        <div class="footer">
            <p>Merci de votre confiance.</p>
        </div>
    </div>
</body>
</html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent to:', recipientEmail);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export { sendPasswordEmail };

export  async function registerLivreur (req, res) {
    const { name, email, phone, cin, vehicleType, availabilityStatus } = req.body;
    
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const password = generatePassword();
        user = new User({
            name,
            email,
            password,
            phone,
            role: "Livreur",
            avatar:`${req.protocol}://${req.get("host")}/public/images/${req.file.filename}`
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        
        console.log('Calling sendPasswordEmail with:', email, password);
        await sendPasswordEmail(email, password); 
       

        const identifiant = generateIdentifiant();

        const livreur = new Livreur({
            cin,
            identifiant,
            vehicleType,
            availabilityStatus,
            user: user._id
        });
        await livreur.save();

        user.LivreurData = livreur._id;
        await user.save();

        res.status(201).json({ message: "User and Livreur registered successfully", identifiant });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}



async function sendPasswordEmailCompany(recipientEmail, password) {
    const mailOptions = {
        from: process.env.EMAIL_USER,   
        to: recipientEmail,             
        subject: 'Votre mot de passe pour l\'application',
        html: `
        <!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bangers&display=swap">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            border-radius: 10px;
        }
        .header {
            text-align: center;
            color: white;
            padding: 0;
            height: 80px; 
            border-radius: 25px 25px 0 0;
            overflow: hidden;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-image: url('https://nextrestaurants.com/wp-content/uploads/2019/10/Restaurant-Instagram-Photography.png');
            background-size: cover; 
            background-position: center -70px; 
        }
        .styled-text {
            font-family: 'Bangers', cursive;
            font-size: 2.25em; 
            font-weight: bold; 
            text-align: center; 
            text-transform: uppercase;
            color: white;
            text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.1),
                         2px 2px 0px rgba(0, 0, 0, 0.1),
                         1px 1px 0px rgba(0, 0, 0, 0.1); 
            margin-Left: 20px ;
            margin-Top : 20px ;
            position: relative;
            z-index: 2; 
            transform: translateX(50px); 
        }
        .header::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 165, 0, 0.8); 
            z-index: 1; 
        }
        .content {
            margin: 20px 0;
        }
        .content p {
            font-size: 16px;
            color: #333333;
        }
        .password-box {
            margin: 20px 0;
            padding: 15px;
            background-color: #f9f9f9;
            border-left: 4px solid #FFA500;
            font-size: 18px;
            font-weight: bold;
            color: #333333;
        }
        .footer {
            text-align: center;
            margin: 20px 0 0;
            font-size: 14px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="styled-text">
                Kitchen Access
            </div>
        </div>
        <div class="content">
            <p>Bonjour,</p>
            <p>Merci de vous être inscrit à notre application. Voici votre mot de passe :</p>
            <div class="password-box">${password}</div>
            <p>Nous vous recommandons de changer votre mot de passe après votre première connexion.</p>
        </div>
        <div class="footer">
            <p>Merci de votre confiance.</p>
        </div>
    </div>
</body>
</html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent to:', recipientEmail);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export { sendPasswordEmailCompany };



export  async function registerCompany (req, res) {
    const { name, email, phone, companyName, type, address, openingHours, closingHours } = req.body;
    
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const password = generatePassword();
        user = new User({
            name,
            email,
            password,
            phone,
            role: "Company",
            avatar:`${req.protocol}://${req.get("host")}/public/images/${req.file.filename}`
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        
        console.log('Calling sendPasswordEmail with:', email, password);
        await sendPasswordEmailCompany(email, password); 
       

        const identifiant = generateIdentifiant();

        const company = new Company({
            identifiant,
            companyName,
            type,
            address,
            openingHours,
            closingHours,
            user: user._id
        });
        await company.save();

        user.CompanyData = company._id;
        await user.save();

        res.status(201).json({ message: "User and Company registered successfully", identifiant });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function updateCompany(req, res) {
    const { id } = req.params;
    const { name, email, phone, companyName, type, address, openingHours, closingHours } = req.body;

    if (!name && !email && !phone && !companyName && !type && !address && !openingHours && !closingHours && !req.file) {
        return res.status(400).json({ message: "At least one field must be updated" });
    }

    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let company = await Company.findById(user.CompanyData);
        if (!company) {
            return res.status(404).json({ message: "Company data not found" });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (req.file) user.avatar = `${req.protocol}://${req.get("host")}/public/images/${req.file.filename}`;

        if (companyName) company.companyName = companyName;
        if (type) company.type = type;
        if (address) company.address = address;
        if (openingHours) company.openingHours = openingHours;
        if (closingHours) company.closingHours = closingHours;

        await user.save();
        await company.save();

        res.status(200).json({ message: "User and Company updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}


export async function deleteCompany(req, res) {
    const { id } = req.params;

    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let company = await Company.findById(user.CompanyData);
        if (!company) {
            return res.status(404).json({ message: "Company data not found" });
        }

        await Company.findByIdAndDelete(user.CompanyData);
        await User.findByIdAndDelete(id);

        res.status(200).json({ message: "User and Company deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}



export async function getAllCompanies(req, res) {
    try {
        const companies = await Company.find().populate('user', 'name email phone avatar');
        res.status(200).json(companies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}




export async function updateLivreur(req, res) {
    const { id } = req.params;
    const { name, email, phone, cin, vehicleType, availabilityStatus } = req.body;

    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let livreur = await Livreur.findById(user.LivreurData);
        if (!livreur) {
            return res.status(404).json({ message: "Livreur data not found" });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        if (req.file) {
            user.avatar = `${req.protocol}://${req.get("host")}/public/images/${req.file.filename}`;
        }

        livreur.cin = cin || livreur.cin;
        livreur.vehicleType = vehicleType || livreur.vehicleType;
        livreur.availabilityStatus = availabilityStatus || livreur.availabilityStatus;

        await user.save();
        await livreur.save();

        res.status(200).json({ message: "User and Livreur updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}



export async function deleteLivreur(req, res) {
    const { id } = req.params;

    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let livreur = await Livreur.findById(user.LivreurData);
        if (!livreur) {
            return res.status(404).json({ message: "Livreur data not found" });
        }

        await Livreur.findByIdAndDelete(user.LivreurData);
        await User.findByIdAndDelete(id);

        res.status(200).json({ message: "User and Livreur deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function getAllLivreurs(req, res) {
    try {
        const livreurs = await Livreur.find().populate('user', 'name email phone avatar');
        res.status(200).json(livreurs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}


export async function registerAdmin (req, res) {
    const { name, email, password } = req.body;
    
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        user = new User({
            name,
            email,
            password,
            role: 'admin',
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};


export async function loginAdmin(req, res) {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                return res.status(200).json({ message: "Admin logged in successfully", token });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};



export async function  registerUser(req,res){
    
    try {
        const { name, email, password, phone } = req.body;

            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }

            user = new User({
                name,
                email,
                password,
                phone,
                role: "Client",
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            
            res.status(201).json({ message: "User registered successfully" });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function loginUser(req,res){
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if(user.role !== 'Client'){
            return res.status(403).json({ message: "Access denied" });
        }
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

      const token=  jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            }
        );

        return

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}



export async function loginLivreur(req,res){
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if(user.role !== 'Livreur'){
            return res.status(403).json({ message: "Access denied" });
        }
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

      const token=  jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            }
        );

        return

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}




