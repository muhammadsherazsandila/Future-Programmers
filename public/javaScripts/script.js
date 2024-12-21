
const alert = document.querySelector(".alertMessage");
if (alert.innerText !== '') {
    alert.style.top = '15%'
    alert.style.opacity = '1'
    setTimeout(() => {
        alert.style.opacity = '0'
    }, 2000);
}
