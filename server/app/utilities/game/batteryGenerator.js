const _ = require('lodash');
const batteryGenerator = {};
module.exports = batteryGenerator;

const batteryColors = ['yellow', 'green', 'black']

batteryGenerator.generate = function(game) {
    const batteries = [];
    let numBatteries = _.random(3, 8);
    for (let i = 0; i < numBatteries; i++) {
        batteries.push({ userAssigned: i % 4, color: _.sample(batteryColors) });
    }

    game.batteries = batteries;
}

// var testObj = {};
// batteryGenerator.generate(testObj);
// console.log(testObj);