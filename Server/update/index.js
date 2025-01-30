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

app.post('/update-task', (req, res) => {
    const q = 'UPDATE todo_db.todo SET task = ? WHERE id = ?';
    db.query(q, [req.body.task, req.body.updateId], (err, result) => {
        if (err) {
            console.log('Failed to update', err);
            res.status(500).send('Failed to update', err);
            return;
        }

        console.log('Task updated');
        db.query('SELECT * FROM todo_db.todo', (e, r) => {
            if (e) {
                console.log(e);
                res.status(500).send('Failed to fetch updated tasks');
                return;
            }

            res.send(r);
        });
    });
});

app.listen(3000, () => {
    console.log('Server started');
});
