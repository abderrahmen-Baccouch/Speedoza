
import { Router } from 'express';
import multer from 'multer';
import { registerAdmin, loginAdmin, registerLivreur, updateLivreur, deleteLivreur } from '../controller/authController.js';

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

router.post('/registerAdmin', registerAdmin);
router.post('/loginAdmin', loginAdmin);
router.post('/registerLivreur', upload.single('avatar'), registerLivreur);
router.put('/updateLivreur/:id', upload.single('avatar'), updateLivreur); 
router.delete('/deleteLivreur/:id', deleteLivreur); 


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
