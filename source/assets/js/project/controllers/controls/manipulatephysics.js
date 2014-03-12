goog.provide('feng.controllers.controls.ManipulatePhysics');



/**
 * @constructor
 */
feng.controllers.controls.ManipulatePhysics = function(){

	var gravity = new Box2D.Common.Math.b2Vec2(0, 0);
	var allowSleep = true;
  this._world = new Box2D.Dynamics.b2World( gravity, allowSleep );

  this._activeBoxBody = null;

  this._worldSize = new goog.math.Size(400, 400);
	this._worldOffset = this._worldSize.clone().scale(.5, .5);

	this._mouseJoint = null;

  this._debugCanvas = new goog.dom.createDom('canvas', {
  	width: this._worldSize.width,
  	height: this._worldSize.height
  });

  this._debugDraw = new Box2D.Dynamics.b2DebugDraw();
  this._debugDraw.SetSprite( this._debugCanvas.getContext("2d") );
  this._debugDraw.SetDrawScale(1);
  this._debugDraw.SetFillAlpha(0.5);
  this._debugDraw.SetLineThickness(1.0);
  this._debugDraw.SetFlags( Box2D.Dynamics.b2DebugDraw.e_shapeBit );
  this._world.SetDebugDraw( this._debugDraw );
};


feng.controllers.controls.ManipulatePhysics.prototype.start = function(boxes, activeBox){

	// create box bodies
	goog.array.forEach(boxes, function(box) {

		var boxHalfWidth = (box.right - box.left) * .5;
		var boxHalfHeight = (box.bottom - box.top) * .5;
		var boxX = box.left + boxHalfWidth + this._worldOffset.width;
		var boxY = box.top + boxHalfHeight + this._worldOffset.height;

	  var fixDef = new Box2D.Dynamics.b2FixtureDef();
	  fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
	  fixDef.shape.SetAsBox(boxHalfWidth, boxHalfHeight);

	  var bodyDef = new Box2D.Dynamics.b2BodyDef();
		bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
	  bodyDef.position.Set(boxX, boxY);
	  this._world.CreateBody( bodyDef ).CreateFixture( fixDef );
	}, this);

	goog.dom.appendChild(document.body, this._debugCanvas);
	goog.style.setStyle(this._debugCanvas, {
		'position': 'fixed',
		'top': 0,
		'outline': '1px solid red',
		'pointer-events': 'none'
	});

	//create boundaries
	var bodyDef = new Box2D.Dynamics.b2BodyDef;
	bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;

	var fixDef = new Box2D.Dynamics.b2FixtureDef;
	fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;

	fixDef.shape.SetAsBox(20, 2);
	bodyDef.position.Set(10, 400 / 30 + 1.8);
	this._world.CreateBody(bodyDef).CreateFixture(fixDef);

	bodyDef.position.Set(10, -1.8);
	this._world.CreateBody(bodyDef).CreateFixture(fixDef);

	fixDef.shape.SetAsBox(2, 14);
	bodyDef.position.Set(-1.8, 13);
	this._world.CreateBody(bodyDef).CreateFixture(fixDef);
	bodyDef.position.Set(21.8, 13);
	this._world.CreateBody(bodyDef).CreateFixture(fixDef);

	// create active box body
	var boxHalfWidth = (activeBox.right - activeBox.left) * .5;
	var boxHalfHeight = (activeBox.bottom - activeBox.top) * .5;
	var boxX = activeBox.left + boxHalfWidth + this._worldOffset.width;
	var boxY = activeBox.top + boxHalfHeight + this._worldOffset.height;

  var fixDef = new Box2D.Dynamics.b2FixtureDef();
  fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
  fixDef.shape.SetAsBox(boxHalfWidth, boxHalfHeight);

  var bodyDef = new Box2D.Dynamics.b2BodyDef();
	bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
  bodyDef.position.Set(boxX, boxY);

  this._activeBoxBody = this._world.CreateBody( bodyDef );
  this._activeBoxBody.CreateFixture( fixDef );

  // create mouse joint
  var mouseJointDef = new Box2D.Dynamics.Joints.b2MouseJointDef;
  mouseJointDef.bodyA = this._world.GetGroundBody();
  mouseJointDef.bodyB = this._activeBoxBody;
  mouseJointDef.target.Set(0, 0);
  mouseJointDef.maxForce = 10000.0 * this._activeBoxBody.GetMass();
  mouseJointDef.dampingRatio = 0;
	mouseJointDef.frequencyHz = 100;

  this._mouseJoint = this._world.CreateJoint( mouseJointDef );
  this._activeBoxBody.SetAwake(true);

	// run box2d
	goog.fx.anim.registerAnimation(this);
};


feng.controllers.controls.ManipulatePhysics.prototype.stop = function(){

	goog.fx.anim.unregisterAnimation(this);
};


feng.controllers.controls.ManipulatePhysics.prototype.updateActiveBox = function(x, y){

	this._mouseJoint.SetTarget( new Box2D.Common.Math.b2Vec2(x, y) );
};


feng.controllers.controls.ManipulatePhysics.prototype.onAnimationFrame = function(now){

	this._world.Step(1/60, 10, 10);
  this._world.DrawDebugData();
  this._world.ClearForces();
};