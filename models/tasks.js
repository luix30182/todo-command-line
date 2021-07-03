const Task = require('./task');
require('colors');

class Tasks {
	_list = {};

	constructor() {
		this._list = {};
	}

	addTask(dsc = '') {
		const task = new Task(dsc);
		this._list[task.id] = task;
	}

	getArrayList() {
		return Object.keys(this._list).map((key) => this._list[key]);
	}

	loadTasksFromArray(tasks = []) {
		tasks.forEach((task) => {
			this._list[task.id] = task;
		});
	}

	fullList() {
		this.getArrayList().forEach((task, index) => {
			console.log(
				`${`${index + 1}`.green}.${task.desc} :: ${
					task.completedIn ? `Completed`.green : `Pending`.red
				}`
			);
		});
	}

	listByStatus(done = true) {
		this.getArrayList()
			.filter((task) => {
				if (done) {
					return task.completedIn ? true : false;
				}
				return !task.completedIn ? true : false;
			})
			.forEach((task, index) => {
				console.log(
					`${`${index + 1}`.green}.${task.desc} :: ${
						task.completedIn ? `${task.completedIn}`.green : `Pending`.red
					}`
				);
			});
	}

	deleteTask(id) {
		if (this._list[id]) {
			delete this._list[id];
		}
	}

	toggleCompleted = (ids = []) => {
		ids.forEach((id) => {
			const task = this._list[id];
			if (!task.completedIn) {
				task.completedIn = new Date().toISOString();
			}
		});

		this.getArrayList().forEach((task) => {
			if (!ids.includes(task.id)) {
				this._list[task.id].completedIn = null;
			}
		});
	};
}

module.exports = Tasks;
