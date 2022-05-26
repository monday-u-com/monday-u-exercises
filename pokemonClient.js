class Main {
	constructor() {
		this.API_BASE = "https://pokeapi.co";
		listManager;
	}

	async addPoke(name) {
		const response = await fetch(`${this.API_BASE}/api/v2/pokemon/${name}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"content-Type": "application/json",
			},
		});

		if (!response.ok) {
			const message = `Could not find Pokemon id: ${name}`;
			return message;
		}
		const addPoke = await response.json();
		return "Catch " + addPoke.name;
	}
}
