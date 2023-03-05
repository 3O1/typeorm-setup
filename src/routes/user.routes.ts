import express from 'express';
import {
  createUserHandler,
  getAllUsersHandler,
} from '../controllers/user.controller';

const router = express.Router();

// Route for getting all users
router.get('/users', getAllUsersHandler);

// Route for creating a new user
router.post('/users', createUserHandler);

export default router;
