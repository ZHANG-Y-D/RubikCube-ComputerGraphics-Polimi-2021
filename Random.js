//0-17
function generatorRandomOperation(times){

    var randomOperatioinArray = new Array();  //先声明一维
    for(var k=0;k<times;k++){    //一维长度为i,i为变量，可以根据实际情况改变

        randomOperatioinArray[k]=new Array();  //声明二维，每一个一维数组里面的一个元素都是一个数组；
        for(var j=0;j<2;j++){   //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
            randomOperatioinArray[k][j]="";    //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
        }
    }

    for(var i = 0;i<times;i++){
        randomOperatioinArray[i][0]=randomNum(0,8);
        randomOperatioinArray[i][1]=randomNum(0,1);
    }

    console.log(randomOperatioinArray,times);
    testt(randomOperatioinArray,times);
}

function testt(randomOperatioinArray,times){
    for(var i=0;i < times;i++){
        console.log(randomOperatioinArray[i][0]);
        console.log(randomOperatioinArray[i][1]);
        switch(randomOperatioinArray[i][0]){
            //R 82
            case 0:
                operationBlocks = rotationXOperationBlocks(2, cubeBlockStatus);
                rotationAxis = 'X';
                // var angleKeyss = 0.00;
                if(randomOperatioinArray[i][1]) {
                    cubeBlockStatus = rotationX(2, cubeBlockStatus);
                    updateBlocksWorldMatrixForRandomOperation(-90,operationBlocks);
                }
                else{
                    cubeBlockStatus = rotationX(2, cubeBlockStatus);
                    cubeBlockStatus = rotationX(2, cubeBlockStatus);
                    cubeBlockStatus = rotationX(2, cubeBlockStatus);
                    updateBlocksWorldMatrixForRandomOperation(90,operationBlocks);
                }
                break;
            //B
            case 1://B
                operationBlocks = rotationZOperationBlocks(0, cubeBlockStatus);
                rotationAxis = 'Z';
                if(randomOperatioinArray[i][1]) {//未按下
                    //add
                    cubeBlockStatus = rotationZ(0, cubeBlockStatus);
                    cubeBlockStatus = rotationZ(0, cubeBlockStatus);
                    cubeBlockStatus = rotationZ(0, cubeBlockStatus);
                    updateBlocksWorldMatrixForRandomOperation(90,operationBlocks);

                }
                else{
                    //
                    cubeBlockStatus = rotationZ(0, cubeBlockStatus);
                    updateBlocksWorldMatrixForRandomOperation(-90,operationBlocks);
                    //
                }
                break;
            //D
            case 2:
                operationBlocks = rotationYOperationBlocks(2, cubeBlockStatus);
                rotationAxis = 'Y';
                if(randomOperatioinArray[i][1]) {
                    //add
                    cubeBlockStatus = rotationY(2, cubeBlockStatus);
                    cubeBlockStatus = rotationY(2, cubeBlockStatus);
                    cubeBlockStatus = rotationY(2, cubeBlockStatus);
                    updateBlocksWorldMatrixForRandomOperation(90,operationBlocks);
                }
                else{
                    //
                    cubeBlockStatus = rotationY(2, cubeBlockStatus);
                    updateBlocksWorldMatrixForRandomOperation(-90,operationBlocks);
                    //
                }
                break;
            //M
            case 3:
                operationBlocks = rotationXOperationBlocks(1, cubeBlockStatus);
                rotationAxis = 'X';
                if(randomOperatioinArray[i][1]) {
                    //add
                    cubeBlockStatus = rotationX(1, cubeBlockStatus);
                    cubeBlockStatus = rotationX(1, cubeBlockStatus);
                    cubeBlockStatus = rotationX(1, cubeBlockStatus);
                    updateBlocksWorldMatrixForRandomOperation(90,operationBlocks);
                }
                else{
                    //
                    cubeBlockStatus = rotationX(1, cubeBlockStatus);
                    updateBlocksWorldMatrixForRandomOperation(-90,operationBlocks);
                    //
                }
                break;
                //E
            case 4:
                operationBlocks = rotationYOperationBlocks(1, cubeBlockStatus);
                rotationAxis = 'Y';
                if(randomOperatioinArray[i][1]) {
                    //add
                    cubeBlockStatus = rotationY(1, cubeBlockStatus);
                    cubeBlockStatus = rotationY(1, cubeBlockStatus);
                    cubeBlockStatus = rotationY(1, cubeBlockStatus);
                    updateBlocksWorldMatrixForRandomOperation(90,operationBlocks);

                }
                else{
                    //
                    cubeBlockStatus = rotationY(1, cubeBlockStatus);
                    updateBlocksWorldMatrixForRandomOperation(-90,operationBlocks);
                    //
                }

                break;
                //S
            case 5:
                operationBlocks = rotationZOperationBlocks(1, cubeBlockStatus);
                rotationAxis = 'Z';
                if(randomOperatioinArray[i][1]) {
                    //
                    cubeBlockStatus = rotationZ(1, cubeBlockStatus);
                    updateBlocksWorldMatrixForRandomOperation(-90,operationBlocks);
                }
                else{
                    //add
                    cubeBlockStatus = rotationZ(1, cubeBlockStatus);
                    cubeBlockStatus = rotationZ(1, cubeBlockStatus);
                    cubeBlockStatus = rotationZ(1, cubeBlockStatus);
                    updateBlocksWorldMatrixForRandomOperation(90,operationBlocks);
                    //
                }
                break;
                //F
            case 6:
                operationBlocks = rotationZOperationBlocks(2, cubeBlockStatus);
                rotationAxis = 'Z';
                if(randomOperatioinArray[i][1]) {
                    //
                    cubeBlockStatus = rotationZ(2, cubeBlockStatus);
                    updateBlocksWorldMatrixForRandomOperation(-90,operationBlocks);
                }
                else{
                    //add
                    cubeBlockStatus = rotationZ(2, cubeBlockStatus);
                    cubeBlockStatus = rotationZ(2, cubeBlockStatus);
                    cubeBlockStatus = rotationZ(2, cubeBlockStatus);
                    updateBlocksWorldMatrixForRandomOperation(90,operationBlocks);
                    //
                }
                break;
                ////L
            case 7:
                operationBlocks = rotationXOperationBlocks(0, cubeBlockStatus);
                rotationAxis = 'X';
                if(randomOperatioinArray[i][1]) {
                    //add
                    cubeBlockStatus = rotationX(0, cubeBlockStatus);
                    cubeBlockStatus = rotationX(0, cubeBlockStatus);
                    cubeBlockStatus = rotationX(0, cubeBlockStatus);
                    updateBlocksWorldMatrixForRandomOperation(90,operationBlocks);
                }
                else{
                    //
                    cubeBlockStatus = rotationX(0, cubeBlockStatus);
                    //
                    updateBlocksWorldMatrixForRandomOperation(-90,operationBlocks);
                }
                break;
                //U
            case 8:
                operationBlocks = rotationYOperationBlocks(0, cubeBlockStatus);
                rotationAxis = 'Y';
                if(randomOperatioinArray[i][1]) {
                    //
                    cubeBlockStatus = rotationY(0, cubeBlockStatus);
                    updateBlocksWorldMatrixForRandomOperation(-90,operationBlocks);

                }
                else{
                    //add
                    cubeBlockStatus = rotationY(0, cubeBlockStatus);
                    cubeBlockStatus = rotationY(0, cubeBlockStatus);
                    cubeBlockStatus = rotationY(0, cubeBlockStatus);
                    updateBlocksWorldMatrixForRandomOperation(90,operationBlocks);
                    //
                }
                break;
            default:
                console.log("This key does not work");
        }
    }

}



function resetCubeStatus(){
    cubeWorldMatrix = JSON.parse(JSON.stringify(cubeWorldMatrixOriginal));
    cubeBlockStatus = JSON.parse(JSON.stringify(cubeBlockOriginal));
}

function sleep(d){
    for(var t = Date.now();Date.now() - t <= d;);
}
//setTimeout
function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1);
            break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum);
            break;
        default:
            return 0;
            break;
    }
}