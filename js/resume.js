// @ts-check
const educationList = document.querySelector('.education-list');

const educationBoxes = Array.from(educationList.children).filter(
  (node) => node.nodeName !== '#text'
);

const carousalDots = document.createElement('div');
carousalDots.classList.add('carousal-dots');
educationList.appendChild(carousalDots);

for (const _ of educationBoxes) {
  const dot = document.createElement('button');
  dot.classList.add('carousal-dot');

  dot.addEventListener('click', (e) => {
    const idx = Array.from(carousalDots.children).indexOf(dot);
    const box = educationBoxes[idx];

    box.scrollIntoView({ behavior: 'smooth' });
  });

  carousalDots.appendChild(dot);
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.intersectionRatio >= 0.1) {
        const currentBoxIndex = educationBoxes.indexOf(entry.target);
        const currentDot = carousalDots.children[currentBoxIndex];

        Array.from(carousalDots.children).forEach((dot) => dot.classList.remove('visible'));

        currentDot.classList.add('visible');
      }
    }
  },
  { threshold: 0.1 }
);

for (const box of educationBoxes) {
  observer.observe(box);
}
