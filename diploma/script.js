const arrow = document.querySelector('h6');
const pVisible = document.querySelector('.corporis-suscipit__p');
const arrowUp = document.querySelector('img[alt="arrow-up"]');
const arrowDown = document.querySelector('img[alt="arrow-down"]');

// arrow.addEventListener("click", () => {
//     pVisible.forEach(el => el.classList.toggle('display'));
//     pVisible.classList.add('none-display');
// });
arrow.onclick = function(){
    // pVisible.forEach(el => el.classList.toggle('display'));
    pVisible.classList.toggle('display');
    arrowUp.classList.toggle('display');
    arrowDown.classList.toggle('none-display');
}