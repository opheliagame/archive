
var size = new Size(600, 600);
project.currentStyle = {
    strokeColor: 'black',
    strokeWidth: 1,
    strokeCap: 'round'
}

var links = ['writings', 'projects', 'github', 'poems']
var linkCount = 0

var center = view.center
var to = center + new Point(80, 0)
var from = center - new Point(0, Math.sqrt(20*20-10*10))
var len = (to-from).length
for(var i = 0; i < 30; i++) {
    
    var path = new Path.Line(from, to)
    var pathCenter = (from+to)/2
    var normal = path.getNormalAt(path.length/2) * 10
    // var normLine = new Path.Line(pathCenter, pathCenter+normal)
    // normLine.strokeColor = 'red'
    // 
    var tangent = path.getTangentAt(path.length/2) 
    // tangent.rotate(90, to)
    var tanLine = new Path.Line(to, to+(tangent* (len+80)))
    tanLine.rotate(180-60, to)
    // tanLine.strokeColor = 'yellow'
    
    // drawing text
    if (Math.random() < 0.2 && linkCount < links.length) {
        // path.strokeColor = '#4ade80'
        // path.fill = '#4ade80'
        
        var pos = pathCenter
        var a = new PointText(pos.x, pos.y)
        a.strokeWidth = 0.1
        a.justification = 'center'
        a.fillColor = 'black'
        a.style = {
            fontSize: 24,
            fontWeight: 'bold'
        }
    
        a.content = links[linkCount].toUpperCase()
        a.rotate(tangent.angle, pathCenter)
        linkCount += 1
    }
    
    var temp = from
    from = to
    to = tanLine.lastSegment.point
    len += 30
    
}