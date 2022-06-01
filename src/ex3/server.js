import express from 'express'; // Import Node.js core module
import ItemManager from './scripts/ItemManager.mjs';

const app = express();
// setup item manager
const item_manager = new ItemManager();
await item_manager.init();
await item_manager.SetArrayFromFile();

app.use(express.static('./www'));
app.use(express.json()) ;
/**
 * bind the server and start listening
 */
const server = app.listen(8000, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Express app listening at http://%s:%s', host, port);
});
/**
 * get all tasks
 */
app.get('/tasks', async(request, response) =>
{
    await item_manager.SetArrayFromFile();
    response.json(item_manager.tasks);
});
/**
 * get list of all pokemon
 */
app.get('/pokemons', (request, response) =>
{
    response.json(item_manager.pokemons);
});
/**
 * add task end point
 */
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
/**
 * delete task end point
 */
app.post('/DeleteTask', async (request, response) =>
{
    // sync task array because it can change from cli app
    await item_manager.SetArrayFromFile();
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
/**
 * delete all tasks end point
 */
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
/**
 * sort by name all tasks end point
 */
app.post('/SortByNameTasks', async (request, response) =>
{
    // sync task array because it can change from cli app
    await item_manager.SetArrayFromFile();
    try
    {
        const delete_task = Promise.resolve(item_manager.SortArrayByName());
        await delete_task;
        response.json({ status: "deleted"});
    }
    catch(error)
    {
        console.log(error);
        response.json({ status: "error", error});
    }    
});