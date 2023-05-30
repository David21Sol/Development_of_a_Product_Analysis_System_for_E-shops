const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

/* //test scraping
const scraperVideogames = async() => {
  try{
      const response = await axios.get("https://videogames.lv/index.php?route=product/category&path=150");
      const html = response.data;
      const $ =  cheerio.load(html);
      const products = [];

      $("div.product-layout").each((index, el) => {
        const title = $(el).find('h4 a').text().trim();
        const examplePrice = $(el).find('span.price').text().trim().replace(",", ".").replace("€","");
        const price = Number(examplePrice);
        const exPrice = 0;
        const exampleRating = $(el).find('div.rating-box').find("span.fa.fa-stack").text().trim();
        const rating = Number(exampleRating);
        const imageUrl = $(el).find('img').attr('src');
        const productUrl = $(el).find('h4 a').attr('href');
        const shopName = "videogames.lv";

        
        products.push({ shopName, title, imageUrl,productUrl, price, exPrice,rating });
    });
    
    
    console.log(products);

  }catch (error){
      console.error(error);
  }
}

scraperVideogames();*/



const scraperVideogames = async () => {
  try {
    const baseUrl = 'https://videogames.lv/index.php?route=product/category&path=150';
    let currentPage = 1;
    let hasMorePages = true;
    const products = [];

    while (hasMorePages) {
      const url = `${baseUrl}&page=${currentPage}`;
      const html = await axios.get(url);
      const $ = cheerio.load(html.data);

      $("div.product-layout").each((index, el) => {
        const title = $(el).find('h4 a').text().trim();
        const examplePrice = $(el).find('span.price').text().trim().replace(",", ".").replace("€","");
        const price = Number(examplePrice);
        const exPrice = 0;
        const exampleRating = $(el).find('div.rating-box').find("span.fa.fa-stack").text().trim();
        const rating = Number(exampleRating);
        const imageUrl = $(el).find('img').attr('src');
        const productUrl = $(el).find('h4 a').attr('href');
        const shopName = "videogames.lv";

        
        products.push({ shopName, title, imageUrl,productUrl, price, exPrice,rating });
    });
    
    const nextButton = $('ul.pagination li:last-child');
        hasMorePages = nextButton.length > 0 && !nextButton.hasClass('disabled');
        currentPage++;
    }
    
    fs.writeFile('videoGamesProducts2.json', JSON.stringify(products), err => {
      if (err) throw err;
      console.log('Products saved to file.');
    });
  } catch (error) {
    console.error(error);
  }
};

scraperVideogames();