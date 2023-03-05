import { User } from '../entities/user.entity';
import { AppDataSource } from '../db/data-source';

// Get the user repository from the AppDataSource
const userRepository = AppDataSource.getRepository(User);

// Export function to create a new user
export const createUser = async (input: Partial<User>) => {
  return await userRepository.save(userRepository.create(input));
};

// Export function to get all users
export const getUsers = async () => {
  return await userRepository.createQueryBuilder('users').getMany();
};
