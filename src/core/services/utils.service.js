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
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
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

  isValidEmailAddress(string) {
    //allowed emails are based on https://blogs.msdn.microsoft.com/testing123/2009/02/06/email-address-test-cases/
    const emailRegex = /^([A-Z|a-z|0-9|_-](\.|\+){0,1})+[A-Z|a-z|0-9|_-]@([A-Z|a-z|0-9|_-])*(\.|\+){0,1}([A-Z|a-z|0-9|_-])+\.[a-z]{2,4}$/gm;
    return emailRegex.test(string);
  }

  escapeHtmlEntityOutput(string) {
    return string.replace(/'/g, '&apos;');
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

  getCookie(cname) {
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  setCookie(cname, cvalue, exdays) {
    let expiryDays = exdays || 365;
    let d = new Date();
    d.setTime(d.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  registerFormFieldRef(ref, formFieldRefList) {
    //store refList as simple array so we don't get the "out of bounds" error while looping over it;
    const refList = formFieldRefList.peek();
    //sometimes null refs come in;
    if (!ref) return;
    //if the ref already exists in the refList, ignore it;
    if (refList.indexOf(ref) > -1) {
      return;
    } else {
      for (let r in refList) {
        //if the ref has unmounted, its input field will be null. Remove it;
        if (!refList[r].input) {
          formFieldRefList.remove(formFieldRefList[r]);
        }
        //check for refs that are different but have matching ids. Remove the existing ref, to replace with the new ref;
        else if (refList[r] !== ref && Boolean(refList[r].input && ref.input) && refList[r].input.id === ref.input.id) {
          formFieldRefList.remove(formFieldRefList[r]);
        }
      }
      formFieldRefList.push(ref);
    }
  }
}

export const utilsService = new UtilsService();
