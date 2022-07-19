describe("Add Todo Action", () => {
	beforeEach(() => {
		cy.visit("http://localhost:2000");
	});

	it("Should add a new todo", () => {
		cy.get("#root > div > div:nth-child(2) > div:nth-child(2) > img").click();

		cy.get("#root > div > div.margin-bottom-element > div > input").type(
			"1,2,3"
		);

		cy.get("#root > div > div.margin-bottom-element > div > div > img").click();

		// TODO: fill this test
	});
});
