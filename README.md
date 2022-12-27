# `x-chart`

HTML extensions for generating Chart.js charts

## Usage

Add the following lines somewhere in your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://raw.githubusercontent.com/jbmorley/x-chart/main/x-chart.js"></script>
```

Insert the HTML for the chart:

```html
<x-chart type="pie" legend="bottom">
    <x-chart-labels
        data-values="January, February, March, April, May, June, July">
    </x-chart-labels>
    <x-chart-dataset
        data-values="12,19,3,3,5,2,3">
    </x-chart-dataset>
    <x-chart-alternative>
        x-chart is unavailable
    </x-chart-alternative>
</x-chart>
```

See [examples](https://jbmorley.github.io/x-chart/).
