let numselected = null;
let errors = 0;

// List of puzzles with their solutions
const puzzles = [
    {
        board: [
            "--74916-5",
            "2---6--3-9",
            "-----7-1-",
            "-586----4",
            "--3----9-",
            "--62--187",
            "9-4-7----2",
            "67-83----",
            "81--45---"
        ],
        solution: [
            "387491625",
            "241568379",
            "569327418",
            "758619234",
            "123784596",
            "496253187",
            "934176852",
            "675832941",
            "812945763"
        ]
    },
    {
        board: [
            "5---7----",
            "---6-5---",
            "7-----3-4",
            "-4-5---7-",
            "--1-9-2--",
            "-3---7-5-",
            "8-6-----2",
            "---7-3---",
            "----8---6"
        ],
        solution: [
            "598374216",
            "432651879",
            "761289354",
            "944527683",
            "381496752",
            "273918465",
            "856743921",
            "197265348",
            "249381756"
        ]
    },
    {
        board: [
            "----1----",
            "-7----4--",
            "---9---6-",
            "--4----1-",
            "5---2----",
            "-2----7--",
            "-6---5---",
            "4-3-1----",
            "----2----"
        ],
        solution: [
            "392817465",
            "817462934",
            "465931827",
            "274586913",
            "583249716",
            "926173548",
            "681354297",
            "473621589",
            "159748362"
        ]
    }
    // Add more puzzles as needed
];

let currentPuzzleIndex = 0;

function setGame() {
    document.getElementById('digits').innerHTML = '';
    document.getElementById('board').innerHTML = '';

    let puzzle = puzzles[currentPuzzleIndex];

    for (let i = 1; i <= 9; i++) {
        let number = document.createElement('div');
        number.id = i;
        number.innerText = i;
        number.addEventListener('click', selectNumber);
        number.classList.add('numbers');
        document.getElementById('digits').appendChild(number);
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString();
            if (puzzle.board[r][c] !== "-") {
                tile.innerText = puzzle.board[r][c];
                tile.classList.add('tile-start');
                tile.dataset.correct = puzzle.solution[r][c]; // Add data attribute for solution
            }
            if (r == 2 || r == 5) {
                tile.classList.add('horizontal-line');
            }
            if (c == 2 || c == 5) {
                tile.classList.add('vertical-line');
            }
            tile.addEventListener('click', selectTile);
            tile.classList.add('tile');
            document.getElementById('board').appendChild(tile);
        }
    }
}

function selectNumber() {
    if (numselected != null) {
        numselected.classList.remove('selected');
    }
    numselected = this;
    numselected.classList.add("selected");
}

function selectTile() {
    if (numselected) {
        if (this.innerText !== '') {
            return;
        }

        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        let puzzle = puzzles[currentPuzzleIndex];
        let solution = puzzle.solution;

        if (solution[r][c] == numselected.id) {
            this.innerText = numselected.id;
            this.classList.add('tile-start'); // Mark this tile as part of the solution
            this.removeAttribute('data-correct');
        } else {
            errors += 1;
            document.getElementById('errors').innerText = 'Errors: ' + errors;
        }
    }
}

function newGame() {
    currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length;
    errors = 0;
    document.getElementById('errors').innerText = 'Errors: 0';
    setGame();
}

function provideHint() {
    let puzzle = puzzles[currentPuzzleIndex];
    let solution = puzzle.solution;

    let emptyCells = [];
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(r + '-' + c);
            if (tile.innerText === '') {
                emptyCells.push({ r, c });
            }
        }
    }

    if (emptyCells.length > 0) {
        let hintCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        let tile = document.getElementById(hintCell.r + '-' + hintCell.c);
        tile.innerText = solution[hintCell.r][hintCell.c];
        tile.classList.add('tile-start');
        tile.removeAttribute('data-correct'); // Remove data-correct attribute after hint is given
    }
}

document.getElementById('new-game').addEventListener('click', newGame);
document.getElementById('hint').addEventListener('click', provideHint);

setGame();
