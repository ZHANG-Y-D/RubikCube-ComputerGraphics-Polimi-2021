// 解析OBJ文件中的文本
OBJDoc.prototype.parse = function (fileString, scale, reverse) {
    var lines = fileString.split('\n') //根据换行符拆分成数组
    lines.push(null) //添加结束标识
    var index = 0 //初始化当前行索引

    var currentObject = null
    var currentMaterialName = ''
    // 按行解析
    var line //接收当前文本行内容
    var sp = new StringParser() // 创建StringParser对象
    while ((line = lines[index++]) != null) {
        sp.init(line) //初始化sp
        var command = sp.getWord() //获取指令名
        if (command == null) continue //判空处理

        switch (command) {
            case '#':
                continue //注释跳过
            case 'mtllib': //读取材质文件
                var path = this.parseMtllib(sp, this.fileName)
                var mtl = new MTLDoc() //创建MTLDoc对象
                this.mtls.push(mtl)
                var request = new XMLHttpRequest()
                request.onreadystatechange = function () {
                    if (request.readyState == 4) {
                        if (request.status != 404) {
                            onReadMTLFile(request.responseText, mtl)
                        } else {
                            mtl.complete = true
                        }
                    }
                }
                request.open('GET', path, true) //创建请求
                request.send() //发送请求
                continue //继续解析
            case 'o':
            case 'g': //读取对象名
                var object = this.parseObjectName(sp)
                this.objects.push(object)
                currentObject = object
                continue
            case 'v': //读取顶点
                var vertex = this.parseVertex(sp, scale)
                this.vertices.push(vertex)
                continue
            case 'vn': //读取法线
                var normal = this.parseNormal(sp)
                this.normals.push(normal)
                continue
            case 'usemtl': //读取材质名
                currentMaterialName = this.parseUsemtl(sp)
                continue
            case 'f': //读取表面
                var face = this.parseFace(
                    sp,
                    currentMaterialName,
                    this.vertices,
                    reverse
                )
                currentObject.addFace(face)
                continue //继续解析
        }
    }
    return true
}
