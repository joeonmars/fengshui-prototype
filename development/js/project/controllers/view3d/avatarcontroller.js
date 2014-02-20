goog.provide('fengshui.controllers.view3d.AvatarController');

goog.require('goog.events.EventTarget');
goog.require('goog.events');
goog.require('fengshui.models.avatar.Avatar');
goog.require('fengshui.views.Avatar');


/**
 * @constructor
 */
fengshui.controllers.view3d.AvatarController = function(){

  goog.base(this);

  this._avatars = {};
};
goog.inherits(fengshui.controllers.view3d.AvatarController, goog.events.EventTarget);
goog.addSingletonGetter(fengshui.controllers.view3d.AvatarController);


fengshui.controllers.view3d.AvatarController.prototype.getAvatar = function( avatarName ){

	return this._avatars[avatarName];
};


fengshui.controllers.view3d.AvatarController.prototype.addAvatar = function( avatarName, settings ){

	if(!this._avatars[avatarName]) {

		var model = new fengshui.models.avatar.Avatar(avatarName, settings);
		var avatar = new fengshui.views.Avatar(model);

		this._avatars[avatarName] = avatar;

		return avatar;
	}
};