import CommonConfig from 'fn-common-ui';
import localCommonConfig from './localCommon.configuration';

var config = Object.assign(CommonConfig.CommonConfig, {
  haloLogin: 'https://oidc.stage.flogin.att.com/isam/oidc/endpoint/amapp-runtime-PSE/authorize?response_type=id_token+token&client_id=m11635&state=FWpMHzl61gXfcnMmwkp4&&scope=openid&nonce=dsZHN5kvm2a4cVIA0ZdN&response_mode=form_post',
  haloLogout: 'https://fcontent.stage.att.com/dynamic/iamLRR/LrrController?IAM_OP=logout&appName=m11635',

  geolinkAuthScript: 'https://geo.stage.att.com/appBoard/views/firstnet-pse-remote-auth-dev.html',
  geolinkKeepaliveResource: 'https://geo.stage.att.com/appBoard/assets/images/firstnet/singlepixel.png',
  geolinkAbMapConstantsFileName: 'abMapConstantsFNST.js',
  mktgPortalImgBaseUrl: 'https://www.firstnet.ws',

  appCatalog: 'https://abed-apps.sapientfirst.net/',
  appControl: 'https://abed-appcontrol.sapientfirst.net/',
  localControl: 'https://abed-localcontrol.sapientfirst.net/',
  firstnetTraining: 'https://abed-training.sapientfirst.net/',
  devPortal: 'https://test-developer.firstnet.com/developer/mvc/auth/login?siteId=PORTALPROPER',

  manageMyProfileLink: 'https://test-profilemgt.firstnet.att.com/ebiz/firstnet/userDetails/viewMyProfile',
  manageUsersLink: 'https://test-profilemgt.firstnet.att.com/ebiz/firstnet/index.jsp#/companyInfo/companyInfoProfile',
  manageServicesLink: 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn',
  manageVoicemailAndUsageLink: 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn',
  manageIotDevicesLink: 'https://fnstaging.jasperwireless.com/provision/saml/login/alias/jasper_saml_fnstaging',
  incidentUpliftLink: 'https://test-incidentmgt.firstnet.att.com/',
  viewWirelessReportsLink: 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn?requestedPage=downloadReports',
  shopStandardDevicesLink: 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn'
}, localCommonConfig);

export default config
