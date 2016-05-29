function shouldToggle(timestampOfLastDrink, currentTimestamp, secondsToWait) {
    if (timestampOfLastDrink === null) {
        return true;
    }
    if ((currentTimestamp - timestampOfLastDrink) > secondsToWait) {
        return true;
    } else {
        return false;
    }
}

function Beeper(callbacks) {
    var STEADY_STATE = 0;
    var state = STEADY_STATE;
    return {
        toggle: function() {
            if (state == 0) {
                state = 1;
                callbacks.beep()
            } else {
                state = 0;
                callbacks.boop()
            }
        },
        steady: function() {
            if (state == 1) {
                state = 0;
                callbacks.boop()
            }
        },
        isSteady: function() {
            return (state == STEADY_STATE);
        }
    }
}

module.exports = {
    shouldToggle: shouldToggle,
    Beeper: Beeper
};
