
// Navigation buttons

closeSlides = () => {
    // Variables
    var slides = document.querySelector('#slides');
    var hotspots = document.querySelector('#hotspots');
    var skybox = document.querySelector('#skybox');
    var nextbut = document.querySelector('#nextbut');
    var previousbut = document.querySelector('#previousbut');
    slides.setAttribute('class', 'hidden');
    hotspots.setAttribute('visible', true);
    skybox.setAttribute('material', 'transparent: true; opacity: 1;');
    nextbut.setAttribute('onclick', 'nextSlide()');
    previousbut.setAttribute('onclick', 'previousSlide()');
};

nextSlide = (steps, items) => {
    // Variables
    var slide = document.querySelector('#slide');
    var slideStyle = slide.getAttribute('style');
    var previousStep = parseFloat(slide.getAttribute('style').slice(slideStyle.indexOf(')') +1, slideStyle.indexOf('%')));
    //var currentIndex = (steps.indexOf(previousStep) + 1) % steps.length; //
    var currentIndex = (steps.indexOf(previousStep) + 1) % items;
    // Modifies the HTML tag to show the next sprite in the sprite map
    slide.setAttribute('style', slideStyle.slice(0, slideStyle.indexOf(')') +1) + steps[currentIndex] + '% 0; background-repeat: no-repeat; 	background-size: cover;')
};

previousSlide = (steps, items) => {
    // Variables
    var slide = document.querySelector('#slide');
    var slideStyle = slide.getAttribute('style');
    var previousStep = parseFloat(slide.getAttribute('style').slice(slideStyle.indexOf(')') +1, slideStyle.indexOf('%')));
    //var currentIndex = (steps.indexOf(previousStep) - 1) % steps.length;
    var currentIndex = (steps.indexOf(previousStep) - 1) % items;
    // Modifies the HTML tag to show the previous sprite in the sprite map
    slide.setAttribute('style', slideStyle.slice(0, slideStyle.indexOf(')') +1) + steps[currentIndex] + '% 0; background-repeat: no-repeat; 	background-size: cover;')
};
