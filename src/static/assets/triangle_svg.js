var size = new Size(600, 600);
project.currentStyle = {
    strokeColor: 'black',
    strokeWidth: 4,
    strokeCap: 'round'
}



var center = view.center
var to = center + new Point(10, 0)
var from = center - new Point(0, Math.sqrt(20*20-10*10))
var len = (to-from).length
for(let i = 0; i < 20; i++) {
    
    var path = new Path.Line(from, to)
    var pathCenter = (from+to)/2
    var normal = path.getNormalAt(path.length/2) * 10
    // var normLine = new Path.Line(pathCenter, pathCenter+normal)
    // normLine.strokeColor = 'red'
    // 
    var tangent = path.getTangentAt(path.length/2) * (len+10)
    // tangent.rotate(90, to)
    var tanLine = new Path.Line(to, to+(tangent))
    tanLine.rotate(180-60, to)
    // tanLine.strokeColor = 'yellow'
    
    var temp = from
    from = to
    to = tanLine.lastSegment.point
    len += 30
    
}