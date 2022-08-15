const HOMECARD_CLEAR_ALL_CLASS_NAME = ".HomeCard_clear-all__Rq0JP";
const INPUT_CLASS_NAME = "input#AddBar_task-text__MoHCu";
const ADD_BUTTON_CLASS_NAME = "Button.AddBar_add-task__B1Il6";
const ALL_TASKS_CONTAINER_CLASS_NAME = ".TaskList_all-tasks-container__7j9ml";

describe("Add Task Action", () => {
   beforeEach(() => {
      cy.visit("http://localhost:3000");
      cy.get(HOMECARD_CLEAR_ALL_CLASS_NAME).click();
   });

   it("Should add a new regular task using the add button", () => {
      const taskText = "A regular task using the btn";

      cy.get(INPUT_CLASS_NAME).type(taskText);
      cy.get(ADD_BUTTON_CLASS_NAME).click();
      cy.get(ALL_TASKS_CONTAINER_CLASS_NAME).contains(taskText).should("be.visible");
   });

   it("Should add a new regular task using the enter key", () => {
      const taskText = "A regular task using enter key";

      cy.get(INPUT_CLASS_NAME).type(taskText).type("{enter}");
      cy.get(ALL_TASKS_CONTAINER_CLASS_NAME).contains(taskText).should("be.visible");
   });

   it("Should add a new single pokemon task", () => {
      const taskText = "1";
      const taskFinishedText = "Catch Bulbasaur of type Grass,poison";

      cy.get(INPUT_CLASS_NAME).type(taskText).type("{enter}");
      cy.get(ALL_TASKS_CONTAINER_CLASS_NAME).contains(taskFinishedText).should("be.visible");
   });

   it("Should add a multiple pokemons tasks", () => {
      const taskText = "4,5,6";
      const taskFinishedText1 = "Catch Charmander of type Fire";
      const taskFinishedText2 = "Catch Charmeleon of type Fire";
      const taskFinishedText3 = "Catch Charizard of type Fire,flying";

      cy.get(INPUT_CLASS_NAME).type(taskText).type("{enter}");
      cy.get(ALL_TASKS_CONTAINER_CLASS_NAME)
         .should("contain", taskFinishedText1)
         .and("contain", taskFinishedText2)
         .and("contain", taskFinishedText3);
   });

   it("Should add an unknown pokemon id", () => {
      const taskText = "9999";
      const taskFinishedText = "Pokemon ID 9999 does not exist";

      cy.get(INPUT_CLASS_NAME).type(taskText).type("{enter}");
      cy.get(ALL_TASKS_CONTAINER_CLASS_NAME).should("contain", taskFinishedText);
   });
});
