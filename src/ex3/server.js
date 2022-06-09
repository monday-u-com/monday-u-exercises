import express from 'express'; // Import Node.js core module
import ItemManager from './scripts/ItemManager.mjs';
import Path from 'path';

export default async function TodoWebServer()
{
    const app = express();
    // setup item manager
    const item_manager = new ItemManager();
    await item_manager.init();
    await item_manager.SetArrayFromFile();
    // setup root directory for web server
    const __dirname = Path.dirname(Path.join('node_modules/todo-mondayu-barakmaron/', '/www'));
    app.use(express.static(__dirname + '/www'));
    app.use(express.json());
    /**
     * index end point
     */
    app.get('/', (request, response) => {
        response.sendFile( 'www/index.html', { root: __dirname });
    });
    /**
     * get all tasks
     */
    app.get('/task', async(request, response) =>
    {
        await item_manager.SetArrayFromFile();
        response.json(item_manager.tasks);
    });
    /**
     * get list of all pokemon
     */
    app.get('/pokemon', (request, response) =>
    {
        response.json(item_manager.pokemons);
    });
    /**
     * add task end point
     */
    app.post('/task', async (request, response) => {
        try
        {
            const task = request.body.task;
            const add_task = Promise.resolve(item_manager.AddTask(task));
            await add_task;
            response.status(201).json({
                status: 201,
                task: task    
            });
        }
        catch(error)
        {
            console.log(error);
            response.status(400).json({ 
                status: 400, 
                error: error
            });
        }
    });
    /**
     * delete all task end point
     */
     app.delete('/task', async (request, response) =>
     {
         // sync task array because it can change from cli app
         await item_manager.SetArrayFromFile();
         try
         {
             const delete_task = Promise.resolve(item_manager.ClearArray());
             await delete_task;
             response.status(200).json({
                 status: 200
                 });
         }
         catch(error)
         {
             console.log(error);
             response.status(400).json({ 
                 status: 400, 
                 error: error
             });
         }    
     });
    /**
     * delete task end point
     */
    app.delete('/task/:id', async (request, response) =>
    {
        // sync task array because it can change from cli app
        await item_manager.SetArrayFromFile();
        const task_id = Number.parseInt(request.params.id);
        if(isNaN(task_id)) 
            return response.status(400).json({
                status: 400,
                error: "wrong parameters"
            });
        try
        {
            const delete_task = Promise.resolve(item_manager.RemoveTask(task_id));
            await delete_task;
            response.status(200).json({
                status: 200,
                id: task_id
                });
        }
        catch(error)
        {
            console.log(error);
            response.status(400).json({ 
                status: 400, 
                error: error
            });
        }    
    });

     /**
     * sort by name all tasks end point
     */
    app.patch('/task/sortbyname', async (request, response) =>
    {
        // sync task array because it can change from cli app
        await item_manager.SetArrayFromFile();
        try
        {
            const sortbyname = Promise.resolve(item_manager.SortArrayByName());
            await sortbyname;
            response.status(200).json({ 
                status: 200,
                action: "sorted by name"
            });
        }
        catch(error)
        {
            console.log(error);
            response.status(400).json({ 
                status: 400, 
                error: error
            });
        }    
    });

    /**
     * complete task end point
     */
    app.patch('/task/:id', async (request, response) =>
    {
        // sync task array because it can change from cli app
        await item_manager.SetArrayFromFile();
        const task_id = Number.parseInt(request.params.id);
        if(isNaN(task_id)) 
            return response.status(400).json({
                status: 400,
                error: "wrong parameters"
            });
        try
        {
            const complete_task = Promise.resolve(item_manager.CompleteTask(task_id));
            await complete_task;
            response.status(202).json({ 
                status: 202,
                id: task_id,
                complete: item_manager.tasks[task_id].complete
            });
        }
        catch(error)
        {
            console.log(error);
            response.status(400).json({ 
                status: 400, 
                error: error
            });
        }    
    });

    /**
     * bind the server and start listening
     */
    const server = app.listen(8000, function () {
        const host = server.address().address;
        const port = server.address().port;
        console.log('Express app listening at http://%s:%s', host, port);
    });
}

