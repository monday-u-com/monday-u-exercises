/** ********************* INTRO STRINGS ********************** */
const CLI_NAME = 'The Best Todo list cli';
const CLI_DESCRIPTION = 'This is a cli for a todo list go a head and check it out.';
const CLI_BEST_VIEW_INSTRUCTION = 'Open console/terminal in full screen for the best user experience!!!';
/** ********************* COMMAND SELECTION STRINGS ********************** */
const CLI_COMMAND_SELECT_MESSAGE = 'Hi master what is your command for me:';
const CLI_COMMAND_SELECT_OPTIONS = ['Add', 'Completed/Uncompleted', 'Delete', 'Clear all', 'Sort By Name', 'Get', 'Help', 'Exit'];
/** ********************* ADD TASK STRINGS ********************** */
const CLI_ADD_TASK_MESSAGE = 'Enter your todo text:';
const CLI_ADD_TASK_VALIDATION_TEXT = 'Please enter a valid string';
/** ********************* DELETE TASK STRINGS ********************** */
const CLI_COMPLETE_TASK_MESSAGE = 'Enter your todos id to set as completed/uncompleted:';
const CLI_COMPLETE_TASK_VALIDATION_TEXT = 'Please enter a valid id number';
/** ********************* DELETE TASK STRINGS ********************** */
const CLI_DELETE_TASK_MESSAGE = 'Enter your todos id to delete:';
const CLI_DELETE_TASK_VALIDATION_TEXT = 'Please enter a valid id number';
/** ********************* CLEAR ALL TASKS STRINGS ********************** */
const CLI_CLEAR_ALL_TASKS_MESSAGE = 'Are you sure you want to delete all todos:';
/** ********************* GET TASKS STRINGS ********************** */
const CLI_GET_TASKS_WITH_POKEMON_IMAGE = 'Do you want to get tasks with image art:';
/** ********************* HELP STRINGS ********************** */
const CLI_HELP_QUESTION_MESSAGE = 'Do you want to execute a command:';
const CLI_HELP_INSTRUCTIONS_FIRST_SECTION = 'Hello user this is a todo cli.\n'
                                        + 'The usage is very simple and contains 1-2 steps (depending on the command you wish to use).\n'
                                        + 'First you need to select a base command from the list that is presented to you,\n'
                                        + 'Use the arrows up/down to change your selection once you are happy with your selection use Enter key to confirm it.\n';
const CLI_HELP_INSTRUCTIONS_SECOND_SECTION = 'List of command:\n'
                                                + '   Add - adds a todo to the app.\n'
                                                        + '      Usage: todo of type <string>.\n'
                                                        + '      Example: "Clean the kitchen", "1,2,3" (get pokemons), "55" (get pokemon)\n\n'
                                                + '   Delete - deletes a todo from the app.\n'
                                                        + '      Usage: todo id of type <number>.\n'
                                                        + '      Example: 1\n\n'
                                                + '   Get - Gets all todo in the app.\n'
                                                        + '      Usage: no additional input required\n\n'
                                                + '   Help - Shows this message.\n';

const CLI_YES_NO_OPTIONS = ['Yes', 'No'];

module.exports = {
  CLI_NAME,
  CLI_DESCRIPTION,
  CLI_BEST_VIEW_INSTRUCTION,
  CLI_COMMAND_SELECT_MESSAGE,
  CLI_COMMAND_SELECT_OPTIONS,
  CLI_ADD_TASK_MESSAGE,
  CLI_ADD_TASK_VALIDATION_TEXT,
  CLI_COMPLETE_TASK_MESSAGE,
  CLI_COMPLETE_TASK_VALIDATION_TEXT,
  CLI_DELETE_TASK_MESSAGE,
  CLI_DELETE_TASK_VALIDATION_TEXT,
  CLI_CLEAR_ALL_TASKS_MESSAGE,
  CLI_GET_TASKS_WITH_POKEMON_IMAGE,
  CLI_HELP_QUESTION_MESSAGE,
  CLI_HELP_INSTRUCTIONS_FIRST_SECTION,
  CLI_HELP_INSTRUCTIONS_SECOND_SECTION,
  CLI_YES_NO_OPTIONS,
};
