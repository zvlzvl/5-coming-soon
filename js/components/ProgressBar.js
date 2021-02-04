class ProgressBar {
    constructor(selector, data) {
        this.selector = selector;
        this.data = data;

        this.DOM = null;

        this.init();
    }

    init() {
        if (!this.isValidSelector() ||
            !this.isValidData()) {
            return false;
        }

        this.render();
    }

    isValidSelector() {
        if (typeof this.selector !== 'string' ||
            this.selector === '') {
            console.error('ERROR: netinkamo formato this.selector');
            return false;
        }

        const DOM = document.querySelector(this.selector);
        if (!DOM) {
            console.error('ERROR:nurodyto elemento pagal duota this.selector nera.');
            return false;
        }
        this.DOM = DOM;

        return true;
    }

    isValidData() {
        if (!Array.isArray(this.data) ||
            this.data.length === 0) {
            console.error('ERROR: netinkamo formato this.data');
            return false;
        }

        return true;
    }

    isValidProgressBar(progressBar) {
        if (typeof progressBar !== 'object' ||
            Array.isArray(progressBar) ||
            progressBar === null ||
            !progressBar.label ||
            typeof progressBar.label !== 'string' ||
            progressBar.label.trim() === '' ||
            typeof progressBar.value !== 'number' ||
            !isFinite(progressBar.value) ||
            progressBar.value > 100 ||
            progressBar.value < 0) {
            console.warn('WARNING: netinkamo formato objektas', progressBar);
            return false;
        }
        return true;
    }

    generateProgressBar(progressBar) {
        return `<div class="progress-bar">
                    <div class="texts">
                        <div class="label">${progressBar.label}</div>
                        <div class="value">${this.formatNumber(progressBar.value)}%</div>
                    </div>
                    <div class="bar">
                        <div class="progress" style="width: ${progressBar.value}%;">
                            <div class="loading"></div>
                        </div>
                    </div>
                </div>`;
    }

    formatNumber(number) {
        return Math.round(number);
    }

    render() {
        let HTML = '';

        for (const progress of this.data) {
            if (!this.isValidProgressBar(progress)) {
                continue;
            }
            HTML += this.generateProgressBar(progress);
        }

        if (HTML === '') {
            console.warn('WARNING: this.data neturi nei vieno validaus objekto');
            return false;
        }

        this.DOM.innerHTML += HTML;
    }
}

export { ProgressBar }