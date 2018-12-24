const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const database = {
	users: [
		{
			id: '1',
			name: 'John',
			email: 'john@gmail.com',
			password: 'abc',
			entries: 0,
			joined: new Date()
		},
		{
			id: '2',
			name: 'doe',
			email: 'doe@gmail.com',
			password: 'def',
			entries: 0,
			joined: new Date()
		}
	]
}

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email && 
		req.body.password === database.users[0].password){
		res.json('success');
	} else {
		res.status(400).json('error logging in');
	}
})

app.post('/register', (req, res) => {

	const {email, name, password} = req.body;
	database.users.push({
		id: '3',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})

	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	})
	if (!found) {
		res.status(400).json('not found');
	}
})

app.put('/image', (req, res) => {
	const {id} = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})
	if (!found) {
		res.status(400).json('not found');
	}
})

app.listen(3000, () => {
	console.log('app is running on 3000 port');
})