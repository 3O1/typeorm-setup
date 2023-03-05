// Import TypeORM entities and validators
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
} from 'typeorm';
import { MaxLength } from 'class-validator';

// Define an enum for user status types
export enum UserStatusType {
  ACTIVE, // user is active & can use the app
  INACTIVE, // user is inactive & cannot use the app
  BANNED, // user is banned & cannot use the app
  SUSPENDED, // user is suspended & cannot use the app until their account is good
  VERIFIED, // users account is verified & have access to certain features
}

// Define the User entity
@Entity('users')
export class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user); // Assign the user properties to the entity
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @MaxLength(30, {
    message: 'Name can only be 30 characters', // Validation error message
  })
  @Index({ fulltext: true }) // Index for full-text search
  @Column({ type: 'varchar' }) // Database column type
  name: string;

  @Column({
    enum: UserStatusType, // Define the enum for the column
    default: UserStatusType.ACTIVE, // Set the default value
  })
  status: UserStatusType;
}
