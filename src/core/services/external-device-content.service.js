import cheerio from 'cheerio';

class ExternalDeviceContentService {

    cleanupDrupalTextReturn(str) {
      return (str)? str.replace(/(\r\n|\n|\r|\t)/gm,'').trim() : '';
    }

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
      let self = this;
      let categoryObj = {};
      categoryObj.title = this.cleanupDrupalTextReturn( $('.region-title').text() );
      categoryObj.intro = this.cleanupDrupalTextReturn( $('.region-description').html() );
      categoryObj.items = [];
      let cards = $('.molecules__image-card');
      cards.each(function(){
        let cardImg = $(this).find('.card__image-inner img');
        categoryObj.items.push({
          url: $(this).find('.atoms__link-field').attr('href'),
          title: self.cleanupDrupalTextReturn($(this).find('.card__title .atoms__text-field').text()),
          image: cardImg.attr('src'),
          alt: cardImg.attr('alt')
        });
      });
      return categoryObj;
    }

    filterDeviceDetailData(htmlNode){
      let $ = cheerio.load(htmlNode);
      let self = this;
      let deviceDtl = {};
      deviceDtl.deviceName = this.cleanupDrupalTextReturn( $('.article__title div.atoms__text-field').text() );
      let dtlImg = $('.fnmp__device-detail .article__image > img');
      deviceDtl.deviceImg = dtlImg.attr('src');
      deviceDtl.deviceImgAlt = dtlImg.attr('alt');
      deviceDtl.features = [];
      let featuresList = $('.article__features li.atoms__list-item');
      featuresList.each(function(){
        deviceDtl.features.push( self.cleanupDrupalTextReturn( $(this).html() ) );
      });
      deviceDtl.terms = this.cleanupDrupalTextReturn($('.article__tnc .atoms__text-field').html() );

      return deviceDtl;
    }

}

export const externalDeviceContentService = new ExternalDeviceContentService();
