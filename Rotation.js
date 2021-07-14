

function updateBlocksWorld() {

	//TODO Make the world matrix
	for(var i = 0; i < 26; i++)
	{
		if(i in operationBlocks){

			// utils.multiplyMatrices(utils.MakeTranslateMatrix(-2,0,0),utils.multiplyMatrices(dvecmat, utils.MakeScaleMatrix(0.3)));
			// cubeWorldMatrix[i] = utils.multiplyMatrices(updateWorld(20,20,20), utils.MakeScaleMatrix(worldScale));

			// cubeWorldMatrix[i] = utils.multiplyMatrices(utils.MakeRotateXMatrix(90),utils.MakeScaleMatrix(worldScale));
			cubeWorldMatrix[i] = utils.multiplyMatrices(utils.MakeScaleMatrix(worldScale),utils.MakeRotateYMatrix(rotationAngle));
		}
	}

}


function updateCubeBlockStatus(){

	if (rotationAngle===90){

	}

}

//R:i=2, M:i=1, L:i=0
function rotationX(i){
	var tempCube = cubeBlockStatus;
	tempCube[0][2][i] = cubeBlockStatus[0][0][i];
	tempCube[1][2][i] = cubeBlockStatus[0][1][i];
	tempCube[2][2][i] = cubeBlockStatus[0][2][i];

	tempCube[0][1][i] = cubeBlockStatus[1][0][i];
	tempCube[1][1][i] = cubeBlockStatus[1][1][i];
	tempCube[2][1][i] = cubeBlockStatus[1][2][i];

	tempCube[0][0][i] = cubeBlockStatus[2][0][i];
	tempCube[1][0][i] = cubeBlockStatus[2][1][i];
	tempCube[2][0][i] = cubeBlockStatus[2][2][i];

	cubeBlockStatus = tempCube
}

//U:i=0, E:i=1, D:i=2
function rotationY(i){
	var tempCube = cubeBlockStatus;
	tempCube[i][0][2] = cubeBlockStatus[i][0][0];
	tempCube[i][1][2] = cubeBlockStatus[i][0][1];
	tempCube[i][2][2] = cubeBlockStatus[i][0][2];

	tempCube[i][0][1] = cubeBlockStatus[i][1][0];
	tempCube[i][1][1] = cubeBlockStatus[i][1][1];
	tempCube[i][2][1] = cubeBlockStatus[i][1][2];

	tempCube[i][0][0] = cubeBlockStatus[i][2][0];
	tempCube[i][1][0] = cubeBlockStatus[i][2][1];
	tempCube[i][2][0] = cubeBlockStatus[i][2][2];

	cubeBlockStatus = tempCube
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