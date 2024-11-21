const express = require('express')
const app = express()

// allow cross domain connection
const cors = require('cors')

// connect with database
const pool = require('./db')


app.use(cors());
app.use(express.json());

// get all todo
app.get('/todos', async (req, res)=>{
    try{
    const allToDo = await pool.query("SELECT * FROM todo");
    res.status(200).json({success:true, data: allToDo.rows})
    }
    catch(err){
        res.status(400).json({success:false, msg:err})
    }
})

// get a todo
app.get('/todos/:id', async (req, res)=>{
    try{
        const {id} = req.params;
        const toDo = await pool.query("SELECT * FROM todo WHERE id=$1", [id]);
        res.status(200).json({success:true, data: toDo.rows[0]})
    }
    catch(err){
        res.status(400).json({success:false, msg: err})
    }
})

// post todo 
app.post('/todos', async(req, res)=>{
    try{
    const {description} = req.body;
    const newToDo = await pool.query("INSERT INTO todo(description) VALUES ($1) RETURNING *", [description]);
    res.status(200).json({success: true, data:newToDo.rows[0]});
    }

    catch(err){
        res.status(400).json({success: false, msg: err})
    }
})

// update todo
app.put('/todos/:id', async (req, res)=>{
    try{
        const {id} = req.params;
        const {description} = req.body;
        const updateToDo = await pool.query("UPDATE todo SET description=$1 WHERE id=$2 RETURNING *", [description, id])
        res.status(200).json({success:true, data: updateToDo.rows[0]});
    }
    catch(err){
        res.status(400).json({success:false, msg: err})
    }
})

// delete todo
app.delete('/todos/:id', async(req, res)=>{
    try{
        const {id} = req.params
        const delToDo = await pool.query("DELETE FROM todo WHERE id = $1", [id])
        res.status(200).json({success:true, data:delToDo})
    }
    catch(err){
        console.log(err);
    }
})

app.listen(5000, ()=>{
    console.log('Listening on port 5000...')
})