goog.provide('feng.PubSub');

goog.require('goog.pubsub.PubSub');


feng.PubSub = function() {

	goog.base(this);

};
goog.inherits( feng.PubSub, goog.pubsub.PubSub );
goog.addSingletonGetter( feng.PubSub );


feng.PubSub.Topic = {
	SHOW_VIEW3D: 'show_view3d',
	HIDE_VIEW3D: 'hide_view3d',
	NAVIGATE: 'navigate',
	SOUND_ON: 'sound_on',
	SOUND_OFF: 'sound_off'
};