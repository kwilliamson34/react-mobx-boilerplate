import cheerio from 'cheerio';

class ExternalSolutionsService {

  filterPSSCells(htmlNode) {
    const $ = cheerio.load(htmlNode);

    let cellArray = [];
    let regions = $('.molecules__image-card').get();

    function retrieveFields(cell){
      return {
        title: $(cell).find('.card__title').text(),
        description: $(cell).find('.card__description').find('p').text(),
        imgPath: $(cell).find('.card__image-inner img').attr('src'),
        url: $(cell).find('.atoms__link-field').attr('href')
      }
    }

    regions.forEach((cell) => {
      let cellData = retrieveFields(cell);
      cellArray.push(cellData);
    });

    return cellArray;
  }

  filterPSSHeaderImg(htmlNode) {
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
