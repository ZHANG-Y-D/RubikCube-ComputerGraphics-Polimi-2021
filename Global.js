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
var curr_Shader = 0;

var projectionMatrix,
    perspectiveMatrix,
    viewMatrix,
    worldMatrix,
    gLightDir;

var worldScale = 0.3;

var cubeMesh = [];

var cubeWorldMatrixOriginal = [];
var cubeWorldMatrixPrevious=[];
var cubeWorldMatrix = [];


//Parameters for Camera
var cx = 2.0;
var cy = 2.0;
var cz = 6.5;
// var elevation = 0.01;
// var angle = 0.01;

var elevation = -30.0;
var angle = 45.00;
var roll = 0.01;

var lookRadius = 5.0;

var mouseX;
var mouseY;
var keys = [];
// var rvx = 0.0;
// var rvy = 0.0;
// var rvz = 0.0;
var sync = false;
var shiftSync = false;

var lastMouseX = -100, lastMouseY = -100;
var cubeBlockOriginal=
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

var angleKeys =0;

var rotationAngle=0;

var rotationAxis;
var operationBlocks=[-1];
var isAnimating=false;