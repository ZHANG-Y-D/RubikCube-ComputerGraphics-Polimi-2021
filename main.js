
async function main() {

    var canvas = document.getElementById("canvas");

    canvas.addEventListener("mousedown", doMouseDown, false);
    canvas.addEventListener("mouseup", doMouseUp, false);
    canvas.addEventListener("mousemove", doMouseMove, false);


    var gl = canvas.getContext("webgl2");
    if(!gl) {
        document.write("GL context not opened");
        return;
    }



}