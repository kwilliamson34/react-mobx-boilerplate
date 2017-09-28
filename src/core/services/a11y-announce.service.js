import $ from 'jquery';
/**
 * Adds text to a visually hidden elem with a role="alert" that gets read by a screen reader.
 * Clears out the existing text bore adding, since screen readers will only read CHANGES in the element. The element is index.html and isn't within the React root element.
 * Use this when adding a hdden alert within a React component isn't feasiable, for example if the component will unmount before or soon after the message is meant to be added.
 * @param message
 * @messageType - importance level: alert, status
 * @param resetBefore
 */

export const a11yAnnounce = ({message, resetBefore = true, messageType = 'alert'}) => {
  const container = $(`#global-a11y-${messageType}-announcer`);
  const addMessage = () => {
    container.text(message);
  };

  if(resetBefore) {
    container.text('');
    setTimeout(addMessage, 600);
  }
  else {
    addMessage();
  }
};
