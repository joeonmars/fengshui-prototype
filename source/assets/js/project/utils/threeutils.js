goog.provide('feng.utils.ThreeUtils');

goog.require('goog.math');


/**
 * @constructor
 */
feng.utils.ThreeUtils.getObjectsBy2DPosition = function ( clientX, clientY, objects, camera, domElement ) {

	var viewSize = goog.style.getSize(domElement);

	// get camera's world position
	camera.updateMatrixWorld();
	var position = camera.position.clone();
	position.applyMatrix4( camera.matrixWorld );

	var vector = new THREE.Vector3( ( clientX / viewSize.width ) * 2 - 1, - ( clientY / viewSize.height ) * 2 + 1, 0.5 );
	
	var projector = feng.utils.ThreeUtils.projector;
	projector.unprojectVector( vector, camera );

	var raycaster = new THREE.Raycaster( position, vector.sub( position ).normalize() );

	var intersects = raycaster.intersectObjects( objects );

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
	var p = position.clone();

	// projectVector will translate position to 2d
	var projector = feng.utils.ThreeUtils.projector;
	var v = projector.projectVector(p, camera);

	// translate our vector so that percX=0 represents
	// the left edge, percX=1 is the right edge,
	// percY=0 is the top edge, and percY=1 is the bottom edge.
	var percX = (v.x + 1) / 2;
	var percY = (-v.y + 1) / 2;

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


feng.utils.ThreeUtils.lerpBetween = function( a, b, x ) {

	var newObj = a.clone();
	newObj.x = goog.math.lerp(a.x, b.x, x);
	newObj.y = goog.math.lerp(a.y, b.y, x);
	newObj.z = goog.math.lerp(a.z, b.z, x);

	return newObj;
};


feng.utils.ThreeUtils.projector = new THREE.Projector();