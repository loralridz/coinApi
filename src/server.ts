import express,{Response,Request} from 'express';

const path = require("path");
const nFetch = require("node-fetch");

const PORT = 3000;

const app = express();
app.use(express.static("./client"));


app.listen(PORT, () => {
  console.log(`server listening at http://127.0.0.1:${PORT}`);
});

app.use(express.static(__dirname + "/client"));

app.get("/", (req :Request, res: Response) => {
    res.render('index.html')

});


app.get("/api/current", async(req :Request, res: Response)  => {
    const end = parseInt((new Date().getTime() / 1000).toFixed(0));
    const start = end - 86400;
    const api = `https://api.cryptowat.ch/markets/kraken/btcusd/ohlc?after=${start}&before=${end}&periods=3600`;

    const apiRes = await nFetch(api);
    const jsonData = await apiRes.json();
    const result = jsonData.result['3600'];
    res.send(result);
});

const INTERVALS = [
    60,
    180,
    300,
    900,
    1800,
    3600,
    7200,
    14400,
    21600,
    43200,
    86400,
    259200,
    604800
];
const optimalInterval = (start:any, end:any) => {
    const goal = (end - start) / 50;
    return INTERVALS.reduce((prev, curr) => {
        return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
    });
};

app.get("/api/history", async(req, res) => {

    const start:any = req.query.start;
    const end:any = req.query.end;
    const interval =
        optimalInterval(parseInt(start), parseInt(end)) || 3600;
    const history = `https://api.cryptowat.ch/markets/kraken/btcusd/ohlc?after=${start}&before=${end}&periods=${interval}`;

    const apiRes = await nFetch(history);
    const jsonData = await apiRes.json();
    const result = jsonData.result[interval];
    res.send(result);

})
