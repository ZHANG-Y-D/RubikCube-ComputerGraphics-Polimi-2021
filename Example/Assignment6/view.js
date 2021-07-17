function view() {
	// Make a Look-In-Direction matrix centered at (5,2.5,0), looking west and aiming 30 degrees down.
	var A1 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	var aT = utils.MakeTranslateMatrix(5,2.5,0)
	var aRy = utils.MakeRotateYMatrix(90)
	var aRx = utils.MakeRotateXMatrix(-30)
	var aRz = utils.MakeRotateZMatrix(0)

	var aMc = utils.multiplyMatrices(aT,utils.multiplyMatrices(
									 aRy,utils.multiplyMatrices(
									 aRx,aRz)))

	A1 = utils.invertMatrix(aMc)




	// Make a Look-In-Direction matrix centered at (0,-1,-5), angled 170 degrees, with an elevation of 15 degrees, and a roll of 45 degrees.
	var A2 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];


	var bT = utils.MakeTranslateMatrix(0,-1,-5)
	var bRy = utils.MakeRotateYMatrix(170)
	var bRx = utils.MakeRotateXMatrix(15)
	var bRz = utils.MakeRotateZMatrix(45)

	var bMc = utils.multiplyMatrices(bT,utils.multiplyMatrices(
		bRy,utils.multiplyMatrices(
			bRx,bRz)))

	A2 = utils.invertMatrix(bMc)


			   
	// Make a Look-At-Matrix, centered at (-4, 2, -4), aiming at (0,0.5,0.5) and with up-vector (0,1,0).
		var A3 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	var cC = [-4,2,-4]
	var cA = [0,0.5,0.5]
	var cU = [0,1,0]


	var cVz = utils.normalizeVector3([cC[0]-cA[0], cC[1]-cA[1], cC[2]-cA[2]])
	var cVx = utils.normalizeVector3(utils.crossVector(utils.normalizeVector3(cU), cVz))

	var cVy = utils.crossVector(cVz,cVx)

	var cMc=  [cVx[0], cVy[0], cVz[0], cC[0],
				cVx[1], cVy[1], cVz[1], cC[1],
				cVx[2], cVy[2], cVz[2], cC[2],
				0.0,   0.0,   0.0,  1.0]

	A3 = utils.invertMatrix(cMc)

			   
	// Make a Look-At-Matrix, centered at (2.57, 0, 0), aiming at (2.8,0,-1) and with up-vector (1,0,0).
		var A4 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];


	var dC = [2.57, 0, 0]
	var dA = [2.8,0,-1]
	var dU = [1,0,0]


	var dVz = utils.normalizeVector3([dC[0]-dA[0], dC[1]-dA[1], dC[2]-dA[2]])
	var dVx = utils.normalizeVector3(utils.crossVector(utils.normalizeVector3(dU), dVz))

	var dVy = utils.crossVector(dVz,dVx)

	var dMc=  [dVx[0], dVy[0], dVz[0], dC[0],
		dVx[1], dVy[1], dVz[1], dC[1],
		dVx[2], dVy[2], dVz[2], dC[2],
		0.0,   0.0,   0.0,  1.0]

	A4 = utils.invertMatrix(dMc)


	return [A1, A2, A3, A4];
}