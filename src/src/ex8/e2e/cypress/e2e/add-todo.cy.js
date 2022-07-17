describe("Add Todo Action", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8082");
  });

  it("Should add a new todo", () => {
    // TODO: fill this test
    const testItem = "Be a good Man"
    cy.get('.taskInput').first().click().type(`${testItem}`);
    cy.get(".monday-style-button").first().click()
  });

  // e2e Delete All Items
  it("Shuold Delete All Todos", ()=>{
    cy.wait(5000)
    cy.get('.clearAllBtn').click();
  })

});