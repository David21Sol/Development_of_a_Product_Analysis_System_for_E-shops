const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');


const scrapeEuronics = async() => {
    try{
        const response = await axios.get("https://www.euronics.lv/en/entertainment/games?f=Cgl2aWV3c2Rlc2MQ-g8wIYABYw&p=1");
        const html = response.data;
        const $ =  cheerio.load(html);
        const products = [];

        $("article.product-card.vertical   ").each((index, el) => {
            const title = $(el).find("span.product-card__title").text().trim(); 
            const imageUrl = $(el).find("img").attr("src");
            const productUrl = $(el).find("a").attr("href");
            const examplePrice = $(el).find("div.price").text().trim().replace(/\s/g, "");
            const testPrice = examplePrice.substring(0,2) + "." + examplePrice.substring(2, examplePrice.length).replace("€", ""); 
            const truePrice = testPrice.substring(0,5)
            const price = Number(truePrice);
            const inStock = $(el).find("span.badge.badge").text().trim();           
            const delivery = "About 4 days";
            const shopName = "euronics.lv";

            
            products.push({shopName, title, imageUrl, productUrl, price, inStock, delivery});
        });

        
        fs.writeFile('euronicsProducts.json', JSON.stringify(products), err => {
            if (err) throw err;
            console.log('Products saved to file.');
        })
      

    }catch (error){
        console.error(error);
    }
}

scrapeEuronics();