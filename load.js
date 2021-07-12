var cubeMesh = null;
var gl = null;

var projectionMatrix,
    perspectiveMatrix,
    viewMatrix,
    worldMatrix,
    gLightDir;

var worldScale;

//Parameters for Camera
var cx = 0.0;
var cy = 0.0;
var cz = 6.5;
var elevation = 0.01;
var angle = 0.01;
var roll = 0.01;

var lookRadius = 10.0;

function setCubeMesh(path){
    cubeMesh = new OBJ.Mesh(path);

    //textureImg = new Image();
    worldScale = 1.0;

    OBJ.initMeshBuffers(gl, cubeMesh);
}
unifParArray =[
    new unifPar("ambientType","ambientType", valType),
    new unifPar("diffuseType","diffuseType", valType),
    new unifPar("specularType","specularType", valType),

    new unifPar("lightType","lightType", valType),
    new unifPar("Pos","Pos", valVec3),
    new unifPar("Dir","Dir", valDir),
    new unifPar("ConeOut","ConeOut", val),
    new unifPar("ConeIn","ConeIn", valD100),
    new unifPar("Decay","Decay", val),
    new unifPar("Target","Target", valD10),
    new unifPar("lightColor","lightColor", valCol),

    new unifPar("ambientLightColor","ambientLightColor", valCol),
    new unifPar("ambientLightLowColor","ambientLightLowColor", valCol),
    new unifPar("SHLeftLightColor","SHLeftLightColor", valCol),
    new unifPar("SHRightLightColor","SHRightLightColor", valCol),
    new unifPar("ADir","ADir", valDir),
    new unifPar("diffuseColor","diffuseColor", valCol),
    new unifPar("DTexMix","DTexMix", valD100),
    new unifPar("specularColor","specularColor", valCol),
    new unifPar("SpecShine","SpecShine", val),
    new unifPar("DToonTh","DToonTh", valD100),
    new unifPar("SToonTh","SToonTh", valD100),
    new unifPar("ambientMatColor","ambientMatColor", valCol),
    new unifPar("emitColor","emitColor", valCol),
    new unifPar("","u_texture", noAutoSet),
    new unifPar("","pMatrix", noAutoSet),
    new unifPar("","wMatrix", noAutoSet),
    new unifPar("","eyePos", noAutoSet)
];

function drawCube() {
    // update WV matrix

    angle = angle + rvy;
    elevation = elevation + rvx;

    cz = lookRadius * Math.cos(utils.degToRad(-angle)) * Math.cos(utils.degToRad(-elevation));
    cx = lookRadius * Math.sin(utils.degToRad(-angle)) * Math.cos(utils.degToRad(-elevation));
    cy = lookRadius * Math.sin(utils.degToRad(-elevation));
    viewMatrix = utils.MakeView(cx, cy, cz, elevation, -angle);

    // Magic for moving the car
    worldMatrix = utils.MakeScaleMatrix(worldScale);

    projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewMatrix);


    // draws the request
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeMesh.vertexBuffer);
    gl.vertexAttribPointer(program.vertexPositionAttribute, cubeMesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeMesh.textureBuffer);
    gl.vertexAttribPointer(program.textureCoordAttribute, cubeMesh.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeMesh.normalBuffer);
    gl.vertexAttribPointer(program.vertexNormalAttribute, cubeMesh.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeMesh.indexBuffer);

    gl.uniform1i(program.u_textureUniform, 0);
    gl.uniform3f(program.eyePosUniform, cx, cy, cz);
    WVPmatrix = utils.multiplyMatrices(projectionMatrix, worldMatrix);
    gl.uniformMatrix4fv(program.pMatrixUniform, gl.FALSE, utils.transposeMatrix(WVPmatrix));
    gl.uniformMatrix4fv(program.wMatrixUniform, gl.FALSE, utils.transposeMatrix(worldMatrix));

    for(var i = 0; i < unifParArray.length; i++) {
        unifParArray[i].type(gl);
    }

    gl.drawElements(gl.TRIANGLES, cubeMesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

    window.requestAnimationFrame(drawScene);
}
