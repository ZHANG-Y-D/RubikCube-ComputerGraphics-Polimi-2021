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

var reqData = [
	{text: "Lambert diffuse and Ambient material. No specular or emisssion.",
	 sel: {	ambientType: "ambient",
			diffuseType: "lambert",
			specularType: "none",
			LAlightType: "direct",
			LBlightType: "none",
			LClightType: "none",
			emissionType: "No"
	 } },
	{text: "Lambert diffuse and Blinn specular. No ambient and emission.",
	 sel: {	ambientType: "none",
			diffuseType: "lambert",
			specularType: "blinn",
			LAlightType: "direct",
			LBlightType: "none",
			LClightType: "none",
			emissionType: "No"
	 } },
	{text: "Ambient and Phong specular. No emssion and no diffuse.",
	 sel: {	ambientType: "ambient",
			diffuseType: "none",
			specularType: "blinn",
			LAlightType: "direct",
			LBlightType: "none",
			LClightType: "none",
			emissionType: "No"
	 } },
	{text: "Diffuse, ambient, emission and Phong specular.",
	 sel: {	ambientType: "ambient",
			diffuseType: "lambert",
			specularType: "phong",
			LAlightType: "direct",
			LBlightType: "none",
			LClightType: "none",
			emissionType: "Yes"
	 } },
	{text: "Ambient, Toon diffuse and and Toon (Blinn based) specular. No emssion",
	 sel: {	ambientType: "ambient",
			diffuseType: "toon",
			specularType: "toonB",
			LAlightType: "direct",
			LBlightType: "none",
			LClightType: "none",
			emissionType: "No"
	 } }
];

var curr_Shader = 0;

function ChangeShader(delta) {
	curr_Shader = (curr_Shader + delta) % reqData.length;

	if(curr_Shader == 0) {
		document.getElementById("nextButton").style.display = "";
		document.getElementById("prevButton").style.display = "none";
	} else if(curr_Shader == reqData.length - 1) {
		document.getElementById("nextButton").style.display = "none";
		document.getElementById("prevButton").style.display = "";
	} else {
		document.getElementById("nextButton").style.display = "";
		document.getElementById("prevButton").style.display = "";
	}
	
	document.getElementById("p1").innerHTML = reqData[curr_Shader].text;

	for(var name in reqData[curr_Shader].sel) {
		value = reqData[curr_Shader].sel[name];
		document.getElementById(name).value = value;
		showHideUI(name, value);
	}

	setShader();
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
	fs_norm = in_norm;
	fs_uv = vec2(in_uv.x, 1.0-in_uv.y);
	
	gl_Position = pMatrix * vec4(in_pos, 1.0);
}`;

// Fragment shader
var fs1 = `#version 300 es
precision highp float;

in vec3 fs_pos;
in vec3 fs_norm;
in vec2 fs_uv;

uniform sampler2D u_texture;
uniform vec3 eyePos;

uniform vec4 ambientType;
uniform vec4 diffuseType;
uniform vec4 specularType;

uniform vec4 LAlightType;
uniform vec3 LAPos;
uniform vec3 LADir;
uniform float LAConeOut;
uniform float LAConeIn;
uniform float LADecay;
uniform float LATarget;
uniform vec4 LAlightColor;

uniform vec4 LBlightType;
uniform vec3 LBPos;
uniform vec3 LBDir;
uniform float LBConeOut;
uniform float LBConeIn;
uniform float LBDecay;
uniform float LBTarget;
uniform vec4 LBlightColor;

uniform vec4 LClightType;
uniform vec3 LCPos;
uniform vec3 LCDir;
uniform float LCConeOut;
uniform float LCConeIn;
uniform float LCDecay;
uniform float LCTarget;
uniform vec4 LClightColor;

uniform vec4 ambientLightColor;
uniform vec4 ambientLightLowColor;
uniform vec3 ADir;
uniform vec4 diffuseColor;
uniform float DTexMix;
uniform vec4 specularColor;
uniform float SpecShine;
uniform float DToonTh;
uniform float SToonTh;
uniform vec4 ambientMatColor;
uniform vec4 emitColor;

out vec4 color;

vec3 compLightDir(vec3 LPos, vec3 LDir, vec4 lightType) {
	//lights
	// -> Point
	vec3 pointLightDir = normalize(LPos - fs_pos);
	// -> Direct
	vec3 directLightDir = LDir;
	// -> Spot
	vec3 spotLightDir = normalize(LPos - fs_pos);

	return            directLightDir * lightType.x +
					  pointLightDir * lightType.y +
					  spotLightDir * lightType.z;
}

vec4 compLightColor(vec4 lightColor, float LTarget, float LDecay, vec3 LPos, vec3 LDir,
					float LConeOut, float LConeIn, vec4 lightType) {
	float LCosOut = cos(radians(LConeOut / 2.0));
	float LCosIn = cos(radians(LConeOut * LConeIn / 2.0));

	//lights
	// -> Point
	vec4 pointLightCol = lightColor * pow(LTarget / length(LPos - fs_pos), LDecay);
	// -> Direct
	vec4 directLightCol = lightColor;
	// -> Spot
	vec3 spotLightDir = normalize(LPos - fs_pos);
	float CosAngle = dot(spotLightDir, LDir);
	vec4 spotLightCol = lightColor * pow(LTarget / length(LPos - fs_pos), LDecay) *
						clamp((CosAngle - LCosOut) / (LCosIn - LCosOut), 0.0, 1.0);
	// ----> Select final component
	return          directLightCol * lightType.x +
					pointLightCol * lightType.y +
					spotLightCol * lightType.z;
}

vec4 compAmbient(vec3 normalVec) {
	// Ambient
	// --> Ambient
	vec4 ambientAmbient = ambientLightColor;
	// --> Hemispheric
	float amBlend = (dot(normalVec, ADir) + 1.0) / 2.0;
	vec4 ambientHemi = ambientLightColor * amBlend + ambientLightLowColor * (1.0 - amBlend);
	// ----> Select final component
	return 		   ambientAmbient * ambientType.x +
				   ambientHemi    * ambientType.y;
}




void main() {
	vec4 texcol = texture(u_texture, fs_uv);
	vec4 diffColor = diffuseColor * (1.0-DTexMix) + texcol * DTexMix;
	vec4 ambColor = ambientMatColor * (1.0-DTexMix) + texcol * DTexMix;
	vec4 emit = emitColor * (1.0-DTexMix) +
				   texcol * DTexMix * 
				   			max(max(emitColor.r, emitColor.g), emitColor.b);
	
	vec3 normalVec = normalize(fs_norm);
	vec3 eyedirVec = normalize(eyePos - fs_pos);
		
	//lights
	vec3 lightDirA = compLightDir(LAPos, LADir, LAlightType);
	vec4 lightColorA = compLightColor(LAlightColor, LATarget, LADecay, LAPos, LADir,
								     LAConeOut, LAConeIn, LAlightType);
	
	vec3 lightDirB = compLightDir(LBPos, LBDir, LBlightType);
	vec4 lightColorB = compLightColor(LBlightColor, LBTarget, LBDecay, LBPos, LBDir,
								     LBConeOut, LBConeIn, LBlightType);
	
	vec3 lightDirC = compLightDir(LCPos, LCDir, LClightType);
	vec4 lightColorC = compLightColor(LClightColor, LCTarget, LCDecay, LCPos, LCDir,
								     LCConeOut, LCConeIn, LClightType);
	// Ambient
	vec4 ambientLight = compAmbient(normalVec);
	
	vec4 out_color;
`;
var fs2 = `	
	color = vec4(out_color.rgb, 1.0);
}`;


// UI helper arrays

UIonOff = {
	LAlightType:{
		none:{
			LA13:false, LA14:false,
			LA21:false, LA22:false, LA23:false, LA24:false,
			LA31:false, LA32:false, LA33:false, LA34:false,
			LA41:false, LA42:false, LA43:false, LA44:false,
			LA51:false, LA52:false, LA53:false, LA54:false,
			LA61:false, LA62:false
		},
		direct:{
			LA13:true, LA14:true,
			LA21:false, LA22:false, LA23:false, LA24:false,
			LA31:false, LA32:false, LA33:false, LA34:false,
			LA41:false, LA42:false, LA43:false, LA44:false,
			LA51:true, LA52:true, LA53:false, LA54:false,
			LA61:true, LA62:true
		},
		point:{
			LA13:true, LA14:true,
			LA21:true, LA22:true, LA23:true, LA24:true,
			LA31:true, LA32:true, LA33:true, LA34:true,
			LA41:true, LA42:true, LA43:false, LA44:false,
			LA51:false, LA52:false, LA53:false, LA54:false,
			LA61:false, LA62:false
		},
		spot:{
			LA13:true, LA14:true,
			LA21:true, LA22:true, LA23:true, LA24:true,
			LA31:true, LA32:true, LA33:true, LA34:true,
			LA41:true, LA42:true, LA43:true, LA44:true,
			LA51:true, LA52:true, LA53:true, LA54:true,
			LA61:true, LA62:true
		}
	},
	LBlightType:{
		none:{
			LB13:false, LB14:false,
			LB21:false, LB22:false, LB23:false, LB24:false,
			LB31:false, LB32:false, LB33:false, LB34:false,
			LB41:false, LB42:false, LB43:false, LB44:false,
			LB51:false, LB52:false, LB53:false, LB54:false,
			LB61:false, LB62:false
		},
		direct:{
			LB13:true, LB14:true,
			LB21:false, LB22:false, LB23:false, LB24:false,
			LB31:false, LB32:false, LB33:false, LB34:false,
			LB41:false, LB42:false, LB43:false, LB44:false,
			LB51:true, LB52:true, LB53:false, LB54:false,
			LB61:true, LB62:true
		},
		point:{
			LB13:true, LB14:true,
			LB21:true, LB22:true, LB23:true, LB24:true,
			LB31:true, LB32:true, LB33:true, LB34:true,
			LB41:true, LB42:true, LB43:false, LB44:false,
			LB51:false, LB52:false, LB53:false, LB54:false,
			LB61:false, LB62:false
		},
		spot:{
			LB13:true, LB14:true,
			LB21:true, LB22:true, LB23:true, LB24:true,
			LB31:true, LB32:true, LB33:true, LB34:true,
			LB41:true, LB42:true, LB43:true, LB44:true,
			LB51:true, LB52:true, LB53:true, LB54:true,
			LB61:true, LB62:true
		}
	},
	LClightType:{
		none:{
			LC13:false, LC14:false,
			LC21:false, LC22:false, LC23:false, LC24:false,
			LC31:false, LC32:false, LC33:false, LC34:false,
			LC41:false, LC42:false, LC43:false, LC44:false,
			LC51:false, LC52:false, LC53:false, LC54:false,
			LC61:false, LC62:false
		},
		direct:{
			LC13:true, LC14:true,
			LC21:false, LC22:false, LC23:false, LC24:false,
			LC31:false, LC32:false, LC33:false, LC34:false,
			LC41:false, LC42:false, LC43:false, LC44:false,
			LC51:true, LC52:true, LC53:false, LC54:false,
			LC61:true, LC62:true
		},
		point:{
			LC13:true, LC14:true,
			LC21:true, LC22:true, LC23:true, LC24:true,
			LC31:true, LC32:true, LC33:true, LC34:true,
			LC41:true, LC42:true, LC43:false, LC44:false,
			LC51:false, LC52:false, LC53:false, LC54:false,
			LC61:false, LC62:false
		},
		spot:{
			LC13:true, LC14:true,
			LC21:true, LC22:true, LC23:true, LC24:true,
			LC31:true, LC32:true, LC33:true, LC34:true,
			LC41:true, LC42:true, LC43:true, LC44:true,
			LC51:true, LC52:true, LC53:true, LC54:true,
			LC61:true, LC62:true
		}
	},
	ambientType:{
		none:{
			A20:false, A21:false, A22:false,
			A31:false, A32:false,
			A41:false, A42:false,
			A51:false, A52:false,
			MA0:false, MA1:false, MA2:false
		},
		ambient:{
			A20:false, A21:true, A22:true,
			A31:false, A32:false,
			A41:false, A42:false,
			A51:false, A52:false,
			MA0:true, MA1:true, MA2:true
		},
		hemispheric:{
			A20:true, A21:false, A22:true,
			A31:true, A32:true,
			A41:true, A42:true,
			A51:true, A52:true,
			MA0:true, MA1:true, MA2:true
		}
	},
	diffuseType:{
		none:{
			D21:false, D22:false,
			D41:false, D42:false
		},
		lambert:{
			D21:true,  D22:true,
			D41:false, D42:false
		},
		toon:{
			D21:true,  D22:true,
			D41:true, D42:true
		}
	},
	specularType:{
		none:{
			S21:false, S22:false,
			S31:false, S32:false,
			S41:false, S42:false
		},
		phong:{
			S21:true, S22:true,
			S31:true, S32:true,
			S41:false, S42:false
		},
		blinn:{
			S21:true, S22:true,
			S31:true, S32:true,
			S41:false, S42:false
		},
		toonP:{
			S21:true, S22:true,
			S31:false, S32:false,
			S41:true, S42:true
		},
		toonB:{
			S21:true, S22:true,
			S31:false, S32:false,
			S41:true, S42:true
		}
	}, 
	emissionType:{
		Yes: {ME1:true,  ME2:true},
		No:  {ME1:false, ME2:false}
	}
}


function showHideUI(tag, sel) {
	for(var name in UIonOff[tag][sel]) {
		document.getElementById(name).style.display = UIonOff[tag][sel][name] ? "block" : "none";
	}
}

function showLight(sel) {
	document.getElementById("LA").style.display = (sel == "LA") ? "block" : "none";
	document.getElementById("LB").style.display = (sel == "LB") ? "block" : "none";
	document.getElementById("LC").style.display = (sel == "LC") ? "block" : "none";
}

defShaderParams = {
	ambientType: "ambient",
	diffuseType: "lambert",
	specularType: "phong",
	ambientLightColor: "#555555",
	diffuseColor: "#00ffff",
	specularColor: "#ffffff",
	ambientLightLowColor: "#002200",
	ambientMatColor: "#00ffff",
	emitColor: "#888888",

	LAlightType: "direct",
	LAlightColor: "#ffffff",
	LAPosX: 20,
	LAPosY: 30,
	LAPosZ: 50,
	LADirTheta: 60,
	LADirPhi: 45,
	LAConeOut: 30,
	LAConeIn: 80,
	LADecay: 0,
	LATarget: 61,

	LBlightType: "none",
	LBlightColor: "#ffffff",
	LBPosX: -40,
	LBPosY: 30,
	LBPosZ: 50,
	LBDirTheta: 60,
	LBDirPhi: 135,
	LBConeOut: 30,
	LBConeIn: 80,
	LBDecay: 0,
	LBTarget: 61,

	LClightType: "none",
	LClightColor: "#ffffff",
	LCPosX: 60,
	LCPosY: 30,
	LCPosZ: 50,
	LCDirTheta: 60,
	LCDirPhi: -45,
	LCConeOut: 30,
	LCConeIn: 80,
	LCDecay: 0,
	LCTarget: 61,

	ADirTheta: 0,
	ADirPhi: 0,
	DTexMix: 100,
	SpecShine: 100,
	DToonTh: 50,
	SToonTh: 90,
	
	emissionType: "No"
}

function resetShaderParams() {
	for(var name in defShaderParams) {
		value = defShaderParams[name];
		document.getElementById(name).value = value;
		if(document.getElementById(name).type == "select-one") {
			showHideUI(name, value);
		}
	}
	
	cx = 2.0;
	cy = 2.0;
	cz = 6.5;
	elevation = -30.0;
	angle = 45.0;
	roll = 0.01;
	lookRadius = 5.0;
	
	if(gl) {
		setWorldMesh();
	}
}

function unifPar(pHTML, pGLSL, type) {
	this.pHTML = pHTML;
	this.pGLSL = pGLSL;
	this.type = type;
}

function noAutoSet(gl) {
}

function val(gl) {
	gl.uniform1f(program[this.pGLSL+"Uniform"], document.getElementById(this.pHTML).value);
}

function valD10(gl) {
	gl.uniform1f(program[this.pGLSL+"Uniform"], document.getElementById(this.pHTML).value / 10);
}

function valD100(gl) {
	gl.uniform1f(program[this.pGLSL+"Uniform"], document.getElementById(this.pHTML).value / 100);
}

function valCol(gl) {
	col = document.getElementById(this.pHTML).value.substring(1,7);
    R = parseInt(col.substring(0,2) ,16) / 255;
    G = parseInt(col.substring(2,4) ,16) / 255;
    B = parseInt(col.substring(4,6) ,16) / 255;
	gl.uniform4f(program[this.pGLSL+"Uniform"], R, G, B, 1);
}

function valVec3(gl) {
	gl.uniform3f(program[this.pGLSL+"Uniform"],
				 document.getElementById(this.pHTML+"X").value / 10,
				 document.getElementById(this.pHTML+"Y").value / 10,
				 document.getElementById(this.pHTML+"Z").value / 10);
}

function valDir(gl) {
	var t = utils.degToRad(document.getElementById(this.pHTML+"Theta").value);
	var p = utils.degToRad(document.getElementById(this.pHTML+"Phi").value);
	gl.uniform3f(program[this.pGLSL+"Uniform"],Math.sin(t)*Math.sin(p), Math.cos(t), Math.sin(t)*Math.cos(p));
}

valTypeDecoder = {
	LAlightType:{
		none: [0,0,0,0],
		direct: [1,0,0,0],
		point: [0,1,0,0],
		spot: [0,0,1,0]
	},
	LBlightType:{
		none: [0,0,0,0],
		direct: [1,0,0,0],
		point: [0,1,0,0],
		spot: [0,0,1,0]
	},
	LClightType:{
		none: [0,0,0,0],
		direct: [1,0,0,0],
		point: [0,1,0,0],
		spot: [0,0,1,0]
	},
	ambientType:{
		none: [0,0,0,0],
		ambient: [1,0,0,0],
		hemispheric: [0,1,0,0]
	},
	diffuseType:{
		none: [0,0,0,0],
		lambert: [1,0,0,0],
		toon: [0,1,0,0]
	},
	specularType:{
		none: [0,0,0,0],
		phong: [1,0,0,0],
		blinn: [0,1,0,0],
		toonP: [0,0,1,0],
		toonB: [0,0,0,1]
	}
}

function valType(gl) {
	var v = valTypeDecoder[this.pHTML][document.getElementById(this.pHTML).value];
	gl.uniform4f(program[this.pGLSL+"Uniform"], v[0], v[1], v[2], v[3]);
}


unifParArray =[
	new unifPar("ambientType","ambientType", valType),
	new unifPar("diffuseType","diffuseType", valType),
	new unifPar("specularType","specularType", valType),

	new unifPar("LAlightType","LAlightType", valType),
	new unifPar("LAPos","LAPos", valVec3),
	new unifPar("LADir","LADir", valDir),
	new unifPar("LAConeOut","LAConeOut", val),
	new unifPar("LAConeIn","LAConeIn", valD100),
	new unifPar("LADecay","LADecay", val),
	new unifPar("LATarget","LATarget", valD10),
	new unifPar("LAlightColor","LAlightColor", valCol),

	new unifPar("LBlightType","LBlightType", valType),
	new unifPar("LBPos","LBPos", valVec3),
	new unifPar("LBDir","LBDir", valDir),
	new unifPar("LBConeOut","LBConeOut", val),
	new unifPar("LBConeIn","LBConeIn", valD100),
	new unifPar("LBDecay","LBDecay", val),
	new unifPar("LBTarget","LBTarget", valD10),
	new unifPar("LBlightColor","LBlightColor", valCol),

	new unifPar("LClightType","LClightType", valType),
	new unifPar("LCPos","LCPos", valVec3),
	new unifPar("LCDir","LCDir", valDir),
	new unifPar("LCConeOut","LCConeOut", val),
	new unifPar("LCConeIn","LCConeIn", valD100),
	new unifPar("LCDecay","LCDecay", val),
	new unifPar("LCTarget","LCTarget", valD10),
	new unifPar("LClightColor","LClightColor", valCol),

	new unifPar("ambientLightColor","ambientLightColor", valCol),
	new unifPar("ambientLightLowColor","ambientLightLowColor", valCol),
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


function setEveryMesh(){
	//mesh = returnMesh(cubeObj00);
}


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
	// document.getElementById("diffuseColor").value = "#ffffff";
	// document.getElementById("ambientMatColor").value = "#ffffff";
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

function setShader() {
	// Compile and link shaders
	program = gl.createProgram();
	var v1 = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(v1, vs);
	gl.compileShader(v1);
	if (!gl.getShaderParameter(v1, gl.COMPILE_STATUS)) {
		alert("ERROR IN VS SHADER : " + gl.getShaderInfoLog(v1));
	}
//console.log(fs1 + ShadersCode[curr_Shader] + fs2);
	var v2 = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(v2, fs1 + ShadersCode[curr_Shader] + fs2)
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
}

// The real app starts here
function main(){
	ShadersCode = shaders();
	resetShaderParams();
	document.getElementById("my-canvas").style.backgroundColor = "	#F5F5DC";
	// setup everything else
	var canvas = document.getElementById("my-canvas");
	canvas.addEventListener("mousedown", doMouseDown, false);
	canvas.addEventListener("mouseup", doMouseUp, false);
	canvas.addEventListener("mousemove", doMouseMove, false);
	canvas.addEventListener("mousewheel", doMouseWheel, false);
	canvas.addEventListener("mousewheel", mousePositionListener, false);
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
		curr_Shader = -1;
		ChangeShader(1);

		//setWorldMesh();
						
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
			cubeWorldMatrixPrevious[i] = utils.MakeScaleMatrix(worldScale);
	}

	//TODO Try to find the cube position
	// cubeWorldMatrix[9] = utils.multiplyMatrices(utils.MakeScaleMatrix(worldScale),utils.MakeRotateXMatrix(40));

}

function drawScene(){

	// update World matrix
	updateBlocksWorldMatrixForAnimation();
	//
	// update WV matrix
	// angle = angle + rvy;
	// elevation = elevation + rvx;

	cz = lookRadius * Math.cos(utils.degToRad(-angle)) * Math.cos(utils.degToRad(-elevation));
	cx = lookRadius * Math.sin(utils.degToRad(-angle)) * Math.cos(utils.degToRad(-elevation));
	cy = lookRadius * Math.sin(utils.degToRad(-elevation));

	// TODO Fix the Camera!!!
	//viewMatrix = utils.MakeView(2.9, 2.15, 2.98, -20, -45);
	viewMatrix = utils.MakeView(cx, cy, cz, elevation, -angle);
	// Magic for moving the car
	//worldMatrix = utils.MakeScaleMatrix(worldScale);
	projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewMatrix);
	for(var i = 0; i < 26; i++)
	{


		// draws the request
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh[i].vertexBuffer);
		gl.vertexAttribPointer(program.vertexPositionAttribute, mesh[i].vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

		//TODO fix the texture problem
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh[i].textureBuffer);
		gl.vertexAttribPointer(program.textureCoordAttribute, mesh[i].textureBuffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, mesh[i].normalBuffer);
		gl.vertexAttribPointer(program.vertexNormalAttribute, mesh[i].normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh[i].indexBuffer);


		gl.uniform1i(program.u_textureUniform, 0);
		gl.uniform3f(program.eyePosUniform, cx, cy, cz);

		WVPmatrix = utils.multiplyMatrices(projectionMatrix, cubeWorldMatrix[i]);
		gl.uniformMatrix4fv(program.pMatrixUniform, gl.FALSE, utils.transposeMatrix(WVPmatrix));
		gl.uniformMatrix4fv(program.wMatrixUniform, gl.FALSE, utils.transposeMatrix(cubeWorldMatrix[i]));

		gl.drawElements(gl.TRIANGLES, mesh[i].indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
	}

	for(var m = 0; m < unifParArray.length; m++) {
		unifParArray[m].type(gl);
	}

	window.requestAnimationFrame(drawScene);
}


function loadMesh(url) {
	const response = utils.loadFile(url);
	const text = response.text();
	//const mesh = new OBJ.Mesh(text);
	return text;
}

function loadOBJText(fileName){
	var request = new XMLHttpRequest();

	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status !== 404) {
			console.log(fileName + "Loaded successful");
			console.log(request.responseText);
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
	console.log("Start loading texture files：" + fileName);
	return request.responseText;
}
	