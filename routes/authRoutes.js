
import { Router } from 'express';
import multer from 'multer';
import { registerAdmin, loginAdmin, registerLivreur, updateLivreur, deleteLivreur,
   registerCompany, updateCompany, deleteCompany , getAllLivreurs, getAllCompanies,
   registerUser, loginUser
  
  } from '../controller/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import passport from 'passport';


const router = Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Routes sans authentification
router.post('/registerAdmin', registerAdmin);
router.post('/loginAdmin', loginAdmin);

router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);

// Routes avec authentification
router.post('/registerLivreur', authMiddleware, upload.single('avatar'), registerLivreur);
router.post('/registerCompany', authMiddleware, upload.single('avatar'), registerCompany);
router.put('/updateLivreur/:id', authMiddleware, upload.single('avatar'), updateLivreur); 
router.delete('/deleteLivreur/:id', authMiddleware, deleteLivreur); 
router.put('/updateCompany/:id', authMiddleware, upload.single('avatar'), updateCompany); 
router.delete('/deleteCompany/:id', authMiddleware, deleteCompany);
router.get('/getAllLivreurs', authMiddleware, getAllLivreurs);
router.get('/getAllCompanies', authMiddleware, getAllCompanies);

/************* AUTH USER WITH GOOGLE ******************/

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/profile');
    }
  );
  
  router.get('/profile', (req, res) => {
    if (!req.user) {
      return res.redirect('/auth/google');
    }
    res.json(req.user);
  });
  
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  
  /***********************************************/

export default router;
