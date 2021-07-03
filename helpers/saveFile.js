const fs = require('fs');

const file = './db/data.json';

const saveDB = (data) => {
	fs.writeFileSync(file, JSON.stringify(data));
};

const readDB = () => {
	if (!fs.existsSync(file)) {
		return null;
	}

	const data = fs.readFileSync(file, { encoding: 'utf-8' });
	return data.length > 0 ? JSON.parse(data) : null;
};

module.exports = {
	saveDB,
	readDB,
};
