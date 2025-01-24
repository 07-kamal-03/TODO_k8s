import express, { json } from 'express';
import cors from 'cors';
const app = express();
import { createConnection } from 'mysql2';

app.use(json())
app.use(cors()) //cross-origin resouce 

const db = createConnection({
    host : 'localhost',
    user : 'root',
    password : "root",
    database : 'todo_db'

})

db.connect((err) => {
    if(!err){
        console.log("Connected to database successfully");
        
    }else{
        console.log(err);
        
    }
})

app.post('/new-task', (req, res) => {
    console.log(req.body);
    const q  = 'insert into todo (task, date, status) values (?, ?, ?)';
    db.query(q, [req.body.task, new Date(), 'active'], (err, result) => {
        if(err){
            console.log('failed to store');
            
        }
        else{
            console.log('todo saved');
            const updatedTasks = 'select * from todo_db'
            db.query(updatedTasks, (error, newList) => {
                res.send(newList)
            })
            
        }
    })
    
})

app.get('/read-tasks', (req, res) => {
    const q = 'SELECT * FROM todo_db.todo;';
    db.query(q, (err, result) => {
        if(err){
            console.log("failed to read tasks");
            
        }
        else{
            console.log("got tasks successfully from db");
            res.send(result)
            
            
        }
    })
})

app.post('/update-task', (req, res) => {
    console.log(req.body);
    const q = 'update todo_db.todo set task = ? where id = ?'
    db.query(q, [req.body.task, req.body.updateId], (err, result) => {
        if(err) {
            console.log('failed to update');
            
        }
        else{
            console.log('updated');
            db.query('select* from todo_db.todo', (e, r) => {
                if(e){
                    console.log(e);
                    
                }
                else{
                    res.send(r)
                }
            })
            
        }
    })
    
})

app.post('/delete-task', (req, res) => {
    const q = 'delete from todos where id = ?';
    db.query(q, [req.body.id], (err, result) => {
        if(err){
            console.log('Failed to delete');
            
        }else{
            console.log('Deleted successfully');
            db.query('select * from todos', (e, newList) => {
                res.send(newList);
            })
        }
    })
})

app.post('/complete-task', (req, res) => {
    console.log(req.body);
    
    const q = 'update todos set status = ? where id = ?'
    db.query(q, ['completed', req.body.id], (err, result) => {
        if(result){

            
            db.query('select * from todos', (e, newList) => {
                res.send(newList)
            })
        }

    })
})

app.listen(5000, () => {console.log('server started');
})

