import express from "express";
import {  addUser, deleteUser, getUser, updateUser } from "./controller/index.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// File upload configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  });
  const upload = multer({ storage: storage });
router.post('/add',upload.single('photo'), addUser)
// router.post('/addphone',addPhoneNumber)
 router.get('/get',getUser)
// router.post('/',getDetails)
router.delete('/:id', deleteUser)
router.put('/:id',updateUser)

export default router;