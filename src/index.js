gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
const asscroll = new ASScroll({
  disableRaf: true,
  ease: 0.03,
});


gsap.ticker.add(asscroll.update);

ScrollTrigger.defaults({
  scroller: asscroll.containerElement,
});

ScrollTrigger.scrollerProxy(asscroll.containerElement, {
  scrollTop(value) {
    return arguments.length
    ? (asscroll.currentPos = value)
    : asscroll.currentPos;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

asscroll.on("update", ScrollTrigger.update);
ScrollTrigger.addEventListener("refresh", asscroll.resize);

window.addEventListener("load", () => {
  asscroll.enable();
});

const images = gsap.utils.toArray("img");
const loader = document.querySelector(".loader-text");

const updateProgress = (instance) =>
(loader.textContent = `${Math.round(
    (instance.progressedCount * 100) / images.length
  )}%`);
  
  const showDemo = () => {
    document.body.style.overflow = "auto";
    document.scrollingElement.scrollTo(0, 0);
    gsap.to(document.querySelector(".loader"), { autoAlpha: 0 });
    
    gsap.utils.toArray("#runnable").forEach((section, index) => {
      const w = section.querySelector(".wrapper");
      const [x, xEnd] =
      index % 2
      ? ["100%", (w.scrollWidth - section.offsetWidth) * -1]
      : [w.scrollWidth * -1, 0];
      gsap.fromTo(
        w,
        { x },
        {
          x: xEnd,
          scrollTrigger: {
            trigger: section,
            scrub: 0.5,
          },
        }
      );
    });
  };
  
  document.querySelectorAll("#menu a").forEach((item, index) => {
    item.addEventListener("click", (event) => {
      // Prevent the default action
      event.preventDefault();
      let target = event.target;
      let hash = target.hash;
  
      console.log(hash);
  
      gsap.to(window, {
        duration: 1,
        scrollTo: hash,
        ease: "Power1.easeInOut",
      });
    });
  });

  imagesLoaded(images).on("progress", updateProgress).on("always", showDemo);
  