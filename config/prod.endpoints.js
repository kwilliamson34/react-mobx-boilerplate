import CommonConfig from 'fn-common-ui';
import localCommonConfig from './localCommon.configuration';

var config = Object.assign(CommonConfig.CommonConfig, {
  haloLogin: 'https://oidc.idp.flogin.att.com/isam/oidc/endpoint/amapp-runtime-PSE/authorize?response_type=id_token+token&client_id=m14332&state=FWpMHzl61gXfcnMmwkp4&&scope=openid&nonce=dsZHN5kvm2a4cVIA0ZdN&response_mode=form_post',
  haloLogout: 'https://fcontent.att.com/dynamic/iamLRR/LrrController?IAM_OP=logout&appName=m14332',

  geolinkAuthScript: 'https://geo.att.com/appBoard/views/firstnet-pse-remote-auth.html',
  geolinkKeepaliveResource: 'https://geo.att.com/appBoard/assets/images/firstnet/singlepixel.png',
  geolinkAbMapConstantsFileName: 'abMapConstantsFN.js',
  mktgPortalImgBaseUrl: 'https://www.firstnet.com',

  appCatalog: 'https://apps.firstnet.att.com/',
  appControl: 'https://appcontrol.firstnet.att.com/',
  localControl: 'https://localcontrol.firstnet.att.com/',
  firstnetTraining: 'https://training.firstnet.att.com/',
  devPortal: 'https://developer.firstnet.com/developer/mvc/auth/login?siteId=PORTALPROPER',

  manageMyProfileLink: 'https://profilemgt.firstnet.att.com/firstnet/icam/index.html#/firstnet/icam/index/my-profile-view-only',
  manageUsersLink: 'https://profilemgt.firstnet.att.com/firstnet/icam/index.html#/firstnet/icam/index/lander-city',
  manageServicesLink: 'https://wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn',
  manageVoicemailAndUsageLink: 'https://wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn',
  manageIotDevicesLink: 'https://cc19.jasper.com/provision/saml/login/alias/firstnet_saml',
  incidentUpliftLink: 'https://incidentmgt.firstnet.att.com/',
  viewWirelessReportsLink: 'https://wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn?requestedPage=downloadReports',
  shopStandardDevicesLink: 'https://wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn'
}, localCommonConfig);

export default config
