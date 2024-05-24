const {runInquirer, commandQuestion} = require('./js.api/inquirer');

const init = () => {
	runInquirer(commandQuestion);
};

init();
