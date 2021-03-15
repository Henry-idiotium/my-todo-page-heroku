const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db.js');
const app = express();
const PORT = process.env.PORT || 5000;

// *************** //
// * MIDDLEWARES * //
// *************** //
app
	.use(cors())
	.use(express.json())
	.use(express.urlencoded({ extended: true }));

// ************* //
// * REDIRECTS * //
// ************* //
app
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', async (req, res) => {
		try {
			const allTodos = pool.query('SELECT * FROM todo;')
			res.render('pages/index', { todoVar: (await allTodos).rows })
		} catch (error) {
			console.error(error.message);
		}
	})
	.listen(PORT, () => console.log(`Current on port ${PORT}`));


// ********** //
// * ROUTEs * //
// ********** //

// * create
app.post('/api/todos', async (req, res) => {
	const { description } = req.body;
	try {
		const newTodo = pool.query(
			'INSERT INTO todo (description) VALUES ($1) RETURNING *',
			[description]
		);
		res.json((await newTodo).rows);
	} catch (err) {
		console.error(err.message);
	}
});

// * update  
app.put('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const updateTodo = pool.query(
            'UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *',
            [description, id]
        );
        res.json((await updateTodo).rows)
    } catch (err) {
        console.error(err.message);
    }
})

// * delete
app.delete('/api/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		await pool.query('DELETE FROM todo WHERE todo_id = $1 RETURNING *', [id]);
		res.json('Delete successfully!')
	} catch (err) {
		console.error(err.message);
	}
})

