const chapters = [
  {
    name: "intro_left_where",
    text: "The festival will highlight certain places in Kortrijk. The main event will be at the Broelkaai. Here a “golden wall” will be erected to show the data we collected over the past school year. The golden paths will also overflow with the golden vision of Kortrijk.",
  },
  {
    name: "intro_left_when",
    text: "The event starts right after everyone is done with their exams, this way they can rap up their school year in fashion. <br> <br> The official date is 30 june.",
  },
  {
    name: "intro_left_who",
    text: "Our main goal is to inspire young adults and push the to go and explore the city. However this event is completely open to the public. Anyone can come, the more souls the more joy. ",
  },
];

const introLeftHover = () => {
    chapters.forEach((chapter) => {
      const chapterElement = document.querySelector(`.${chapter.name}`); 
        chapterElement.addEventListener("mouseover", () => { 
            document.querySelector(".intro_right_text").innerHTML = 
              chapter.text; 
        });
    });
};

const animations = () => {
  gsap.to(".starImage", 4, {
    rotation: "90",
    ease: Linear.easeNone,
    repeat: -1,
  });

  gsap.to(".apple", 0.3, { y: "-=10", yoyo: true, repeat: -1 });

  gsap.fromTo(
    ".decoText",
    { x: -200, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 2,
      scrollTrigger: {
        trigger: ".deco",
        start: "start 50%",
        end: "start 10%",
        //markers: { fontSize: "25px", fontWeight: "bold" },
        toggleActions: "play none none none",
        scrub: 0.5,
      },
    }
  );
  gsap.fromTo(
    ".decoImage",
    { x: 200, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 2,
      scrollTrigger: {
        trigger: ".deco",
        start: "start 50%",
        end: "start 10%",
        //markers: { fontSize: "25px", fontWeight: "bold" },
        toggleActions: "play none none none",
        scrub: 0.5,
      },
    }
  );

  // const eatDrinkTl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".eatndrink_bottom",
  //     start: "start 100%",
  //     end: "start 40%",
  //     markers: { fontSize: "25px", fontWeight: "bold" },
  //     toggleActions: "play none none none",
  //     scrub: 0.5,
  //   },
  // });
  // eatDrinkTl.fromTo(".one", { x: -200, opacity: 0 }, { x: 0, opacity: 1 });
  // eatDrinkTl.fromTo(".two", { x: -200, opacity: 0 }, { x: 0, opacity: 1 }, ">");
  // eatDrinkTl.fromTo(".three", { x: -200, opacity: 0 }, { x: 0, opacity: 1 }, ">");
    
};

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({
    force3D: true,
  });

  introLeftHover();
  animations();
};

init();