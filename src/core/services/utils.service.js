class UtilsService {

  getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
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
