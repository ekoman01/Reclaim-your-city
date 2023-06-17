const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({
    force3D: true,
  });
};

gsap.to(".starImage", 3, {
  rotation: "90",
  ease: Linear.easeNone,
  repeat: -1,
});

gsap.fromTo(
  ".whatIsListP",
  { x: -100, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: ".what_is_list",
      start: "start 100%",
      end: "start 40%",
      //markers: { fontSize: "25px", fontWeight: "bold" },
      toggleActions: "play none none none",
      scrub: 0.5,
    },
  }
);

gsap.fromTo(
  ".whatIsListImage",
  { x: 100, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: ".what_is_list",
      start: "start 80%",
      end: "start 20%",
      //markers: { fontSize: "25px", fontWeight: "bold" },
      toggleActions: "play none none none",
      scrub: 0.5,
    },
  }
);

gsap.fromTo(
  ".forWhoImage",
  { x: -100, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: ".for_who",
      start: "start 80%",
      end: "start 20%",
      //markers: { fontSize: "25px", fontWeight: "bold" },
      toggleActions: "play none none none",
      scrub: 0.5,
    },
  }
);

gsap.to(".middleObject", 0.8, {
  scale: "1.02",
  ease: Linear.easeNone,
  repeat: -1,
  yoyo: true,
});

gsap.fromTo(
  ".whereImage",
  { x: -100, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: ".where",
      start: "start 100%",
      end: "start 40%",
      //markers: { fontSize: "25px", fontWeight: "bold" },
      toggleActions: "play none none none",
      scrub: 0.5,
    },
  }
);

gsap.fromTo(
  ".finger",
  { scale: 0, opacity: 0 },
  {
    scale: 1,
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: ".outro",
      start: "start 40%",
      end: "start 20%",
      //markers: { fontSize: "25px", fontWeight: "bold" },
      toggleActions: "play none none none",
      scrub: 0.5,
    },
  }
);

const tlFinger = gsap.timeline({ repeat: -1 });

tlFinger.fromTo(".finger", {scale: 1}, { scale: 0.8 });
tlFinger.to(".finger", { scale: 1 });

const tlFestival = gsap.timeline({ repeat: -1 });

tlFestival.to(
  ".festival",
  {
    y: 0,
    rotation: -1,
  },
);

tlFestival.to(
  ".festival",
  {
    y: 10,
    rotation: 0,
  }
);
tlFestival.to(".festival", {
  y: -10,
  rotation: 1,
});
tlFestival.to(".festival", {
  y: 0,
  rotation: 0,
});