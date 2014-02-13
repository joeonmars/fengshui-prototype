goog.provide('fengshui.utils.Randomizer');

goog.require('goog.math');
goog.require('goog.testing.PseudoRandom');


/**
 * @constructor
 */
fengshui.utils.Randomizer = function(){

};


/**
 * Static Method, return seeded randomized numbers
 */
fengshui.utils.Randomizer.getRandomNumbers = function(seed, amount, loop){

	var random = new goog.testing.PseudoRandom(seed);
	var randomNumbers = [];

	for(var i = 0; i < amount; ++i) {
		randomNumbers.push( random.random() );
	}

	if(loop === true) randomNumbers.push( randomNumbers[0] );

	return randomNumbers;
};