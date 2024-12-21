
const alert = document.querySelector(".alertMessage");
if (alert.innerText !== '') {
    alert.style.top = '15%'
    alert.style.opacity = '1'
    setTimeout(() => {
        alert.style.opacity = '0'
    }, 2000);
}


const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});