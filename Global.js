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

var angleKeys=0;

var rotationAngle=0;

var rotationAxis;
var operationBlocks=[-1];
var isAnimating=false;

var lightPositionX=-37;
var lightPositionY=41;
var lightPositionZ=45;

var lightMoveX=0;
var lightMoveY=0;
var lightMoveZ=0;

var ambientLightColor= "#555555";
var diffuseColor= "#00ffff";
var specularColor= "#ffffff";
var ambientMatColor= "#00ffff";
var emitColor= "#4D4D47";
var  lightColor= "#ffffff";
var  lightDecay=0;
var  lightTarget=61;
var  DTexMix= 100;
var  SpecShine= 100;


defShaderParams = {
    ambientLightColor: "#555555",
    diffuseColor: "#00ffff",
    specularColor: "#ffffff",
    ambientMatColor: "#00ffff",
    emitColor: "#4D4D47",
    lightColor: "#ffffff",
    lightPositionX: -37,
    lightPositionY: 41,
    lightPositionZ: 45,
    lightDecay: 0,
    lightTarget: 61,
    DTexMix: 100,
    SpecShine: 100
}