

function updateBlocksWorld() {


	//mesh[i] = loadMeshInfo(cubeObjMesh[i]);
	//TODO Make the world matrix
	if(i in [0,3,6,9,13,16,19,22,23]){

		// utils.multiplyMatrices(utils.MakeTranslateMatrix(-2,0,0),utils.multiplyMatrices(dvecmat, utils.MakeScaleMatrix(0.3)));
		// cubeWorldMatrix[i] = utils.multiplyMatrices(updateWorld(20,20,20), utils.MakeScaleMatrix(worldScale));

		// cubeWorldMatrix[i] = utils.multiplyMatrices(utils.MakeRotateXMatrix(90),utils.MakeScaleMatrix(worldScale));
		cubeWorldMatrix[i] = utils.multiplyMatrices(utils.MakeScaleMatrix(worldScale),utils.MakeRotateXMatrix(40));
	}

}





