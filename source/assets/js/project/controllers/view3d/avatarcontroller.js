goog.provide('feng.controllers.view3d.AvatarController');

goog.require('goog.events.EventTarget');
goog.require('goog.events');
goog.require('feng.models.avatar.Avatar');
goog.require('feng.views.Avatar');


/**
 * @constructor
 */
feng.controllers.view3d.AvatarController = function(){

  goog.base(this);

  this._avatars = {};
};
goog.inherits(feng.controllers.view3d.AvatarController, goog.events.EventTarget);
goog.addSingletonGetter(feng.controllers.view3d.AvatarController);


feng.controllers.view3d.AvatarController.prototype.getAvatar = function( avatarName ){

	return this._avatars[avatarName];
};


feng.controllers.view3d.AvatarController.prototype.addAvatar = function( avatarName, settings ){

	if(!this._avatars[avatarName]) {

		var model = new feng.models.avatar.Avatar(avatarName, settings);
		var avatar = new feng.views.Avatar(model);

		this._avatars[avatarName] = avatar;

		return avatar;
	}
};