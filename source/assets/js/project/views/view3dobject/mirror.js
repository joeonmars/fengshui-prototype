goog.provide('feng.views.view3dobject.Mirror');

goog.require('feng.views.view3dobject.View3DObject');

/**
 * @constructor
 * A mirror
 */
feng.views.view3dobject.Mirror = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._cubeCamera = null;
};
goog.inherits(feng.views.view3dobject.Mirror, feng.views.view3dobject.View3DObject);


feng.views.view3dobject.Mirror.prototype.init = function() {

  goog.base(this, 'init');

  this._cubeCamera = new THREE.CubeCamera( 0.1, 1000, feng.renderSettings.renderSize * 2 );
  this._cubeCamera.position.copy( this.getCenter() );
  this.object3d.add( this._cubeCamera );

  var material = this.object3d.material;
  material.needsUpdate = true;
  material.envMap = this._cubeCamera.renderTarget;
};


feng.views.view3dobject.Mirror.prototype.updateEnvMap = function() {

  var renderer = this._view3d.renderer.getRenderer();
  var scene = this._view3d.scene;
  this._cubeCamera.updateCubeMap( renderer, scene );
};