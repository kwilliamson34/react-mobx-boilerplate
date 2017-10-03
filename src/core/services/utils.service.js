import dateFns from 'date-fns/format';
import isValid from 'date-fns/is_valid'
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
          type: obj.custom_metadata.app_type,
          imageUrl: obj.icon_path,
          rating: obj.rating,
          reviews_count: obj.reviews_count,
          id: obj.id,
          app_psk: obj.app_psk,
          isAvailable: obj.isAvailable,
          isRecommended: obj.isRecommended,
          mdm_install_status: obj.mdm_install_status,
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
    return string.trim().replace(/&\w{2,8}; ?/g, '').replace(/[^A-Z\s\d]?/ig, '').replace(/ /g, '+').toLowerCase();
  }

  isValidEmailAddress(string) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(string);
  }

  normalizedDate(date, format) {
    //to prevent discrepencies, split the date string at 'T' and ignore the localization data which follows; before the 'T' is the simple date, with month, day, year;
    const newDate = date.split('T')[0];
    //check if date is in a valid format, else return an empty string;
    const dateToRender = isValid(new Date(newDate)) ? dateFns(newDate, format) : '';
    return dateToRender;
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

  getUserAgent() {
    return navigator.userAgent || navigator.vendor || window.opera;
  }

  getMobileOperatingSystem() {
    const userAgent = this.getUserAgent();

    // Windows Phone must come first because its UA also contains "Android"
    if(/windows phone/i.test(userAgent)){
      return 'Windows Phone';
    }

    if(/android/i.test(userAgent)){
      return 'Android';
    }

    if(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream){
      return 'iOS';
    }

    return 'unknown';
  }

  getIsMobile() {
    return this.getMobileOperatingSystem() !== 'unknown';
  }

  getIsInternetExplorer() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
    // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
  }

}

export const utilsService = new UtilsService();
