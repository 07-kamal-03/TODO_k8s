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

app.post('/complete-task', (req, res) => {
    const q = 'UPDATE todo_db.todo SET status = ? WHERE id = ?';
    db.query(q, ['completed', req.body.id], (err, result) => {
        if (err) {
            console.log('Failed to complete task', err);
            res.status(500).send('Failed to complete task', err);
            return;
        }

        db.query('SELECT * FROM todo_db.todo', (e, newList) => {
            if (e) {
                console.log(e);
                res.status(500).send('Failed to fetch updated tasks');
                return;
            }

            res.send(newList);
        });
    });
});

app.listen(6000, () => {
    console.log('Server started');
});
