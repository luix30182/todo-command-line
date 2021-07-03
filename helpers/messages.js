require('colors');

const showMenu = () => {
	return new Promise((resolve) => {
		console.clear();
		console.log('======='.green);
		console.log('select an option:'.green);
		console.log('======= \n'.green);

		console.log(`${'1.'.green} Add todo`);
		console.log(`${'2.'.green} List todo`);
		console.log(`${'3.'.green} List completed`);
		console.log(`${'4.'.green} List pending`);
		console.log(`${'5.'.green} Complete todo`);
		console.log(`${'6.'.green} Delete todo`);
		console.log(`${'0.'.green} Exit \n`);

		const readLine = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		readLine.question('Select an option:', (opt) => {
			readLine.close();
			resolve(opt);
		});
	});
};

const pause = () => {
	return new Promise((resolve) => {
		const readLine = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		readLine.question(`\nPress ${'ENTER'.green} to continue\n`, (_) => {
			readLine.close();
			resolve();
		});
	});
};

module.exports = {
	showMenu,
	pause,
};
