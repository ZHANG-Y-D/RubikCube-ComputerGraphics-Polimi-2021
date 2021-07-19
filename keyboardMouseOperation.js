var keyFunctionDown =function(e) {
    if(!keys[e.keyCode] && !sync) {
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
            case 66: //B
                sync = true;
                isAnimating=true;
                rotationAngle=0;
                cubeWorldMatrixPrevious = JSON.parse(JSON.stringify(cubeWorldMatrix));
                operationBlocks = rotationZOperationBlocks(0, cubeBlockStatus);
                rotationAxis = 'Z';
                angleKeys = angleKeys + 0.1;
                break;

            case 68: //D
                sync = true;
                isAnimating=true;
                rotationAngle=0;
                cubeWorldMatrixPrevious = JSON.parse(JSON.stringify(cubeWorldMatrix));
                operationBlocks = rotationYOperationBlocks(2, cubeBlockStatus);
                rotationAxis = 'Y';
                angleKeys = angleKeys + 0.1;
                break;

            case 77: //M
                sync = true;
                isAnimating=true;
                rotationAngle=0;
                cubeWorldMatrixPrevious = JSON.parse(JSON.stringify(cubeWorldMatrix));
                operationBlocks = rotationXOperationBlocks(1, cubeBlockStatus);
                rotationAxis = 'X';
                angleKeys = angleKeys + 0.1;
                break;

            case 69: //E
                sync = true;
                isAnimating=true;
                rotationAngle=0;
                cubeWorldMatrixPrevious = JSON.parse(JSON.stringify(cubeWorldMatrix));
                operationBlocks = rotationYOperationBlocks(1, cubeBlockStatus);
                rotationAxis = 'Y';
                angleKeys = angleKeys + 0.1;
                break;

            case 83: //S
                sync = true;
                isAnimating=true;
                rotationAngle=0;
                cubeWorldMatrixPrevious = JSON.parse(JSON.stringify(cubeWorldMatrix));
                operationBlocks = rotationZOperationBlocks(1, cubeBlockStatus);
                rotationAxis = 'Z';
                angleKeys = angleKeys - 0.1;
                break;

            case 70: //F
                sync = true;
                isAnimating=true;
                rotationAngle=0;
                cubeWorldMatrixPrevious = JSON.parse(JSON.stringify(cubeWorldMatrix));
                operationBlocks = rotationZOperationBlocks(2, cubeBlockStatus);
                rotationAxis = 'Z';
                angleKeys = angleKeys - 0.1;
                break;

            case 76: //L
                sync = true;
                isAnimating=true;
                rotationAngle=0;
                cubeWorldMatrixPrevious = JSON.parse(JSON.stringify(cubeWorldMatrix));
                operationBlocks = rotationXOperationBlocks(0, cubeBlockStatus);
                rotationAxis = 'X';
                angleKeys = angleKeys + 0.1;
                break;

            case 85: //U
                sync = true;
                isAnimating=true;
                rotationAngle=0;
                cubeWorldMatrixPrevious = JSON.parse(JSON.stringify(cubeWorldMatrix));
                operationBlocks = rotationYOperationBlocks(0, cubeBlockStatus);
                rotationAxis = 'Y';
                angleKeys = angleKeys - 0.1;
                break;

            case 82: //R
                sync = true;
                isAnimating=true;
                rotationAngle=0;
                cubeWorldMatrixPrevious = JSON.parse(JSON.stringify(cubeWorldMatrix));
                operationBlocks = rotationXOperationBlocks(2, cubeBlockStatus);
                rotationAxis = 'X';
                angleKeys = angleKeys - 0.1;
                break;

            case 88: //X
                sync = true;
                isAnimating=true;
                rotationAngle=0;
                cubeWorldMatrixPrevious = JSON.parse(JSON.stringify(cubeWorldMatrix));
                operationBlocks = rotationXOperationBlocks(0, cubeBlockStatus);
                operationBlocks = rotationXOperationBlocks(1, cubeBlockStatus)+operationBlocks;
                operationBlocks = rotationXOperationBlocks(2, cubeBlockStatus)+operationBlocks;
                rotationAxis = 'X';
                angleKeys = angleKeys - 0.1;
                break;

            case 89: //Y
                sync = true;
                isAnimating=true;
                rotationAngle=0;
                cubeWorldMatrixPrevious = JSON.parse(JSON.stringify(cubeWorldMatrix));
                operationBlocks = rotationYOperationBlocks(0, cubeBlockStatus);
                operationBlocks = rotationYOperationBlocks(1, cubeBlockStatus)+operationBlocks;
                operationBlocks = rotationYOperationBlocks(2, cubeBlockStatus)+operationBlocks;
                rotationAxis = 'Y';
                angleKeys = angleKeys - 0.1;
                break;

            case 90: //Z
                sync = true;
                isAnimating=true;
                rotationAngle=0;
                cubeWorldMatrixPrevious = JSON.parse(JSON.stringify(cubeWorldMatrix));
                operationBlocks = rotationZOperationBlocks(0, cubeBlockStatus);
                operationBlocks = rotationZOperationBlocks(1, cubeBlockStatus)+operationBlocks;
                operationBlocks = rotationZOperationBlocks(2, cubeBlockStatus)+operationBlocks;
                rotationAxis = 'Z';
                angleKeys = angleKeys - 0.1;
                break;
            default:
                console.log("This key does not work")
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

            case 70: //F
                isAnimating=false;

                if (Math.abs(Math.round((rotationAngle%360)/90))>0){
                    cubeBlockStatus = rotationZ(2, cubeBlockStatus);
                }
                updateBlocksWorldMatrixForCommitOperation(Math.round((rotationAngle%360)/90)*90);
                angleKeys = 0;
                sync = false;
                break;

            case 85: //U
                isAnimating=false;
                if (Math.abs(Math.round((rotationAngle%360)/90))>0){
                    cubeBlockStatus = rotationY(0, cubeBlockStatus);
                }
                updateBlocksWorldMatrixForCommitOperation(Math.round((rotationAngle % 360) / 90) * 90);
                angleKeys = 0;
                sync = false;
                break;

            case 76: //L
                isAnimating=false;
                if (Math.abs(Math.round((rotationAngle%360)/90))>0){
                    for (var i = 0; i < 3; i++) {
                        cubeBlockStatus = rotationX(0, cubeBlockStatus);
                    }
                }
                updateBlocksWorldMatrixForCommitOperation(Math.round((rotationAngle % 360) / 90) * 90);
                angleKeys = 0;
                sync = false;
                break;

            case 82: //R
                isAnimating=false;
                if (Math.abs(Math.round((rotationAngle%360)/90))>0){
                    cubeBlockStatus = rotationX(2, cubeBlockStatus);
                }
                updateBlocksWorldMatrixForCommitOperation(Math.round((rotationAngle % 360) / 90) * 90);
                angleKeys = 0;
                sync = false;
                break;

            case 66: //B
                isAnimating=false;
                if (Math.abs(Math.round((rotationAngle%360)/90))>0){
                    for (var i = 0; i < 3; i++) {
                        cubeBlockStatus = rotationZ(0, cubeBlockStatus);
                    }
                }
                updateBlocksWorldMatrixForCommitOperation(Math.round((rotationAngle % 360) / 90) * 90);
                angleKeys = 0;
                sync = false;
                break;

            case 68: //D
                isAnimating=false;
                if (Math.abs(Math.round((rotationAngle%360)/90))>0){
                    for (var i = 0; i < 3; i++) {
                        cubeBlockStatus = rotationY(2, cubeBlockStatus);
                    }
                }
                updateBlocksWorldMatrixForCommitOperation(Math.round((rotationAngle % 360) / 90) * 90);
                angleKeys = 0;
                sync = false;
                break;

            case 77: //M
                isAnimating=false;
                if (Math.abs(Math.round((rotationAngle%360)/90))>0){
                    for (var i = 0; i < 3; i++) {
                        cubeBlockStatus = rotationX(1, cubeBlockStatus);
                    }
                }
                updateBlocksWorldMatrixForCommitOperation(Math.round((rotationAngle % 360) / 90) * 90);
                angleKeys = 0;
                sync = false;
                break;

            case 69: //E
                isAnimating=false;
                if (Math.abs(Math.round((rotationAngle%360)/90))>0){
                    for (var i = 0; i < 3; i++) {
                        cubeBlockStatus = rotationY(1, cubeBlockStatus);
                    }
                }
                updateBlocksWorldMatrixForCommitOperation(Math.round((rotationAngle % 360) / 90) * 90);
                angleKeys = 0;
                sync = false;
                break;

            case 83: //S
                isAnimating=false;
                if (Math.abs(Math.round((rotationAngle%360)/90))>0){
                    cubeBlockStatus = rotationZ(1, cubeBlockStatus);
                }
                updateBlocksWorldMatrixForCommitOperation(Math.round((rotationAngle % 360) / 90) * 90);
                angleKeys = 0;
                sync = false;
                break;

            case 88: //X
                isAnimating=false;
                if (Math.abs(Math.round((rotationAngle%360)/90))>0){
                    cubeBlockStatus = rotationX(0, cubeBlockStatus);
                    cubeBlockStatus = rotationX(1, cubeBlockStatus);
                    cubeBlockStatus = rotationX(2, cubeBlockStatus);
                }
                updateBlocksWorldMatrixForCommitOperation(Math.round((rotationAngle % 360) / 90) * 90);
                angleKeys = 0;
                sync = false;
                break;

            case 89: //Y
                isAnimating=false;
                if (Math.abs(Math.round((rotationAngle%360)/90))>0){
                    cubeBlockStatus = rotationY(0, cubeBlockStatus);
                    cubeBlockStatus = rotationY(1, cubeBlockStatus);
                    cubeBlockStatus = rotationY(2, cubeBlockStatus);
                }
                updateBlocksWorldMatrixForCommitOperation(Math.round((rotationAngle % 360) / 90) * 90);
                angleKeys = 0;
                sync = false;
                break;

            case 90: //Z
                isAnimating=false;
                if (Math.abs(Math.round((rotationAngle%360)/90))>0){
                    cubeBlockStatus = rotationZ(0, cubeBlockStatus);
                    cubeBlockStatus = rotationZ(1, cubeBlockStatus);
                    cubeBlockStatus = rotationZ(2, cubeBlockStatus);
                }
                updateBlocksWorldMatrixForCommitOperation(Math.round((rotationAngle % 360) / 90) * 90);
                angleKeys = 0;
                sync = false;
                break;
            default:
                console.log("This key does not work")
        }
    }
}

function updateAngleKeys(direction,angle){
    if(direction){
        angle = angle + 0.1;
    }
    else{
        angle = angle - 0.1;
    }

}



var mouseState = false;
var lastMouseX = -100, lastMouseY = -100;
function doMouseDown(event) {
    lastMouseX = event.pageX;
    lastMouseY = event.pageY;
    mouseState = true;
}
function doMouseUp(event) {
    lastMouseX = -100;
    lastMouseY = -100;
    mouseState = false;
}
function mousePositionListener(event) {
    console.log(event.pageX);
    console.log(event.pageY);
}
function doMouseMove(event) {
    // if(mouseState) {
    //     var dx = event.pageX - lastMouseX;
    //     var dy = lastMouseY - event.pageY;
    //     lastMouseX = event.pageX;
    //     lastMouseY = event.pageY;
    //
    //     if((dx != 0) || (dy != 0)) {
    //         angle = angle + 0.1 * dx;
    //         elevation = elevation + 0.1 * dy;
    //     }
    // }
}
function doMouseWheel(event) {
    var nLookRadius = lookRadius + event.wheelDelta/1000.0;
    if((nLookRadius > 2.0) && (nLookRadius < 20.0)) {
        lookRadius = nLookRadius;
    }
}
