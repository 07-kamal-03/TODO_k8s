import express, { json } from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(json());
app.use(cors());

app.post('/create-task', async (req, res) => {
    console.log("Request body:", req.body); 

    try {
        const response = await axios.post('http://todo-create-task-service.todo-server-environment.svc.cluster.local:1000/create-task', req.body);
        console.log("Response from backend service:", response.data); 
        res.send(response.data);
    } catch (error) {
        console.error('Error creating task:', error); 
        res.status(500).send(`Error creating task: ${error.message}`);
    }
});

app.get('/read-task', async (req, res) => {
    try {
        const response = await axios.get('http://todo-read-task-service.todo-server-environment.svc.cluster.local:2000/read-task');
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error reading tasks');
    }
});

app.post('/update-task', async (req, res) => {
    try {
        const response = await axios.post('http://todo-update-task-service.todo-server-environment.svc.cluster.local:3000/update-task', req.body);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error updating task');
    }
});

app.post('/delete-task', async (req, res) => {
    try {
        const response = await axios.post('http://todo-delete-task-service.todo-server-environment.svc.cluster.local:4000/delete-task', req.body);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error deleting task');
    }
});

app.post('/complete-task', async (req, res) => {
    try {
        const response = await axios.post('http://todo-complete-task-service.todo-server-environment.svc.cluster.local:6000/complete-task', req.body);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error completing task');
    }
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
