const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

/* //test scraping
const scrapeOzgames = async() => {
  try{
      const response = await axios.get("https://ozgameshop.com/gaming?page=1");
      const html = response.data;
      const $ =  cheerio.load(html);
      const products = [];

      $("li.product").each((index, el) => {
        const title = $(el).find("h2.card-title").text().trim(); 
        const imageUrl = $(el).find("img.card-image").attr("data-src");        
        const productUrl = $(el).find("a.image-link.desktop").attr("href");

        const examplePrice  = $(el).find("span.price").text().trim().replace("$", "");
        const examplePrice2 = ((Number(examplePrice) * 0.92)).toFixed(2);
        const price = Number(examplePrice2);
        const exPrice = 0;
        const exampleRating = $(el).find("span.rating--small").text().replace(/\s/g, "", "");
        const rating = Number(exampleRating);
        const shopName = "ozgameshop.com";

        
        products.push({ shopName,title, imageUrl,productUrl, price, exPrice, rating});
    });
    
    
    console.log(products);

  }catch (error){
      console.error(error);
  }
}

scrapeOzgames();*/



const scrapeOzgames = async () => {
  try {
    const baseUrl = 'https://ozgameshop.com/gaming';
    let currentPage = 1;
    let hasMorePages = true;
    const products = [];

    while (hasMorePages) {
      const url = `${baseUrl}?page=${currentPage}`;
      const html = await axios.get(url);
      const $ = cheerio.load(html.data);

      $("li.product").each((index, el) => {
        const title = $(el).find("h2.card-title").text().trim(); 
        const imageUrl = $(el).find("img.card-image").attr("data-src");        
        const productUrl = $(el).find("a.image-link.desktop").attr("href");

        const examplePrice  = $(el).find("span.price").text().trim().replace("$", "");
        const examplePrice2 = ((Number(examplePrice) * 0.92)).toFixed(2);
        const price = Number(examplePrice2);
        const exPrice = 0;
        const exampleRating = $(el).find("span.rating--small").text().replace(/\s/g, "", "");
        const rating = Number(exampleRating);
        const shopName = "ozgameshop.com";

        
        products.push({ shopName,title, imageUrl,productUrl, price, exPrice, rating});
    });
    
    const nextButton = $('li.pagination-item.pagination-item--next');
        hasMorePages = nextButton.length > 0 && !nextButton.hasClass('disabled');
        currentPage++;
    }
    
    fs.writeFile('ozgamesProducts2.json', JSON.stringify(products), err => {
      if (err) throw err;
      console.log('Products saved to file.');
    });
  } catch (error) {
    console.error(error);
  }
};

scrapeOzgames();