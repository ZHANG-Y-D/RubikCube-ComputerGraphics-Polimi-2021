

function updateBlocksWorldMatrix() {

	//TODO Make the world matrix
	for(var n = 0; n < 26; n++)
	{
		if(operationBlocks.includes(n)){
			rotationAngle[nowControlAscept] = rotationAngle[nowControlAscept] + angleKeys[nowControlAscept];
			//rotationAngle = rotationAngle + angleKeys;
			// utils.multiplyMatrices(utils.MakeTranslateMatrix(-2,0,0),utils.multiplyMatrices(dvecmat, utils.MakeScaleMatrix(0.3)));
			// cubeWorldMatrix[i] = utils.multiplyMatrices(updateWorld(20,20,20), utils.MakeScaleMatrix(worldScale));

			// cubeWorldMatrix[i] = utils.multiplyMatrices(utils.MakeRotateXMatrix(90),utils.MakeScaleMatrix(worldScale));
			switch (rotationAxis) {
				case "X":
					cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeScaleMatrix(worldScale),utils.MakeRotateXMatrix(rotationAngle[nowControlAscept]));
					//cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeScaleMatrix(worldScale),utils.MakeRotateXMatrix(rotationAngle1));
					break;
				case "Y":
					cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeScaleMatrix(worldScale),utils.MakeRotateYMatrix(rotationAngle[nowControlAscept]));
					break;
				case "Z":
					cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeScaleMatrix(worldScale),utils.MakeRotateZMatrix(rotationAngle));
					break;
			}

		}
	}

}


<<<<<<< HEAD
//R:i=2, M:i=1, L:i=0
function rotationX(i) {
	var tempCube = JSON.parse(JSON.stringify(this.cubeBlockStatus));
	tempCube[0][2][i] = this.cubeBlockStatus[0][0][i];
	tempCube[1][2][i] = this.cubeBlockStatus[0][1][i];
	tempCube[2][2][i] = this.cubeBlockStatus[0][2][i];

	tempCube[0][1][i] = this.cubeBlockStatus[1][0][i];
	tempCube[1][1][i] = this.cubeBlockStatus[1][1][i];
	tempCube[2][1][i] = this.cubeBlockStatus[1][2][i];

	tempCube[0][0][i] = this.cubeBlockStatus[2][0][i];
	tempCube[1][0][i] = this.cubeBlockStatus[2][1][i];
	tempCube[2][0][i] = this.cubeBlockStatus[2][2][i];
	this.cubeBlockStatus = tempCube;

	// var tempCube = JSON.parse(JSON.stringify(cubeBlockStatus));
	// cubeBlockStatus[0][2][i] = tempCube[0][0][i];
	// cubeBlockStatus[1][2][i] = tempCube[0][1][i];
	// cubeBlockStatus[2][2][i] = tempCube[0][2][i];
	//
	// cubeBlockStatus[0][1][i] = tempCube[1][0][i];
	// cubeBlockStatus[1][1][i] = tempCube[1][1][i];
	// cubeBlockStatus[2][1][i] = tempCube[1][2][i];
	//
	// cubeBlockStatus[0][0][i] = tempCube[2][0][i];
	// cubeBlockStatus[1][0][i] = tempCube[2][1][i];
	// cubeBlockStatus[2][0][i] = tempCube[2][2][i];
	
}
=======
function updateCubeBlockStatus(){

	if (rotationAngle===90){
		cubeBlockStatus
	}

}

//R:i=2, M:i=1, L:i=0
function rotationX(i,cubeBlockStatusInuse) {
	var tempCube = JSON.parse(JSON.stringify(cubeBlockStatusInuse));
>>>>>>> cc76e5622638dd4c0430a4c7636600e997f36b06

	tempCube[0][2][i] = cubeBlockStatusInuse[0][0][i];
	tempCube[1][2][i] = cubeBlockStatusInuse[0][1][i];
	tempCube[2][2][i] = cubeBlockStatusInuse[0][2][i];

	tempCube[0][1][i] = cubeBlockStatusInuse[1][0][i];
	tempCube[1][1][i] =	cubeBlockStatusInuse[1][1][i];
	tempCube[2][1][i] = cubeBlockStatusInuse[1][2][i];

	tempCube[0][0][i] = cubeBlockStatusInuse[2][0][i];
	tempCube[1][0][i] = cubeBlockStatusInuse[2][1][i];
	tempCube[2][0][i] = cubeBlockStatusInuse[2][2][i];
	cubeBlockStatusInuse = tempCube;

	return cubeBlockStatusInuse;
}
function rotationXOperationBlocks(i,cubeBlockStatusInuse) {
	//var tempCube = JSON.parse(JSON.stringify(cubeBlockStatusInuse));

	return [cubeBlockStatusInuse[0][2][i],cubeBlockStatusInuse[1][2][i],cubeBlockStatusInuse[2][2][i],cubeBlockStatusInuse[0][1][i],cubeBlockStatusInuse[1][1][i],cubeBlockStatusInuse[2][1][i],cubeBlockStatusInuse[0][0][i],cubeBlockStatusInuse[1][0][i]
	,cubeBlockStatusInuse[2][0][i]];
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
function rotationYOperationBlocks(i,cubeBlockStatusInuse) {
	//var tempCube = JSON.parse(JSON.stringify(cubeBlockStatusInuse));

	return [cubeBlockStatusInuse[i][0][2],cubeBlockStatusInuse[i][1][2],cubeBlockStatusInuse[i][2][2],cubeBlockStatusInuse[i][0][1],cubeBlockStatusInuse[i][1][1],cubeBlockStatusInuse[i][2][1],cubeBlockStatusInuse[i][0][0],cubeBlockStatusInuse[i][1][0]
		,cubeBlockStatusInuse[i][2][0]];
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
