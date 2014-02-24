goog.provide('feng.utils.Randomizer');

goog.require('goog.math');
goog.require('goog.testing.PseudoRandom');


/**
 * @constructor
 */
feng.utils.Randomizer = function(){

};


/**
 * Static Method, return seeded randomized numbers
 */
feng.utils.Randomizer.getRandomNumbers = function(seed, amount){

	var random = new goog.testing.PseudoRandom(seed);
	var randomNumbers = [];

	for(var i = 0; i < amount; ++i) {
		randomNumbers.push( random.random() );
	}

	return randomNumbers;
};