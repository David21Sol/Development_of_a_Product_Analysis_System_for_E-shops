const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

const scrapeShopiTree = async () => {
    try {
      const baseUrl = 'https://www.shopitree.com/';
      let currentPage = 1;
      let hasMorePages = true;
      const products = [];
  
      while (hasMorePages) {
        const url = `${baseUrl}search?page=${currentPage}&q=gaming`;
        const html = await axios.get(url);
        const $ = cheerio.load(html.data);
  
        $("div.three.columns.alpha.thumbnail.even").each((index, el) => {
          const title = $(el).find("span.title").text().trim();  
          const imageUrl = $(el).find("img").attr("data-src");
          const productUrl = "https://www.shopitree.com/" + $(el).find("a").attr("href");
  
          const examplePrice = $(el).find("span.money").text().trim().replace("$", "").replace(/\s/g, "").replace("SGD", "");
          const examplePrice2 = examplePrice.substring(0,5)
          const examplePrice3 = ((Number(examplePrice2) * 0.92)).toFixed(2);
          const price = Number(examplePrice3);
  
          
          const exampleExPrice =  $(el).find("span.was-price").text().trim().replace("$", "").replace(/\s/g, "").replace("SGD", "");
          const exampleExPrice2 = (Number(exampleExPrice) * 0.92).toFixed(2);
          const exPrice = Number(exampleExPrice2);
          
          const rating = 0;
          const shopName = "shopitree.com";
  
          
          products.push({shopName, title, imageUrl, productUrl , price , exPrice, rating});
      });
  
        // Check if there are more pages to scrape
        const nextButton = $('span.next');
        hasMorePages = nextButton.length > 0 && !nextButton.hasClass('disabled');
        currentPage++;
      }
  
      fs.writeFile('shopiTreeProducts2.json', JSON.stringify(products), err => {
        if (err) throw err;
        console.log('Products saved to file.');
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  scrapeShopiTree();