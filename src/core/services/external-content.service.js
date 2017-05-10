import cheerio from 'cheerio';

class ExternalContentService {

    filterDeviceData(htmlNode) {
        //console.log('htmlNode: \n' + htmlNode);
        const $ = cheerio.load(htmlNode);
        console.log('# of regions on page: ' + $('.region-width-60').length);
        let devicesObj = {
          phones: [
            {title: 'Phone 1', image: 'w.png'},
            {title: 'Phone 2', image: 'x.png'},
            {title: 'Phone 3', image: 'y.png'},
            {title: 'Phone 4', image: 'z.png'}
          ],
          tablets: [
            {title: 'Tablet 1', image: 'w.png'},
            {title: 'Tablet 2', image: 'x.png'},
            {title: 'Tablet 3', image: 'y.png'},
            {title: 'Tablet 4', image: 'z.png'}
          ],
          invehicles: [
            {title: 'IV 1', image: 'w.png'},
            {title: 'IV 2', image: 'x.png'},
            {title: 'IV 3', image: 'y.png'},
            {title: 'IV 4', image: 'z.png'}
          ],
          accessories: [
            {title: 'Accessory 1', image: 'w.png'},
            {title: 'Accessory 2', image: 'x.png'},
            {title: 'Accessory 3', image: 'y.png'},
            {title: 'Accessory 4', image: 'z.png'}
          ]
        };
        return devicesObj;
    }

}

export const externalContentService = new ExternalContentService();
