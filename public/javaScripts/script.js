
const alert = document.querySelector(".alertMessage");
if (alert.innerText !== '') {
    alert.style.top = '15%'
    alert.style.opacity = '1'
    setTimeout(() => {
        alert.style.opacity = '0'
    }, 2000);
}

document.addEventListener('click', (event) => {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = `${event.clientX - 10}px`;
    ripple.style.top = `${event.clientY - 10}px`;
    document.body.appendChild(ripple);

    // Remove the ripple after animation
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  });