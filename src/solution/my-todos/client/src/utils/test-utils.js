export const todosList = [
    {
        id: 1,
        name: 'do homework',
        type: 'text',
        message: 'do homework',
        status: 0
    },
    {
        id: 2,
        name: 'clean the room',
        type: 'text',
        message: 'clean the room',
        status: 1
    },
    {
        id: 3,
        name: 'call a friend',
        type: 'text',
        message: 'call a friend',
        status: 0
    },
    {
        id: 4,
        name: "hjkh",
        type: "text",
        message: "hjkh",
        status: 0
    },
    {
        id: 5,
        name: "bake a cake by the day after tomorrow",
        type: "text",
        message: "bake a cake by the day after tomorrow",
        status: 0
    },
    {
        id: 6,
        name: "84",
        type: "pokemon",
        message: "Catch #84 Doduo the Normal/Flying type pokemon",
        pokemon: {
            pokemon_id: "84",
            pokemon_name: "doduo",
            pokemon_image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/84.png",
            pokemon_type: "[\"Normal\",\"Flying\"]"
        },
        status: 1
    },
    {
        id: 7,
        name: "4",
        type: "pokemon",
        message: "Catch #4 Charmander the Fire type pokemon",
        pokemon: {
            pokemon_id: "4",
            pokemon_name: "charmander",
            pokemon_image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            pokemon_type: "[\"Fire\"]"
        },
        status: 0
    },
    {
        id: 8,
        name: "25",
        type: "pokemon",
        message: "Catch #25 Pikachu the Electric type pokemon",
        pokemon: {
            pokemon_id: "25",
            pokemon_name: "pikachu",
            pokemon_image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
            pokemon_type: "[\"Electric\"]"
        },
        status: 0
    },
    {
        id: 9,
        name: "1",
        type: "pokemon",
        message: "Catch #1 Bulbasaur the Grass/Poison type pokemon",
        pokemon: {
            pokemon_id: "1",
            pokemon_name: "bulbasaur",
            pokemon_image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            pokemon_type: "[\"Grass\",\"Poison\"]"
        },
        status: 0
    },
    {
        id: 10,
        name: "7",
        type: "pokemon",
        message: "Catch #7 Squirtle the Water type pokemon",
        pokemon: {
            pokemon_id: "7",
            pokemon_name: "squirtle",
            pokemon_image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
            pokemon_type: "[\"Water\"]"
        },
        status: 0
    }
];


export const emptyStringInitialState = {
    value: ''
};

export const emptyArrayInitialState = {
    todos: []
};