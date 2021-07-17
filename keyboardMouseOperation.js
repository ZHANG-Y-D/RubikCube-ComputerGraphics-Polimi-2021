var keyFunctionDown =function(e) {
    if(!keys[e.keyCode]) {
        keys[e.keyCode] = true;
        switch(e.keyCode) {
            case 37:
                //console.log("KeyUp   - Dir LEFT");
                rvy = rvy - 1.0;
                break;
            case 39:
                //console.log("KeyUp   - Dir RIGHT");
                rvy = rvy + 1.0;
                break;
            case 38:
                //console.log("KeyUp   - Dir UP");
                rvx = rvx + 1.0;
                break;
            case 40:
                //console.log("KeyUp   - Dir DOWN");
                rvx = rvx - 1.0;
                break;

            case 70: //F： Z Axis
                rotationAxis = 'Z';
                nowControlAspect = 0;
                angleKeys[0] = angleKeys[0] + 0.1;

                operationBlocks = rotationZOperationBlocks(2,cubeBlockStatus);



                break;

            case 85: //U
                console.log(cubeBlockStatus);
                operationBlocks = rotationYOperationBlocks(0,cubeBlockStatus);
                cubeBlockStatus = rotationY(0,cubeBlockStatus);
                break;

            case 76: //L
                rotationAxis = 'X';
                nowControlAspect = 0;
                angleKeys[0] = angleKeys[0] + 0.1;

                // operationBlocks = [cubeBlockStatus[0][2][2],cubeBlockStatus[0][1][2],cubeBlockStatus[0][0][2],
                //                     cubeBlockStatus[1][2][2],cubeBlockStatus[1][1][2],cubeBlockStatus[1][0][2],
                //                     cubeBlockStatus[2][2][2],cubeBlockStatus[2][1][2],cubeBlockStatus[2][0][2]];
                operationBlocks = rotationXOperationBlocks(0,cubeBlockStatus);
                break;

            case 82: //R

                console.log(cubeBlockStatus);
                operationBlocks = rotationXOperationBlocks(2,cubeBlockStatus);
                cubeBlockStatus = rotationX(2,cubeBlockStatus);
                break;
        }
    }
}

var keyFunctionUp =function(e) {
    if(keys[e.keyCode]) {
        keys[e.keyCode] = false;
        switch(e.keyCode) {
            case 37:
                //console.log("KeyDown  - Dir LEFT");
                rvy = rvy + 1.0;
                break;
            case 39:
                //console.log("KeyDown - Dir RIGHT");
                rvy = rvy - 1.0;
                break;
            case 38:
                //console.log("KeyDown - Dir UP");
                rvx = rvx - 1.0;
                break;
            case 40:
                //console.log("KeyDown - Dir DOWN");
                rvx = rvx + 1.0;
                break;

            case 70:
                console.log(operationBlocks);
                cubeBlockStatus = rotationZ(2,cubeBlockStatus);

                for (var n = 0; n < 26; n++) {

                    if (operationBlocks.includes(n)) {
                        //Update view
                        cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeRotateZMatrix(-90), cubeWorldMatrix[n]);
                    }
                }

                break;

            case 85: //U
                //TODO
                // console.log(cubeWorldMatrix[0]);
                for (var n = 0; n < 26; n++) {
                    if (operationBlocks.includes(n)) {
                        cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeRotateYMatrix(-90), cubeWorldMatrix[n]);
                    }
                }
                break;


            case 76: //L
            // //TODO
            // //console.log(cubeBlockStatus);
            // nowControlAspect = 0;
            // // rotationAngle[0]=Math.round((rotationAngle[0]%360)/90)*90;
            // angleKeys[0] = 0;
            // for (var j=Math.round((rotationAngle[0]%360)/90);j>0;j--){
            //     cubeBlockStatus = rotationX(0,cubeBlockStatus);
            //     console.log(j)
            // }
            // console.log(cubeBlockStatus);
            // break;


            case 82: //R
                //TODO
                console.log(operationBlocks);
                for (var n = 0; n < 26; n++) {
                    if(operationBlocks.includes(n)){
                    cubeWorldMatrix[n] = utils.multiplyMatrices(utils.MakeRotateXMatrix(-90), cubeWorldMatrix[n]);
                    }
                }
                break;
        }
    }
}