import express, { json } from 'express';
import cors from 'cors';
import { createConnection } from 'mysql2';

const app = express();
app.use(json());
app.use(cors());

const db = createConnection({
    host : 'todo-db-service.todo-db-environment.svc.cluster.local',
    user : 'user',
    password : "root",
    database : 'todo_db',
    port: 3306

})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
    } else {
        console.log('db connected');
    }
});

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS todo (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task VARCHAR(255) NOT NULL,
        date DATETIME NOT NULL,
        status VARCHAR(50) NOT NULL
    );
`;

db.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Error creating table: ', err);
    } else {
        console.log('Table checked/created');
    }
});

app.post('/create-task', (req, res) => {
    const q = 'INSERT INTO todo (task, date, status) VALUES (?, ?, ?)';
    db.query(q, [req.body.task, new Date(), 'active'], (err, result) => {
        if (err) {
            console.log('Failed to store', err);
            res.status(500).send('Failed to store', err);
            return;
        }

        console.log('Todo saved');
        const updatedTasks = 'SELECT * FROM todo';
        db.query(updatedTasks, (error, newList) => {
            res.send(newList);
        });
    });
});

app.listen(1000, () => {
    console.log('Server started');
});

