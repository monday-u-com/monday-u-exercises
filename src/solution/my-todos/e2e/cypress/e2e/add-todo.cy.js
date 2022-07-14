describe("Add Todo Action", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should add a new todo", () => {
    // TODO: fill this test
    const todo = 'Go to the mall test';
    const todo_edit = 'Buy a bag of potatos instead';
    cy.get('#todo-input').type(`${todo}{enter}`)

    cy.get('#todo-search').type(`${todo}`)

    cy.wait(2500)

    cy.get('.todo-list-item .todo-item-desc .todo-message').should('have.value', todo)

    cy.get('.todo-list-item .icon-edit').first().click()

    cy.get('.todo-list-item .todo-item-desc .todo-message.editable').first().clear().type(`${todo_edit}{enter}`)

    cy.get('#todo-search').clear().type(`${todo_edit}`)

    cy.wait(2500)

    cy.get('.todo-list-item .icon-delete').first().click()

    cy.get('#todo-search').clear()

    // cy.get('.todo-list-item input[type="checkbox"]').first().click()

  });
});
