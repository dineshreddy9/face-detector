const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send('get');
})

app.listen(3000, () => {
	console.log('app is running on 3000 port');
})