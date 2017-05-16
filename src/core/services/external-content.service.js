import cheerio from 'cheerio';

class ExternalContentService {

    filterDeviceData(htmlNode) {
        let devicesObj = {
          phones: [],
          tablets: [],
          invehicles: [],
          accessories: []
        }

        const $ = cheerio.load(htmlNode);

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
            section: devicesObj.invehicles,
            selector: '.bs-region[class*=bs-region--row-5-col]'
          },
          {
            section: devicesObj.accessories,
            selector: '.bs-region[class*=bs-region--row-6-col]'
          }
        ];

        deviceRegions.map((device) => {
          retrieveFields(device.section, device.selector);
        });

        return devicesObj;
    }

}

export const externalContentService = new ExternalContentService();
