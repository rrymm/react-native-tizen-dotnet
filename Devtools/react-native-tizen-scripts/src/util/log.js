// @flow

import chalk from 'chalk';

function log() {
    const args = Array.prototype.slice.call(arguments, 0);

    respectProgressBars( () => {
        console.log(...args);
    });
}

log.withTimestamp = function () {
    const prefix = chalk.dim(new Date().toLocaleDateString()) + ':';
    const args = [prefix].concat(Array.prototype.slice.call(arguments, 0));

    respectProgressBars(() => {
        console.log(...args);
    });
};

let _bundleProgressBar;
log.setBundleprogressBar = function(bundleProgressBar) {
    _bundleProgressBar = bundleProgressBar;
}

function respectProgressBars(commitLogs) {
    if (_bundleProgressBar) {
        _bundleProgressBar.terminate();
        _bundleProgressBar.lastDraw = '';
        commitLogs();
        _bundleProgressBar.render();
    } else {
        commitLogs();
    }
}

export default log;

