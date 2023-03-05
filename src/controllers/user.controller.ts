import { Request, Response } from 'express';
import { createUser, getUsers } from '../services/user.service';

// Handler function for the "get all users" API endpoint
export const getAllUsersHandler = async (_: Request, res: Response) => {
  try {
    const allUsers = await getUsers(); // Get all users from the database

    // Return a JSON response with the users and a success status
    return res.status(200).json({
      status: 'Success',
      users: allUsers,
    });
  } catch (err) {
    // Log the error and return a JSON response with an error status and message
    console.log(err);
    return res.status(500).json({
      status: 'Failure',
      message: err.message,
    });
  }
};

// Handler function to create a user in the database
export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    // Check if a name was provided
    if (!name) {
      return res.status(400).json({
        status: 'Failure',
        message: 'Name not provided',
      });
    }

    // Create a new user with the provided name
    const user = await createUser({
      name: name,
    });
    await user.save();

    // Return a JSON response with the new user and a success status
    return res.status(200).json({
      status: 'Success',
      message: 'Created user',
      user,
    });
  } catch (err) {
    // Log the error and return a JSON response with an error status and message
    console.log(err);
    return res.status(500).json({
      status: 'Failure',
      message: err.message,
    });
  }
};
