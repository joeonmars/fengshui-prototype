goog.provide('feng.utils.ThreeUtils');

goog.require('goog.math');


/**
 * @constructor
 */
feng.utils.ThreeUtils.getObjectsBy2DPosition = function ( clientX, clientY, objects, camera, viewSize, recursive ) {

	// get camera's world position
	camera.updateMatrixWorld();
	var position = camera.position.clone();
	position.applyMatrix4( camera.matrixWorld );

	var vector = new THREE.Vector3( ( clientX / viewSize.width ) * 2 - 1, - ( clientY / viewSize.height ) * 2 + 1, 0.5 );
	vector.unproject( camera );

	var raycaster = feng.utils.ThreeUtils.raycaster;
	raycaster.set( position, vector.sub( position ).normalize() );

	var intersects = raycaster.intersectObjects( objects, recursive );

	return intersects;
};


feng.utils.ThreeUtils.getQuaternionByLookAt = function( vecFrom, vecTo, vecUp ) {

	var vecUp = vecUp || new THREE.Vector3(0, 1, 0);

	var mtx4 = new THREE.Matrix4();
	mtx4.lookAt( vecFrom, vecTo, vecUp );

	var elements = mtx4.elements;

	var m00 = elements[0], m10 = elements[1], m20 = elements[2],
	m01 = elements[4], m11 = elements[5], m21 = elements[6],
	m02 = elements[8], m12 = elements[9], m22 = elements[10];

	var t = m00 + m11 + m22,s,x,y,z,w;

	if (t > 0) { 
	  s =  Math.sqrt(t+1)*2; 
	  w = 0.25 * s;            
	  x = (m21 - m12) / s;
	  y = (m02 - m20) / s;
	  z = (m10 - m01) / s;
	} else if ((m00 > m11) && (m00 > m22)) {
	  s =  Math.sqrt(1.0 + m00 - m11 - m22)*2;
	  x = s * 0.25;
	  y = (m10 + m01) / s;
	  z = (m02 + m20) / s;
	  w = (m21 - m12) / s;
	} else if (m11 > m22) {
	  s =  Math.sqrt(1.0 + m11 - m00 - m22) *2; 
	  y = s * 0.25;
	  x = (m10 + m01) / s;
	  z = (m21 + m12) / s;
	  w = (m02 - m20) / s;
	} else {
	  s =  Math.sqrt(1.0 + m22 - m00 - m11) *2; 
	  z = s * 0.25;
	  x = (m02 + m20) / s;
	  y = (m21 + m12) / s;
	  w = (m10 - m01) / s;
	}

	var rotation = new THREE.Quaternion(x,y,z,w);
	rotation.normalize();
	return rotation;
};


feng.utils.ThreeUtils.get2DCoordinates = function( position, camera, renderElementSize ) {

	// this will give us position relative to the world
	// project will translate position to 2d
	var p = position.clone().project( camera );

	// translate our vector so that percX=0 represents
	// the left edge, percX=1 is the right edge,
	// percY=0 is the top edge, and percY=1 is the bottom edge.
	var percX = (p.x + 1) / 2;
	var percY = (-p.y + 1) / 2;

	// scale these values to our viewport size
	var x = percX * renderElementSize.width;
	var y = percY * renderElementSize.height;

	return {x: x, y: y};
};


feng.utils.ThreeUtils.getShortestRotation = function( from, to ) {
	// use shortest rotation, based on the TweenMax AS3 shortrotation...
	var calculate = function(fromVal, toVal) {
		var cap = Math.PI * 2;
		var diff = (toVal - fromVal) % cap;

		if (diff != diff % (cap / 2)) {
			diff = (diff < 0) ? diff + cap : diff - cap;
		}

		var shortest = fromVal + diff;

		return shortest;
	}

	if(from instanceof THREE.Euler && to instanceof THREE.Euler) {

		to.x = calculate(from.x, to.x);
		to.y = calculate(from.y, to.y);
		to.z = calculate(from.z, to.z);
		
	}else {

		to = calculate(from, to);
	}

	return to;
};


feng.utils.ThreeUtils.getWorldPosition = function( object, position ) {

	// the renderer calls updateMatrixWorld() in each render loop.
	// however here we force to do it in case the render loop hasn't began
	var parentObj = object.parent;

	while(parentObj) {

		parentObj.updateMatrixWorld();
		parentObj = parentObj.parent;
	}

	var vector = position || new THREE.Vector3();
	vector.setFromMatrixPosition( object.matrixWorld );

	return vector;
};


feng.utils.ThreeUtils.lerpBetween = function( a, b, x ) {

	var newObj = a.clone();
	newObj.x = goog.math.lerp(a.x, b.x, x);
	newObj.y = goog.math.lerp(a.y, b.y, x);
	newObj.z = goog.math.lerp(a.z, b.z, x);

	return newObj;
};


feng.utils.ThreeUtils.getRectangleFromBox3 = function( box3, camera, rendererSize, opt_box ) {

	var vertices3D = [];
	var vertices2D = [];

	for(var i = 0; i < 8; i ++) {

	  vertices3D.push( new THREE.Vector3() );

	  vertices2D.push({
	  	x: 0,
	  	y: 0
	  });
	}

	return( function( box3, camera, rendererSize, opt_box ) {

		var box2 = opt_box || new goog.math.Box(0 ,0 ,0, 0);

		// extract all vertices of box3
		var max = box3.max;
		var min = box3.min;

		vertices3D[ 0 ].set( max.x, max.y, max.z );
		vertices3D[ 1 ].set( min.x, max.y, max.z );
		vertices3D[ 2 ].set( min.x, min.y, max.z );
		vertices3D[ 3 ].set( max.x, min.y, max.z );
		vertices3D[ 4 ].set( max.x, max.y, min.z );
		vertices3D[ 5 ].set( min.x, max.y, min.z );
		vertices3D[ 6 ].set( min.x, min.y, min.z );
		vertices3D[ 7 ].set( max.x, min.y, min.z );

		// convert vertices to 2d coordinates
		goog.array.forEach(vertices2D, function(vertex2D, index) {

			var vertex3D = vertices3D[ index ];
			var coord = feng.utils.ThreeUtils.get2DCoordinates( vertex3D, camera, rendererSize );
			vertex2D.x = coord.x;
			vertex2D.y = coord.y;
		});

		box2.top = Math.min(
			vertices2D[0].y,
			vertices2D[1].y,
			vertices2D[2].y,
			vertices2D[3].y,
			vertices2D[4].y,
			vertices2D[5].y,
			vertices2D[6].y,
			vertices2D[7].y);

		box2.bottom = Math.max(
			vertices2D[0].y,
			vertices2D[1].y,
			vertices2D[2].y,
			vertices2D[3].y,
			vertices2D[4].y,
			vertices2D[5].y,
			vertices2D[6].y,
			vertices2D[7].y);

		box2.left = Math.min(
			vertices2D[0].x,
			vertices2D[1].x,
			vertices2D[2].x,
			vertices2D[3].x,
			vertices2D[4].x,
			vertices2D[5].x,
			vertices2D[6].x,
			vertices2D[7].x);

		box2.right = Math.max(
			vertices2D[0].x,
			vertices2D[1].x,
			vertices2D[2].x,
			vertices2D[3].x,
			vertices2D[4].x,
			vertices2D[5].x,
			vertices2D[6].x,
			vertices2D[7].x);

		return box2;
		
	})( box3, camera, rendererSize, opt_box );
};


feng.utils.ThreeUtils.projector = new THREE.Projector();
feng.utils.ThreeUtils.raycaster = new THREE.Raycaster();