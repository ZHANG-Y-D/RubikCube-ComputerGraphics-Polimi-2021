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
                angleKeys = angleKeys + 0.1;
                operationBlocks = [this.cubeBlockStatus[0][2][2],this.cubeBlockStatus[0][1][2],this.cubeBlockStatus[0][0][2],
                                    this.cubeBlockStatus[1][2][2],this.cubeBlockStatus[1][1][2],this.cubeBlockStatus[1][0][2],
                                    this.cubeBlockStatus[2][2][2],this.cubeBlockStatus[2][1][2],this.cubeBlockStatus[2][0][2]];

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
            case 82:
                //TODO
                rotationAngle=Math.round((rotationAngle%360)/90)*90;
                angleKeys = 0;
                for (var j=Math.round((rotationAngle%360)/90);j>0;j--){
                    this.cubeBlockStatus = rotationX(2);
                }
                break;
        }
    }
}