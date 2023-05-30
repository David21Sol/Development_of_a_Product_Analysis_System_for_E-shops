const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

/* //test scraping
const scrapeRd = async() => {
  try{
      const response = await axios.get("https://www.rdveikals.lv/search/lv/word/games/page/7/");
      const html = response.data;
      const $ =  cheerio.load(html);
      const products = [];

      $("li.col.col--xs-4.product.js-product.js-touch-hover").each((index, el) => {
        const title = $(el).find("img").attr("alt");
        const imageUrl =  "https://www.rdveikals.lv/" + $(el).find("img").attr("src");
        const productUrl = "https://www.rdveikals.lv/" + $(el).find("a").attr("href");
        const examplePrice =  $(el).find("p.price").text().trim().replace("€", "");
        const price = Number(examplePrice);
        //const exampleExPrice = $(el).find("span.L5ErLT.bmxuMu").text().trim().replace("€","");
        const exPrice = 0;
        const rating = 0;
        const shopName = "rdveikals.lv";

        
        products.push({ shopName, title, imageUrl, productUrl, price, exPrice, rating});
    });
    
    
    fs.writeFile('rdProducts2.json', JSON.stringify(products), err => {
      if (err) throw err;
      console.log('Products saved to file.');
    });

  }catch (error){
      console.error(error);
  }
}

scrapeRd();*/



const scrapeRd = async () => {
  try {
    const baseUrl = 'https://www.rdveikals.lv/search/lv/word/games/page/';
    let currentPage = 1;
    let hasMorePages = true;
    const products = [];

    while (hasMorePages) {
      const url = `${baseUrl}${currentPage}/`;
      const html = await axios.get(url);
      const $ = cheerio.load(html.data);

      $("li.col.col--xs-4.product.js-product.js-touch-hover").each((index, el) => {
        const title = $(el).find("img").attr("alt");
        const imageUrl =  "https://www.rdveikals.lv/" + $(el).find("img").attr("src");
        const productUrl = "https://www.rdveikals.lv/" + $(el).find("a").attr("href");
        const examplePrice =  $(el).find("p.price").text().trim().replace("€", "");
        const price = Number(examplePrice);
        //const exampleExPrice = $(el).find("span.L5ErLT.bmxuMu").text().trim().replace("€","");
        const exPrice = 0;
        const rating = 0;
        const shopName = "rdveikals.lv";

        
        products.push({ shopName, title, imageUrl, productUrl, price, exPrice, rating});
    });
    
    const nextButton = $('a.btn.btn--switch.btn--smaller');
    hasMorePages = nextButton.length > 0 && !nextButton.hasClass('disabled');
    currentPage++;
    }
    
    fs.writeFile('rdProducts2.json', JSON.stringify(products), err => {
      if (err) throw err;
      console.log('Products saved to file.');
    });
  } catch (error) {
    console.error(error);
  }
};

scrapeRd();