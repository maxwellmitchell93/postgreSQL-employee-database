// Validate Function
const validateNonEmpty = (promptName) => {
	if (promptName) {
		return true;
	} else {
		throw new Error(`Please select a ${promptName}`);
	}
};


// Command Question
const commandQuestion = [
	{
		type: "list",
		message: "Please select a command:",
		name: "command",
		choices: [
			"View roles",
			"View employees",
			"View departments",
			"Add a role",
			"Add a department",
			"Add an employee",
			"Update an employee's role",
			"Exit"],
		validate: validateNonEmpty("command")
	}
];

const addDepartmentQuestion = [
	{
		type: "input",
		message: "Enter the name of the new department:",
		name: "newDepartment",
		validate: function (newDepartment) {
			if (newDepartment && newDepartment.length <= 30) {
				return true;
			} else {
				throw new Error("Provide a response less than 18 chracters.")
			}
		}
	}
];

const addRoleQuestions = [
	{
		type: "input",
		message: "Enter job title:",
		name: "newJobTitle",
		validate: function (newJobTitle) {
			if (newJobTitle && newJobTitle.length <= 30) {
				return true;
			} else {
				throw new Error("Provide a response less than 18 characters.")
			}
		}
	}, 
	{
		type: "number",
		message: "Enter salary:",
		name: "newJobSalary",
		validate: function (newJobSalary) {
			if (newJobSalary) {
				return true;
			} else {
				throw new Error("Provide a numeric response.")
			}
		}
	},
	{
		type: "number",
		message: "Enter department ID:",
		name: "newJobDepartment",
		validate: function (newJobDepartment) {
			if (newJobDepartment) {
				return true;
			} else {
				throw new Error("Provide a numeric response.")
			}
		}
	}
];

const addEmployeeQuestions = [
	{
		type: "input",
		message: "Enter employees first name:",
		name: "newFirstName",
		validate: function (newFirstName) {
			if (newFirstName && newFirstName.length <= 30) {
				return true;
			} else {
				throw new Error("Response needs to be fewer than 18 characters.")
			}
		}
	},
	{
		type: "input",
		message: "Enter employees last name:",
		name: "newLastName",
		validate: function (newLastName) {
			if (newLastName && newLastName.length <= 30) {
				return true;
			} else {
				throw new Error("Response needs to be fewer than 18 characters.")
			}
		}
	},
	{
		type: "number",
		message: "Enter role ID of new employee:",
		name: "newEmpRole",
		validate: function (newEmpRole) {
			if (newEmpRole) {
				return true;
			} else {
				throw new Error("Please provide a numeric respons.")
			}
		}
	},
	{
		type: "number",
		message: "Enter manager ID of the new employee. If employee is not a manager then enter -99 :",
		name: "newEmpManager",
		validate: function (newEmpManager) {
			if (newEmpManager) {
				return true;
			} else {
				throw new Error("Please provide a numeric response")
			}
		}
	}
];

const updateRoleQuestions = [
	{
		type: "number",
		message: "Employee ID:",
		name: "employeeID",
		validate: function (employeeID) {
			if (employeeID) {
				return true;
			} else {
				throw new Error("Please provide a numeric response.")
			}
		}
	},
	{
		type: "number",
		message: "New role ID:",
		name: "roleID",
		validate: function (roleID) {
			if (roleID) {
				return true;
			} else {
				throw new Error("Please provide a numeric response.")
			}
		}
	}
];

module.exports = {
	validateNonEmpty,
	commandQuestion,
	addDepartmentQuestion,
	addRoleQuestions,
	addEmployeeQuestions,
	updateRoleQuestions
}