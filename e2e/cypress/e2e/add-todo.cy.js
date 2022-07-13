describe("Add Task Action", () => {
   beforeEach(() => {
      cy.visit("http://localhost:3000");
      cy.get(".HomeCard_clear-all__Rq0JP").click();
   });

   it("Should add a new regular task using the add button", () => {
      const taskText = "A regular task using the btn";

      cy.get("input#AddBar_task-text__MoHCu").type(taskText);
      cy.get("Button.AddBar_add-task__B1Il6").click();
      cy.get(".TaskList_all-tasks-container__7j9ml").contains(taskText).should("be.visible");
   });

   it("Should add a new regular task using the enter key", () => {
      const taskText = "A regular task using enter key";

      cy.get("input#AddBar_task-text__MoHCu").type(taskText).type("{enter}");
      cy.get(".TaskList_all-tasks-container__7j9ml").contains(taskText).should("be.visible");
   });

   it("Should add a new single pokemon task", () => {
      const taskText = "1";
      const taskFinishedText = "Catch Bulbasaur of type Grass,poison";

      cy.get("input#AddBar_task-text__MoHCu").type(taskText).type("{enter}");
      cy.get(".TaskList_all-tasks-container__7j9ml")
         .contains(taskFinishedText)
         .should("be.visible");
   });

   it("Should add a multiple pokemons tasks", () => {
      const taskText = "4,5,6";
      const taskFinishedText1 = "Catch Charmander of type Fire";
      const taskFinishedText2 = "Catch Charmeleon of type Fire";
      const taskFinishedText3 = "Catch Charizard of type Fire,flying";

      cy.get("input#AddBar_task-text__MoHCu").type(taskText).type("{enter}");
      cy.get(".TaskList_all-tasks-container__7j9ml")
         .should("contain", taskFinishedText1)
         .and("contain", taskFinishedText2)
         .and("contain", taskFinishedText3);
   });

   it("Should add an unknown pokemon id", () => {
      const taskText = "9999";
      const taskFinishedText = "Pokemon ID 9999 does not exist";

      cy.get("input#AddBar_task-text__MoHCu").type(taskText).type("{enter}");
      cy.get(".TaskList_all-tasks-container__7j9ml").should("contain", taskFinishedText);
   });
});
