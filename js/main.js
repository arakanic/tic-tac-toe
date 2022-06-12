/************************************
Next task:
-> check for draw
-> then reconfigure assess() & display()
-> alert user to restart icon

Primary:
while game is being played
- accept, display store user choices
    -> x or o, alternating colors
- display option to restart game
- check for winning combination
end game
    -> if combination found, declare winner
    -> if all spaces are taken up without winner, declare draw

************************************/
const grid = document.querySelector('.grid')
const spaces = document.querySelectorAll('.space')
const marquee = document.getElementById('marquee')
const restart = document.getElementById('restart')

const purple = 'rgb(84, 84, 161)'
const gold = 'rgb(228, 226, 205)'

grid.addEventListener('click', evalClick)

restart.addEventListener('click', () => game.restart())

function evalClick(event) {
    let {target} = event
    let {className, id, innerText} = target
    // ignore clicks outside of a space or spaces already marked
    if (className != 'space') {
        return
    }
    // ignore if the space is already marked on a turn
    if (innerText.length > 0) {
        return
    }
    if (game['X'].includes(Number(id)) || game['O'].includes(Number(id))) {
        console.log('hmmmm')
        return
    }
    // Decision tree! pass event values into single game parse method
    // Let game constructor handle values
    // mark space
    let [move, next] = game.mark(id, target)
}

const game = {
    assess(mark, element, next) {
        let outcome = ""
        if (this.moveCount == 9) {
            // stop further user input
            // how should assess() and display() handle end game?
            outcome = "draw"
        }
        this.winning.forEach(pattern => {
            if (pattern.every(space => this[mark].includes(space)) === true) {
                // stop further user input
                // how should assess() and display() handle end game?
                outcome = "win"
            }
        })
        console.log("moveCount:", this.moveCount)
        this.display(mark, element, next, outcome)
    },
    display(mark, element, next, outcome) {
        // make mark
        element.innerText = mark
        marquee.innerText = next
        if (outcome == "win") {
            marquee.innerText = mark + ' wins!'
            console.log(marquee.innerText)
            console.log('Game over!')
            // stop input
            grid.removeEventListener('click', evalClick)
            return
        }
        if (outcome == "draw") {
            marquee.innerText = "Draw!"
            console.log(marquee.innerText)
            console.log('Game over!')
            // stop input
            grid.removeEventListener('click', evalClick)
            return
        }
        if (mark == 'X') {
            element.style.color = purple
            marquee.style.color = gold
        }
        if (mark == 'O') {
            element.style.color = gold
            marquee.style.color = purple
        }
    },
    mark(space, element) {
        console.log('mark')
        let currentTurn = ''
        let nextTurn = ''
        this.moveCount += 1
        if (this.moveCount % 2 === 1) {
            currentTurn = 'X'
            nextTurn = 'O'
        }
        else {
            currentTurn = 'O'
            nextTurn = 'X'
        }
        this[currentTurn].push(Number(space))
        this.assess(currentTurn, element, nextTurn)
        return [currentTurn, nextTurn]
    },
    moveCount: 0,
    restart() {
        this.moveCount = 0
        this['X'] = []
        this['O'] = []
        for (const node in spaces) {
            if (spaces[node].innerText) {
                spaces[node].innerText = ''
                spaces[node].style.color = ''
            }
        }

        marquee.innerText = 'X'
        marquee.style.color = purple

        grid.addEventListener('click', evalClick)
    },
    'X': [], 
    'O': [],
    winning:[[1,2,3],
             [4,5,6],
             [7,8,9],
             [1,4,7],
             [2,5,8],
             [3,6,9],
             [1,5,9],
             [3,5,7]]
}
