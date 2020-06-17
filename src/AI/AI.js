const NONE = 0;
const EASY = 1;

class AI {
    constructor() {
        if(new.target === AI) {
            throw new TypeError('Cannot construct AI instances directly');
        }
    }

    static get NONE() {
        return NONE;
    }

    static get EASY() {
        return EASY;
    }

    static getInstance = (type) => {
        switch(type) {
            case EASY:
                return new EasyAI();
            default:
                return null;
        }
    }

    getMove = (boardState) => {
        throw new Error('Not implemented');
    }
}

class EasyAI extends AI {
    constructor() {
        super();
    }

    getMove = (boardState) => {
        let targetColumn = Math.floor(Math.random() * 7);
        let iteration = 0;
        while(boardState[targetColumn][0] > 0 && iteration < 49) {
            targetColumn = Math.floor(Math.random() * 7);
            iteration++;
        }
        if(iteration == 49) { // just in case we couldn't find an open slot
            // TODO: make sure there is an open slot.  If not, declare a draw
        }
        return targetColumn;
    }
}

export { AI, EasyAI };