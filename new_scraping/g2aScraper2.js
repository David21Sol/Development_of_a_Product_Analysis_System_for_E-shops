const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

/* //test scraping
const scrapeG2a = async() => {
  try{
      const response = await axios.get("https://www.g2a.com/search?query=games");
      const html = response.data;
      const $ =  cheerio.load(html);
      const products = [];

      $("li.sc-eGJWMs.hPxtgO.indexes__StyledProductBox-wklrsw-84.bqmnpj").each((index, el) => {
        const title =  $(el).find("a").text().trim();
        const imageUrl = $(el).find("img").attr("src");    
        const productUrl = "https://www.g2a.com" + $(el).find("h3").find("a").attr("href");

        const examplePrice =  $(el).find("span.sc-iqAclL.sc-crzoAE.dJFpVb.eqnGHx.sc-bqGGPW.fIHClq").text().trim().replace("$", "").replace(" ","");
        const examplePrice2 = ((Number(examplePrice) * 0.92)).toFixed(2);
        const price = Number(examplePrice2)
        
        const exampleExPrice = $(el).find("s.sc-iqAclL.sc-dIsUp.dJFpVb.bCiUoW.sc-bqGGPW.kZzpTd").text().trim().replace("$", "").replace(" ","");;
        const exampleExPrice2 = ((Number(exampleExPrice) * 0.92)).toFixed(2);
        const exPrice = Number(exampleExPrice2);
        const rating = 0;
        const shopName = "rdveikals.lv";

        
        products.push({ shopName,title, imageUrl,productUrl, price, exPrice,rating });
    });
    
    
    console.log(products);

  }catch (error){
      console.error(error);
  }
}

scrapeG2a();*/



const scrapeG2a = async () => {
  try {
    const baseUrl = 'https://www.g2a.com/search?query=games';
    let currentPage = 1;
    let hasMorePages = true;
    const products = [];

    while (hasMorePages) {
      const url = `${baseUrl}&page=${currentPage}`;
      const html = await axios.get(url);
      const $ = cheerio.load(html.data);

      $("li.sc-eGJWMs.hPxtgO.indexes__StyledProductBox-wklrsw-84.bqmnpj").each((index, el) => {
        const title =  $(el).find("a").text().trim();
        const imageUrl = $(el).find("img").attr("src");    
        const productUrl = "https://www.g2a.com" + $(el).find("h3").find("a").attr("href");

        const examplePrice =  $(el).find("span.sc-iqAclL.sc-crzoAE.dJFpVb.eqnGHx.sc-bqGGPW.fIHClq").text().trim().replace("$", "").replace(" ","");
        const examplePrice2 = ((Number(examplePrice) * 0.92)).toFixed(2);
        const price = Number(examplePrice2)
        
        const exampleExPrice = $(el).find("s.sc-iqAclL.sc-dIsUp.dJFpVb.bCiUoW.sc-bqGGPW.kZzpTd").text().trim().replace("$", "").replace(" ","");;
        const exampleExPrice2 = ((Number(exampleExPrice) * 0.92)).toFixed(2);
        const exPrice = Number(exampleExPrice2);
        const rating = 0;
        const shopName = "rdveikals.lv";

        
        products.push({ shopName,title, imageUrl,productUrl, price, exPrice,rating });
    });
    
    const nextButton = $('a.indexes__StyledControlButton-wklrsw-77.hUZvaV.nextButton');
    hasMorePages = nextButton.length > 0 && !nextButton.hasClass('disabled');
    currentPage++;
    }
    
    fs.writeFile('g2aProducts2.json', JSON.stringify(products), err => {
      if (err) throw err;
      console.log('Products saved to file.');
    });
  } catch (error) {
    console.error(error);
  }
};

scrapeG2a();