const hamburgerIcon = document.querySelector('.hamburger');
const crossIcon = document.querySelector('.cross');
const inquiryBtn = document.querySelector('.inquiry-btn');
const toursBtn = document.querySelector('.tours-btn');
const testimonialsBtn = document.querySelector('.testimonials-btn');


let navAnimation = gsap.to('nav ul', {
    right: 0,
    duration: 0.5,
});

navAnimation.pause();

hamburgerIcon.addEventListener("click", () => {
    navAnimation.play();
    hamburgerIcon.classList.toggle('hidden');
    crossIcon.classList.toggle('hidden');

    //Prevent home screen swiping
    document.querySelector('body').classList.toggle('no-scroll');

    gsap.from('nav ul li', {
        opacity: 0,
        x: 150,
        delay: 0.1,
        duration: 0.6,
        stagger: 0.2
    });

    gsap.from('nav ul .socials', {
        opacity: 0,
        y: 150,
        delay: 0.6,
        duration: 0.5
    });
    
});

crossIcon.addEventListener("click", () => {
    navAnimation.reverse();
    hamburgerIcon.classList.toggle('hidden');
    crossIcon.classList.toggle('hidden');

    document.querySelector('body').classList.toggle('no-scroll');
});

inquiryBtn.addEventListener('click', () => {
    if(window.innerWidth < 768) {
        navAnimation.reverse();
        hamburgerIcon.classList.toggle('hidden');
        crossIcon.classList.toggle('hidden');
        document.querySelector('body').classList.toggle('no-scroll');
    }
});

toursBtn.addEventListener('click', () => {
    if(window.innerWidth < 768) {
        navAnimation.reverse();
        hamburgerIcon.classList.toggle('hidden');
        crossIcon.classList.toggle('hidden');
        document.querySelector('body').classList.toggle('no-scroll');
    }
});

testimonialsBtn.addEventListener('click', () => {
    if(window.innerWidth < 768) {
        navAnimation.reverse();
        hamburgerIcon.classList.toggle('hidden');
        crossIcon.classList.toggle('hidden');
        document.querySelector('body').classList.toggle('no-scroll');
    }
});