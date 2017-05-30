import cheerio from 'cheerio';

class ExternalSolutionsService {

  filterPSSCells(htmlNode, selectorsArray) {
      let cellArray = [];

      const $ = cheerio.load(htmlNode);

      function retrieveFields(regionSelector){
        return {
          title: $(regionSelector).find('.field--name-field-title').text(),
          description: $(regionSelector).find('.field--name-field-description').text(),
          imgPath: $(regionSelector).find('.card__image-inner img').attr('src'),
          url: $(regionSelector).find('.atoms__link-field').attr('href')
        }
      }

      selectorsArray.forEach((cell) => {
        let cellData = retrieveFields(cell);
        cellArray.push(cellData);
      });

      return cellArray;
  }

}

export const externalSolutionsService = new ExternalSolutionsService();
