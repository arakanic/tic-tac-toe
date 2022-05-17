// class Game {
//   constructor() {
    
//   }
// }

const spaces = document.querySelectorAll('.space')

spaces.forEach(space => {
    space.addEventListener('click', () => {
        const span = document.createElement('span')
        span.innerText = 'X'
        space.appendChild(span)
    })
})

// spaces.forEach(space => {
//   space.addEventListener('click', select(space))
// })

// function select(space) {
//   if (space.innerHTML == false) {
//     const span = document.createElement('span')
//     span.innerText = 'X'
//     space.appendChild(span)
//   }
// }