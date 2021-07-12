//创建一个对象存放绘制需要的绑定在缓冲区对象的变量
function initVertexBuffers(gl, program) {
    var o = new Object()
    o.vertexBuffer = createEmptyArrayBuffer(gl, program.a_Position, 3, gl.FLOAT)
    o.normalBuffer = createEmptyArrayBuffer(gl, program.a_Normal, 3, gl.FLOAT)
    o.colorBuffer = createEmptyArrayBuffer(gl, program.a_Color, 4, gl.FLOAT)
    o.indexBuffer = gl.createBuffer()
    if (!o.vertexBuffer || !o.normalBuffer || !o.colorBuffer || !o.indexBuffer) {
        return null
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, null)

    return o
}

//为变量创建缓冲区对象、分配缓存并开启
function createEmptyArrayBuffer(gl, a_attribute, num, type) {
    var buffer = gl.createBuffer() //创建缓冲区对象
    if (!buffer) {
        console.log('创建缓冲区对象失败')
        return null
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer) //将buffer绑定到缓冲区对象
    gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0) //缓冲区对象分配给a_attribute指定的地址
    gl.enableVertexAttribArray(a_attribute) //开启a_attribute指定的变量

    return buffer
}
