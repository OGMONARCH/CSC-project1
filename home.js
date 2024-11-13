document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    let count = 0;

    function nextSlide() {
        count = (count + 1) % 4; // Adjust the number based on the number of slides
        updateSlider();
    }

    function updateSlider() {
        const translateValue = -count * 100 + '%';
        slider.style.transform = 'translateX(' + translateValue + ')';
    }

    setInterval(nextSlide, 2000); // Change slide every 3 seconds (adjust as needed)
});



document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider2');
    let count = 0;

    function nextSlide() {
        count = (count + 1) % 6;
        updateSlider();
    }

    function updateSlider() {
        const translateValue = -count * 12 + '%';
        slider.style.transform = 'translateX(' + translateValue + ')';
    }

    setInterval(nextSlide, 4000); // Change slide every 6 seconds (adjust as needed)
});







  // Optional: Add JavaScript for slider functionality
//   let currentIndex = 0;
//   const slides = document.querySelectorAll('.christmas_box');
//   const totalSlides = slides.length;

//   function showSlide(index) {
//     if (index < 0) {
//       currentIndex = totalSlides - 1;
//     } else if (index >= totalSlides) {
//       currentIndex = 0;
//     } else {
//       currentIndex = index;
//     }

//     const transformValue = -100 * currentIndex + '%';
//     document.querySelector('.slider').style.transform = 'translateX(' + transformValue + ')';
//   }

//    document.querySelector('.second_Vector_box1').addEventListener('click', () => showSlide(currentIndex += 1));
//    document.querySelector('.second_Vector_box2').addEventListener('click', () => showSlide(currentIndex - 1));







