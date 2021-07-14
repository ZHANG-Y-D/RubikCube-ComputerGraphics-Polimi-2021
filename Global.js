var canvas;

var gl = null,
    program = null,
    worldMesh = null,
    //mesh = null,
    skybox = null,
    imgtx = null,
    skyboxLattx = null,
    skyboxTbtx = null;
var mesh = [];

var projectionMatrix,
    perspectiveMatrix,
    viewMatrix,
    worldMatrix,
    gLightDir;

var worldScale = 0.3;

var cubeMesh = [];

//使用它做变换!!!!!! 一共26个world matrix 对应着26个方块!
var cubeWorldMatrix = [];
//Parameters for Camera
var cx = 0.0;
var cy = 0.0;
var cz = 6.5;
var elevation = 0.01;
var angle = 0.01;
var roll = 0.01;

var lookRadius = 10.0;


var keys = [];
var rvx = 0.0;
var rvy = 0.0;
var rvz = 0.0;

var cubeBlockStatus=
    [
        [
            [8,5,2],
            [7,4,1],
            [6,3,0]
        ],
        [
            [16,13,11],
            [15,-1,10],
            [14,12,9]
        ],
        [
            [25,22,19],
            [24,21,18],
            [23,20,17]
        ]
    ]


var rotationAngle=0;
var rotationAxis;
var operationBlocks;