const cube = 4;
let score = 0;

let matrix = [[0, 0, 0, 0], 
              [0, 0, 0, 0], 
              [0, 0, 0, 0],
              [0, 0, 0, 0]];

randomElem(matrix)

addEventListener('keydown', function(e) {
    let ke = e.key.toUpperCase()
    if(ke === "W" || ke === "A" || ke === "S" || ke === "D") {
        move(ke);
        checkMatrix();
        randomElem();
    }

    document.getElementById('scoreLable').textContent = `Score: ${score}`;

    let j = 0, k = 0;
    for(let i = 1; i <= 16; i++) {
        let matrixElem = matrix[j][k++];
        let elem = document.getElementById(`${i}`);
        style(elem, matrixElem);
        elem.textContent = `${matrixElem}`;
        if(k == 4) {
            j++;
            k = 0;
        }
    }
});

function style(elem, matrixElem) {
    switch(matrixElem) {
    case 0:
        elem.style.cssText = 'background-color: #ccc0b2; color: #ccc0b2';
        break;
    case 2:
        elem.style.cssText = 'background-color: #eee4da; color: #7a7066';
        break;
    case 4:
        elem.style.cssText = 'background-color: #ebdfc5; color: #7a7066';
        break;
    case 8:
        elem.style.cssText = 'background-color: #edb376; color: #f6f6f3';
        break;
    case 16:
        elem.style.cssText = 'background-color: #f29563; color: #f6f6f3';
        break;
    case 32:
        elem.style.cssText = 'background-color: #f77a5e; color: #f6f6f3';
        break;
    case 64:
        elem.style.cssText = 'background-color: #f55c3a; color: #f6f6f3';
        break;
    case 128:
        elem.style.cssText = 'background-color: #eecc70; color: #f6f6f3';
        break;
    case 256:
        elem.style.cssText = 'background-color: #edcc62; color: #f6f6f3';
        break;
    case 512:
        elem.style.cssText = 'background-color: #e9c84e; color: #f6f6f3';
        break;
    case 1024:
        elem.style.cssText = 'background-color: #ecc53f; color: #f6f6f3';
        break;
    case 2048:
        elem.style.cssText = 'background-color: #edc12d; color: #f6f6f3';
        break;
    }
}

function checkMatrix() {
    let countDefeat = cube * cube, count = 0;

    for(let i = 0; i < cube; i++) {
        for(let j = 0; j < cube; j++) {
            if(matrix[i][j] == 2048) {
                alert("You are win!!!");
                return false;
            }
            else if(matrix[i][j] != 0) {
                ++count;
            }
        }
    }

    /*if(countDefeat == count) {
        alert("You are defeat(");
        return false;
    }*/

    return true;
}

function randomElem() {
    let i, j;
    do {
        i = Math.floor(Math.random() * cube);
        j = Math.floor(Math.random() * cube);

        if(matrix[i][j] == 0) {
            matrix[i][j] = 2;
            break;
        }
        else if(matrix[i][j] == 2) {
            matrix[i][j] += 2;
            break;
        }
    } while(true);
}

function move(command) {
    switch(command) {
    case "A":
        for(let i = 0; i < cube; i++) {
            for(let j = 0; j < cube; j++) {
                let key = j;
                while(key != 0) {
                    if(matrix[i][key] != 0 && matrix[i][key-1] == 0) {
                        matrix[i][key-1] = matrix[i][key];
                        matrix[i][key] = 0;
                    }
                    else if(matrix[i][key] != 0 && matrix[i][key-1] == matrix[i][key]) {
                        matrix[i][key-1] += matrix[i][key];
                        score += matrix[i][key-1];
                        matrix[i][key] = 0;
                    }
                    key--;
                }
            }
        }
        break;
    case "D":
        for(let i = 0; i < cube; i++) {
            for(let j = cube-1; j >= 0; j--) {
                let key = j;
                while(key != cube-1) {
                    if(matrix[i][key] != 0 && matrix[i][key+1] == 0) {
                        matrix[i][key+1] = matrix[i][key];
                        matrix[i][key] = 0;
                    }
                    else if(matrix[i][key] != 0 && matrix[i][key+1] == matrix[i][key]) {
                        matrix[i][key+1] += matrix[i][key];
                        score += matrix[i][key+1];
                        matrix[i][key] = 0;
                    }
                    key++;
                }
            }
        }
        break;
    case "W":
        for(let i = 0; i < cube; i++) {
            for(let j = 0; j < cube; j++) {
                let key = j;
                while(key != 0) {
                    if(matrix[key][i] != 0 && matrix[key-1][i] == 0) {
                        matrix[key-1][i] = matrix[key][i];
                        matrix[key][i] = 0;
                    }
                    else if(matrix[key][i] != 0 && matrix[key-1][i] == matrix[key][i]) {
                        matrix[key-1][i] += matrix[key][i];
                        score += matrix[key-1][i];
                        matrix[key][i] = 0;
                    }
                    key--;
                }
            }
        }
        break;
    case "S":
        for(let i = 0; i < cube; i++) {
            for(let j = cube-1; j >= 0; j--) {
                let key = j;
                while(key != cube-1) {
                    if(matrix[key][i] != 0 && matrix[key+1][i] == 0) {
                        matrix[key+1][i] = matrix[key][i];
                        matrix[key][i] = 0;
                    }
                    else if(matrix[key][i] != 0 && matrix[key+1][i] == matrix[key][i]) {
                        matrix[key+1][i] += matrix[key][i];
                        score += matrix[key+1][i];
                        matrix[key][i] = 0;
                    }
                    key++;
                }
            }
        }
        break;
    default:
        alert("Wrong command")
    }
}
