gsap.from(".note", {
  opacity: 0,
  duration: 1,
  y: 100,
  stagger: 0.5,
});

gsap.from(".recent h2", {
  opacity: 0,
  x: -100,
});

gsap.from(".options", {
  opacity: 0,
  duration: 1,
  y: -200,
  stagger: 0.4,
});
