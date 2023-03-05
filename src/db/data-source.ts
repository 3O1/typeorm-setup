import 'reflect-metadata';
import { DataSource } from 'typeorm';

// Create a new instance of DataSource with the database configuration options
export const AppDataSource = new DataSource({
  type: 'postgres', // Set the database type to PostgreSQL
  host: process.env.DB_HOST, // Set the host to the environment variable value
  port: Number(process.env.DB_PORT), // Set the port to the environment variable value as a number
  username: process.env.DB_USER, // Set the username to the environment variable value
  password: process.env.DB_PASSWORD, // Set the password to the environment variable value
  database: process.env.DB_NAME, // Set the database name to the environment variable value
  synchronize: false, // Disable automatic schema synchronization
  logging: false, // Disable database logging
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // Load all entity files in the application
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'], // Load all migration files in the application
});
