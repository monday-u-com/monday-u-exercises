describe("Add Todo Action", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8082");
  });

  it("Should add a new todo", () => {
    // TODO: fill this test
    cy.get('.taskInput').first().click().type("AutomationBro");
    cy.get(".monday-style-button").first().click()
  });

  it("Shuold Delete All Todos", ()=>{
    cy.wait(5000)
    cy.get('.clearAllBtn').click();
  })

});