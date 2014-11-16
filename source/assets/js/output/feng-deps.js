// This file was autogenerated by source/assets/js/thirdparty/closure-library/closure/bin/build/depswriter.py.
// Please do not edit.
goog.addDependency('../../../../project/apps/demo.js', ['feng.apps.Demo'], ['feng.PubSub', 'feng.controllers.KeyboardController', 'feng.controllers.NavigationController', 'feng.controllers.SectionController', 'feng.controllers.SoundController', 'feng.controllers.StorageController', 'feng.controllers.view3d.PathfindingController', 'feng.fx.Shaders', 'feng.templates.main', 'feng.utils.Utils', 'feng.views.EpisodeSelection', 'feng.views.MainOptions', 'feng.views.debug.Debugger', 'feng.views.popups.Tutorial', 'goog.dom', 'goog.fx.anim', 'goog.style']);
goog.addDependency('../../../../project/apps/main.js', ['feng.apps.Main'], ['feng.templates.main', 'goog.dom', 'goog.fx']);
goog.addDependency('../../../../project/apps/pathedit.js', ['feng.apps.PathEdit'], ['feng.PubSub', 'feng.fx.EnergyFlow', 'feng.fx.PathTrack', 'feng.models.Preload', 'feng.templates.main', 'feng.views.Preloader', 'feng.views.View3D', 'feng.views.debug.Debugger', 'goog.dom', 'goog.events.KeyHandler', 'goog.events.MouseWheelHandler', 'goog.fx.anim']);
goog.addDependency('../../../../project/apps/test.js', ['feng.apps.Test'], ['feng.fx.FloatText', 'goog.dom', 'goog.events', 'goog.fx.anim', 'goog.text.LoremIpsum']);
goog.addDependency('../../../../project/controllers/controls/browsecontrols.js', ['feng.controllers.controls.BrowseControls'], ['feng.controllers.controls.Controls', 'feng.utils.ThreeUtils', 'goog.events', 'goog.events.MouseWheelHandler', 'goog.math.Box']);
goog.addDependency('../../../../project/controllers/controls/closeupcontrols.js', ['feng.controllers.controls.CloseUpControls'], ['feng.controllers.controls.Controls', 'goog.events', 'goog.math']);
goog.addDependency('../../../../project/controllers/controls/controls.js', ['feng.controllers.controls.Controls'], ['goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/controllers/controls/designcontrols.js', ['feng.controllers.controls.DesignControls'], ['feng.controllers.controls.Controls', 'feng.utils.ThreeUtils', 'feng.views.sections.controls.ZoomSlider', 'goog.fx.Dragger']);
goog.addDependency('../../../../project/controllers/controls/entrycontrols.js', ['feng.controllers.controls.EntryControls'], ['feng.controllers.controls.Controls', 'feng.utils.ThreeUtils']);
goog.addDependency('../../../../project/controllers/controls/exitcontrols.js', ['feng.controllers.controls.ExitControls'], ['feng.controllers.controls.Controls', 'feng.utils.ThreeUtils']);
goog.addDependency('../../../../project/controllers/controls/transitioncontrols.js', ['feng.controllers.controls.TransitionControls'], ['feng.controllers.controls.Controls', 'goog.events', 'goog.math']);
goog.addDependency('../../../../project/controllers/controls/walkcontrols.js', ['feng.controllers.controls.WalkControls'], ['feng.controllers.controls.Controls', 'feng.fx.PathTrack', 'feng.utils.ThreeUtils', 'goog.events', 'goog.math']);
goog.addDependency('../../../../project/controllers/keyboardcontroller.js', ['feng.controllers.KeyboardController'], ['goog.events.EventTarget', 'goog.events.KeyHandler', 'goog.object', 'goog.string']);
goog.addDependency('../../../../project/controllers/navigationcontroller.js', ['feng.controllers.NavigationController'], ['goog.History', 'goog.events', 'goog.events.EventTarget', 'goog.history.EventType', 'goog.history.Html5History', 'goog.string']);
goog.addDependency('../../../../project/controllers/sectioncontroller.js', ['feng.controllers.SectionController'], ['feng.views.sections.Home', 'feng.views.sections.House', 'feng.views.sections.Studio', 'goog.events', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/controllers/soundcontroller.js', ['feng.controllers.SoundController'], ['feng.events', 'goog.Timer', 'goog.events.EventTarget', 'goog.labs.dom.PageVisibilityMonitor', 'goog.object']);
goog.addDependency('../../../../project/controllers/storagecontroller.js', ['feng.controllers.StorageController'], ['goog.storage.mechanism.HTML5LocalStorage']);
goog.addDependency('../../../../project/controllers/view3d/cameracontroller.js', ['feng.controllers.view3d.CameraController'], ['feng.events', 'goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/controllers/view3d/modeController.js', ['feng.controllers.view3d.ModeController'], ['feng.controllers.controls.BrowseControls', 'feng.controllers.controls.CloseUpControls', 'feng.controllers.controls.DesignControls', 'feng.controllers.controls.EntryControls', 'feng.controllers.controls.ExitControls', 'feng.controllers.controls.TransitionControls', 'feng.controllers.controls.WalkControls', 'feng.events', 'goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget', 'goog.object']);
goog.addDependency('../../../../project/controllers/view3d/pathfindingcontroller.js', ['feng.controllers.view3d.PathfindingController'], ['goog.array', 'goog.events.EventTarget', 'goog.math.Box']);
goog.addDependency('../../../../project/controllers/view3d/rendercontroller.js', ['feng.controllers.view3d.RenderController'], ['goog.events.EventTarget']);
goog.addDependency('../../../../project/controllers/view3d/view3dcontroller.js', ['feng.controllers.view3d.View3DController'], ['feng.events', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/events/eventtype.js', ['feng.events'], ['goog.userAgent']);
goog.addDependency('../../../../project/feng.js', ['feng'], ['feng.apps.Demo', 'feng.apps.Main', 'feng.apps.PathEdit', 'feng.apps.Test', 'goog.Uri']);
goog.addDependency('../../../../project/fx/animatedhouselogo.js', ['feng.fx.AnimatedHouseLogo'], ['feng.fx.CanvasSprite']);
goog.addDependency('../../../../project/fx/animatedsprite.js', ['feng.fx.AnimatedSprite'], ['goog.math.Coordinate', 'goog.math.Size']);
goog.addDependency('../../../../project/fx/canvassprite.js', ['feng.fx.CanvasSprite'], ['goog.dom', 'goog.events.KeyHandler']);
goog.addDependency('../../../../project/fx/energyflow.js', ['feng.fx.EnergyFlow'], ['feng.fx.Leaf', 'feng.fx.PathTrack', 'feng.fx.Trail']);
goog.addDependency('../../../../project/fx/floattext.js', ['feng.fx.FloatText'], ['feng.templates.captions', 'goog.events.EventTarget', 'goog.string']);
goog.addDependency('../../../../project/fx/leaf.js', ['feng.fx.Leaf'], ['feng.fx.Particle', 'feng.fx.TextureAnimator', 'goog.math']);
goog.addDependency('../../../../project/fx/particle.js', ['feng.fx.Particle'], ['goog.math']);
goog.addDependency('../../../../project/fx/pathtrack.js', ['feng.fx.PathTrack'], ['feng.utils.Randomizer']);
goog.addDependency('../../../../project/fx/renderer.js', ['feng.fx.Renderer'], ['goog.array']);
goog.addDependency('../../../../project/fx/shaders.js', ['feng.fx.Shaders'], ['goog.dom.query', 'goog.net.XhrIo']);
goog.addDependency('../../../../project/fx/textureanimator.js', ['feng.fx.TextureAnimator'], ['goog.events.EventTarget']);
goog.addDependency('../../../../project/fx/trail.js', ['feng.fx.Trail'], ['feng.fx.Particle', 'goog.math']);
goog.addDependency('../../../../project/fx/view3dsize.js', ['feng.fx.View3DSize'], ['goog.events.EventTarget', 'goog.math.Size']);
goog.addDependency('../../../../project/models/accessories.js', ['feng.models.Accessories'], ['feng.models.Preload']);
goog.addDependency('../../../../project/models/achievements/achievements.js', ['feng.models.achievements.Achievements'], ['feng.models.achievements.Tip', 'goog.array', 'goog.object']);
goog.addDependency('../../../../project/models/achievements/tip.js', ['feng.models.achievements.Tip'], ['feng.controllers.NavigationController', 'feng.events', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/models/preload.js', ['feng.models.Preload'], ['feng.utils.Utils', 'goog.object']);
goog.addDependency('../../../../project/models/view3d.js', ['feng.models.View3D'], []);
goog.addDependency('../../../../project/pubsub.js', ['feng.PubSub'], ['goog.pubsub.PubSub']);
goog.addDependency('../../../../project/templates/book.soy.js', ['feng.templates.book'], ['feng.templates.common', 'soy', 'soydata']);
goog.addDependency('../../../../project/templates/captions.soy.js', ['feng.templates.captions'], ['feng.templates.common', 'soy', 'soydata']);
goog.addDependency('../../../../project/templates/common.soy.js', ['feng.templates.common'], ['soy', 'soydata']);
goog.addDependency('../../../../project/templates/controls.soy.js', ['feng.templates.controls'], ['feng.templates.common', 'soy', 'soydata']);
goog.addDependency('../../../../project/templates/debug.soy.js', ['feng.templates.debug'], ['soy', 'soydata']);
goog.addDependency('../../../../project/templates/designcaptions.soy.js', ['feng.templates.designcaptions'], ['soy', 'soydata']);
goog.addDependency('../../../../project/templates/main.soy.js', ['feng.templates.main'], ['feng.templates.common', 'feng.templates.controls', 'feng.templates.debug', 'soy', 'soydata']);
goog.addDependency('../../../../project/templates/soyutils_usegoog.js', ['soy', 'soy.StringBuilder', 'soy.esc', 'soydata', 'soydata.SanitizedHtml', 'soydata.SanitizedHtmlAttribute', 'soydata.SanitizedJs', 'soydata.SanitizedJsStrChars', 'soydata.SanitizedUri', 'soydata.VERY_UNSAFE'], ['goog.asserts', 'goog.dom.DomHelper', 'goog.format', 'goog.i18n.BidiFormatter', 'goog.i18n.bidi', 'goog.soy', 'goog.soy.data.SanitizedContentKind', 'goog.string', 'goog.string.StringBuffer']);
goog.addDependency('../../../../project/utils/multilinearinterpolator.js', ['feng.utils.MultiLinearInterpolator'], ['goog.math']);
goog.addDependency('../../../../project/utils/random.js', ['feng.utils.Randomizer'], ['goog.math', 'goog.testing.PseudoRandom']);
goog.addDependency('../../../../project/utils/threeutils.js', ['feng.utils.ThreeUtils'], ['goog.math']);
goog.addDependency('../../../../project/utils/utils.js', ['feng.utils.Utils'], ['goog.Uri', 'goog.dom', 'goog.string', 'goog.style', 'goog.window']);
goog.addDependency('../../../../project/views/book/book.js', ['feng.views.book.Book'], ['feng.events', 'feng.models.achievements.Achievements', 'feng.templates.book', 'feng.views.book.TipModule', 'goog.dom', 'goog.events.EventHandler', 'goog.events.MouseWheelHandler', 'goog.fx.Dragger', 'goog.math.Rect', 'goog.object']);
goog.addDependency('../../../../project/views/book/tipmodule.js', ['feng.views.book.TipModule'], ['feng.events', 'feng.utils.Utils', 'goog.dom', 'goog.events.EventHandler', 'goog.fx.Dragger', 'goog.math.Size']);
goog.addDependency('../../../../project/views/debug/achievements.js', ['feng.views.debug.Achievements'], ['feng.events', 'feng.models.achievements.Achievements', 'feng.templates.debug', 'feng.views.debug.DebugView']);
goog.addDependency('../../../../project/views/debug/camera.js', ['feng.views.debug.Camera'], ['feng.templates.debug', 'feng.views.debug.DebugView']);
goog.addDependency('../../../../project/views/debug/debugger.js', ['feng.views.debug.Debugger'], ['feng.models.achievements.Achievements', 'feng.views.debug.Achievements', 'feng.views.debug.Camera', 'feng.views.debug.Manipulate', 'feng.views.debug.PathTrack', 'feng.views.debug.Pathfinding', 'goog.dom', 'goog.dom.query', 'goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/debug/debugview.js', ['feng.views.debug.DebugView'], ['goog.dom', 'goog.dom.query', 'goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget', 'soy']);
goog.addDependency('../../../../project/views/debug/manipulate.js', ['feng.views.debug.Manipulate'], ['feng.templates.debug', 'feng.views.debug.DebugView']);
goog.addDependency('../../../../project/views/debug/pathfinding.js', ['feng.views.debug.Pathfinding'], ['feng.controllers.view3d.PathfindingController', 'feng.templates.debug', 'feng.views.debug.DebugView']);
goog.addDependency('../../../../project/views/debug/pathtrack.js', ['feng.views.debug.PathTrack'], ['feng.templates.debug', 'feng.views.debug.DebugView']);
goog.addDependency('../../../../project/views/episodeselection.js', ['feng.views.EpisodeSelection'], ['goog.dom', 'goog.dom.classes', 'goog.dom.query', 'goog.testing.events']);
goog.addDependency('../../../../project/views/episodeselectionoverlay.js', ['feng.views.EpisodeSelectionOverlay'], ['feng.events', 'feng.views.Overlay', 'goog.dom', 'goog.math.Box', 'goog.style']);
goog.addDependency('../../../../project/views/logo.js', ['feng.views.Logo'], ['goog.dom', 'goog.dom.classes', 'goog.dom.query', 'goog.math.Size', 'goog.style']);
goog.addDependency('../../../../project/views/mainoptions.js', ['feng.views.MainOptions'], ['feng.utils.Utils', 'goog.dom', 'goog.dom.classes', 'goog.dom.query', 'goog.events']);
goog.addDependency('../../../../project/views/popups/popup.js', ['feng.views.popups.Popup'], ['goog.async.Delay', 'goog.dom', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/popups/tutorial.js', ['feng.views.popups.Tutorial'], ['feng.templates.common', 'feng.views.popups.Popup']);
goog.addDependency('../../../../project/views/preloader.js', ['feng.views.Preloader'], ['feng.events', 'feng.models.Preload', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/sections/captions/caption.js', ['feng.views.sections.captions.Caption'], ['feng.templates.captions', 'feng.utils.Utils', 'goog.async.Delay', 'goog.events.EventHandler']);
goog.addDependency('../../../../project/views/sections/captions/changecolorcaption.js', ['feng.views.sections.captions.ChangeColorCaption'], ['feng.templates.captions', 'feng.views.sections.captions.Caption', 'goog.soy']);
goog.addDependency('../../../../project/views/sections/captions/changeobjectcaption.js', ['feng.views.sections.captions.ChangeObjectCaption'], ['feng.templates.captions', 'feng.views.sections.captions.Caption', 'goog.soy']);
goog.addDependency('../../../../project/views/sections/captions/changepicturecaption.js', ['feng.views.sections.captions.ChangePictureCaption'], ['feng.templates.captions', 'feng.views.sections.captions.Caption', 'goog.soy']);
goog.addDependency('../../../../project/views/sections/captions/dropfruitscaption.js', ['feng.views.sections.captions.DropFruitsCaption'], ['feng.templates.captions', 'feng.views.sections.captions.Caption', 'goog.soy']);
goog.addDependency('../../../../project/views/sections/controls/book.js', ['feng.views.sections.controls.Book'], ['feng.events', 'feng.fx.AnimatedSprite', 'feng.views.book.Book', 'feng.views.sections.controls.Controls', 'goog.dom', 'goog.fx.Dragger']);
goog.addDependency('../../../../project/views/sections/controls/compass.js', ['feng.views.sections.controls.Compass'], ['feng.events', 'feng.fx.AnimatedSprite', 'feng.views.sections.controls.Controls', 'goog.dom', 'goog.fx.Dragger']);
goog.addDependency('../../../../project/views/sections/controls/controls.js', ['feng.views.sections.controls.Controls'], ['goog.events.EventHandler', 'goog.events.EventTarget', 'goog.style']);
goog.addDependency('../../../../project/views/sections/controls/dropbutton.js', ['feng.views.sections.controls.DropButton'], ['feng.views.sections.controls.Controls']);
goog.addDependency('../../../../project/views/sections/controls/homebutton.js', ['feng.views.sections.controls.HomeButton'], ['feng.events', 'feng.views.sections.controls.Controls', 'goog.dom']);
goog.addDependency('../../../../project/views/sections/controls/objectselector.js', ['feng.views.sections.controls.ObjectSelector'], ['feng.fx.AnimatedSprite', 'feng.views.sections.controls.Controls', 'goog.async.Delay', 'goog.async.Throttle', 'goog.events']);
goog.addDependency('../../../../project/views/sections/controls/progressbar.js', ['feng.views.sections.controls.ProgressBar'], ['feng.views.sections.controls.Controls', 'goog.async.Throttle']);
goog.addDependency('../../../../project/views/sections/controls/reminder.js', ['feng.views.sections.controls.Reminder'], ['feng.models.Preload', 'feng.models.achievements.Achievements', 'feng.views.sections.controls.Controls', 'goog.Timer', 'goog.async.Delay']);
goog.addDependency('../../../../project/views/sections/controls/tooltips.js', ['feng.views.sections.controls.Tooltips'], ['feng.utils.ThreeUtils', 'feng.views.sections.controls.Controls', 'goog.async.Throttle', 'goog.dom.classes']);
goog.addDependency('../../../../project/views/sections/controls/zoomslider.js', ['feng.views.sections.controls.ZoomSlider'], ['feng.events', 'feng.views.sections.controls.Controls', 'goog.dom', 'goog.events.MouseWheelHandler', 'goog.math']);
goog.addDependency('../../../../project/views/sections/episode.js', ['feng.views.sections.Episode'], ['feng.controllers.view3d.View3DController', 'feng.events', 'feng.views.View3D', 'feng.views.View3DHud', 'feng.views.sections.Section', 'goog.dom', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/sections/home.js', ['feng.views.sections.Home'], ['feng.events', 'feng.models.achievements.Achievements', 'feng.views.book.Book', 'feng.views.sections.Section', 'feng.views.sections.home.EpisodeScreen', 'feng.views.sections.home.PreloadScreen', 'goog.dom', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/sections/home/episodescreen.js', ['feng.views.sections.home.EpisodeScreen'], ['feng.views.sections.home.Screen']);
goog.addDependency('../../../../project/views/sections/home/preloadscreen.js', ['feng.views.sections.home.PreloadScreen'], ['feng.fx.AnimatedHouseLogo', 'feng.views.sections.home.Screen', 'goog.Timer']);
goog.addDependency('../../../../project/views/sections/home/screen.js', ['feng.views.sections.home.Screen'], ['goog.dom', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/sections/house.js', ['feng.views.sections.House'], ['feng.events', 'feng.views.sections.Episode', 'goog.dom']);
goog.addDependency('../../../../project/views/sections/overlay.js', ['feng.views.Overlay'], ['goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/sections/overlays/endingoverlay.js', ['feng.views.sections.overlays.EndingOverlay'], ['feng.models.Preload', 'feng.utils.Utils', 'feng.views.Overlay', 'feng.views.popups.Popup', 'goog.dom', 'goog.style']);
goog.addDependency('../../../../project/views/sections/overlays/finaleoverlay.js', ['feng.views.sections.overlays.FinaleOverlay'], ['feng.models.Preload', 'feng.utils.Utils', 'feng.views.Overlay', 'feng.views.popups.Popup', 'goog.dom', 'goog.style']);
goog.addDependency('../../../../project/views/sections/overlays/loaderoverlay.js', ['feng.views.sections.overlays.LoaderOverlay'], ['feng.fx.CanvasSprite', 'feng.models.Preload', 'feng.views.Overlay', 'goog.dom', 'goog.style']);
goog.addDependency('../../../../project/views/sections/overlays/openingoverlay.js', ['feng.views.sections.overlays.OpeningOverlay'], ['feng.models.Preload', 'feng.utils.Utils', 'feng.views.Overlay', 'feng.views.popups.Popup', 'goog.dom', 'goog.style']);
goog.addDependency('../../../../project/views/sections/overlays/tutorialoverlay.js', ['feng.views.sections.overlays.TutorialOverlay'], ['feng.views.Overlay', 'goog.dom', 'goog.style']);
goog.addDependency('../../../../project/views/sections/section.js', ['feng.views.sections.Section'], ['feng.events', 'feng.views.Preloader', 'goog.dom', 'goog.dom.query', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/sections/studio.js', ['feng.views.sections.Studio'], ['feng.events', 'feng.views.sections.Episode', 'goog.dom']);
goog.addDependency('../../../../project/views/view3d.js', ['feng.views.View3D'], ['feng.controllers.view3d.CameraController', 'feng.controllers.view3d.ModeController', 'feng.controllers.view3d.RenderController', 'feng.fx.EnergyFlow', 'feng.fx.Renderer', 'feng.fx.View3DSize', 'feng.models.Accessories', 'feng.models.Preload', 'feng.models.View3D', 'feng.views.book.Book', 'feng.views.view3dfx.FX', 'feng.views.view3dobject.AccessoryObject', 'feng.views.view3dobject.Arms', 'feng.views.view3dobject.DesignPlane', 'feng.views.view3dobject.GatewayObject', 'feng.views.view3dobject.HolderObject', 'feng.views.view3dobject.InteractiveObject', 'feng.views.view3dobject.Mirror', 'feng.views.view3dobject.MovableObject', 'feng.views.view3dobject.Skybox', 'feng.views.view3dobject.TipObject', 'feng.views.view3dobject.View3DObject', 'feng.views.view3dobject.entities.Bear', 'feng.views.view3dobject.entities.Cat', 'feng.views.view3dobject.entities.Closet', 'feng.views.view3dobject.entities.Computer', 'feng.views.view3dobject.entities.DiningMirror', 'feng.views.view3dobject.entities.Drawer', 'feng.views.view3dobject.entities.FruitPlate', 'feng.views.view3dobject.entities.Knife', 'feng.views.view3dobject.entities.Lamp', 'feng.views.view3dobject.entities.Pictures', 'feng.views.view3dobject.entities.Refrigerator', 'feng.views.view3dobject.entities.Windows', 'goog.dom', 'goog.dom.query', 'goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget', 'goog.object']);
goog.addDependency('../../../../project/views/view3dfx/clickeffect.js', ['feng.views.view3dfx.ClickEffect'], []);
goog.addDependency('../../../../project/views/view3dfx/fx.js', ['feng.views.view3dfx.FX'], ['feng.views.view3dfx.ClickEffect', 'feng.views.view3dfx.SelectEffect']);
goog.addDependency('../../../../project/views/view3dfx/selecteffect.js', ['feng.views.view3dfx.SelectEffect'], ['goog.fx.anim.Animated']);
goog.addDependency('../../../../project/views/view3dhud.js', ['feng.views.View3DHud'], ['feng.views.sections.captions.Caption', 'feng.views.sections.captions.ChangeColorCaption', 'feng.views.sections.captions.ChangeObjectCaption', 'feng.views.sections.captions.ChangePictureCaption', 'feng.views.sections.captions.DropFruitsCaption', 'feng.views.sections.controls.Book', 'feng.views.sections.controls.Compass', 'feng.views.sections.controls.DropButton', 'feng.views.sections.controls.HomeButton', 'feng.views.sections.controls.ObjectSelector', 'feng.views.sections.controls.ProgressBar', 'feng.views.sections.controls.Reminder', 'feng.views.sections.controls.Tooltips', 'feng.views.sections.overlays.EndingOverlay', 'feng.views.sections.overlays.FinaleOverlay', 'feng.views.sections.overlays.LoaderOverlay', 'feng.views.sections.overlays.OpeningOverlay', 'feng.views.sections.overlays.TutorialOverlay']);
goog.addDependency('../../../../project/views/view3dobject/accessoryobject.js', ['feng.views.view3dobject.AccessoryObject'], ['feng.models.Accessories', 'feng.views.view3dobject.InteractiveObject']);
goog.addDependency('../../../../project/views/view3dobject/arms.js', ['feng.views.view3dobject.Arms'], ['feng.views.view3dobject.InteractiveObject', 'feng.views.view3dobject.MovableObject']);
goog.addDependency('../../../../project/views/view3dobject/designplane.js', ['feng.views.view3dobject.DesignPlane'], ['feng.views.view3dobject.View3DObject']);
goog.addDependency('../../../../project/views/view3dobject/entities/bear.js', ['feng.views.view3dobject.entities.Bear'], ['feng.views.view3dobject.TipObject']);
goog.addDependency('../../../../project/views/view3dobject/entities/cat.js', ['feng.views.view3dobject.entities.Cat'], ['feng.views.view3dobject.TipObject']);
goog.addDependency('../../../../project/views/view3dobject/entities/closet.js', ['feng.views.view3dobject.entities.Closet'], ['feng.models.Preload', 'feng.utils.ThreeUtils', 'feng.views.view3dobject.TipObject']);
goog.addDependency('../../../../project/views/view3dobject/entities/computer.js', ['feng.views.view3dobject.entities.Computer'], ['feng.views.view3dobject.TipObject']);
goog.addDependency('../../../../project/views/view3dobject/entities/desktopwallpaper.js', ['feng.views.view3dobject.entities.DesktopWallpaper'], ['feng.fx.TextureAnimator', 'feng.models.Preload', 'feng.views.view3dobject.TipObject']);
goog.addDependency('../../../../project/views/view3dobject/entities/diningmirror.js', ['feng.views.view3dobject.entities.DiningMirror'], ['feng.views.view3dobject.TipObject']);
goog.addDependency('../../../../project/views/view3dobject/entities/drawer.js', ['feng.views.view3dobject.entities.Drawer'], ['feng.views.view3dobject.TipObject']);
goog.addDependency('../../../../project/views/view3dobject/entities/fruitplate.js', ['feng.views.view3dobject.entities.FruitPlate'], ['feng.views.view3dobject.HolderObject']);
goog.addDependency('../../../../project/views/view3dobject/entities/knife.js', ['feng.views.view3dobject.entities.Knife'], ['feng.views.view3dobject.MovableObject']);
goog.addDependency('../../../../project/views/view3dobject/entities/lamp.js', ['feng.views.view3dobject.entities.Lamp'], ['feng.fx.TextureAnimator', 'feng.models.Preload', 'feng.views.view3dobject.TipObject']);
goog.addDependency('../../../../project/views/view3dobject/entities/pictures.js', ['feng.views.view3dobject.entities.Pictures'], ['feng.models.Preload', 'feng.views.view3dobject.TipObject', 'goog.string']);
goog.addDependency('../../../../project/views/view3dobject/entities/refrigerator.js', ['feng.views.view3dobject.entities.Refrigerator'], ['feng.models.Preload', 'feng.utils.ThreeUtils', 'feng.views.view3dobject.TipObject']);
goog.addDependency('../../../../project/views/view3dobject/entities/windows.js', ['feng.views.view3dobject.entities.Windows'], ['feng.fx.TextureAnimator', 'feng.views.view3dobject.TipObject']);
goog.addDependency('../../../../project/views/view3dobject/gatewayobject.js', ['feng.views.view3dobject.GatewayObject'], ['feng.views.view3dobject.InteractiveObject']);
goog.addDependency('../../../../project/views/view3dobject/holderobject.js', ['feng.views.view3dobject.HolderObject'], ['feng.views.view3dobject.TipObject']);
goog.addDependency('../../../../project/views/view3dobject/interactiveobject.js', ['feng.views.view3dobject.InteractiveObject'], ['feng.views.view3dobject.View3DObject', 'goog.events.EventHandler']);
goog.addDependency('../../../../project/views/view3dobject/mirror.js', ['feng.views.view3dobject.Mirror'], ['feng.views.view3dobject.View3DObject']);
goog.addDependency('../../../../project/views/view3dobject/movableobject.js', ['feng.views.view3dobject.MovableObject'], ['feng.utils.ThreeUtils', 'feng.views.view3dobject.TipObject']);
goog.addDependency('../../../../project/views/view3dobject/skybox.js', ['feng.views.view3dobject.Skybox'], ['feng.views.view3dobject.View3DObject']);
goog.addDependency('../../../../project/views/view3dobject/tipobject.js', ['feng.views.view3dobject.TipObject'], ['feng.models.achievements.Achievements', 'feng.views.view3dobject.InteractiveObject']);
goog.addDependency('../../../../project/views/view3dobject/view3dobject.js', ['feng.views.view3dobject.View3DObject'], ['feng.models.Preload', 'feng.models.View3D', 'goog.events.EventTarget', 'goog.math.Box']);
