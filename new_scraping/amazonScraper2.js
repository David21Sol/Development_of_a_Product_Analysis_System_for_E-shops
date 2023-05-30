const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

/* //test scraping
const scrapeAmazon = async() => {
  try{
      const response = await axios.get("https://www.amazon.com/s?k=vodeo+games&crid=2JL8TLL5XK394&sprefix=vodeo+game%2Caps%2C215&ref=nb_sb_noss_2");
      const html = response.data;
      const $ =  cheerio.load(html);
      const products = [];

      $("div.sg-col-20-of-24.s-result-item").each((index, el) => {
          const title = $(el).find("span.a-size-medium.a-color-base.a-text-normal").text().trim();
          const imageUrl = $(el).find("img").attr("src");
          const productUrl = "https://www.amazon.com" + $(el).find("a").attr("href");
          const testPrice = $(el).find("span.a-offscreen").text().trim().replace(",", ".").replace("$", "").substring(0,5);
          const price = Number(testPrice);  
          const testExPrice = $(el).find("span.a-price.a-text-price").text().trim().replace(",", ".").replace("$", "").substring(0,5);
          const exPrice = Number(testExPrice);          
          const testRating = $(el).find("div.a-row.a-size-small").find("span").attr("aria-label");
          const testRating2 = String(testRating).replace(",", ".").substring(0,4);
          const rating = Number(testRating2);
          const shopName = "amazon.com";
       

          products.push({shopName, title, imageUrl, productUrl, price, exPrice, rating});
      });
    
     console.log(products);

  }catch (error){
      console.error(error);
  }
}

scrapeAmazon();*/


const scrapeAmazon = async () => {
  try {
    const baseUrl = 'https://www.amazon.com/s?k=video+games';
    let currentPage = 1;
    let hasMorePages = true;
    const products = [];

    while (hasMorePages) {
      const url = `${baseUrl}&page=${currentPage}&crid=2JL8TLL5XK394&qid=1684405092&sprefix=vodeo+game%2Caps%2C215`;
      const html = await axios.get(url);
      const $ = cheerio.load(html.data);

      $("div.sg-col-20-of-24.s-result-item").each((index, el) => {
        const title = $(el).find("span.a-size-medium.a-color-base.a-text-normal").text().trim();
        const imageUrl = $(el).find("img").attr("src");
        const productUrl = "https://www.amazon.com" + $(el).find("a").attr("href");
       
        const testPrice = $(el).find("span.a-offscreen").text().trim().replace(",", ".").replace("$", "").substring(0,5);
        const testPrice2 = ((Number(testPrice) * 0.92)).toFixed(2);
        const price = Number(testPrice2);  
       
        const testExPrice = $(el).find("span.a-price.a-text-price").text().trim().replace(",", ".").replace("$", "").substring(0,5);
        const testExPrice2 = ((Number(testExPrice) * 0.92)).toFixed(2);
        const exPrice = Number(testExPrice2);          
        
        const testRating = $(el).find("div.a-row.a-size-small").find("span").attr("aria-label");
        const testRating2 = String(testRating).replace(",", ".").substring(0,4);
        const rating = Number(testRating2);
        const shopName = "amazon.com";
     

        products.push({shopName, title, imageUrl, productUrl, price, exPrice, rating});
    });

      const nextButton = $('a.s-pagination-item.s-pagination-next.s-pagination-button');
      hasMorePages = nextButton.length > 0 && !nextButton.hasClass('disabled');
      currentPage++;
    }

    
    fs.writeFile('amazonProducts2.json', JSON.stringify(products), err => {
      if (err) throw err;
      console.log('Products saved to file.');
    });
  } catch (error) {
    console.error(error);
  }
};

scrapeAmazon();
