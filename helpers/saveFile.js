const fs = require('fs');

const dir = './db';
const file = `${dir}/data.json`;

const saveDB = (data) => {
	fs.writeFileSync(file, JSON.stringify(data));
};

const readDB = () => {
	if (!fs.existsSync(file)) {
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		fs.writeFileSync(file, '[]');
	}

	const data = fs.readFileSync(file, { encoding: 'utf-8' });
	return data.length > 0 ? JSON.parse(data) : null;
};

module.exports = {
	saveDB,
	readDB,
};
