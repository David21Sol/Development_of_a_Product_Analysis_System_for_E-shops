const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

/* //test scraping
const scrapeEneba = async() => {
  try{
      const response = await axios.get("https://www.eneba.com/store/all?enb_campaign=Main%20Search&enb_content=search%20dropdown%20-%20categories&enb_medium=link&enb_source=https%3A%2F%2Fwww.eneba.com%2F&enb_term=&page=1&regions[]=europe&regions[]=latvia&text=games&types[]=game");
      const html = response.data;
      const $ =  cheerio.load(html);
      const products = [];

      $("div.pFaGHa.WpvaUk").each((index, el) => {
        const title = $(el).find("span.YLosEL").text().trim();
        const imageUrl =  $(el).find("img").attr("src");
        const productUrl = "https://www.eneba.com" + $(el).find("a").attr("href");
        const examplePrice =  $(el).find("span.DTv7Ag").text().trim().replace("€", "");
        const price = Number(examplePrice);
        const exampleExPrice = $(el).find("span.L5ErLT.bmxuMu").text().trim().replace("€","");
        const exPrice = Number(exampleExPrice);
        const rating = 0;
        const shopName = "eneba.com";

        
        products.push({ shopName,title, imageUrl, productUrl, price, exPrice, rating});
    });
    
    
    console.log(products);

  }catch (error){
      console.error(error);
  }
}

scrapeEneba();*/


const scrapeEneba = async () => {
  try {
    const baseUrl = 'https://www.eneba.com/store/all?enb_campaign=Main%20Search&enb_content=search%20dropdown%20-%20categories&enb_medium=link&enb_source=https%3A%2F%2Fwww.eneba.com%2F&enb_term=';
    let currentPage = 1;
    let hasMorePages = true;
    const products = [];

    while (hasMorePages) {
      const url = `${baseUrl}&page=${currentPage}&regions[]=europe&regions[]=latvia&text=games&types[]=game`;
      const html = await axios.get(url);
      const $ = cheerio.load(html.data);

      $("div.pFaGHa.WpvaUk").each((index, el) => {
        const title = $(el).find("span.YLosEL").text().trim();
        const imageUrl =  $(el).find("img").attr("src");
        const productUrl = "https://www.eneba.com" + $(el).find("a").attr("href");
        const examplePrice =  $(el).find("span.DTv7Ag").text().trim().replace("€", "");
        const price = Number(examplePrice);
        const exampleExPrice = $(el).find("span.L5ErLT.bmxuMu").text().trim().replace("€","");
        const exPrice = Number(exampleExPrice);
        const rating = 0;
        const shopName = "eneba.com";

        
        products.push({ shopName,title, imageUrl, productUrl, price, exPrice, rating});
    });
    
    const nextButton = $('a.AETeA2');
    hasMorePages = nextButton.length > 0 && !nextButton.hasClass('disabled');
    currentPage++;
    }
    
    fs.writeFile('enebaProducts2.json', JSON.stringify(products), err => {
      if (err) throw err;
      console.log('Products saved to file.');
    });
  } catch (error) {
    console.error(error);
  }
};

scrapeEneba();