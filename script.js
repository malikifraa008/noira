
// ===============================
// NOIRA - MAIN JAVASCRIPT
// ===============================


// 1. MOBILE NAVBAR

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("nav ul");

if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });
}


// 2. GALLERY CATEGORY FILTER

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.getAttribute("data-filter");

        galleryItems.forEach(function (item) {

            const itemCategory = item.getAttribute("data-category");

            if (category === "all" || category === itemCategory) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }

        });

    });

});


// 3. CONTACT FORM DEMO MESSAGE

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("form-message");

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        formMessage.textContent =
            "Thank you for contacting NOIRA! This is a demo form.";

        contactForm.reset();

    });

}


// 4. IMAGE PREVIEW

const images = document.querySelectorAll(".gallery-item img");

images.forEach(function (img) {

    img.style.cursor = "pointer";

    img.addEventListener("click", function () {

        const preview = document.createElement("div");

        preview.style.position = "fixed";
        preview.style.inset = "0";
        preview.style.background = "rgba(0,0,0,0.85)";
        preview.style.display = "flex";
        preview.style.justifyContent = "center";
        preview.style.alignItems = "center";
        preview.style.padding = "20px";
        preview.style.zIndex = "9999";
        preview.style.cursor = "pointer";

        const largeImage = document.createElement("img");

        largeImage.src = img.src;
        largeImage.alt = img.alt;
        largeImage.style.maxWidth = "90%";
        largeImage.style.maxHeight = "85vh";
        largeImage.style.objectFit = "contain";
        largeImage.style.borderRadius = "8px";

        preview.appendChild(largeImage);
        document.body.appendChild(preview);

        preview.addEventListener("click", function () {
            preview.remove();
        });

    });

});
