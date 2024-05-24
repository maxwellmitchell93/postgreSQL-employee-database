const {runInquirer, commandQuestion} = require('./js.api/inquirer');

const init = () => {
	runInquirer(commandQuestion);
};
//asciiart
const logo = require('asciiart-logo');

console.log(
    logo({
        name: 'Welcome To The employee data base',
        font: 'Small Slant',
        lineChars: 12,
        padding: 2,
        margin: 3,
        borderColor: 'grey',
        logoColor: 'bold-cyan',
        textColor: 'cyan',
    })
    
    .render()
);

init();
