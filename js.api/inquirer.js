const {Pool} = require('pg');
//postgres db
const pool = new Pool(
	{
		user: 'postgres',
		password: '1993',
		host: 'localhost',
		database: 'cms_db'
	},
	console.log(`Connected to cms_db`)
);
const inquirer = require('inquirer');
const {
	validateNonEmpty,
	commandQuestion,
	addDepartmentQuestion,
	addRoleQuestions,
	addEmployeeQuestions,
	updateRoleQuestions
} = require('./questions.js')

pool.connect();

//add role function
const addRole = () => {
	inquirer.prompt(addRoleQuestions)
	.then((response) => {
		const { newJobTitle, newJobSalary, newJobDepartment } = response;
		const sql = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`

		pool.query(sql, [newJobTitle, newJobSalary, newJobDepartment], (err, {rows}) => {
  		if (err) {
  			console.info(`${err.message}`);
  			return;
  		}
  		console.info(`A new role, ${newJobTitle}, was successfully added`);
  		runInquirer(commandQuestion);
  		});
	})

};

//add employee function
const addEmployee = () => {
	inquirer.prompt(addEmployeeQuestions)
	.then((response) => {
		const {newFirstName, newLastName, newEmpRole, newEmpManager} = response;
		//if statment for inserting new manager
		if (newEmpManager === -99) {
			const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, NULL)`;
			pool.query(sql, [newFirstName, newLastName, newEmpRole], (err, {rows}) => {
				if (err) {
					console.info(`${err.message}`);
					return;
				}
				console.info(`A new employee, ${newFirstName} ${newLastName}, was successfully added`);
				runInquirer(commandQuestion);
			});
		} else {
			const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
			pool.query(sql, [newFirstName, newLastName, newEmpRole, newEmpManager], (err, {rows}) => {
				if (err) {
					console.info(`${err.message}`);
					return;
				}
				console.info(`A new employee, ${newFirstName} ${newLastName}, was successfully added`);
				runInquirer(commandQuestion);
			});
		};
	})
};

 
//Add Department Function
const addDepartment = () => {
	inquirer.prompt(addDepartmentQuestion)
	.then((response) => {
		const newDepartment = response.newDepartment;
		const sql = `INSERT INTO department (name) VALUES ($1)`

		pool.query(sql, [newDepartment], (err, {rows}) => {
  		if (err) {
  			console.info(`${err.message}`);
  			return;
  		}
  		console.info(`A new department, ${newDepartment}, was successfully added`);
  		
  		runInquirer(commandQuestion);
  		});
	})

};
//Exit Function
const exitCommand = () => {
	console.log("To confirm your exit, press 'ctrl + c'");
	return;
}

//Switch Statement 
//Value of the expression is compared with the values of each case
const switchCommand = (commandObject) => {
	switch (commandObject.command) {
		case "View departments":
			viewDepartments();
			break;
		case "View roles": 
			viewRoles();
			break;
		case "View employees":
			viewEmployees();
			break;
		case "Add a department":
			addDepartment();
			break;
		case "Add a role":
			addRole();
			break;
		case "Add an employee":
			addEmployee();
			break;
		case "Update an employee's role":
			updateEmployeeRole();
			break;
		case "Exit":
			exitCommand();
			break;
	};
};

//view rolls, departments, & employees funciton
const viewQuery = (sql) => {
	pool.query(sql, (err, {rows}) => {
  		if (err) {
  			console.info(`${err.message}`);
  			return;
  		}
  		console.table(rows);
  		runInquirer(commandQuestion);
  	});
}
//view departments sql query
const viewDepartments = () => {
	const sql = `SELECT department.name AS "Department Name", department.id AS "Department ID" FROM department`;
	viewQuery(sql);
};
//view roles sql query
const viewRoles = () => {
	const sql = `SELECT role.title as "Job Title", role.id as "Role ID", department.name as "Department", 
	role.salary as "Salary" FROM role JOIN department ON department.id = role.department_id;`;
  	viewQuery(sql);
};
//view employees sql query
const viewEmployees = () => {
	const sql = `SELECT employee.id as "Employee ID", employee.first_name as "First Name", employee.last_name as "Last Name", 
	role.title as "Job Title", department.name as "Department", role.salary as "Salary", employee.manager_id as "Manager ID" FROM employee JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id;`;
    viewQuery(sql);
};

//update employee role function
const updateEmployeeRole = () => {
	inquirer.prompt(updateRoleQuestions)
	.then((response) => {
		const {employeeID, roleID} = response;

		const sql = `UPDATE employee SET role_id = $1 WHERE id = $2`;
		pool.query(sql, [roleID, employeeID], (err, {rows}) => {
			if (err) {
				console.info(`${err.message}`);
				return;
			}
		console.info(`Employee ${employeeID}'s role was successfully updated to ${roleID}`);
		runInquirer(commandQuestion);
		});
	})
};


// Init Function
const runInquirer = (questionList) => {
	inquirer
	.prompt(questionList)
	.then((response) => {
		switchCommand(response);
	})
};


module.exports = {
	commandQuestion,
	runInquirer
}