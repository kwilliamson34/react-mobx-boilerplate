import {history} from './history.service';

export const successPage = ({pageTitle = 'Thank you!', message = '', contactUs = false, returnToUrl = '/', returnToButtonText = 'Return to Home Page'}) => {
  history.push('/success', {
    pageTitle: pageTitle,
    message: message,
    contactUs: contactUs,
    returnToUrl: returnToUrl,
    returnToButtonText: returnToButtonText
  });
}
