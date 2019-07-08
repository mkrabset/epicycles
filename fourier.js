var complex=require('./complex.js')

module.exports = {
  fourier: (p) => {
    var result=[]
    for (var n=-p.length+1;n<p.length;n++) {
      var sum = complex.create(0,0)
      var n2pi=n*2*Math.PI
      for (var i=0;i<p.length;i++) {
        var expfactor=complex.exp(complex.create(0,-n2pi*i/p.length))
        var funcfactor=p[i]
        var delta_t=1/p.length
        var term=complex.mul(complex.mul(expfactor,funcfactor),complex.create(delta_t,0))
        sum=complex.add(sum,term)
      }
      result.push({freq: n, constant:sum})
    }
    return result
  },

  invfourier: (c, maxfreq) => {
    var result=[]
    for (var t=0;t<=1.01;t+=0.001) {
      var sum=complex.create(0,0)
      for (var i=0;i<c.length;i++) {
        if (Math.abs(c[i].freq)>maxfreq) continue
        var expfactor=complex.exp(complex.create(0,2*Math.PI*t*c[i].freq))
        sum=complex.add(sum,complex.mul(c[i].constant,expfactor))
      }  
      result.push(sum)
    }
    return result
  }
}
