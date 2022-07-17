function validation(item) {
    const elementsArr = item.trim().split(',');
    const flag = elementsArr.some((item) => !isNaN(item));
    return { isPokemon: flag, elementsArr: elementsArr };
}
module.exports = {
    validation,
}
