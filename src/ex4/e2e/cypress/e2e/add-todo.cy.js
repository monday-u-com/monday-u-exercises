describe("Add Todo Action", () => {
	beforeEach(() => {
		cy.visit("http://localhost:2000");
	});

	after(() => {
		cy.get("#root > div > div:nth-child(2) > div:nth-child(2) > img").click();
	});

	it("Should add a new 3 pokemons", () => {
		cy.get("#root > div > div.margin-bottom-element > div > input").type(
			"1,2,3"
		);
		cy.get("#root > div > div.margin-bottom-element > div > div > img").click();
	});

	it("Should add a new regular task", () => {
		cy.get("#root > div > div.margin-bottom-element > div > input").type(
			"Do the dishes"
		);
		cy.get("#root > div > div.margin-bottom-element > div > div > img").click();
	});
});
