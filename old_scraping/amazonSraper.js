const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');


const scrapeAmazon = async() => {
    try{
        const response = await axios.get("https://www.amazon.de/s?k=video+games&page=1");
        const html = response.data;
        const $ =  cheerio.load(html);
        const products = [];

        $("div.s-result-item").each((index, el) => {
            const title = $(el).find("img").attr("alt");
            const imageUrl = $(el).find("img").attr("src");
            const productUrl = "https://www.amazon.de" + $(el).find("a").attr("href");
            const testPrice = $(el).find("span.a-price-whole").text().trim().replace(",", ".");
            const price = Number(testPrice);    
            const testRating = $(el).find("div.a-row.a-size-small").find("span").attr("aria-label");
            const testRating2 = String(testRating).replace(",", ".").substring(0,4);
            const rating = Number(testRating2);
            const delivery = "about €7.99 delivery to Latvia";
            const shopName = "amazon.de";
         

            
            products.push({title, imageUrl, productUrl, price, rating, delivery , shopName , inStock});
        });

        
       console.log(products);
      

    }catch (error){
        console.error(error);
    }
}

scrapeAmazon();


/*
const scrapeAmazon = async () => {
    try {
      const baseUrl = 'https://www.amazon.de/s?k=video+games';
      let currentPage = 1;
      let hasMorePages = true;
      const products = [];
  
      while (hasMorePages) {
        const url = `${baseUrl}&page=${currentPage}`;
        const html = await axios.get(url);
        const $ = cheerio.load(html.data);
  
        $("div.s-result-item").each((index, el) => {
            const title = $(el).find("img").attr("alt");
            const imageUrl = $(el).find("img").attr("src");
            const productUrl = "https://www.amazon.de" + $(el).find("a").attr("href");
            const testPrice = $(el).find("span.a-price-whole").text().trim().replace(",", ".");
            const price = Number(testPrice);    
            const testRating = $(el).find("div.a-row.a-size-small").find("span").attr("aria-label");
            const testRating2 = String(testRating).replace(",", ".").substring(0,4);
            const rating = Number(testRating2);
            const delivery = "about €7.99 delivery to Latvia";
            const shopName = "amazon.de";

            
            products.push({title, imageUrl, productUrl, price, rating, delivery , shopName});
        });
  
        // Check if there are more pages to scrape
        const nextButton = $('a.s-pagination-item.s-pagination-next.s-pagination-button');
        hasMorePages = nextButton.length > 0 && !nextButton.hasClass('disabled');
        currentPage++;
      }

      
      fs.writeFile('amazonDeProducts.json', JSON.stringify(products), err => {
        if (err) throw err;
        console.log('Products saved to file.');
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  // Call the scrapeGameCoUk function
  scrapeAmazon();*/