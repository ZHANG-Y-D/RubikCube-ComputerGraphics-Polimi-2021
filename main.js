function doResize() {
    // set canvas dimensions
	var canvas = document.getElementById("my-canvas");
    if((window.innerWidth > 40) && (window.innerHeight > 340)) {
		canvas.width  = window.innerWidth-16;
		canvas.height = window.innerHeight-280;
		var w=canvas.clientWidth;
		var h=canvas.clientHeight;

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.viewport(0.0, 0.0, w, h);
		gl.clear(gl.COLOR_BUFFER_BIT);

		perspectiveMatrix = utils.MakePerspective(60, w/h, 0.1, 1000.0);

    }
}



// Vertex shader
var vs = `#version 300 es
#define POSITION_LOCATION 0
#define NORMAL_LOCATION 1
#define UV_LOCATION 2

layout(location = POSITION_LOCATION) in vec3 in_pos;
layout(location = NORMAL_LOCATION) in vec3 in_norm;
layout(location = UV_LOCATION) in vec2 in_uv;

uniform mat4 pMatrix;
uniform mat4 wMatrix;

out vec3 fs_pos;
out vec3 fs_norm;
out vec2 fs_uv;

void main() {
	fs_pos = (wMatrix * vec4(in_pos, 1.0)).xyz;
	// fs_norm = in_norm;
	fs_norm = (wMatrix * vec4(in_norm, 0.0)).xyz;
	fs_uv = vec2(in_uv.x, 1.0-in_uv.y);
	
	gl_Position = pMatrix * vec4(in_pos, 1.0);
}`;


// Fragment shader
var fs = `#version 300 es
precision highp float;

in vec3 fs_pos;
in vec3 fs_norm;
in vec2 fs_uv;

uniform sampler2D u_texture;
uniform vec3 eyePos;

uniform vec3 lightPosition;
uniform float lightDecay;
uniform float lightTarget;
uniform vec4 lightColor;

uniform vec4 ambientLightColor;
uniform vec4 diffuseColor;
uniform float DTexMix;
uniform vec4 specularColor;
uniform float SpecShine;
uniform vec4 ambientMatColor;
uniform vec4 emitColor;

out vec4 color;

// Point light
vec3 compLightDir(vec3 LPos) {
	vec3 pointLightDir = normalize(LPos - fs_pos);
	return pointLightDir;
}


// Point Light
vec4 compLightColor(vec4 lightColor, float LTarget, float LDecay, vec3 LPos) {
	
	vec4 pointLightCol = lightColor * pow(LTarget / length(LPos - fs_pos), LDecay);
	return     pointLightCol;
}


//Lambert
vec4 compDiffuse(vec3 lightDir, vec4 lightCol, vec3 normalVec, vec4 diffColor) {

	return lightCol * diffColor * clamp(dot(lightDir, normalVec),0.0,1.0);
}


// Phong
vec4 compSpecular(vec3 lightDir, vec4 lightCol, vec3 normalVec, vec3 eyeDirVec) {
	
	return specularColor * pow(clamp(dot(eyeDirVec, -reflect(lightDir, normalVec)), 0.0, 1.0), SpecShine) * lightCol;
}


vec4 compAmbient(vec4 ambColor) {
	
	return 	ambientLightColor * ambColor;
}




void main() {
	vec4 texcol = texture(u_texture, fs_uv);
	vec4 diffColor = diffuseColor * (1.0-DTexMix) + texcol * DTexMix;
	vec4 ambColor = ambientMatColor * (1.0-DTexMix) + texcol * DTexMix;
	vec4 emit = emitColor * (1.0-DTexMix) +texcol * DTexMix * 
				   			max(max(emitColor.r, emitColor.g), emitColor.b);
	
	vec3 normalVec = normalize(fs_norm);
	vec3 eyeDirVec = normalize(eyePos - fs_pos);
	
	
	//lights
	vec3 lightDir = compLightDir(lightPosition);
	vec4 lightCol = compLightColor(lightColor, lightTarget, lightDecay, lightPosition);
	
	// Diffuse
	vec4 diffuse = compDiffuse(lightDir, lightCol, normalVec, diffColor);
	
	// Specular
	vec4 specular = compSpecular(lightDir, lightCol, normalVec, eyeDirVec);

	// Ambient
	vec4 ambient = compAmbient(ambColor);

	// final steps
	vec4 out_color = clamp(ambient + diffuse + specular + emit, 0.0, 1.0);
	
	color = vec4(out_color.rgb, 1.0);
}`;

function resetShaderParams() {
	for(var name in defShaderParams) {
		const value = defShaderParams[name];
		window[name] = value;
	}
	
	cx = 2.0;
	cy = 2.0;
	cz = 6.5;
	elevation = -30.0;
	angle = 45.0;
	roll = 0.01;
	lookRadius = 5.0;

}

function UniformParameter(globalNameInJS, pGLSL, type) {
	this.globalNameInJS = globalNameInJS;
	this.pGLSL = pGLSL;
	this.type = type;
}

function noAutoSet(gl) {
}

function val(gl) {
	gl.uniform1f(program[this.pGLSL+"Uniform"], window[this.globalNameInJS]);
}

function valD10(gl) {
	gl.uniform1f(program[this.pGLSL+"Uniform"], window[this.globalNameInJS] / 10);
}

function valD100(gl) {
	gl.uniform1f(program[this.pGLSL+"Uniform"], window[this.globalNameInJS] / 100);
}

function convertColorFromHexToRGB(gl) {
	const col = window[this.globalNameInJS].substring(1,7);
	const R = parseInt(col.substring(0,2) ,16) / 255;
	const G = parseInt(col.substring(2,4) ,16) / 255;
	const B = parseInt(col.substring(4,6) ,16) / 255;
	gl.uniform4f(program[this.pGLSL+"Uniform"], R, G, B, 1);
}

function calculateLightPosition(gl) {
	gl.uniform3f(program[this.pGLSL+"Uniform"],lightPositionX / 10,lightPositionY / 10,lightPositionZ / 10);
}



unifParArray =[
	new UniformParameter("lightPosition","lightPosition", calculateLightPosition),
	new UniformParameter("lightDecay","lightDecay", val),
	new UniformParameter("lightTarget","lightTarget", valD10),
	new UniformParameter("lightColor","lightColor", convertColorFromHexToRGB),
	new UniformParameter("ambientLightColor","ambientLightColor", convertColorFromHexToRGB),
	new UniformParameter("diffuseColor","diffuseColor", convertColorFromHexToRGB),
	new UniformParameter("DTexMix","DTexMix", valD100),
	new UniformParameter("specularColor","specularColor", convertColorFromHexToRGB),
	new UniformParameter("SpecShine","SpecShine", val),
	new UniformParameter("ambientMatColor","ambientMatColor", convertColorFromHexToRGB),
	new UniformParameter("emitColor","emitColor", convertColorFromHexToRGB),
	new UniformParameter("","u_texture", noAutoSet),
	new UniformParameter("","pMatrix", noAutoSet),
	new UniformParameter("","wMatrix", noAutoSet),
	new UniformParameter("","eyePos", noAutoSet)
];


function loadMeshInfoURL(url){
	// Load mesh using the webgl-obj-loader library
	var text = loadOBJText(url);
	var mesh = new OBJ.Mesh(text);
	// Create the textures
	imgtx = new Image();
	imgtx.txNum = 0;
	imgtx.onload = textureLoaderCallback;
	imgtx.src = CubeTextureData;
	OBJ.initMeshBuffers(gl, mesh);
	return mesh
}


// texture loader callback
var textureLoaderCallback = function() {
	var textureId = gl.createTexture();
	gl.activeTexture(gl.TEXTURE0 + this.txNum);
	gl.bindTexture(gl.TEXTURE_2D, textureId);		
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this);		
	// set the filtering so we don't need mips
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
}

function main(){

	resetShaderParams();
	document.getElementById("my-canvas").style.backgroundColor = "#ffffff";
	// setup everything else
	var canvas = document.getElementById("my-canvas");
	canvas.addEventListener("mousedown", doMouseDown, false);
	canvas.addEventListener("mouseup", doMouseUp, false);
	canvas.addEventListener("mousemove", doMouseMove, false);
	canvas.addEventListener("mousewheel", doMouseWheel, false);

	window.addEventListener("keyup", keyFunctionUp, false);
	window.addEventListener("keydown", keyFunctionDown, false);

	window.onresize = doResize;
	canvas.width  = window.innerWidth-16;
	canvas.height = window.innerHeight-280;
	try{
		gl= canvas.getContext("webgl2");
	} catch(e){
		console.log(e);
	}
		
	if(gl){
		// Compile and link shaders
		program = gl.createProgram();
		var v1 = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(v1, vs);
		gl.compileShader(v1);
		if (!gl.getShaderParameter(v1, gl.COMPILE_STATUS)) {
			alert("ERROR IN VS SHADER : " + gl.getShaderInfoLog(v1));
		}
		var v2 = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(v2, fs);
		gl.compileShader(v2);
		if (!gl.getShaderParameter(v2, gl.COMPILE_STATUS)) {
			alert("ERROR IN FS SHADER : " + gl.getShaderInfoLog(v2));
		}
		gl.attachShader(program, v1);
		gl.attachShader(program, v2);
		gl.linkProgram(program);

		gl.useProgram(program);


		// links mesh attributes to shader attributes
		program.vertexPositionAttribute = gl.getAttribLocation(program, "in_pos");
		gl.enableVertexAttribArray(program.vertexPositionAttribute);

		program.vertexNormalAttribute = gl.getAttribLocation(program, "in_norm");
		gl.enableVertexAttribArray(program.vertexNormalAttribute);

		program.textureCoordAttribute = gl.getAttribLocation(program, "in_uv");
		gl.enableVertexAttribArray(program.textureCoordAttribute);


		for(var i = 0; i < unifParArray.length; i++) {
			program[unifParArray[i].pGLSL+"Uniform"] = gl.getUniformLocation(program, unifParArray[i].pGLSL);
		}

		// prepares the world, view and projection matrices.
		var w=canvas.clientWidth;
		var h=canvas.clientHeight;

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.viewport(0.0, 0.0, w, h);
		gl.clear(gl.COLOR_BUFFER_BIT);
		perspectiveMatrix = utils.MakePerspective(60, w/h, 0.1, 1000.0);


	 	// turn on depth testing
	    gl.enable(gl.DEPTH_TEST);

		// algin the skybox with the light
		gLightDir = [-1.0, 0.0, 0.0, 0.0];
		skyboxWM = utils.MakeRotateYMatrix(135);
		gLightDir = utils.multiplyMatrixVector(skyboxWM, gLightDir);

		loadMeshAndWorldMatrix();
		drawScene();


	}else{
		alert("Error: WebGL not supported by your browser!");
	}
}


function loadMeshAndWorldMatrix(){
	mesh[0] = loadMeshInfoURL("Assert\\Cube00.obj");
	mesh[1] = loadMeshInfoURL("Assert\\Cube01.obj");
	mesh[2] = loadMeshInfoURL("Assert\\Cube02.obj");
	mesh[3] = loadMeshInfoURL("Assert\\Cube10.obj");
	mesh[4] = loadMeshInfoURL("Assert\\Cube11.obj");
	mesh[5] = loadMeshInfoURL("Assert\\Cube12.obj");
	mesh[6] = loadMeshInfoURL("Assert\\Cube20.obj");
	mesh[7] = loadMeshInfoURL("Assert\\Cube21.obj");
	mesh[8] = loadMeshInfoURL("Assert\\Cube22.obj");

	mesh[9] = loadMeshInfoURL("Assert\\Cube00_M.obj");
	mesh[10] = loadMeshInfoURL("Assert\\Cube01_M.obj");
	mesh[11] = loadMeshInfoURL("Assert\\Cube02_M.obj");
	mesh[12] = loadMeshInfoURL("Assert\\Cube10_M.obj");
	mesh[13] = loadMeshInfoURL("Assert\\Cube12_M.obj");
	mesh[14] = loadMeshInfoURL("Assert\\Cube20_M.obj");
	mesh[15] = loadMeshInfoURL("Assert\\Cube21_M.obj");
	mesh[16] = loadMeshInfoURL("Assert\\Cube22_M.obj");


	mesh[17] = loadMeshInfoURL("Assert\\Cube00_B.obj");
	mesh[18] = loadMeshInfoURL("Assert\\Cube01_B.obj");
	mesh[19] = loadMeshInfoURL("Assert\\Cube02_B.obj");
	mesh[20] = loadMeshInfoURL("Assert\\Cube10_B.obj");
	mesh[21] = loadMeshInfoURL("Assert\\Cube11_B.obj");
	mesh[22] = loadMeshInfoURL("Assert\\Cube12_B.obj");
	mesh[23] = loadMeshInfoURL("Assert\\Cube20_B.obj");
	mesh[24] = loadMeshInfoURL("Assert\\Cube21_B.obj");
	mesh[25] = loadMeshInfoURL("Assert\\Cube22_B.obj");


	for(var i = 0; i < 26; i++)
	{
			cubeWorldMatrix[i] = utils.MakeScaleMatrix(worldScale);
			cubeWorldMatrixOriginal[i] = utils.MakeScaleMatrix(worldScale);
			cubeWorldMatrixPrevious[i] = utils.MakeScaleMatrix(worldScale);
	}

	//TODO Try to find the cube position
	// cubeWorldMatrix[9] = utils.multiplyMatrices(utils.MakeScaleMatrix(worldScale),utils.MakeRotateXMatrix(40));

}

function drawScene(){

	// update World matrix
	updateBlocksWorldMatrixForAnimation();

	//Move the light position
	lightPositionX = lightPositionX + lightMoveX;
	lightPositionY = lightPositionY + lightMoveY;


	cz = lookRadius * Math.cos(utils.degToRad(-angle)) * Math.cos(utils.degToRad(-elevation));
	cx = lookRadius * Math.sin(utils.degToRad(-angle)) * Math.cos(utils.degToRad(-elevation));
	cy = lookRadius * Math.sin(utils.degToRad(-elevation));

	// The Camera is fixed
	viewMatrix = utils.MakeView(cx, cy, cz, elevation, -angle);
	projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewMatrix);

	for(var i = 0; i < 26; i++)
	{
		// draws the request
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh[i].vertexBuffer);
		gl.vertexAttribPointer(program.vertexPositionAttribute, mesh[i].vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, mesh[i].textureBuffer);
		gl.vertexAttribPointer(program.textureCoordAttribute, mesh[i].textureBuffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, mesh[i].normalBuffer);
		gl.vertexAttribPointer(program.vertexNormalAttribute, mesh[i].normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh[i].indexBuffer);

		gl.uniform1i(program.u_textureUniform, 0);
		gl.uniform3f(program.eyePosUniform, cx, cy, cz);

		const WVPMatrix = utils.multiplyMatrices(projectionMatrix, cubeWorldMatrix[i]);
		gl.uniformMatrix4fv(program.pMatrixUniform, gl.FALSE, utils.transposeMatrix(WVPMatrix));
		gl.uniformMatrix4fv(program.wMatrixUniform, gl.FALSE, utils.transposeMatrix(cubeWorldMatrix[i]));


		gl.drawElements(gl.TRIANGLES, mesh[i].indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
	}

	for(var m = 0; m < unifParArray.length; m++) {
		unifParArray[m].type(gl);
	}

	window.requestAnimationFrame(drawScene);
}


function loadOBJText(fileName){
	var request = new XMLHttpRequest();

	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status !== 404) {
			// console.log(fileName + "Loaded successful");
			// console.log(request.responseText);
			return request.responseText;//onReadOBJFile(request.responseText, objModel);
		}
		else if(request.status === 404) // File not found
			console.log("obj file loading failed：" + fileName);
	}


	//TODO Fix the runtime error
	// Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience.
	// For more help, check https://xhr.spec.whatwg.org/.

	// Create a request to get the file, the last parameter indicates the asynchronous method
	request.open('GET', fileName, false); 
	request.send();  // send request
	// console.log("Start loading texture files：" + fileName);
	return request.responseText;
}
	