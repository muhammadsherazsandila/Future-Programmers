// Function to toggle the mobile menu
function toggleMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.toggle("hidden");
    mobileMenu.inn
}

const alert = document.querySelector(".alertMessage");
if (alert.innerText !== '') {
    alert.style.top = '15%'
    alert.style.opacity = '1'
    setTimeout(() => {
        alert.style.opacity = '0'
    }, 2000);
}
