var express = require('express');
var router = express.Router();

var fs = require('fs');

router.get('/', function (req, res, next) {
  const rawData = fs.readFileSync('./data/portfolio.json');

  res.send(JSON.parse(rawData));
  res.end();
});

router.post('/', function (req, res, next) {
  const symbol = req.body.symbol;
  const amount = req.body.amount;

  const rawData = fs.readFileSync('./data/portfolio.json');
  const jsonData = JSON.parse(rawData);

  let currentEntry = jsonData.find(item => item.symbol == symbol);

  // No entry for the given currency
  if (!currentEntry) {
    jsonData.push({ symbol, amount });
  }

  // add to current position
  else {
    const index = jsonData.findIndex(item => item.symbol == symbol);

    currentEntry.amount += amount;

    jsonData[index] = currentEntry;
  }

  fs.writeFileSync('./data/portfolio.json', JSON.stringify(jsonData));

  res.send({ success: true })
})

module.exports = router;
