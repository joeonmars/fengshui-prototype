// This file was autogenerated by source/assets/js/thirdparty/closure-library/closure/bin/build/depswriter.py.
// Please do not edit.
goog.addDependency('../../../../project/apps/demo.js', ['feng.apps.Demo'], ['feng.controllers.NavigationController', 'feng.controllers.SectionController', 'feng.controllers.view3d.PathfindingController', 'feng.controllers.view3d.View3DController', 'feng.templates.main', 'feng.views.debug.Debugger', 'goog.dom', 'goog.fx.anim', 'goog.style']);
goog.addDependency('../../../../project/apps/main.js', ['feng.apps.Main'], ['feng.templates.main', 'goog.dom', 'goog.fx']);
goog.addDependency('../../../../project/apps/pathedit.js', ['feng.apps.PathEdit'], ['feng.fx.PathTrack', 'feng.models.Preload', 'feng.templates.main', 'feng.views.Preloader', 'feng.views.View3D', 'feng.views.debug.Debugger', 'goog.dom', 'goog.fx.anim']);
goog.addDependency('../../../../project/controllers/controls/browsecontrols.js', ['feng.controllers.controls.BrowseControls'], ['feng.controllers.controls.Controls', 'feng.utils.MultiLinearInterpolator', 'feng.utils.Randomizer', 'feng.utils.ThreeUtils', 'feng.views.sections.controls.ObjectSelector', 'goog.events']);
goog.addDependency('../../../../project/controllers/controls/closeupcontrols.js', ['feng.controllers.controls.CloseUpControls'], ['feng.controllers.controls.Controls', 'feng.views.sections.controls.Manipulator', 'goog.events', 'goog.math']);
goog.addDependency('../../../../project/controllers/controls/controls.js', ['feng.controllers.controls.Controls'], ['goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/controllers/controls/manipulatecontrols.js', ['feng.controllers.controls.ManipulateControls'], ['feng.controllers.controls.Controls', 'feng.controllers.controls.ManipulatePhysics', 'feng.utils.ThreeUtils', 'feng.views.sections.controls.Manipulator', 'goog.fx.anim.Animated', 'goog.math']);
goog.addDependency('../../../../project/controllers/controls/manipulatephysics.js', ['feng.controllers.controls.ManipulatePhysics'], []);
goog.addDependency('../../../../project/controllers/controls/pathcontrols.js', ['feng.controllers.controls.PathControls'], ['feng.controllers.controls.Controls', 'feng.fx.PathTrack', 'feng.utils.ThreeUtils', 'goog.events', 'goog.math']);
goog.addDependency('../../../../project/controllers/controls/transitioncontrols.js', ['feng.controllers.controls.TransitionControls'], ['feng.controllers.controls.Controls', 'goog.events', 'goog.math']);
goog.addDependency('../../../../project/controllers/navigationcontroller.js', ['feng.controllers.NavigationController'], ['goog.History', 'goog.events', 'goog.events.EventTarget', 'goog.history.EventType', 'goog.history.Html5History', 'goog.string']);
goog.addDependency('../../../../project/controllers/sectioncontroller.js', ['feng.controllers.SectionController'], ['feng.views.sections.Home', 'feng.views.sections.Studio', 'goog.events', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/controllers/view3d/avatarcontroller.js', ['feng.controllers.view3d.AvatarController'], ['feng.models.avatar.Avatar', 'feng.views.Avatar', 'goog.events', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/controllers/view3d/cameracontroller.js', ['feng.controllers.view3d.CameraController'], ['feng.events', 'goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/controllers/view3d/modeController.js', ['feng.controllers.view3d.ModeController'], ['feng.controllers.controls.BrowseControls', 'feng.controllers.controls.CloseUpControls', 'feng.controllers.controls.ManipulateControls', 'feng.controllers.controls.PathControls', 'feng.controllers.controls.TransitionControls', 'feng.events', 'goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget', 'goog.object']);
goog.addDependency('../../../../project/controllers/view3d/pathfindingcontroller.js', ['feng.controllers.view3d.PathfindingController'], ['feng.views.debug.Pathfinding', 'goog.array', 'goog.events', 'goog.events.EventTarget', 'goog.math.Box']);
goog.addDependency('../../../../project/controllers/view3d/view3dcontroller.js', ['feng.controllers.view3d.View3DController'], ['feng.events', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/events/eventmediator.js', ['feng.events.EventMediator'], ['goog.Disposable', 'goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/events/eventtype.js', ['feng.events'], []);
goog.addDependency('../../../../project/feng.js', ['feng'], ['feng.apps.Demo', 'feng.apps.Main', 'feng.apps.PathEdit']);
goog.addDependency('../../../../project/fx/pathtrack.js', ['feng.fx.PathTrack'], ['feng.utils.Randomizer']);
goog.addDependency('../../../../project/fx/postprocessing.js', ['feng.fx.PostProcessing'], []);
goog.addDependency('../../../../project/fx/textureanimator.js', ['feng.fx.TextureAnimator'], ['goog.events.EventTarget']);
goog.addDependency('../../../../project/models/avatar/avatar.js', ['feng.models.avatar.Avatar'], ['goog.math', 'goog.object']);
goog.addDependency('../../../../project/models/object3d/FengshuiObject.js', ['feng.models.object3d.FengshuiObject'], ['feng.models.object3d.Object3D']);
goog.addDependency('../../../../project/models/object3d/bed.js', ['feng.models.object3d.Bed'], ['feng.models.object3d.Object3D']);
goog.addDependency('../../../../project/models/object3d/object3d.js', ['feng.models.object3d.Object3D'], []);
goog.addDependency('../../../../project/models/preload.js', ['feng.models.Preload'], ['feng.utils.Utils', 'goog.object']);
goog.addDependency('../../../../project/templates/controls.soy.js', ['feng.templates.controls'], ['soy', 'soydata']);
goog.addDependency('../../../../project/templates/debug.soy.js', ['feng.templates.debug'], ['soy', 'soydata']);
goog.addDependency('../../../../project/templates/main.soy.js', ['feng.templates.main'], ['feng.templates.controls', 'feng.templates.debug', 'soy', 'soydata']);
goog.addDependency('../../../../project/templates/soyutils_usegoog.js', ['soy', 'soy.StringBuilder', 'soy.esc', 'soydata', 'soydata.SanitizedHtml', 'soydata.SanitizedHtmlAttribute', 'soydata.SanitizedJs', 'soydata.SanitizedJsStrChars', 'soydata.SanitizedUri', 'soydata.VERY_UNSAFE'], ['goog.asserts', 'goog.dom.DomHelper', 'goog.format', 'goog.i18n.BidiFormatter', 'goog.i18n.bidi', 'goog.soy', 'goog.soy.data.SanitizedContentKind', 'goog.string', 'goog.string.StringBuffer']);
goog.addDependency('../../../../project/utils/multilinearinterpolator.js', ['feng.utils.MultiLinearInterpolator'], ['goog.math']);
goog.addDependency('../../../../project/utils/random.js', ['feng.utils.Randomizer'], ['goog.math', 'goog.testing.PseudoRandom']);
goog.addDependency('../../../../project/utils/threeutils.js', ['feng.utils.ThreeUtils'], ['goog.math']);
goog.addDependency('../../../../project/utils/utils.js', ['feng.utils.Utils'], []);
goog.addDependency('../../../../project/views/avatar.js', ['feng.views.Avatar'], ['feng.controllers.view3d.AvatarController', 'feng.models.Avatar', 'goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/debug/camera.js', ['feng.views.debug.Camera'], ['feng.templates.debug', 'feng.views.debug.DebugView']);
goog.addDependency('../../../../project/views/debug/debugger.js', ['feng.views.debug.Debugger'], ['feng.views.debug.Camera', 'feng.views.debug.Manipulate', 'feng.views.debug.PathTrack', 'feng.views.debug.Pathfinding', 'goog.dom', 'goog.dom.query', 'goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/debug/debugview.js', ['feng.views.debug.DebugView'], ['goog.dom', 'goog.dom.query', 'goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget', 'soy']);
goog.addDependency('../../../../project/views/debug/manipulate.js', ['feng.views.debug.Manipulate'], ['feng.templates.debug', 'feng.views.debug.DebugView']);
goog.addDependency('../../../../project/views/debug/pathfinding.js', ['feng.views.debug.Pathfinding'], ['feng.templates.debug', 'feng.views.debug.DebugView']);
goog.addDependency('../../../../project/views/debug/pathtrack.js', ['feng.views.debug.PathTrack'], ['feng.templates.debug', 'feng.views.debug.DebugView']);
goog.addDependency('../../../../project/views/preloader.js', ['feng.views.Preloader'], ['feng.events', 'feng.models.Preload', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/sections/controls/compass.js', ['feng.views.sections.controls.Compass'], ['feng.events', 'feng.views.sections.controls.Controls', 'goog.dom', 'goog.dom.query']);
goog.addDependency('../../../../project/views/sections/controls/controls.js', ['feng.views.sections.controls.Controls'], ['goog.events.EventHandler', 'goog.events.EventTarget', 'goog.style']);
goog.addDependency('../../../../project/views/sections/controls/manipulator.js', ['feng.views.sections.controls.Manipulator'], ['feng.events', 'feng.views.sections.controls.Controls', 'goog.dom', 'goog.dom.query']);
goog.addDependency('../../../../project/views/sections/controls/objectselector.js', ['feng.views.sections.controls.ObjectSelector'], ['feng.views.sections.controls.Controls', 'goog.async.Delay', 'goog.events']);
goog.addDependency('../../../../project/views/sections/episode.js', ['feng.views.sections.Episode'], ['feng.events', 'feng.events.EventMediator', 'feng.views.View3D', 'feng.views.sections.Section', 'feng.views.sections.controls.Compass', 'goog.dom', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/sections/home.js', ['feng.views.sections.Home'], ['feng.events', 'feng.views.sections.Section', 'goog.dom', 'goog.dom.query', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/sections/section.js', ['feng.views.sections.Section'], ['feng.controllers.NavigationController', 'feng.events', 'feng.views.Preloader', 'goog.dom', 'goog.dom.query', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/sections/studio.js', ['feng.views.sections.Studio'], ['feng.events', 'feng.views.sections.Episode', 'goog.dom']);
goog.addDependency('../../../../project/views/view3d.js', ['feng.views.View3D'], ['feng.controllers.view3d.CameraController', 'feng.controllers.view3d.ModeController', 'feng.controllers.view3d.View3DController', 'feng.fx.PostProcessing', 'feng.fx.TextureAnimator', 'feng.models.Preload', 'feng.views.view3dobject.GatewayObject', 'feng.views.view3dobject.HolderObject', 'feng.views.view3dobject.InteractiveObject', 'feng.views.view3dobject.View3DObject', 'goog.dom', 'goog.dom.query', 'goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../../project/views/view3dobject/accessoryobject.js', ['feng.views.view3dobject.AccessoryObject'], ['feng.views.view3dobject.InteractiveObject']);
goog.addDependency('../../../../project/views/view3dobject/gatewayobject.js', ['feng.views.view3dobject.GatewayObject'], ['feng.views.view3dobject.InteractiveObject']);
goog.addDependency('../../../../project/views/view3dobject/holderobject.js', ['feng.views.view3dobject.HolderObject'], ['feng.views.view3dobject.InteractiveObject']);
goog.addDependency('../../../../project/views/view3dobject/interactiveobject.js', ['feng.views.view3dobject.InteractiveObject'], ['feng.views.view3dobject.View3DObject']);
goog.addDependency('../../../../project/views/view3dobject/tipobject.js', ['feng.views.view3dobject.TipObject'], ['feng.views.view3dobject.InteractiveObject']);
goog.addDependency('../../../../project/views/view3dobject/view3dobject.js', ['feng.views.view3dobject.View3DObject'], ['goog.events.EventTarget', 'goog.math.Box']);
