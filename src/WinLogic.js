class WinLogic {
    horizontal = (frame, row) => {
        let lastValue = null;
        for(let col = 0; col < 4; ++col) {
            if(lastValue == null) {
                lastValue = frame[row][col]
                continue;
            }
            if(frame[row][col] === 0 || frame[row][col] !== lastValue) {
                return 0;
            }
            lastValue = frame[row][col];
        }
        return 1;
    }

    vertical = (frame, col) => {
        let lastValue = null;
        for(let row = 0; row < 4; ++row) {
            if(lastValue == null) {
                lastValue = frame[row][col];
            }
            if(frame[row][col] === 0 || frame[row][col] !== lastValue) {
                return 0;
            }
            lastValue = frame[row][col];
        }
        return 1;
    }

    diagonalUp = (frame) => {
        let lastValue = null;
        for(let pos = 0; pos < 4; ++pos) {
            if(lastValue == null) {
                lastValue = frame[pos][pos];
            }
            if(frame[pos][pos] === 0 || frame[pos][pos] !== lastValue) {
                return 0;
            }
            lastValue = frame[pos][pos];
        }
        return 1;
    }

    diagonalDown = (frame) => {
        let lastValue = null;
        for(let pos = 0; pos < 4; ++pos) {
            if(lastValue == null) {
                lastValue = frame[3 - pos][pos];
            }
            if(frame[3 - pos][pos] === 0 || frame[3 - pos][pos] !== lastValue) {
                return 0;
            }
            lastValue = frame[3 - pos][pos];
        }
        return 1;
    }

    checkForWin = (frame) => {
        for(let i = 0; i < 4; ++i) {
            if(this.horizontal(frame, i)) {
                return ({ directon: 'horizontal', row: i });
            }
            else if(this.vertical(frame, i)) {
                return ({ directon: 'vertical', row: i });
            }
        }
        if(this.diagonalUp(frame)) {
            return ({ direction: 'diagonalUp'});
        }
        if(this.diagonalDown(frame)) {
            return ({ direction: 'diagonalDown'});
        }
        return false;
    }
}

export default WinLogic;