goog.provide('feng.PubSub');

goog.require('goog.pubsub.PubSub');


feng.PubSub = function() {

	goog.base(this);

	this._shownWidgets = [];

	this.subscribe( feng.PubSub.Topic.SHOW_WIDGET, this.onShowWidget, this );
	this.subscribe( feng.PubSub.Topic.HIDE_WIDGET, this.onHideWidget, this );
};
goog.inherits( feng.PubSub, goog.pubsub.PubSub );
goog.addSingletonGetter( feng.PubSub );


feng.PubSub.prototype.getShownWidgets = function() {

	return this._shownWidgets;
};


feng.PubSub.prototype.isWidgetShown = function( widget ) {

	return goog.array.contains( this._shownWidgets, widget );
};


feng.PubSub.prototype.onShowWidget = function( widget ) {

	goog.array.insert( this._shownWidgets, widget );
};


feng.PubSub.prototype.onHideWidget = function( widget ) {

	goog.array.remove( this._shownWidgets, widget );
};


feng.PubSub.Topic = {
	SHOW_VIEW3D: 'show_view3d',
	HIDE_VIEW3D: 'hide_view3d',
	BUFFER_START: 'buffer_start',
	BUFFER_COMPLETE: 'buffer_complete',
	NAVIGATE: 'navigate',
	SOUND_ON: 'sound_on',
	SOUND_OFF: 'sound_off',
	MAIN_LOAD_COMPLETE: 'main_load_complete',
	SHOW_WIDGET: 'show_widget',
	HIDE_WIDGET: 'hide_widget'
};