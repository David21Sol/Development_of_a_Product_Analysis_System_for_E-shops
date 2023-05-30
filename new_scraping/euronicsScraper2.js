const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');


const scrapeEuronics = async() => {
    try{
        const response = await axios.get("https://www.euronics.lv/en/entertainment/games?f=Cgl2aWV3c2Rlc2MQ-g8wIIABYw&p=1");
        const html = response.data;
        const $ =  cheerio.load(html);
        const products = [];

        $("article.product-card.vertical   ").each((index, el) => {
            const title = $(el).find("span.product-card__title").text().trim(); 
            const imageUrl = $(el).find("img").attr("src");
            const productUrl = $(el).find("a").attr("href");

            const examplePrice = $(el).find("div.price").text().trim().replace(/\s/g, "").replace("€", "");      
            const examplePrice2 = examplePrice.substring(0,2) + "." + examplePrice.substring(2, examplePrice.length);
            const examplePrice3 = examplePrice2.substring(0,4);    
            const price = Number(examplePrice3);

            const exampleExPrice = $(el).find("div.discount__old").text().trim().replace(/\s/g, "").replace("€", "");
            const exPrice = Number(exampleExPrice);

            const rating = 0;

            const delivery = "About 4 days";
            const shopName = "euronics.lv";

            
            products.push({shopName, title, imageUrl, productUrl, price, exPrice, rating, delivery});
        });

        fs.writeFile('euronicsProducts2.json', JSON.stringify(products), err => {
            if (err) throw err;
            console.log('Products saved to file.');
        })
      

    }catch (error){
        console.error(error);
    }
}

scrapeEuronics();