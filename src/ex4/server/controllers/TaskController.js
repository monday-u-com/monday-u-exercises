import ItemManagerService from "../services/ItemManager.mjs";

/**
* get all tasks
*/
export async function GetTasks(request, response) {
  const tasks = await ItemManagerService.GetTasksFromFile();
  return response.status(200).json({
    status: 200,
    tasks: tasks
  });
}
/**
* add task end point
*/
export async function AddTask(request, response, next) {
  try {
    const { task } = request.body;
    const pokemon_id = Number.parseInt(task, 10);
    // check if text has commas
    if (task.indexOf(',') > -1) {
      await ItemManagerService.AddPokemons(task);
    } else if (Number.isInteger(pokemon_id)) { 
      await ItemManagerService.AddPokemon(pokemon_id);
    } else { // regular task
      await ItemManagerService.AddRegularTask(task);
    }
    return response.status(201).json({
      status: 201,
      task: task
    });
  } catch (error) {
    next(error);
  }
}
/*
*  delete all task end point
*/
export async function DeleteTasks(request, response) {
  await ItemManagerService.DeleteTasks();
  return response.status(200).json({
    status: 200
  });
}
/*
* delete task end point
*/
export async function DeleteTask(request, response, next) {
  try {
    const task_id = Number.parseInt(request.params.id, 10);
    if (Number.isNaN(task_id)) 
      throw ErrorBadRequest();
    await ItemManagerService.DeleteTask(task_id);
    return response.status(200).json({
      status: 200,
      id: task_id,
    });
  }
  catch (err) {
    next(err);
  }
}

export async function CompleteTask(request, response, next) {
  try {
    const task_id = Number.parseInt(request.params.id, 10);
    if (Number.isNaN(task_id))
      throw ErrorBadRequest();
    await ItemManagerService.CompleteTask(task_id);
    return response.status(200).json({
      status: 200,
      id: task_id,
    });
  }
  catch (error) {
    next(error);
  }
}

export async function SortTasksByName(request, response, next) {
  try {
    await ItemManagerService.SortTasksByName();
    return response.status(200).json({
      status: 200
    });
  }
  catch (error) {
    next(error);
  }
}

function ErrorBadRequest()
{
  const error = Error();
  error.statusCode = 400;
  error.message = "Wrong parameters";
  return error;
}