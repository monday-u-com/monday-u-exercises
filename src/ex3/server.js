import express from 'express'; // Import Node.js core module
import { request } from 'express';
import { response } from 'express';
import ItemManager from './scripts/ItemManager.mjs';
const app = express();
const item_manager = new ItemManager();
await item_manager.init();
await item_manager.SetArrayFromFile();

app.use(express.static('./www'));
app.use(express.json()) ;

const server = app.listen(8000, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Express app listening at http://%s:%s', host, port);
});

app.get('/tasks', async(request, response) =>
{
    await item_manager.SetArrayFromFile();
    response.json(item_manager.tasks);
});

app.get('/pokemons', (request, response) =>
{
    response.json(item_manager.pokemons);
});

app.post('/AddTask', async (request, response) => {
    try
    {
        const task = request.body.task;
        const add_task = Promise.resolve(item_manager.AddTask(task));
        await add_task;
        response.json({ status: "added"});
    }
    catch(error)
    {
        console.log(error);
        response.json({ status: "error", error});
    }
});

app.post('/DeleteTask', async (request, response) =>
{
    const task_id = request.body.task_id;
    try
    {
        const delete_task = Promise.resolve(item_manager.RemoveTask(task_id));
        await delete_task;
        response.json({ status: "deleted"});
    }
    catch(error)
    {
        console.log(error);
        response.json({ status: "error", error});
    }    
});

app.post('/DeleteAllTasks', async (request, response) =>
{
    try
    {
        const delete_task = Promise.resolve(item_manager.ClearArray());
        await delete_task;
        response.json({ status: "deleted"});
    }
    catch(error)
    {
        console.log(error);
        response.json({ status: "error", error});
    }    
});

app.post('/SortByNameTasks', async (request, response) =>
{
    try
    {
        const delete_task = Promise.resolve(item_manager.ClearArray());
        await delete_task;
        response.json({ status: "deleted"});
    }
    catch(error)
    {
        console.log(error);
        response.json({ status: "error", error});
    }    
});