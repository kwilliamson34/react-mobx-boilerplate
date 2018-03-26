import CommonConfig from 'fn-common-ui';
import localCommonConfig from './localCommon.configuration';

var config = Object.assign(CommonConfig.CommonConfig, {
  haloLogin: 'https://oidc.stage.flogin.att.com/isam/oidc/endpoint/amapp-runtime-PSE2/authorize?response_type=id_token+token&client_id=m17580&state=FWpMHzl61gXfcnMmwkp4&&scope=openid&nonce=dsZHN5kvm2a4cVIA0ZdN&response_mode=form_post',
  haloLogout: 'https://fcontent.stage.att.com/dynamic/iamLRR/LrrController?IAM_OP=logout&appName=m17580',

  geolinkAuthScript: 'https://geo.stage.att.com/appBoard/views/firstnet-pse-remote-auth.html',
  geolinkKeepaliveResource: 'https://geo.stage.att.com/appBoard/assets/images/firstnet/singlepixel.png',
  geolinkAbMapConstantsFileName: 'abMapConstantsFNST.js',
  mktgPortalImgBaseUrl: 'https://www.firstnet.ws',
  
  appCatalog: 'https://stage-apps.sapientfirst.net/',
  appControl: 'https://stage-appcontrol.sapientfirst.net/',
  localControl: 'https://stage-localcontrol.sapientfirst.net/',
  firstnetTraining: 'https://stage-training.sapientfirst.net/',
  devPortal: 'https://test-developer.firstnet.com/developer/mvc/auth/login?siteId=PORTALPROPER&destPage=%2F',

  manageMyProfileLink: 'https://test-profilemgt2.firstnet.att.com/firstnet/icam/index.html#/firstnet/icam/index/my-profile-view-only',
  manageUsersLink: 'https://test-profilemgt2.firstnet.att.com/firstnet/icam/index.html#/firstnet/icam/index/lander-city',
  manageServicesLink: 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn',
  manageVoicemailAndUsageLink: 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn',
  manageIotDevicesLink: 'https://fnstaging.jasper.com/provision/jsp/login.jsp',
  incidentUpliftLink: 'https://test-incidentmgt.firstnet.att.com/',
  viewWirelessReportsLink: 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn?requestedPage=downloadReports',
  shopStandardDevicesLink: 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn'
}, localCommonConfig);

export default config
