// OBJ文件读取并解析
function onReadComplete(gl, model, objDoc) {
    //从OBJ文件中读取顶点坐标、颜色、法线、索引等用于绘图的信息
    var drawingInfo = objDoc.getDrawingInfo()

    //顶点坐标、颜色、法线写入缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.vertices, gl.STATIC_DRAW)

    gl.bindBuffer(gl.ARRAY_BUFFER, model.normalBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.normals, gl.STATIC_DRAW)

    gl.bindBuffer(gl.ARRAY_BUFFER, model.colorBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.colors, gl.STATIC_DRAW)

    //顶点索引写入缓冲区对象
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, drawingInfo.indices, gl.STATIC_DRAW)

    return drawingInfo
}
