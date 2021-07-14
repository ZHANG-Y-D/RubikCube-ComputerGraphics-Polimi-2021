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
            case 82:
                rotationAxis = 'X';
                rotationAngle = rotationAngle + 1.0;
                operationBlocks = [cubeBlockStatus[0][2][2],cubeBlockStatus[0][1][2],cubeBlockStatus[0][0][2],
                                    cubeBlockStatus[1][2][2],cubeBlockStatus[1][1][2],cubeBlockStatus[1][0][2],
                                    cubeBlockStatus[2][2][2],cubeBlockStatus[2][1][2],cubeBlockStatus[2][0][2]];
                updateBlocksWorld();
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
            case 81:
        }
    }
}