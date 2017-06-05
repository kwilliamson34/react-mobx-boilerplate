import config from 'config';
import {pseMasterStore} from '../stores/master.store';

class UtilsService {
  conditionData(objs) {
    let simplifiedObjectList = objs.filter(obj => {
      //only process objects that have valid metadata
      return obj.custom_metadata && obj.custom_metadata.user_segment && obj.custom_metadata.user_segment.length > 0;
    }).map(obj => {
      return {
        name: obj.app_name,
        publisher: obj.author,
        imageUrl: config.apperianUploads + obj.icon_path,
        rating: obj.rating,
        id: obj.id,
        app_psk: obj.app_psk,
        isAvailable: obj.isAvailable,
        isRecommended: obj.isRecommended,
        badge: obj.is_endorsed,
        operatingSystem: obj.operating_system,
        category: obj.custom_metadata.category,
        user_segment: obj.custom_metadata.user_segment,
        screenshots: {
          mobile: [],
          tablet: []
        }
      }
    });
    return simplifiedObjectList;
  }

  handleError(err) {
    switch (err.response.status) {
      case 401:
        console.log('Received 401 Unauthenticated response, redirecting to Halo...');
        window.location.replace(config.haloLogin);
        break;
      case 403:
        console.log('Received 403 Forbidden response, redirecting to error page...');
        pseMasterStore.routerStore.history.push('/error');
        pseMasterStore.routerStore.history.goForward();
        break;
      case 500:
        if (err.message.indexOf('Bearer token is invalid' > -1)) {
          console.log('Received 500 Internal Error response: Bearer token invalid, redirecting to Halo...');
          window.location.replace(config.haloLogin);
        } else {
          console.warn(err);
        }
        break;
      default:
        console.log('Received ' + err.response.status + ' response, no special handling required.');
        console.warn(err);
        break;
    }
  }
}

export const utilsService = new UtilsService();
