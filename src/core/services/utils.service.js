import {userStore} from '../stores/user.store';
import {history} from './history.service';
import $ from 'jquery';

class UtilsService {
  formatRating(rating) {
    //format rating as a string with 1 decimal place
    if(!rating) {
      return '0.0';
    }
    if(rating.toString().indexOf('.') === -1) {
      return rating.toFixed(1);
    }
    return rating.toString();
  }

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
          publisher: obj.custom_metadata.author,
          imageUrl: obj.icon_path,
          rating: obj.rating,
          reviews_count: obj.reviews_count,
          id: obj.id,
          app_psk: obj.app_psk,
          isAvailable: obj.isAvailable,
          isRecommended: obj.isRecommended,
          mdm_install_status: obj.mdm_install_status,
          badge: obj.custom_metadata.app_type === 'ENDORSED',
          platform: obj.platform,
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

  scrollIntoViewIfNecessary($target, scrollPadding) {
    const _scrollPadding = scrollPadding || 380;
    const tgtOffsetTop = $target.offset().top;
    const tgtHeight = $target.height();
    const winScrollTop = $(window).scrollTop();
    const winHeight = window.innerHeight || document.documentElement.clientHeight;
    //check if $target is in viewport
    if (!(tgtOffsetTop < winScrollTop && tgtOffsetTop > winScrollTop + winHeight)) {
      if (tgtOffsetTop > winScrollTop) {
        //scroll down
        $('html, body').animate(
          {
            scrollTop: tgtOffsetTop - _scrollPadding
          }
        );
      } else if (tgtOffsetTop + tgtHeight < winScrollTop + winHeight) {
        //scroll up
        $('html, body').animate(
          {
            scrollTop: tgtOffsetTop - winHeight + tgtHeight + _scrollPadding
          }
        );
      }
    }
  }

  getDevicesAndSolutionsUrl(string) {
    //removes HTML code entities and any special characters, before replacing spaces with plus symbol;
    return string.replace(/&\w{2,8}; ?/g, '').replace(/[^A-Z\s\d]?/ig, '').replace(/ /g, '+').toLowerCase();
  }

  isValidEmailAddress(string) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(string);
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

  handlePendingAuthorizationsMapping() {
    console.warn('User PSE association has not yet happened..');
    history.replace('/error/pending');
  }

  properCaseOS(platform) {
		let os;
		if (platform === 'IOS') {
			os = 'iOS';
		} else if (platform === 'ANDROID') {
			os = 'Android';
		} else {
			os = platform;
		}
		return os;
	}
}

export const utilsService = new UtilsService();
