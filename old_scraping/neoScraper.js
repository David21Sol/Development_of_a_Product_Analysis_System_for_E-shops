const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

const scrapeNeoshop = async() => {
    try{
        const response = await axios.get("https://neoshop.lv/konsolu-aksesuari.3354.g?i=48");
        const html = response.data;
        const $ =  cheerio.load(html);
        const products = [];

        $("div.-product").each((index, el) => {
            const title = $(el).find("div.-info").find("a").text();
            const imageUrl = "https://neoshop.lv" + $(el).find("img").attr("src");
            const productUrl =  "https://neoshop.lv" + $(el).find("a").attr("href");
            const testPrice = $(el).find("div.-price").text().trim().replace(" / gb.","").replace("€","");
            const price = Number(testPrice);     
            const delivery = "3 - 4 darba dienas";
            const shopName = "neoshop.lv";

            
            products.push({shopName, title, imageUrl, productUrl, price, delivery});
        });

        
       
        fs.writeFile('neoProducts.json', JSON.stringify(products), err => {
            if (err) throw err;
            console.log('Products saved to file.');
        })

    }catch (error){
        console.error(error);
    }
}

scrapeNeoshop();


