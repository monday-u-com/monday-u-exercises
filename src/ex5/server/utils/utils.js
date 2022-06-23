function validation(item) {
    const elementsArr = item.split(/\s*,\s*/);
    const flag = elementsArr.some((item) => !isNaN(item));
    return { isPokemon: flag, elementsArr: elementsArr };
}
module.exports = {
    validation,
}
