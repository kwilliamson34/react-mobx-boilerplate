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

}

export const externalSolutionsService = new ExternalSolutionsService();
