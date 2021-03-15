-- CREATE DATABASE todo-page;

-- \c todo-page

CREATE TABLE todo (
	todo_id SERIAL PRIMARY KEY,
	description VARCHAR(50),
);