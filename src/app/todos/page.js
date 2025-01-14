'use client'
//this is a test
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteForever from '@mui/icons-material/DeleteForever';
import AddBox from '@mui/icons-material/AddBox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function ToDos() {

    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newTodo, setNewTodo] = useState('');

    function inputChangeHandler(e) {
        setNewTodo(e.target.value);
    }

    function addNewTodo() {
        if(newTodo && newTodo.length) {
            fetch("api/todos", { method: "post", body: JSON.stringify({value: newTodo, done: false}) } ).then((response) => {
                return response.json().then((newTodo) => {
                    setTodos([...todos, newTodo]);
                    setNewTodo('');
                });
            });
        }
    }
    async function updateTodo({index}) {
        const todoToUpdate = todos[index]
        const test = await fetch(`api/todos/${todoToUpdate.id}`, { method: "put", body: JSON.stringify({value: todoToUpdate.value , done: !todoToUpdate.done})} ).then((response) => {
            if (response.ok) {
                //map builds new arr w/ exist values, modify changed on (working on)
                //settodos redraws whole screen (not seen visually)
                //mapping, splice, ways to modify arr in js
                //most eff w/ immutable change (screen knows to redraw)
                
                setTodos(todos.map((value)=> {return value.id===todoToUpdate.id ? {...todoToUpdate, done: !todoToUpdate.done} : value}))

            }
        });

    }

    async function removeTodo({ index }) {
        //check API for idx & delete
        const todoToRemove = todos[index]
        const test = await fetch(`api/todos/${todoToRemove.id}`, { method: "delete" }).then(response => console.log(response));

        //display ?
        setTodos(todos.filter((v, idx) => idx !== index));
    }

 



    useEffect(() => {
        fetch("/api/todos", { method: "get" }).then((response) => response.ok && response.json()).then(
            todos => {
                todos && setTodos(todos);
                setIsLoading(false);
            }
        );
    }, []);

    const loadingItems = <CircularProgress/>;

    const toDoItems = isLoading ? loadingItems : todos.map((todo, idx) => {
        return <ListItem key={idx} secondaryAction={
            <IconButton edge="end" onClick={() => removeTodo({index: idx})}><DeleteForever/></IconButton>   
        }>  
            <ListItemButton>
                <ListItemIcon>
                    <Checkbox checked={todo.done} disableRipple onChange={() => makeCheck({index: idx})}/>

                </ListItemIcon>
                <ListItemText primary={todo.value}/>
            </ListItemButton>
        </ListItem>;
    });

    return (
        <>
            <h2>My ToDos</h2>
            <List sx={{ width: '100%', maxWidth: 500 }}>
                { toDoItems }
                {!isLoading && <ListItem key="newItem" secondaryAction={<IconButton edge="end" onClick={addNewTodo}><AddBox/></IconButton>}>
                    <TextField label="New ToDo Item" fullWidth variant="outlined" value={newTodo} onChange={inputChangeHandler}/> 
                </ListItem>}
            </List>
        </>
    );
}