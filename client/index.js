//fetch data
async function main() {
    const res = await fetch("api/current");
    const data = await res.json();

    data.datasets[1].data = [];
    data.datasets[0].data = [];
    data.labels = [];

    for (let index = 0; index < datajson.length; index++) {
        const dated = new Date(datajson[index][0] * 1000).toISOString().split("T")[0];
        const DateFormat = dated.toLocaleString();
        data.labels.push(DateFormat)
        data.datasets[0].data.push(datajson[index][1])
        data.datasets[1].data.push(datajson[index][4])
    }
    myChart.update()
}

const start = document.getElementById("start");
const end = document.getElementById("end");

//for historic data
async function getHistory() {

    console.log("triggred")

    const startMS = new Date(start.value).getTime();
    const startDate = parseInt((startMS / 1000).toFixed(0));

    const endMS = new Date(end.value).getTime();
    const endDate = parseInt((endMS / 1000).toFixed(0));

    const url = `api/history?start=${startDate}&end=${endDate}`;
    const res = await fetch(url);

    const datajson = await res.json();

    data.datasets[1].data = [];
    data.datasets[0].data = [];
    data.labels = [];

    for (let index = 0; index < datajson.length; index++) {
        const dated = new Date(datajson[index][0] * 1000).toISOString().split("T")[0];
        const DateFormat = dated.toLocaleString();
        data.labels.push(DateFormat)
        data.datasets[0].data.push(datajson[index][1])
        data.datasets[1].data.push(datajson[index][4])


    }
    myChart.update();

}

// Graph Plot
let canvas = document.getElementById("myChart");
let ctx = canvas.getContext('2d');


// Global Options:
Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontSize = 16;

var data = {
    labels: [4],
    datasets: [{
            label: "Price Open",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "green",
            borderColor: "rgb(167, 105, 0)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "white",
            pointBackgroundColor: "black",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "brown",
            pointHoverBorderColor: "yellow",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: [2],
            spanGaps: false,
        }, {
            label: "Price Close",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(225,0,0,0.4)",
            borderColor: "red",
            borderCapStyle: 'square',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "black",
            pointBackgroundColor: "white",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "yellow",
            pointHoverBorderColor: "brown",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: [1],
            spanGaps: true,
        }

    ]
};

// options for line graph 
let options = {
    responsive: true,
    layout: {
        padding: {
            left: 50,
            top: 5
        }
    },
    legend: {
        display: true,
        position: "bottom",

    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: false
            },
            scaleLabel: {
                display: true,
                labelString: 'Price cap',
                fontSize: 16
            }
        }]
    }
};
var config = {
    type: 'line',
    data: data,
    options: options
};

// Chart declaration:
var myChart = new Chart(ctx, config);