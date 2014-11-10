goog.provide('feng.views.view3dobject.entities.DiningMirror');

goog.require('feng.views.view3dobject.TipObject');

/**
 * @constructor
 * The mirror which reflects fruits on the dining table
 */
feng.views.view3dobject.entities.DiningMirror = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._cubeCamera = null;
};
goog.inherits(feng.views.view3dobject.entities.DiningMirror, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.DiningMirror.prototype.init = function() {

  this._cubeCamera = new THREE.CubeCamera( 0.1, 1000, feng.renderSettings.renderSize * 2 );
  this._cubeCamera.position.copy( this.getCenter() );
  this.object3d.add( this._cubeCamera );

  var material = this.object3d.material;
  material.needsUpdate = true;
  material.envMap = this._cubeCamera.renderTarget;

  this.updateEnvMap();
};


feng.views.view3dobject.entities.DiningMirror.prototype.updateEnvMap = function() {

  var renderer = this._view3d.renderer.getRenderer();
  var scene = this._view3d.scene;
  this._cubeCamera.updateCubeMap( renderer, scene );
};