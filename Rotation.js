

function updateBlocksWorldMatrix() {

	//TODO Make the world matrix
	for(var n = 0; n < 26; n++)
	{
		if(operationBlocks.includes(n)){
			rotationAngle[nowControlAscept] = rotationAngle[nowControlAscept] + angleKeys[nowControlAscept];
			switch (rotationAxis) {
				case "X":
					// cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeScaleMatrix(worldScale),utils.MakeRotateXMatrix(rotationAngle[nowControlAscept]));
					cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeRotateXMatrix(rotationAngle[nowControlAscept]),cubeWorldMatrixPrevious[n]);
					break;
				case "Y":
					// cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeScaleMatrix(worldScale),utils.MakeRotateYMatrix(rotationAngle[nowControlAscept]));
					cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeRotateYMatrix(rotationAngle[nowControlAscept]),cubeWorldMatrixPrevious[n]);
					break;
				case "Z":
					// cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeScaleMatrix(worldScale),utils.MakeRotateZMatrix(rotationAngle));
					cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeRotateZMatrix(rotationAngle[nowControlAscept]),cubeWorldMatrixPrevious[n]);
					break;
			}

		}
	}

}



//R:i=2, M:i=1, L:i=0
function rotationX(i,cubeBlockStatusInuse) {
	var tempCube = JSON.parse(JSON.stringify(cubeBlockStatusInuse));

	tempCube[0][2][i] = cubeBlockStatusInuse[0][0][i];
	tempCube[1][2][i] = cubeBlockStatusInuse[0][1][i];
	tempCube[2][2][i] = cubeBlockStatusInuse[0][2][i];

	tempCube[0][1][i] = cubeBlockStatusInuse[1][0][i];
	tempCube[1][1][i] =	cubeBlockStatusInuse[1][1][i];
	tempCube[2][1][i] = cubeBlockStatusInuse[1][2][i];

	tempCube[0][0][i] = cubeBlockStatusInuse[2][0][i];
	tempCube[1][0][i] = cubeBlockStatusInuse[2][1][i];
	tempCube[2][0][i] = cubeBlockStatusInuse[2][2][i];

	return tempCube;
}


function rotationXOperationBlocks(i,cubeBlockStatusInUse) {

	return [cubeBlockStatusInUse[0][2][i], cubeBlockStatusInUse[1][2][i], cubeBlockStatusInUse[2][2][i],
		cubeBlockStatusInUse[0][1][i], cubeBlockStatusInUse[1][1][i], cubeBlockStatusInUse[2][1][i],
		cubeBlockStatusInUse[0][0][i], cubeBlockStatusInUse[1][0][i], cubeBlockStatusInUse[2][0][i]];
}


function rotationYOperationBlocks(i,cubeBlockStatusInuse) {

	return [cubeBlockStatusInuse[i][0][2], cubeBlockStatusInuse[i][1][2], cubeBlockStatusInuse[i][2][2],
		cubeBlockStatusInuse[i][0][1], cubeBlockStatusInuse[i][1][1],cubeBlockStatusInuse[i][2][1],
		cubeBlockStatusInuse[i][0][0],cubeBlockStatusInuse[i][1][0],cubeBlockStatusInuse[i][2][0]];
}



//U:i=0, E:i=1, D:i=2
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
	cubeBlockStatusInuse = tempCube;
	return cubeBlockStatusInuse;
}








//U:B=0, E:S=1, D:F=2
function rotationZ(i){
	var tempCube = cubeBlockStatus;
	tempCube[0][i][2] = cubeBlockStatus[0][i][0];
	tempCube[1][i][2] = cubeBlockStatus[0][i][1];
	tempCube[2][i][2] = cubeBlockStatus[0][i][2];

	tempCube[0][i][1] = cubeBlockStatus[1][i][0];
	tempCube[1][i][1] = cubeBlockStatus[1][i][1];
	tempCube[2][i][1] = cubeBlockStatus[1][i][2];

	tempCube[0][i][0] = cubeBlockStatus[2][i][0];
	tempCube[1][i][0] = cubeBlockStatus[2][i][1];
	tempCube[2][i][0] = cubeBlockStatus[2][i][2];

	cubeBlockStatus = tempCube
}
