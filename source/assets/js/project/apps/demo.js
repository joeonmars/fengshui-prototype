goog.provide('feng.apps.Demo');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.fx.anim');
goog.require('goog.style');
goog.require('feng.templates.main');
goog.require('feng.controllers.NavigationController');
goog.require('feng.controllers.SectionController');
goog.require('feng.controllers.StorageController');
goog.require('feng.controllers.SoundController');
goog.require('feng.controllers.KeyboardController');
goog.require('feng.controllers.view3d.PathfindingController');
goog.require('feng.views.debug.Debugger');
goog.require('feng.views.MainOptions');
goog.require('feng.views.EpisodeSelection');
goog.require('feng.views.popups.Tutorial');
goog.require('feng.fx.Shaders');
goog.require('feng.PubSub');
goog.require('feng.utils.Utils');


feng.apps.Demo = function() {

	goog.base(this);
	
	goog.fx.anim.setAnimationWindow(window);

	feng.debug = (feng.utils.Utils.getQuery('debug') === 'true') || feng.Config['debug'];
	feng.office = (feng.utils.Utils.getQuery('office') === 'true') || feng.Config['office'];
	feng.quality = feng.utils.Utils.getQuery('quality') || feng.Config['quality'];
	
	feng.viewportSize = feng.apps.Demo.getViewportSize();

	goog.events.listen(window, goog.events.EventType.RESIZE, function() {
		feng.viewportSize = feng.apps.Demo.getViewportSize();
	});

	feng.renderSettings = {
		renderSize: (feng.quality === 'high') ? ((screen.width > 1920) ? 2048 : 1024) : 1024,
		shadowMapSize: (feng.quality === 'high') ? 1024 : 512
	};

	var mainFrag = soy.renderAsFragment(feng.templates.main.Main, {
		debug: feng.debug
	});
	goog.dom.appendChild(document.body, mainFrag);

	feng.pubsub = feng.PubSub.getInstance();

	if(feng.debug) feng.views.debug.Debugger.getInstance();
	if(feng.office) goog.style.setOpacity(document.body, .1);

	feng.storageController = feng.controllers.StorageController.getInstance();

	feng.soundController = feng.controllers.SoundController.getInstance();
	
	feng.mainOptions = new feng.views.MainOptions;

	feng.episodeSelection = feng.views.EpisodeSelection.getInstance();

	feng.tutorial = feng.views.popups.Tutorial.getInstance();

	feng.controllers.NavigationController.Implementation = feng.controllers.NavigationController.HASH;
	feng.navigationController = feng.controllers.NavigationController.getInstance();

	feng.pathfinder = feng.controllers.view3d.PathfindingController.getInstance();

	feng.shaders = feng.fx.Shaders.getInstance();

	feng.sectionController = feng.controllers.SectionController.getInstance();

	feng.keyboardController = feng.controllers.KeyboardController.getInstance();

	feng.initialToken = feng.navigationController.getTokenArray();
	
	feng.navigationController.init();
	feng.navigationController.replaceToken( feng.controllers.NavigationController.Token.HOME );
};
goog.inherits(feng.apps.Demo, goog.events.EventTarget);
goog.addSingletonGetter(feng.apps.Demo);


feng.apps.Demo.getViewportSize = function() {

	return goog.style.getSize( document.body );
};