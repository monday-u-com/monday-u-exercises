import asciify from "asciify-image";
import figlet from "figlet";

export async function pokemonAscii(pokemonId) {
  let options = {
    fit: "box",
    width: 50,
    height: 40,
  };
  let asciiImage = await asciify(
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
    options
  );
  console.log(asciiImage);
  return;
}

export function textToAscii(text) {
  figlet(text, function (err, data) {
    if (err) {
      console.log("Error Please try again...");
      console.dir(err);
      return;
    }
    console.log(data);
  });
}
