import axios from 'axios';
import cheerio from 'cheerio';
import CoinsInfos from './model/coinsInfos';

async function getWebSiteData(url) {
  const { data, status } = await axios.get(url);
  return data;
}

let coinsData : CoinsInfos[] = [];

getWebSiteData('https://www.binance.com/fr/markets').then((data)=>{
  let $ = cheerio.load(data);
  const binanceCoinTable = $('.css-1vuj9rf > .css-vlibs4');
  binanceCoinTable.each(function(index, el) {
      let coinElement : CoinsInfos = {
        abr: $($($($(el).find('a'))).find('.css-y492if')).find('.css-1x8dg53').text(),
        name: $($($($(el).find('a'))).find('.css-74g683')).find('.css-1ap5wc6').text(),
        unitPrice: $($($(el).find('.css-ydcgk2'))).find('div').text(),
        variation: $($($(el).find('.css-18yakpx'))).find('.css-1ca67uc').text()
      }
      coinsData.push(coinElement);
  });
  
  coinsData.forEach((el)=>{
    console.dir(el);
  });
})








































// const crawlerInstance = new Crawler({
//     maxConnections: 10,
//     callback: (error, res, done) => {
//         if (error) {
//             console.log(error);
//         } else {
//             const $ = res.$;
//             const binanceCoinTable = $('.css-1vuj9rf > .css-vlibs4');
//             binanceCoinTable.each(function() {
//                 let abr = $($($($(this).find('a'))).find('.css-y492if')).find('.css-1x8dg53').text(); 
//                 let name = $($($($(this).find('a'))).find('.css-74g683')).find('.css-1ap5wc6').text(); 
//                 let unitPrice = $($($(this).find('.css-ydcgk2'))).find('div').text(); 
//                 let variation = $($($(this).find('.css-18yakpx'))).find('.css-1ca67uc').text(); 
//                 console.log(abr +'  '+ name  +'  '+ unitPrice  +'  '+ variation);
//             });
//         }
//         done();
//     }
// });

// crawlerInstance.queue('https://www.binance.com/fr/markets');