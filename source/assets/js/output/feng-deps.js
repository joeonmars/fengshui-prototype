// This file was autogenerated by source/assets/js/thirdparty/closure-library/closure/bin/build/depswriter.py.
// Please do not edit.
goog.addDependency('../../../../project/apps/demo.js', ['feng.apps.Demo'], ['feng.PubSub', 'feng.controllers.NavigationController', 'feng.controllers.SectionController', 'feng.controllers.SoundController', 'feng.controllers.StorageController', 'feng.templates.main', 'feng.views.EpisodeSelection', 'feng.views.EpisodeSelectionOverlay', 'feng.views.MainOptions', 'feng.views.debug.Debugger', 'feng.views.popups.Tutorial', 'goog.dom', 'goog.fx.anim', 'goog.style']);
goog.addDependency('../../../../project/apps/main.js', ['feng.apps.Main'], ['feng.templates.main', 'goog.dom', 'goog.fx']);
goog.addDependency('../../../../project/apps/pathedit.js', ['feng.apps.PathEdit'], ['feng.PubSub', 'feng.fx.EnergyFlow', 'feng.fx.PathTrack', 'feng.models.Preload', 'feng.templates.main', 'feng.views.Preloader', 'feng.views.View3D', 'feng.views.book.Hanzi', 'feng.views.debug.Debugger', 'goog.dom', 'goog.events.KeyHandler', 'goog.events.MouseWheelHandler', 'goog.fx.anim']);
goog.addDependency('../../../../project/apps/test.js', ['feng.apps.Test'], ['feng.fx.FloatText', 'goog.dom', 'goog.events', 'goog.fx.anim', 'goog.text.LoremIpsum']);
goog.addDependency('../../../../project/controllers/controls/browsecontrols.js', ['feng.controllers.controls.BrowseControls'], ['feng.controllers.controls.Controls', 'feng.utils.Randomizer', 'feng.utils.ThreeUtils', 'goog.events', 'goog.math.Box']);
goog.addDependency('../../../../project/controllers/controls/closeupcontrols.js', ['feng.controllers.controls.CloseUpControls'], ['feng.controllers.controls.Controls', 'feng.controllers.controls.InteractionResolver', 'feng.views.sections.controls.Manipulator', 'goog.events', 'goog.math']);
goog.addDependency('../../../../project/controllers/controls/controls.js', ['feng.controllers.controls.Controls'], ['goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/controllers/controls/designcontrols.js', ['feng.controllers.controls.DesignControls'], ['feng.controllers.controls.Controls', 'feng.controllers.controls.InteractionResolver', 'feng.utils.ThreeUtils', 'feng.views.sections.controls.Manipulator', 'feng.views.sections.controls.ZoomSlider', 'goog.fx.anim.Animated', 'goog.math']);
goog.addDependency('../../../../project/controllers/controls/interactionresolver.js', ['feng.controllers.controls.InteractionResolver'], ['feng.controllers.controls.PhysicsInteraction', 'feng.views.view3dobject.InteractiveObject', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/controllers/controls/physics.js', ['feng.controllers.controls.Physics'], []);
goog.addDependency('../../../../project/controllers/controls/physicsinteraction.js', ['feng.controllers.controls.PhysicsInteraction'], ['feng.controllers.controls.Physics', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/controllers/controls/transitioncontrols.js', ['feng.controllers.controls.TransitionControls'], ['feng.controllers.controls.Controls', 'goog.events', 'goog.math']);
goog.addDependency('../../../../project/controllers/controls/walkcontrols.js', ['feng.controllers.controls.WalkControls'], ['feng.controllers.controls.Controls', 'feng.fx.PathTrack', 'feng.utils.ThreeUtils', 'goog.events', 'goog.math']);
goog.addDependency('../../../../project/controllers/navigationcontroller.js', ['feng.controllers.NavigationController'], ['goog.History', 'goog.events', 'goog.events.EventTarget', 'goog.history.EventType', 'goog.history.Html5History', 'goog.string']);
goog.addDependency('../../../../project/controllers/sectioncontroller.js', ['feng.controllers.SectionController'], ['feng.views.sections.Home', 'feng.views.sections.Studio', 'feng.views.sections.Townhouse', 'goog.events', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/controllers/soundcontroller.js', ['feng.controllers.SoundController'], ['feng.events', 'goog.events.EventTarget', 'goog.object']);
goog.addDependency('../../../../project/controllers/storagecontroller.js', ['feng.controllers.StorageController'], ['goog.storage.mechanism.HTML5LocalStorage']);
goog.addDependency('../../../../project/controllers/view3d/avatarcontroller.js', ['feng.controllers.view3d.AvatarController'], ['feng.models.avatar.Avatar', 'feng.views.Avatar', 'goog.events', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/controllers/view3d/cameracontroller.js', ['feng.controllers.view3d.CameraController'], ['feng.events', 'goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/controllers/view3d/modeController.js', ['feng.controllers.view3d.ModeController'], ['feng.controllers.controls.BrowseControls', 'feng.controllers.controls.CloseUpControls', 'feng.controllers.controls.DesignControls', 'feng.controllers.controls.TransitionControls', 'feng.controllers.controls.WalkControls', 'feng.events', 'goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget', 'goog.object']);
goog.addDependency('../../../../project/controllers/view3d/pathfindingcontroller.js', ['feng.controllers.view3d.PathfindingController'], ['feng.views.debug.Pathfinding', 'goog.array', 'goog.events', 'goog.events.EventTarget', 'goog.math.Box']);
goog.addDependency('../../../../project/controllers/view3d/rendercontroller.js', ['feng.controllers.view3d.RenderController'], ['goog.events.EventTarget']);
goog.addDependency('../../../../project/controllers/view3d/view3dcontroller.js', ['feng.controllers.view3d.View3DController'], ['feng.events', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/events/eventtype.js', ['feng.events'], []);
goog.addDependency('../../../../project/feng.js', ['feng'], ['feng.apps.Demo', 'feng.apps.Main', 'feng.apps.PathEdit', 'feng.apps.Test', 'goog.Uri']);
goog.addDependency('../../../../project/fx/animatedsprite.js', ['feng.fx.AnimatedSprite'], ['goog.math.Coordinate', 'goog.math.Size']);
goog.addDependency('../../../../project/fx/energyflow.js', ['feng.fx.EnergyFlow'], ['feng.fx.Leaf', 'feng.fx.PathTrack', 'feng.fx.Trail']);
goog.addDependency('../../../../project/fx/floattext.js', ['feng.fx.FloatText'], ['feng.templates.captions', 'goog.events.EventTarget', 'goog.string']);
goog.addDependency('../../../../project/fx/leaf.js', ['feng.fx.Leaf'], ['feng.fx.Particle', 'goog.math']);
goog.addDependency('../../../../project/fx/particle.js', ['feng.fx.Particle'], ['goog.math']);
goog.addDependency('../../../../project/fx/pathtrack.js', ['feng.fx.PathTrack'], ['feng.utils.Randomizer']);
goog.addDependency('../../../../project/fx/renderer.js', ['feng.fx.Renderer'], ['goog.array']);
goog.addDependency('../../../../project/fx/textureanimator.js', ['feng.fx.TextureAnimator'], ['goog.events.EventTarget']);
goog.addDependency('../../../../project/fx/trail.js', ['feng.fx.Trail'], ['feng.fx.Particle', 'goog.math']);
goog.addDependency('../../../../project/fx/wraplayout.js', ['feng.fx.WrapLayout'], ['feng.utils.ThreeUtils', 'goog.events.EventTarget', 'goog.math.Box']);
goog.addDependency('../../../../project/models/accessories.js', ['feng.models.Accessories'], ['feng.models.Preload']);
goog.addDependency('../../../../project/models/achievements/achievements.js', ['feng.models.achievements.Achievements'], ['feng.models.achievements.Tip', 'goog.array', 'goog.object']);
goog.addDependency('../../../../project/models/achievements/tip.js', ['feng.models.achievements.Tip'], ['feng.controllers.NavigationController', 'feng.events', 'feng.models.Preload', 'feng.models.achievements.Achievements', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/models/preload.js', ['feng.models.Preload'], ['feng.utils.Utils', 'goog.object']);
goog.addDependency('../../../../project/models/view3d.js', ['feng.models.View3D'], []);
goog.addDependency('../../../../project/pubsub.js', ['feng.PubSub'], ['goog.pubsub.PubSub']);
goog.addDependency('../../../../project/templates/book.soy.js', ['feng.templates.book'], ['feng.templates.common', 'soy', 'soydata']);
goog.addDependency('../../../../project/templates/captions.soy.js', ['feng.templates.captions'], ['soy', 'soydata']);
goog.addDependency('../../../../project/templates/common.soy.js', ['feng.templates.common'], ['soy', 'soydata']);
goog.addDependency('../../../../project/templates/controls.soy.js', ['feng.templates.controls'], ['soy', 'soydata']);
goog.addDependency('../../../../project/templates/debug.soy.js', ['feng.templates.debug'], ['soy', 'soydata']);
goog.addDependency('../../../../project/templates/main.soy.js', ['feng.templates.main'], ['feng.templates.common', 'feng.templates.controls', 'feng.templates.debug', 'soy', 'soydata']);
goog.addDependency('../../../../project/templates/soyutils_usegoog.js', ['soy', 'soy.StringBuilder', 'soy.esc', 'soydata', 'soydata.SanitizedHtml', 'soydata.SanitizedHtmlAttribute', 'soydata.SanitizedJs', 'soydata.SanitizedJsStrChars', 'soydata.SanitizedUri', 'soydata.VERY_UNSAFE'], ['goog.asserts', 'goog.dom.DomHelper', 'goog.format', 'goog.i18n.BidiFormatter', 'goog.i18n.bidi', 'goog.soy', 'goog.soy.data.SanitizedContentKind', 'goog.string', 'goog.string.StringBuffer']);
goog.addDependency('../../../../project/utils/multilinearinterpolator.js', ['feng.utils.MultiLinearInterpolator'], ['goog.math']);
goog.addDependency('../../../../project/utils/random.js', ['feng.utils.Randomizer'], ['goog.math', 'goog.testing.PseudoRandom']);
goog.addDependency('../../../../project/utils/threeutils.js', ['feng.utils.ThreeUtils'], ['goog.math']);
goog.addDependency('../../../../project/utils/utils.js', ['feng.utils.Utils'], ['goog.Uri', 'goog.style']);
goog.addDependency('../../../../project/views/book/book.js', ['feng.views.book.Book'], ['feng.events', 'feng.models.achievements.Achievements', 'feng.templates.book', 'feng.views.book.pages.About', 'feng.views.book.pages.Glossary', 'feng.views.book.pages.Help', 'feng.views.book.pages.Tips', 'goog.dom', 'goog.events.EventHandler', 'goog.object']);
goog.addDependency('../../../../project/views/book/hanzi.js', ['feng.views.book.Hanzi'], ['feng.fx.EnergyFlow', 'feng.models.Preload']);
goog.addDependency('../../../../project/views/book/pages/about.js', ['feng.views.book.pages.About'], ['feng.views.book.pages.Page', 'goog.events.MouseWheelHandler', 'goog.fx.Dragger', 'goog.math.Rect']);
goog.addDependency('../../../../project/views/book/pages/glossary.js', ['feng.views.book.pages.Glossary'], ['feng.views.book.Hanzi', 'feng.views.book.pages.Page', 'goog.Timer', 'goog.events.MouseWheelHandler', 'goog.fx.Dragger', 'goog.math.Rect']);
goog.addDependency('../../../../project/views/book/pages/help.js', ['feng.views.book.pages.Help'], ['feng.views.book.pages.Page']);
goog.addDependency('../../../../project/views/book/pages/page.js', ['feng.views.book.pages.Page'], ['goog.dom', 'goog.events.EventHandler']);
goog.addDependency('../../../../project/views/book/pages/tips.js', ['feng.views.book.pages.Tips'], ['feng.events', 'feng.models.achievements.Achievements', 'feng.views.book.pages.Page', 'goog.events.MouseWheelHandler', 'goog.fx.Dragger', 'goog.math.Box', 'goog.math.Rect', 'goog.math.Size']);
goog.addDependency('../../../../project/views/debug/achievements.js', ['feng.views.debug.Achievements'], ['feng.events', 'feng.models.achievements.Achievements', 'feng.templates.debug', 'feng.views.debug.DebugView']);
goog.addDependency('../../../../project/views/debug/camera.js', ['feng.views.debug.Camera'], ['feng.templates.debug', 'feng.views.debug.DebugView']);
goog.addDependency('../../../../project/views/debug/debugger.js', ['feng.views.debug.Debugger'], ['feng.models.achievements.Achievements', 'feng.views.debug.Achievements', 'feng.views.debug.Camera', 'feng.views.debug.Manipulate', 'feng.views.debug.PathTrack', 'feng.views.debug.Pathfinding', 'goog.dom', 'goog.dom.query', 'goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/debug/debugview.js', ['feng.views.debug.DebugView'], ['goog.dom', 'goog.dom.query', 'goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget', 'soy']);
goog.addDependency('../../../../project/views/debug/manipulate.js', ['feng.views.debug.Manipulate'], ['feng.controllers.controls.InteractionResolver', 'feng.templates.debug', 'feng.views.debug.DebugView']);
goog.addDependency('../../../../project/views/debug/pathfinding.js', ['feng.views.debug.Pathfinding'], ['feng.controllers.view3d.PathfindingController', 'feng.templates.debug', 'feng.views.debug.DebugView']);
goog.addDependency('../../../../project/views/debug/pathtrack.js', ['feng.views.debug.PathTrack'], ['feng.templates.debug', 'feng.views.debug.DebugView']);
goog.addDependency('../../../../project/views/episodeselection.js', ['feng.views.EpisodeSelection'], ['feng.views.Logo', 'goog.dom', 'goog.dom.classes', 'goog.dom.query', 'goog.testing.events']);
goog.addDependency('../../../../project/views/episodeselectionoverlay.js', ['feng.views.EpisodeSelectionOverlay'], ['feng.views.Overlay', 'goog.dom', 'goog.math.Box', 'goog.style']);
goog.addDependency('../../../../project/views/logo.js', ['feng.views.Logo'], ['goog.dom', 'goog.dom.classes', 'goog.dom.query', 'goog.math.Size', 'goog.style']);
goog.addDependency('../../../../project/views/mainoptions.js', ['feng.views.MainOptions'], ['goog.dom', 'goog.dom.classes', 'goog.dom.query', 'goog.events']);
goog.addDependency('../../../../project/views/popups/popup.js', ['feng.views.popups.Popup'], ['goog.dom', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/popups/tutorial.js', ['feng.views.popups.Tutorial'], ['feng.templates.common', 'feng.views.popups.Popup']);
goog.addDependency('../../../../project/views/preloader.js', ['feng.views.Preloader'], ['feng.events', 'feng.models.Preload', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/sections/captions/advicecaption.js', ['feng.views.sections.captions.AdviceCaption'], ['feng.templates.captions', 'feng.views.View3DCaption', 'goog.soy']);
goog.addDependency('../../../../project/views/sections/captions/changecolorcaption.js', ['feng.views.sections.captions.ChangeColorCaption'], ['feng.templates.captions', 'feng.views.View3DCaption', 'goog.soy']);
goog.addDependency('../../../../project/views/sections/captions/changeobjectcaption.js', ['feng.views.sections.captions.ChangeObjectCaption'], ['feng.templates.captions', 'feng.views.View3DCaption', 'goog.soy']);
goog.addDependency('../../../../project/views/sections/captions/changepicturecaption.js', ['feng.views.sections.captions.ChangePictureCaption'], ['feng.templates.captions', 'feng.views.View3DCaption', 'feng.views.sections.controls.PictureSelector', 'goog.soy']);
goog.addDependency('../../../../project/views/sections/controls/book.js', ['feng.views.sections.controls.Book'], ['feng.events', 'feng.fx.AnimatedSprite', 'feng.views.book.Book', 'feng.views.sections.controls.Controls', 'goog.dom', 'goog.fx.Dragger']);
goog.addDependency('../../../../project/views/sections/controls/compass.js', ['feng.views.sections.controls.Compass'], ['feng.events', 'feng.fx.AnimatedSprite', 'feng.views.sections.controls.Controls', 'goog.dom', 'goog.fx.Dragger']);
goog.addDependency('../../../../project/views/sections/controls/controls.js', ['feng.views.sections.controls.Controls'], ['goog.events.EventHandler', 'goog.events.EventTarget', 'goog.style']);
goog.addDependency('../../../../project/views/sections/controls/manipulator.js', ['feng.views.sections.controls.Manipulator'], ['feng.events', 'feng.views.sections.controls.Controls', 'goog.dom', 'goog.dom.query']);
goog.addDependency('../../../../project/views/sections/controls/objectbox.js', ['feng.views.sections.controls.ObjectBox'], ['feng.views.sections.controls.Controls', 'goog.events']);
goog.addDependency('../../../../project/views/sections/controls/objectselector.js', ['feng.views.sections.controls.ObjectSelector'], ['feng.fx.AnimatedSprite', 'feng.views.sections.controls.Controls', 'goog.async.Delay', 'goog.async.Throttle', 'goog.events']);
goog.addDependency('../../../../project/views/sections/controls/pictureselector.js', ['feng.views.sections.controls.PictureSelector'], ['feng.views.sections.controls.Controls', 'goog.events', 'goog.fx.Dragger']);
goog.addDependency('../../../../project/views/sections/controls/progressbar.js', ['feng.views.sections.controls.ProgressBar'], ['feng.views.sections.controls.Controls']);
goog.addDependency('../../../../project/views/sections/controls/reminder.js', ['feng.views.sections.controls.Reminder'], ['feng.views.sections.controls.Controls', 'goog.Timer', 'goog.async.Delay']);
goog.addDependency('../../../../project/views/sections/controls/zoomslider.js', ['feng.views.sections.controls.ZoomSlider'], ['feng.events', 'feng.views.sections.controls.Controls', 'goog.dom', 'goog.events.MouseWheelHandler', 'goog.math']);
goog.addDependency('../../../../project/views/sections/episode.js', ['feng.views.sections.Episode'], ['feng.controllers.view3d.View3DController', 'feng.events', 'feng.views.View3D', 'feng.views.View3DHud', 'feng.views.sections.Section', 'goog.dom', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/sections/home.js', ['feng.views.sections.Home'], ['feng.controllers.SectionController', 'feng.events', 'feng.models.achievements.Achievements', 'feng.views.book.Book', 'feng.views.sections.Section', 'feng.views.sections.home.EpisodeScreen', 'feng.views.sections.home.IntroScreen', 'feng.views.sections.home.PreloadScreen', 'goog.dom', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/sections/home/episodescreen.js', ['feng.views.sections.home.EpisodeScreen'], ['feng.views.sections.home.Screen']);
goog.addDependency('../../../../project/views/sections/home/introscreen.js', ['feng.views.sections.home.IntroScreen'], ['feng.views.sections.home.Screen']);
goog.addDependency('../../../../project/views/sections/home/preloadscreen.js', ['feng.views.sections.home.PreloadScreen'], ['feng.views.Logo', 'feng.views.sections.home.Screen', 'goog.Timer']);
goog.addDependency('../../../../project/views/sections/home/screen.js', ['feng.views.sections.home.Screen'], ['goog.dom', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/sections/overlay.js', ['feng.views.Overlay'], ['goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/sections/section.js', ['feng.views.sections.Section'], ['feng.events', 'feng.views.Preloader', 'goog.dom', 'goog.dom.query', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/sections/studio.js', ['feng.views.sections.Studio'], ['feng.events', 'feng.views.sections.Episode', 'goog.dom']);
goog.addDependency('../../../../project/views/sections/townhouse.js', ['feng.views.sections.Townhouse'], ['feng.events', 'feng.views.sections.Episode', 'goog.dom']);
goog.addDependency('../../../../project/views/view3d.js', ['feng.views.View3D'], ['feng.controllers.view3d.CameraController', 'feng.controllers.view3d.ModeController', 'feng.controllers.view3d.RenderController', 'feng.fx.EnergyFlow', 'feng.fx.Renderer', 'feng.models.Accessories', 'feng.models.Preload', 'feng.models.View3D', 'feng.views.book.Book', 'feng.views.view3dobject.AccessoryObject', 'feng.views.view3dobject.GatewayObject', 'feng.views.view3dobject.HolderObject', 'feng.views.view3dobject.InteractiveObject', 'feng.views.view3dobject.TipObject', 'feng.views.view3dobject.View3DObject', 'feng.views.view3dobject.entities.Computer', 'feng.views.view3dobject.entities.PictureDisplay', 'feng.views.view3dobject.entities.PictureFrame', 'goog.dom', 'goog.dom.query', 'goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/view3dcaption.js', ['feng.views.View3DCaption'], ['feng.fx.WrapLayout', 'goog.events.EventHandler']);
goog.addDependency('../../../../project/views/view3dhud.js', ['feng.views.View3DHud'], ['feng.views.View3DCaption', 'feng.views.sections.captions.AdviceCaption', 'feng.views.sections.captions.ChangeColorCaption', 'feng.views.sections.captions.ChangeObjectCaption', 'feng.views.sections.captions.ChangePictureCaption', 'feng.views.sections.controls.Book', 'feng.views.sections.controls.Compass', 'feng.views.sections.controls.ObjectBox', 'feng.views.sections.controls.ObjectSelector', 'feng.views.sections.controls.ProgressBar', 'feng.views.sections.controls.Reminder', 'goog.events.EventHandler']);
goog.addDependency('../../../../project/views/view3dobject/accessoryobject.js', ['feng.views.view3dobject.AccessoryObject'], ['feng.models.Accessories', 'feng.views.view3dobject.InteractiveObject']);
goog.addDependency('../../../../project/views/view3dobject/entities/computer.js', ['feng.views.view3dobject.entities.Computer'], ['feng.fx.TextureAnimator', 'feng.models.Preload', 'feng.views.view3dobject.TipObject']);
goog.addDependency('../../../../project/views/view3dobject/entities/picturedisplay.js', ['feng.views.view3dobject.entities.PictureDisplay'], ['feng.models.Preload', 'feng.views.view3dobject.TipObject']);
goog.addDependency('../../../../project/views/view3dobject/entities/pictureframe.js', ['feng.views.view3dobject.entities.PictureFrame'], ['feng.views.view3dobject.InteractiveObject']);
goog.addDependency('../../../../project/views/view3dobject/gatewayobject.js', ['feng.views.view3dobject.GatewayObject'], ['feng.views.view3dobject.InteractiveObject']);
goog.addDependency('../../../../project/views/view3dobject/holderobject.js', ['feng.views.view3dobject.HolderObject'], ['feng.views.view3dobject.InteractiveObject']);
goog.addDependency('../../../../project/views/view3dobject/interactiveobject.js', ['feng.views.view3dobject.InteractiveObject'], ['feng.views.view3dobject.View3DObject', 'goog.events.EventHandler']);
goog.addDependency('../../../../project/views/view3dobject/tipobject.js', ['feng.views.view3dobject.TipObject'], ['feng.models.achievements.Achievements', 'feng.views.view3dobject.InteractiveObject']);
goog.addDependency('../../../../project/views/view3dobject/view3dobject.js', ['feng.views.view3dobject.View3DObject'], ['goog.events.EventTarget', 'goog.math.Box']);
