//data for graph plot
const priceStart = [];
const priceEnd = [];
let date = [];

//fetch data
async function main() {
    const res = await fetch("api/current");
    const jsonData = await res.json();
    getData(jsonData);
}

const start = document.getElementById("start");
const end = document.getElementById("end");

//for historic data
async function getHistory() {

    date = [];
    const startMS = new Date(start.value).getTime();
    const startDate = parseInt((startMS / 1000).toFixed(0));

    const endMS = new Date(end.value).getTime();
    const endDate = parseInt((endMS / 1000).toFixed(0));

    const url = `api/history?start=${startDate}&end=${endDate}`;
    const res = await fetch(url);
    const data = await res.json();
    date.push(startDate);
    date.push(endDate);
    data.forEach(row => {

        priceStart.push(row[1])
        priceEnd.push(row[4])


    });

}

//get arrays to plot graph
async function getData(jsonData) {

    const data = await jsonData;
    let n = 1;
    data.forEach(row => {
        priceStart.push(row[1])
        priceEnd.push(row[4])
        if (n == 1 || n == 10) {
            const dated = new Date(row[0] * 1000).toISOString().split("T")[0];
            const DateFormat = dated.toLocaleString();
            date.push(DateFormat);
        }
        n++;

    });

}


// Graph Plot
var canvas = document.getElementById("myChart");
var ctx = canvas.getContext('2d');

// Global Options:
Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontSize = 16;

var data = {
    labels: date,
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
            data: priceEnd,
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
            data: priceStart,
            spanGaps: true,
        }

    ]
};

// options for line graph 
var options = {
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

// Chart declaration:
var myBarChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});