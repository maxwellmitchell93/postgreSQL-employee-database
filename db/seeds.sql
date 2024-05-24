
-- EMPLOYEE 
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES	('John', 'Wilks', 1, NULL),
		('Jessy', 'Banks', 2, NULL),
		('Noah', 'Ben', 3, NULL),
		('Hannah', 'Mitchell', 4, NULL),
		('Justin', 'Parker', 5, NULL),
		('Jacob', 'Burmington', 6, NULL),
		('Montana', 'Alvidrez', 7, NULL), 
		('Olive', 'Smith', 8, NULL),
		('Otis', 'Redding', 9, NULL),
		('Oscar', 'Myer', 10, NULL);

        
-- DEPARTMENT 
INSERT INTO department (name) 
VALUES 	('Director'),
		('Engineering'),
		('IT'),
		('Customer Relations'),
		('Management'),
		('Network');

		-- ROLE 
INSERT INTO role (title, salary, department_id)
VALUES 	('Web Designer', 65000, 1),
		('Engineer', 50000, 1),
		('Full stack developer', 95000, 2),
		('Help Desk', 75000, 2),
		('IT Director', 65000, 3),
		('Networker', 85000, 3),
		('Server Specialist', 45000, 4),
		('Recruiter', 80000, 4),
		('Data Entry', 75000, 5),
		('Branch Manager', 70000, 5);

	


	