goog.provide('feng.views.view3dobject.Mirror');

goog.require('feng.views.view3dobject.View3DObject');

/**
 * @constructor
 * A mirror
 */
feng.views.view3dobject.Mirror = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

};
goog.inherits(feng.views.view3dobject.Mirror, feng.views.view3dobject.View3DObject);


feng.views.view3dobject.Mirror.prototype.init = function() {

  goog.base(this, 'init');

  var material = this.object3d.material;
  material.needsUpdate = true;
  material.envMap = this._view3d.createCubeMap( this.getCenter() );
};