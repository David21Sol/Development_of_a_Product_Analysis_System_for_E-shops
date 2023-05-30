const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://videogames.lv/index.php?route=product/category&path=150&page=';

const scrapeVideoGame = async () => {
  let page = 1;
  let products = [];

  while (true) {
    const response = await axios.get(url + page);
    const $ = cheerio.load(response.data);

    $('div.product-layout').each((i, el) => {
      const title = $(el).find('h4 a').text().trim();
      const testPrice = $(el).find('span.price').text().trim().replace("€", "").replace(",", ".");
      const price = Number(testPrice);
      const testRating = $(el).find('div.rating-box').find("span.fa.fa-stack").text().trim();
      const rating  = Number(testRating);
      const imageUrl = $(el).find('img').attr('src');
      const productUrl = $(el).find('h4 a').attr('href');
      const inStock = $(el).find("div.label-stock.label.label-success ").text().trim();
      const shopName = "videogames.lv";

      const product = {
        shopName,
        title,
        price,
        rating,
        imageUrl,
        productUrl,
        inStock
      };

      products.push(product);
    });

    
    if (!$('ul.pagination li:last-child').hasClass('active')) {
      page++;
    } else {
      break;
    }
  }
  
  
  fs.writeFile('videoGamesProducts.json', JSON.stringify(products), err => {
    if (err) throw err;
    console.log('Products saved to file.');
  });
};

scrapeVideoGame();



