
const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from(".nav",{
        y:-'10',
        opacity:0,
        duration:1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem",{
        y:-0,
        duration:2,
        ease: Expo.easeInOut,
        delay:-1,
        stagger:0.2
    })
    .from(".herofooter",{
        y:-'10',
        opacity:0,
        duration:1.5,
        delay:-1,
        ease: Expo.easeInOut
    })
}

function circleChangeOnMove(){
    // default scale value
    var xscale = 1;
    var yscale = 1;


    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function(dets){
      var xdiff = dets.clientX - xprev;
      var ydiff = dets.clientY - yprev;

      xscale = gsap.utils.clamp(0.8,1.2,xdiff)
      yscale = gsap.utils.clamp(0.8,1.2,ydiff)
      
      xprev = dets.clientX
      yprev = dets.clientY

      circleMouseFollower(xscale,yscale)
    });
}


function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
    this.document.querySelector('.minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`
})
}

circleChangeOnMove()
circleMouseFollower()
firstPageAnim()

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
  });