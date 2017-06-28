import {userStore} from '../stores/user.store';
import {history} from './history.service';
import config from 'config';

class UtilsService {
  mapAppsToCards(objs) {
    if(!objs || !objs.length) {
      return [];
    }

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
          badge: obj.isEndorsed,
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

  getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  handleError(err) {
    switch (err.response.status) {
      case 401:
        console.log('Received 401 Unauthenticated response, retrying user validation...');
        userStore.revalidateUser();
        break;
      case 403:
        console.log('Received 403 Forbidden response, redirecting to error page...');
        history.replace('/error');
        break;
      case 410:
        console.warn('Received 410 Gone response, redirecting to not available error page...');
        history.replace('/error/unavailable');
        break;
      case 500:
        console.log('Received 500 Internal Error response, redirecting to error page...');
        console.warn(err);
        history.replace('/error');
        break;
      default:
        console.log('Received ' + err.response.status + ' response, redirecting to error page...');
        console.warn(err);
        history.replace('/error');
        break;
    }
  }
}

export const utilsService = new UtilsService();
