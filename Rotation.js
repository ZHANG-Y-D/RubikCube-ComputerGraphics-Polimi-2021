

function updateBlocksWorldMatrixForAnimation() {

	//Make the world matrix
    if (isAnimating){
        for(var n = 0; n < 26; n++) {
            if(operationBlocks.includes(n)){
                rotationAngle = rotationAngle + angleKeys;
                if (rotationAngle>=130){
                    rotationAngle = 130;
                }else if(rotationAngle<=-130){
                    rotationAngle = -130;
                }

                // Without Quaternion
                switch (rotationAxis) {
                    case "X":
                        cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeRotateXMatrix(rotationAngle),cubeWorldMatrixPrevious[n]);
                        break;
                    case "Y":
                        cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeRotateYMatrix(rotationAngle),cubeWorldMatrixPrevious[n]);
						break;
                    case "Z":
                        cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeRotateZMatrix(rotationAngle),cubeWorldMatrixPrevious[n]);
						break;
                }

                // //Quaternion
				// switch (rotationAxis) {
				// 	case "X":
				// 		cubeWorldMatrix[n] = utils.multiplyMatrices(updateWorldWithQuaternion(-rotationAngle,0,0),
				// 			cubeWorldMatrixPrevious[n]);
				// 		break;
				// 	case "Y":
				// 		cubeWorldMatrix[n] = utils.multiplyMatrices(updateWorldWithQuaternion(0,rotationAngle,0),
				// 			cubeWorldMatrixPrevious[n]);
				// 		break;
				// 	case "Z":
				// 		cubeWorldMatrix[n] = utils.multiplyMatrices(updateWorldWithQuaternion(0,0,rotationAngle),
				// 			cubeWorldMatrixPrevious[n]);
				// 		break;
				// }

            }
        }
    }
}

function updateBlocksWorldMatrixForCommitOperation(rotationAngle) {
    // console.log(rotationAngle)
    for (var n = 0; n < 26; n++) {
        if (operationBlocks.includes(n)) {
        	// Without Quaternion
            switch (rotationAxis) {
                case "X":
                    cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeRotateXMatrix(rotationAngle),cubeWorldMatrixPrevious[n]);
                    break;
                case "Y":
                    cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeRotateYMatrix(rotationAngle),cubeWorldMatrixPrevious[n]);
                    break;
                case "Z":
                    cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeRotateZMatrix(rotationAngle),cubeWorldMatrixPrevious[n]);
                    break;
            }

			// //Quaternion
			// switch (rotationAxis) {
			// 	case "X":
			// 		cubeWorldMatrix[n] = utils.multiplyMatrices(updateWorldWithQuaternion(-rotationAngle,0,0),
			// 													cubeWorldMatrixPrevious[n]);
			// 		break;
			// 	case "Y":
			// 		cubeWorldMatrix[n] = utils.multiplyMatrices(updateWorldWithQuaternion(0,rotationAngle,0),
			// 													cubeWorldMatrixPrevious[n]);
			// 		break;
			// 	case "Z":
			// 		cubeWorldMatrix[n] = utils.multiplyMatrices(updateWorldWithQuaternion(0,0,rotationAngle),
			// 													cubeWorldMatrixPrevious[n]);
			// 		break;
			// }
        }
    }
}

function updateBlocksWorldMatrixForRandomOperation(rotationAngle,operationBlocksInuse) {
	//console.log(rotationAngle)
	for (var n = 0; n < 26; n++) {
		if (operationBlocksInuse.includes(n)) {
			switch (rotationAxis) {
				case "X":
					cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeRotateXMatrix(rotationAngle),cubeWorldMatrix[n]);
					break;
				case "Y":
					cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeRotateYMatrix(rotationAngle),cubeWorldMatrix[n]);
					break;
				case "Z":
					cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeRotateZMatrix(rotationAngle),cubeWorldMatrix[n]);
					break;
			}
		}
	}
}


//Clockwise from X Axis
//R:i=2, M:i=1, L:i=0
function rotationX(i,cubeBlockStatusInuse) {
	var tempCube = JSON.parse(JSON.stringify(cubeBlockStatusInuse));

	tempCube[2][0][i] = cubeBlockStatusInuse[0][0][i];
	tempCube[1][0][i] = cubeBlockStatusInuse[0][1][i];
	tempCube[0][0][i] = cubeBlockStatusInuse[0][2][i];

	tempCube[2][1][i] = cubeBlockStatusInuse[1][0][i];
	tempCube[1][1][i] =	cubeBlockStatusInuse[1][1][i];
	tempCube[0][1][i] = cubeBlockStatusInuse[1][2][i];

	tempCube[2][2][i] = cubeBlockStatusInuse[2][0][i];
	tempCube[1][2][i] = cubeBlockStatusInuse[2][1][i];
	tempCube[0][2][i] = cubeBlockStatusInuse[2][2][i];

	return tempCube;
}



//U:i=0, E:i=1, D:i=2
//Clockwise from Axis Y
function rotationY(i,cubeBlockStatusInuse){
	var tempCube = JSON.parse(JSON.stringify(cubeBlockStatusInuse));
	tempCube[i][0][2] = cubeBlockStatusInuse[i][0][0];
	tempCube[i][1][2] = cubeBlockStatusInuse[i][0][1];
	tempCube[i][2][2] = cubeBlockStatusInuse[i][0][2];

	tempCube[i][0][1] = cubeBlockStatusInuse[i][1][0];
	tempCube[i][1][1] = cubeBlockStatusInuse[i][1][1];
	tempCube[i][2][1] = cubeBlockStatusInuse[i][1][2];

	tempCube[i][0][0] = cubeBlockStatusInuse[i][2][0];
	tempCube[i][1][0] = cubeBlockStatusInuse[i][2][1];
	tempCube[i][2][0] = cubeBlockStatusInuse[i][2][2];
	return tempCube;
}

//Clockwise
//U:B=0, E:S=1, D:F=2
function rotationZ(i,cubeBlockStatusInuse){
	var tempCube = JSON.parse(JSON.stringify(cubeBlockStatusInuse));
	tempCube[0][i][2] = cubeBlockStatusInuse[0][i][0];
	tempCube[1][i][2] = cubeBlockStatusInuse[0][i][1];
	tempCube[2][i][2] = cubeBlockStatusInuse[0][i][2];

	tempCube[0][i][1] = cubeBlockStatusInuse[1][i][0];
	tempCube[1][i][1] = cubeBlockStatusInuse[1][i][1];
	tempCube[2][i][1] = cubeBlockStatusInuse[1][i][2];

	tempCube[0][i][0] = cubeBlockStatusInuse[2][i][0];
	tempCube[1][i][0] = cubeBlockStatusInuse[2][i][1];
	tempCube[2][i][0] = cubeBlockStatusInuse[2][i][2];
	return tempCube;
}

function rotationXOperationBlocks(i,cubeBlockStatusInUse) {

	return [cubeBlockStatusInUse[0][2][i], cubeBlockStatusInUse[1][2][i], cubeBlockStatusInUse[2][2][i],
		cubeBlockStatusInUse[0][1][i], cubeBlockStatusInUse[1][1][i], cubeBlockStatusInUse[2][1][i],
		cubeBlockStatusInUse[0][0][i], cubeBlockStatusInUse[1][0][i], cubeBlockStatusInUse[2][0][i]];
}


function rotationYOperationBlocks(i,cubeBlockStatusInuse) {

	return [cubeBlockStatusInuse[i][0][2], cubeBlockStatusInuse[i][1][2], cubeBlockStatusInuse[i][2][2],
		cubeBlockStatusInuse[i][0][1], cubeBlockStatusInuse[i][1][1], cubeBlockStatusInuse[i][2][1],
		cubeBlockStatusInuse[i][0][0], cubeBlockStatusInuse[i][1][0], cubeBlockStatusInuse[i][2][0]];
}


function rotationZOperationBlocks (i,cubeBlockStatusInuse){
	return [cubeBlockStatusInuse[0][i][2], cubeBlockStatusInuse[1][i][2], cubeBlockStatusInuse[2][i][2],
	cubeBlockStatusInuse[0][i][1], cubeBlockStatusInuse[1][i][1], cubeBlockStatusInuse[2][i][1],
	cubeBlockStatusInuse[0][i][0], cubeBlockStatusInuse[1][i][0], cubeBlockStatusInuse[2][i][0]];
}


var quaternion = new Quaternion();

function updateWorldWithQuaternion(rvx, rvy, rvz) {

	var x = utils.degToRad(rvx);
	var y = utils.degToRad(rvy);
	var z = utils.degToRad(rvz);

	var x_delta = new Quaternion(Math.cos(x / 2), Math.sin(x / 2), 0, 0);
	var y_delta = new Quaternion(Math.cos(y / 2), 0, Math.sin(y / 2), 0);
	var z_delta = new Quaternion(Math.cos(z / 2), 0, 0, Math.sin(z / 2));


	quaternion = x_delta.mul(y_delta).mul(z_delta).mul(quaternion);

	var out = quaternion.toMatrix4();

	return out;

}
