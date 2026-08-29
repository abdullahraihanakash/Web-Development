// Select all hidden elements
const hiddenElements = document.querySelectorAll(".hidden");

// Create the observer
const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            // Element entered the viewport
            entry.target.classList.add("show");

        } else {

            // Element left the viewport
            entry.target.classList.remove("show");

        }

    });

});

// Observe every hidden element
hiddenElements.forEach((el) => observer.observe(el));