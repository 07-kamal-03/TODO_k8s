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

app.post('/delete-task', (req, res) => {
    const q = 'DELETE FROM todo_db.todo WHERE id = ?';
    db.query(q, [req.body.id], (err, result) => {
        if (err) {
            console.log('Failed to delete', err);
            res.status(500).send('Failed to delete', err);
            return;
        }

        console.log('Task deleted successfully');
        db.query('SELECT * FROM todo_db.todo', (e, newList) => {
            if (e) {
                console.log(e);
                res.status(500).send('Failed to fetch tasks');
                return;
            }
            res.send(newList);
        });
    });
});

app.listen(4000, () => {
    console.log('Server started');
});
