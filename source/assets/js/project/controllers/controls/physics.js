goog.provide('feng.controllers.controls.Physics');



/**
 * @constructor
 */
feng.controllers.controls.Physics = function( worldWidth, worldHeight ){

	this.isRunning = false;

	/* e.g.
		100 units in view3d = 
		200 centimeters in realworld = 
		2 miters in box2d
	*/
	this._unitScale = 0.02;

  this._worldSize = new goog.math.Size(worldWidth, worldHeight).scale( this._unitScale );
	this._worldOffset = this._worldSize.clone().scale(.5, .5); // half of the world size

	var gravity = new Box2D.Common.Math.b2Vec2(0, 0);
	var allowSleep = true;
  this._world = new Box2D.Dynamics.b2World( gravity, allowSleep );

	this.debugCanvas = new goog.dom.createDom('canvas', {
		'width': this._worldSize.width * (1/this._unitScale),
		'height': this._worldSize.height * (1/this._unitScale)
	});

  this._activeBoxBody = null;
  this._mouseJoint = null;

  this._debugDraw = new Box2D.Dynamics.b2DebugDraw();
  this._debugDraw.SetSprite( this.debugCanvas.getContext("2d") );
  this._debugDraw.SetDrawScale( 1/this._unitScale );
  this._debugDraw.SetFillAlpha(0.5);
  this._debugDraw.SetLineThickness(1.0);
  this._debugDraw.SetFlags( Box2D.Dynamics.b2DebugDraw.e_shapeBit );
  this._world.SetDebugDraw( this._debugDraw );
};


feng.controllers.controls.Physics.prototype.createEnvironment = function(boxes, activeBox){

	// create box bodies
	goog.array.forEach(boxes, function(box) {

		box = box.clone().scale( this._unitScale );

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

	// create boundaries
	var bodyDef = new Box2D.Dynamics.b2BodyDef;
	bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;

	var fixDef = new Box2D.Dynamics.b2FixtureDef;
	fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;

	// create up and down walls
	fixDef.shape.SetAsBox(this._worldSize.width / 2, 2);

	bodyDef.position.Set(this._worldOffset.width, -2);
	this._world.CreateBody(bodyDef).CreateFixture(fixDef);

	bodyDef.position.Set(this._worldOffset.width, this._worldSize.height + 2);
	this._world.CreateBody(bodyDef).CreateFixture(fixDef);

	// create left and right walls
	fixDef.shape.SetAsBox(2, this._worldSize.height / 2);

	bodyDef.position.Set(-2, this._worldOffset.height);
	this._world.CreateBody(bodyDef).CreateFixture(fixDef);

	bodyDef.position.Set(this._worldSize.width + 2, this._worldOffset.height);
	this._world.CreateBody(bodyDef).CreateFixture(fixDef);

	// create active box body
	var activeBoxRotation = activeBox.rotation;
	activeBox = activeBox.clone().scale( this._unitScale );

	var boxHalfWidth = (activeBox.right - activeBox.left) * .5;
	var boxHalfHeight = (activeBox.bottom - activeBox.top) * .5;
	var boxX = activeBox.left + boxHalfWidth + this._worldOffset.width;
	var boxY = activeBox.top + boxHalfHeight + this._worldOffset.height;

  var fixDef = new Box2D.Dynamics.b2FixtureDef();
  fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
  fixDef.shape.SetAsBox(boxHalfWidth, boxHalfHeight);

  var bodyDef = new Box2D.Dynamics.b2BodyDef();
	bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
	bodyDef.angle = activeBoxRotation;
  bodyDef.position.Set(boxX, boxY);

  this._activeBoxBody = this._world.CreateBody( bodyDef );
  this._activeBoxBody.SetAngularVelocity( 0 );
  this._activeBoxBody.CreateFixture( fixDef );
};


feng.controllers.controls.Physics.prototype.startMove = function(boxes, activeBox){

	if(this.isRunning) return;

	this.createEnvironment(boxes, activeBox);

  // create mouse joint
  var mouseJointDef = new Box2D.Dynamics.Joints.b2MouseJointDef;
  mouseJointDef.bodyA = this._world.GetGroundBody();
  mouseJointDef.bodyB = this._activeBoxBody;
  mouseJointDef.target.Set(this._activeBoxBody.GetPosition().x, this._activeBoxBody.GetPosition().y);
  mouseJointDef.maxForce = 300.0 * this._activeBoxBody.GetMass();
  mouseJointDef.dampingRatio = 1;

  this._mouseJoint = this._world.CreateJoint( mouseJointDef );
  this._activeBoxBody.SetAwake(true);

	// run box2d
	this.isRunning = true;

	goog.fx.anim.registerAnimation(this);
};


feng.controllers.controls.Physics.prototype.startRotate = function(boxes, activeBox){

	if(this.isRunning) return;

	this.createEnvironment(boxes, activeBox);

	// run box2d
	this.isRunning = true;

	goog.fx.anim.registerAnimation(this);
};


feng.controllers.controls.Physics.prototype.stop = function(){

	this.updateWorld();

	for(b = this._world.GetBodyList(); b; b = b.GetNext()) { 
		this._world.DestroyBody( b );
	}

	for(j = this._world.GetJointList(); j; j = j.GetNext()) { 
		this._world.DestroyJoint( j );
	}

	this.isRunning = false;

	goog.fx.anim.unregisterAnimation(this);
};


feng.controllers.controls.Physics.prototype.getActiveBox3DPosition = function(){

	var bodyPosition = this._activeBoxBody.GetPosition();
	var threePosition = {
		x: (bodyPosition.x - this._worldOffset.width) * (1/this._unitScale),
		z: (bodyPosition.y - this._worldOffset.height) * (1/this._unitScale)
	};

	return threePosition;
};


feng.controllers.controls.Physics.prototype.getActiveBoxRotation = function(){

	return this._activeBoxBody.GetAngle();
};


feng.controllers.controls.Physics.prototype.updateWorld = function(){

	this._world.Step(1/60, 10, 10);
  this._world.ClearForces();
};


feng.controllers.controls.Physics.prototype.updateActiveBox = function(x, y, rad){

	if(goog.isNumber(x) && goog.isNumber(y)) {
		var mouseX = x * this._unitScale + this._worldOffset.width;
		var mouseY = y * this._unitScale + this._worldOffset.height;
		this._mouseJoint.SetTarget( new Box2D.Common.Math.b2Vec2(mouseX, mouseY) );
	}

	if(goog.isNumber(rad)) {
		this._activeBoxBody.SetAngle( rad );
	}
};


feng.controllers.controls.Physics.prototype.onAnimationFrame = function(now){

	this.updateWorld();

	this._world.DrawDebugData();
};