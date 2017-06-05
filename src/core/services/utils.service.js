import {pseMasterStore} from '../stores/master.store';
import config from 'config';

class UtilsService {
  conditionData(objs) {
    let simplifiedObjectList = objs.filter(obj => {
      //only process objects that have valid metadata
      return obj.custom_metadata && obj.custom_metadata.user_segment && obj.custom_metadata.user_segment.length > 0;
    }).map(obj => {
      try {
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
      } catch (e) {
        console.warn('Could not condition data for one or more apps! Has a service property changed?');
        console.log(e);
        return;
      }
    });
    return simplifiedObjectList;
  }

  handleError(err) {
    switch (err.response.status) {
      case 401:
        console.log('Received 401 Unauthenticated response, retrying user validation...');
        pseMasterStore.userStore.validateUser();
        break;
      case 403:
        console.log('Received 403 Forbidden response, redirecting to error page...');
        pseMasterStore.routerStore.history.replace('/error');
        break;
      case 500:
        console.log('Received 500 Internal Error response, redirecting to error page...');
        console.warn(err);
        pseMasterStore.routerStore.history.replace('/error');
        break;
      default:
        console.log('Received ' + err.response.status + ' response, no special handling required.');
        console.warn(err);
        break;
    }
  }
}

export const utilsService = new UtilsService();
