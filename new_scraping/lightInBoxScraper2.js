const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

/* //test scraping
const scrapeAlixpress = async() => {
    try{
        const response = await axios.get("https://www.lightinthebox.com/index.php?main_page=advanced_search_result&inc_subcat=1&search_in_description=0&keyword=video+gaming&page=1");
        const html = response.data;
        const $ =  cheerio.load(html);
        const products = [];

        $("a.widget.prod_item-2020.ctr-track-list").each((index, el) => {
            const title = $(el).find("div.prod-name").text().trim(); 
            const imageUrl = $(el).find("picture").attr("data-webp");
            const productUrl = $(el).attr("href");

            const testPrice = $(el).find("div.price").text().trim().replace("EUR", "").replace("€", "");
            const price = Number(testPrice);  
            
            const testExPrice = $(el).find("div.list-price").text().trim().replace("€", "");
            const exPrice = Number(testExPrice);
            
            const testRating = $(el).find("span.review-score").text();
            const rating = Number(testRating);
            const delivery = "2-6 business days";
            const shopName = "lightinthebox.com";

            
            products.push({shopName,title,imageUrl, productUrl, price, exPrice ,rating, delivery});
        });

        
       console.log(products);
      

    }catch (error){
        console.error(error);
    }
}

scrapeAlixpress();*/


const scrapeLightinthebox = async () => {
  try {
    const baseUrl = 'https://www.lightinthebox.com/index.php?main_page=advanced_search_result&inc_subcat=1&search_in_description=0&keyword=video+gaming';
    let currentPage = 1;
    let hasMorePages = true;
    const products = [];

    while (hasMorePages) {
      const url = `${baseUrl}&page=${currentPage}`;
      const html = await axios.get(url);
      const $ = cheerio.load(html.data);

      $("a.widget.prod_item-2020.ctr-track-list").each((index, el) => {
          const title = $(el).find("div.prod-name").text().trim(); 
          const imageUrl = $(el).find("picture").attr("data-webp");
          const productUrl = $(el).attr("href");

          const testPrice = $(el).find("div.price").text().trim().replace("EUR", "").replace("€", "");
          const price = Number(testPrice);
          const testExPrice = $(el).find("div.list-price").text().trim().replace("€", "");
          const exPrice = Number(testExPrice); 

          const testRating = $(el).find("span.review-score").text();
          const rating = Number(testRating);
          const delivery = "2-6 business days";
          const shopName = "lightinthebox.com";
          
          products.push({shopName,title,imageUrl, productUrl, price,exPrice, rating, delivery});
      });

      const nextButton = $('li.next');
      hasMorePages = nextButton.length > 0 && !nextButton.hasClass('disabled');
      currentPage++;
    }

    fs.writeFile('LightintheboxProducts2.json', JSON.stringify(products), err => {
      if (err) throw err;
      console.log('Products saved to file.');
    });
  } catch (error) {
    console.error(error);
  }
};

scrapeLightinthebox();