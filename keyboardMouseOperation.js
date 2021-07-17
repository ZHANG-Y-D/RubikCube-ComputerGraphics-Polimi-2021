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
            case 85: //U
                rotationAxis = 'Y';
                nowControlAscept = 3;
                angleKeys[3] = angleKeys[3] + 0.1;

                cubeWorldMatrixPrevious = JSON.parse(JSON.stringify(cubeWorldMatrix));

                // operationBlocks = [cubeBlockStatus[0][2][2],cubeBlockStatus[0][1][2],cubeBlockStatus[0][0][2],
                //                     cubeBlockStatus[1][2][2],cubeBlockStatus[1][1][2],cubeBlockStatus[1][0][2],
                //                     cubeBlockStatus[2][2][2],cubeBlockStatus[2][1][2],cubeBlockStatus[2][0][2]];
                operationBlocks = rotationYOperationBlocks(1,cubeBlockStatus);
                break;

            case 76: //L
                rotationAxis = 'X';
                nowControlAscept = 0;
                angleKeys[0] = angleKeys[0] + 0.1;

                // operationBlocks = [cubeBlockStatus[0][2][2],cubeBlockStatus[0][1][2],cubeBlockStatus[0][0][2],
                //                     cubeBlockStatus[1][2][2],cubeBlockStatus[1][1][2],cubeBlockStatus[1][0][2],
                //                     cubeBlockStatus[2][2][2],cubeBlockStatus[2][1][2],cubeBlockStatus[2][0][2]];
                operationBlocks = rotationXOperationBlocks(0,cubeBlockStatus);
                break;

            case 82: //R
                rotationAxis = 'X';
                nowControlAscept = 1;
                angleKeys[1] = angleKeys[1] + 0.1;

                cubeWorldMatrixPrevious = JSON.parse(JSON.stringify(cubeWorldMatrix));

                // operationBlocks = [cubeBlockStatus[0][2][2],cubeBlockStatus[0][1][2],cubeBlockStatus[0][0][2],
                //                     cubeBlockStatus[1][2][2],cubeBlockStatus[1][1][2],cubeBlockStatus[1][0][2],
                //                     cubeBlockStatus[2][2][2],cubeBlockStatus[2][1][2],cubeBlockStatus[2][0][2]];
                operationBlocks = rotationXOperationBlocks(2,cubeBlockStatus);
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


            case 85: //U
                //TODO
                //console.log(cubeBlockStatus);

                nowControlAscept = 3;
                // let angleTemporary85=Math.round((rotationAngle[3]%360)/90);
                rotationAngle[3]=Math.round((rotationAngle[3]%360)/90)*90;
                angleKeys[3] = 0;

                // for (var j=angleTemporary85;j>0;j--){
                    cubeBlockStatus = rotationY(1,cubeBlockStatus);
                //     console.log(j)
                // }
                cubeWorldMatrixPrevious = JSON.parse(JSON.stringify(cubeWorldMatrix));

                rotationAngle[3]=0;
                console.log(cubeBlockStatus);
                break;


            case 76: //L
                // //TODO
                // //console.log(cubeBlockStatus);
                // nowControlAscept = 0;
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
                //console.log(cubeBlockStatus);
                nowControlAscept = 1;
                rotationAngle[1]=Math.round((rotationAngle[1]%360)/90)*90;

                angleKeys[1] = 0;
                // for (var j=Math.round((rotationAngle[1]%360)/90);j>0;j--){
                //     cubeBlockStatus = rotationX(2,cubeBlockStatus);
                //     console.log(j)
                // }
                cubeBlockStatus = rotationX(2,cubeBlockStatus);

                rotationAngle[1]=0
                cubeWorldMatrixPrevious = JSON.parse(JSON.stringify(cubeWorldMatrix));
                console.log(cubeBlockStatus);
                break;
        }
    }
}