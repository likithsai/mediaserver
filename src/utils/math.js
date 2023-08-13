//  Math utility function

const getRandomIntegerInRange = (min, max) => {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);

    return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
}

module.exports = { getRandomIntegerInRange };