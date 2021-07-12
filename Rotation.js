// these global variables are used to contain the current angles of the world
// HERE YOU WILL HAVE TO ADD ONE OR MORE GLOBAL VARIABLES TO CONTAIN THE ORIENTATION
// OF THE OBJECT

// this function returns the world matrix with the updated rotations.
// parameters rvx, rvy and rvz contains a value in the degree that how much the object rotates in the given direction.




// Pitch = 0;
// Yaw = 0;
// Roll = 0;
//
// function updateWorld(rvx, rvy, rvz) {
//
// 	// compute the rotation matrix
//
// 	Pitch = Pitch + rvx;
// 	Yaw = Yaw + rvy;
// 	Roll = Roll + rvz;
// 	var out = utils.MakeWorld(0,0,0, Yaw, Pitch, Roll, 1);
//
//
// 	return out;
// }




var quaternion = new Quaternion();

function updateWorld(rvx, rvy, rvz) {

	var x = 2*utils.degToRad(rvx);
	var y = 2*utils.degToRad(rvy);
	var z = 2*utils.degToRad(rvz);

	var x_delta = new Quaternion(Math.cos(x / 2), Math.sin(x / 2), 0, 0);
	var y_delta = new Quaternion(Math.cos(y / 2), 0, Math.sin(y / 2), 0);
	var z_delta = new Quaternion(Math.cos(z / 2), 0, 0, Math.sin(z / 2));


	quaternion = x_delta.mul(y_delta).mul(z_delta).mul(quaternion);


	var out = quaternion.toMatrix4();

	return out;

}





