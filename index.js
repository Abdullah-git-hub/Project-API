const express = require("express")
const server = express()
const fs = require("fs");
const cors = require('cors');
const cheerio = require('cheerio');
const request = require('request');
server.use(cors({
  origin: '*'
}));

server.all("/", (req, res) => {
  res.send("Public API Project for all!!!")
})

server.get("/data", (req, res) => {
  const data = req.url.substr(8).split("+").join(" ");
  const countriesData = fs.readFileSync(`countries/${data}.json`, 'utf-8');
  res.send(countriesData);
});

server.get("/invention", (req, res) => {
  const data = req.url.substr(8).split("+").join(" ");
  const countriesData = fs.readFileSync(`inventions.json`, 'utf-8');
  let inventionData = JSON.parse(countriesData)
  inventionData
});

server.get("/word", (req, res) => {
  const data = req.url.substr(8).split("+").join(" ");
  // console.log(data)

  const url = `https://youglish.com/pronounce/${data.toLowerCase}/english?`;

  request(url, (err, response, html) => {
    if (err) {
      console.error(err);
      return;
    }

    const $ = cheerio.load(html);

    const playerElement = $('#player');
    const mediaUrl = playerElement.attr('src');

    console.log($);
  });
});

server.listen(3000, () => {
  console.log("Server is ready.")
})
