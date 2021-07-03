const {
	inquirerMenu,
	pause,
	readInput,
	deleteTask,
	confirm,
} = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

require('colors');

console.clear();

const main = async () => {
	let opt = '';
	const tasks = new Tasks();

	const tasksDB = readDB();
	if (tasksDB) {
		tasks.loadTasksFromArray(tasksDB);
	}

	do {
		opt = await inquirerMenu();

		switch (opt) {
			case '1':
				const dsc = await readInput('Description:');
				tasks.addTask(dsc);
				break;
			case '2':
				tasks.fullList();
				break;
			case '3':
				tasks.listByStatus();
				break;
			case '4':
				tasks.listByStatus(false);
				break;
			case '5':
				break;
			case '6':
				const id = await deleteTask(tasks.getArrayList());

				if (id !== '0') {
					const ok = await confirm('Are you sure?');
					if (ok) {
						tasks.deleteTask(id);
						console.log('Deleted task succesfully');
					}
				}
				break;
		}

		saveDB(tasks.getArrayList());

		await pause();
	} while (opt !== '0');
};

main();
