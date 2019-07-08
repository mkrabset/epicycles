
module.exports = {
  create: (a,b) => ({a,b}),

  conj:  (c) => ({a:c.a, b:-c.b}),

  mul: (c1,c2) => ({a:c1.a*c2.a-c1.b*c2.b, b:c1.a*c2.b+c2.a*c1.b}),
  
  div: (c1,c2) => {
    let divisor=c2.a*c2.a+c2.b*c2.b
    let dividend=module.exports.mul(c1,module.exports.conj(c2))   
    return { a: dividend.a/divisor, b: dividend.b/divisor }
  },

  add: (c1,c2) => ({a:c1.a+c2.a, b: c1.b+c2.b}),

  neg: (c) => ({a:-c.a, b:-c.b}),

  exp: (c) => {
    var realfactor=Math.exp(c.a)
    return {a: realfactor*Math.cos(c.b), b: realfactor*Math.sin(c.b)}
  },

  magnitude: (c) => Math.sqrt(c.a*c.a+c.b*c.b),

  log: (c1) => { console.log(JSON.stringify(c1)) }
}


