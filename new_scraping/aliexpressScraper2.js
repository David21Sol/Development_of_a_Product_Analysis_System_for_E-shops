const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

/* //test scraping
const scrapeAliexpress = async() => {
  try{
      const response = await axios.get("https://www.aliexpress.com/w/wholesale-gaming.html?SearchText=gaming&catId=0&g=y&initiative_id=SB_20230518131248&page=1");
      const html = response.data;
      const $ =  cheerio.load(html);
      const products = [];

      $("a.manhattan--container--1lP57Ag").each((index, el) => {
        const title = $(el).find("h1.manhattan--titleText--WccSjUS").text().trim();
        const exampleImageUrl = $(el).find("img").attr("src").replace("https:","");
        const imageUrl = "https:" + exampleImageUrl;
        const productUrl =  "https://" + $(el).attr("href").replace("//m.", "");

      
        const examplePrice =  $(el).find("div.manhattan--price-sale--1CCSZfK").text().trim().replace("€", "");
        const price = Number(examplePrice);

        const exampleExPrice = $(el).find("div.manhattan--price-original--3QAcCkG").text().trim().replace("€","");
        const exPrice = Number(exampleExPrice);

        const exampleRating = $(el).find("span.manhattan--evaluation--3cSMntr").text().trim();
        const rating = Number(exampleRating);
                 
        const delivery = $(el).find("span.tag--textStyle--vcAi3Rh").text().trim();
        const shopName = "aliexpress.com";

        
        products.push({shopName ,title, imageUrl, productUrl, price, exPrice, rating, delivery});
    });
    
    
    fs.writeFile('aliexpressProducts22.json', JSON.stringify(products), err => {
      if (err) throw err;
      console.log('Products saved to file.');
    });

  }catch (error){
      console.error(error);
  }
}

scrapeAliexpress();*/


const scrapeAliexpress = async () => {
  try {
    const baseUrl = 'https://www.aliexpress.com/w/wholesale-gaming.html?SearchText=gaming';
    let currentPage = 1;
    let hasMorePages = true;
    const products = [];

    while (hasMorePages) {
      const url = `${baseUrl}&page=${currentPage}`;
      const html = await axios.get(url);
      const $ = cheerio.load(html.data);

      $("a.manhattan--container--1lP57Ag").each((index, el) => {
        const title = $(el).find("h1.manhattan--titleText--WccSjUS").text().trim();
        const exampleImageUrl = $(el).find("img").attr("src").replace("https:","");
        const imageUrl = "https:" + exampleImageUrl;
        const productUrl =  "https://" + $(el).attr("href").replace("//m.", "");

      
        const examplePrice =  $(el).find("div.manhattan--price-sale--1CCSZfK").text().trim().replace("€", "");
        const price = Number(examplePrice);

        const exampleExPrice = $(el).find("div.manhattan--price-original--3QAcCkG").text().trim().replace("€","");
        const exPrice = Number(exampleExPrice);
                 
        const delivery = $(el).find("span.tag--textStyle--vcAi3Rh").text().trim();
        const shopName = "aliexpress.com";

        
        products.push({shopName ,title, imageUrl, productUrl, price, exPrice, delivery});
    });
    
      const nextButton = $('li.pagination--paginationLink--2ucXUo6.next-next');
      hasMorePages = nextButton.length > 0 && nextButton.hasClass('disabled');
      currentPage++;
    }
    
    fs.writeFile('aliexpressProducts2.json', JSON.stringify(products), err => {
      if (err) throw err;
      console.log('Products saved to file.');
    });
  } catch (error) {
    console.error(error);
  }
};

scrapeAliexpress();