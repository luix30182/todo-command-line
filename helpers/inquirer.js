const inquirer = require('inquirer');
require('colors');

const questions = [
	{
		type: 'list',
		name: 'option',
		message: 'What to do?',
		choices: [
			{
				value: '1',
				name: `${'1.'.green}Add task`,
			},
			{
				value: '2',
				name: `${'2.'.green}List tasks`,
			},
			{
				value: '3',
				name: `${'3.'.green}List completed tasks`,
			},
			{
				value: '4',
				name: `${'4.'.green}List pending tasks`,
			},
			{
				value: '5',
				name: `${'5.'.green}Complete task`,
			},
			{
				value: '6',
				name: `${'6.'.green}Delete task`,
			},
			{
				value: '0',
				name: `${'0.'.green}Exit`,
			},
		],
	},
];
const inquirerMenu = async () => {
	console.clear();
	console.log('=============================='.green);
	console.log('Select an option:'.green);
	console.log('============================== \n'.green);

	const { option } = await inquirer.prompt(questions);

	return option;
};

const pause = async () => {
	const question = [
		{
			type: 'input',
			name: 'enter',
			message: `Press ${'ENTER'.green} to continue`,
		},
	];
	await inquirer.prompt(question);
};

const readInput = async (message) => {
	const question = {
		type: 'input',
		name: 'dsc',
		message,
		validate(value) {
			return value.length === 0 ? 'Type a valid value' : true;
		},
	};

	const { dsc } = await inquirer.prompt(question);

	return dsc;
};

const deleteTask = async (tasks = []) => {
	const choices = tasks.map((task, i) => {
		return {
			value: task.id,
			name: `${i + 1}. ${task.desc}`,
		};
	});

	choices.unshift({
		value: '0',
		name: '0. '.green + 'Cancel',
	});

	const questions = [
		{
			type: 'list',
			name: 'id',
			message: 'Delete?',
			choices,
		},
	];

	const { id } = await inquirer.prompt(questions);

	return id;
};

const confirm = async (message) => {
	const question = [
		{
			type: 'confirm',
			name: 'ok',
			message,
		},
	];

	const { ok } = await inquirer.prompt(question);
	return ok;
};

const showCheckList = async (tasks = []) => {
	const choices = tasks.map((task, i) => {
		return {
			value: task.id,
			name: ` ${i + 1}. ${task.desc}`,
			checked: task.completedIn ? true : false,
		};
	});

	const questions = [
		{
			type: 'checkbox',
			name: 'ids',
			message: 'Select',
			choices,
		},
	];

	const { ids } = await inquirer.prompt(questions);

	return ids;
};

module.exports = {
	inquirerMenu,
	pause,
	readInput,
	deleteTask,
	confirm,
	showCheckList,
};
