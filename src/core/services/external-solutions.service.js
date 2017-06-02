import cheerio from 'cheerio';

class ExternalSolutionsService {

  filterSolutionCards(htmlNode) {
    const $ = cheerio.load(htmlNode);

    let cardArray = [];
    let regions = $('.molecules__image-card').get();

    function retrieveFields(card){
      return {
        title: $(card).find('.card__title').text(),
        description: $(card).find('.card__description').find('p').text(),
        imgPath: $(card).find('.card__image-inner img').attr('src'),
        url: $(card).find('.atoms__link-field').attr('href')
      }
    }

    regions.forEach((card) => {
      let cardData = retrieveFields(card);
      cardArray.push(cardData);
    });

    return cardArray;
  }

  filterSolutionHeaderImg(htmlNode) {
    const $ = cheerio.load(htmlNode);
    return $('.title-large').css('background-image');
  }

  // filterPSSDetails(htmlNode) {
  //
  //   const $ = cheerio.load(htmlNode);
  //
  //   return {
  //     title: $('.article__main').find('article__title'),
  //     bodyHeader: $('.article__body').find('h3'),
  //     bodyText: $('.article__body').find('p'),
  //     bodyList: $('.article__body').get('li'),
  //     img: $('.widget_region').find('.card__image-inner img').attr('src'),
  //     caption: $('.widget_region').find('card__title')
  //   }
  // }

}

export const externalSolutionsService = new ExternalSolutionsService();
