import cheerio from 'cheerio';

class ExternalSolutionsService {

  filterPSSCells(htmlNode) {
    const $ = cheerio.load(htmlNode);

    let cellArray = [];
    let regions = $('.molecules__image-card').get();

    function retrieveFields(cell){
      return {
        title: $(cell).find('.field--name-field-title').text(),
        description: $(cell).find('.field--name-field-description').text(),
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

}

export const externalSolutionsService = new ExternalSolutionsService();
