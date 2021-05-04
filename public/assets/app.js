let homeController = new ScrollMagic.Controller();

let jumboTL = gsap.timeline();

jumboTL.fromTo(
    "#jumbo h1",
    {
        y: 300,
        opacity: 0
    
    },
    {
        y: 0,
        opacity: 1,
        duration: 2
    }
);


// let jumboScene = new ScrollMagic.Scene({
//     triggerElement: "#jumbo",
//     triggerHook: 1,
//     reverse: true, 
//     offset: (document.querySelector("#jumbo").offsetHeight) + 100,
//     duration: 0,
// })
// .setTween(jumboTL)
// .addIndicators()
// .addTo(homeController)