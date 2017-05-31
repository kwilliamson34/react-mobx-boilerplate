import cheerio from 'cheerio';

class ExternalDeviceContentService {

    filterDeviceLandingData(htmlNode) {
        let devicesObj = {
          phones: [],
          tablets: [],
          invehicle: [],
          accessories: []
        }
        let $ = cheerio.load(htmlNode);
        const deviceRegions = [
          {
            section: devicesObj.phones,
            selector: '.bs-region[class*=bs-region--row-3-col]'
          },
          {
            section: devicesObj.tablets,
            selector: '.bs-region[class*=bs-region--row-4-col]'
          },
          {
            section: devicesObj.invehicle,
            selector: '.bs-region[class*=bs-region--row-5-col]'
          },
          {
            section: devicesObj.accessories,
            selector: '.bs-region[class*=bs-region--row-6-col]'
          }
        ];

        function retrieveFields(deviceArray, regionSelector){
          let cards = $(regionSelector);
            cards.each(function(){
              let cardUrl = $(this).find('.atoms__link-field').attr('href');
              let cardTitle = $(this).find('.field--name-field-title').text();
              let cardImg = $(this).find('.card__image-inner img').attr('src');
              deviceArray.push({
                url: cardUrl,
                title: cardTitle,
                image: cardImg
              });
            });
        }

        deviceRegions.map((device) => {
          retrieveFields(device.section, device.selector);
        });

        return devicesObj;
    }

    filterDeviceCategoryData(htmlNode){
      let $ = cheerio.load(htmlNode);
      return {title: 'hi'}
    }

    filterDeviceDetailData(htmlNode){
      let $ = cheerio.load(htmlNode);
      return {title: 'hi'}
    }

}

export const externalDeviceContentService = new ExternalDeviceContentService();
