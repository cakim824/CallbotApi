const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true,
}));

app.use('/', require('./channel'));
app.use((req, res) => {
    res.sendStatus(404);
})

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`http server listening on ${port}`);
})
