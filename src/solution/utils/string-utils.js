
function capitalizeText(text) {
    return text
        .split(' ')
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(' ');
}

function generateUniqueID() {
    return Math.random().toString(36).substr(2, 9);
}

module.exports = {
    capitalizeText,
    generateUniqueID
}