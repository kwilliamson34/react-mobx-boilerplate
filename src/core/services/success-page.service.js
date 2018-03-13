import {history} from './history.service';

export const successPage = ({pageTitle = 'Thank you!', message = '', contactUs = false, returnToUrl = '/', returnToButtonText = 'Return to Home Page'}) => {
  //the second argument on history.push puts these values on history.location.state.
  history.push('/success', {
    pageTitle,
    message,
    contactUs,
    returnToUrl,
    returnToButtonText
  });
}
