let { pathDataToPolys } = require('svg-path-to-polygons');
let complex = require('./complex')

const flatMap = (f, arr) => arr.reduce((x, y) => [...x, ...f(y)], [])

const dist = (p1,p2) => Math.sqrt((p2[0]-p1[0])*(p2[0]-p1[0]) + (p2[1]-p1[1])*(p2[1]-p1[1]))  

const pathlength = (path) => path.map((cur,ind,p)=>ind==0 ? 0 : dist(cur,p[ind-1])).reduce((a,b)=>a+b,0)

const normalizeSegmentLengths = (path,divisions) => {
  var segLength=pathlength(path)/divisions
  var result=[path[0]]
  var ourpos=path[0]
  var nextpoint=1
  for (var i=1;i<divisions;i++) {
    var rem=segLength
    while (rem>dist(ourpos, path[nextpoint])) {
      rem-=dist(ourpos, path[nextpoint])
      ourpos=path[nextpoint]
      nextpoint++
    }
    var factor=rem/dist(ourpos,path[nextpoint])
    var x=ourpos[0]+(path[nextpoint][0]-ourpos[0])*factor
    var y=ourpos[1]+(path[nextpoint][1]-ourpos[1])*factor
    ourpos=[x,y]
    result.push(ourpos);
  }
  return result;
}

module.exports = {
  getNormalizedPath: (pathString, divisions=300) => {
    let points = flatMap(p=>p,pathDataToPolys(pathString, {tolerance:1, decimals:1}))  
    var normalized=normalizeSegmentLengths(points, divisions)
    return normalized.map(p=>(complex.create(p[0],-p[1])))
  }
}
