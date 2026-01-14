-- Modify "users" table
ALTER TABLE `users` MODIFY COLUMN `name` varchar(255) NOT NULL, DROP COLUMN `age`, ADD COLUMN `email` varchar(255) NOT NULL;
