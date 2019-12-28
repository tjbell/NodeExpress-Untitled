const fs = require('fs');
const path = require('path');

var accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'UTF8');
const accounts = JSON.parse(accountData);

var userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'UTF8');
const users = JSON.parse(userData);

var writeJSON = () => {
	const accountsJSON = JSON.stringify(accounts, null, 4);
	fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'UTF8');
};

module.exports = {
	accounts,
	users,
	writeJSON,
};
