class XChart extends HTMLElement {

    connectedCallback() {
        if (!this.isConnected) {
            return;
        }

        this.observer = new MutationObserver(this.onMutation.bind(this));
        this.observer.observe(this, {
          childList: true
        });

        const type = this.getAttribute("type");
        var config = {}
        if (type == "bar" || type == "line") {
            config = {
                type: this.getAttribute("type"),
                data: {},
                options: {
                    plugins: {},
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            };
        } else if (type == "pie") {
            config = {
                type: 'pie',
                data: {},
                options: {
                    plugins: {},
                }
            };
        } else if (type == "stacked-area") {
            config = {
                type: 'line',
                data: {},
                options: {
                    plugins: {},
                    scales: {
                        y: {
                            stacked: true,
                        }
                    }
                }
            };
        } else {
            console.log("Unsupported chart type.");
            return;
        }

        if (this.hasAttribute("legend")) {
            config["options"]["plugins"]["legend"] = {
                display: true,
                position: this.getAttribute("legend"),
            };
        } else {
            config["options"]["plugins"]["legend"] = {display: false};
        }

        if (this.hasAttribute("title")) {
            config["options"]["plugins"]["title"] = {
                display: true,
                text: this.getAttribute("title"),
            };
        }

        this.canvas = document.createElement('canvas');
        this.appendChild(this.canvas);
        this.chart = new Chart(this.canvas, config);

        for (const node of this.children) {
            this.process(node);
        }
    }

    disconnectedCallback() {
        this.observer.disconnect();
    }

    onMutation(mutations) {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                this.process(node);
            }
        }
    }

    process(node) {
        const chart = this.chart;
        if (node.tagName == "X-CHART-DATASET") {
            let dataset = {
                label: node.getAttribute("data-label"),
                data: node.getAttribute("data-values").split(",").map(Number),
                borderWidth: 1,
                fill: this.getAttribute("type") == "stacked-area",
            }
            chart.data.datasets.push(dataset);
            chart.update();
        } else if (node.tagName == "X-CHART-LABELS") {
            chart.data.labels = node.getAttribute("data-values").split(",").map(function(value) { return value.trim() });
            chart.update();
        } else if (node.tagName == "X-CHART-ALTERNATIVE") {
            this.removeChild(node);
        }
    }

}

customElements.define('x-chart', XChart);
