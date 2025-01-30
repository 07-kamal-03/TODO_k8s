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

app.get('/read-task', (req, res) => {
    const q = 'SELECT * FROM todo_db.todo';
    db.query(q, (err, result) => {
        if (err) {
            console.log('Failed to read tasks', err);
            res.status(500).send('Failed to read tasks', err);
            return;
        }

        console.log('Got tasks successfully from DB');
        res.send(result);
    });
});

app.listen(2000, () => {
    console.log('Server started');
});
