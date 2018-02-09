var config = {
  httpProtocol: 'https://',
  ssoCrack: 'https://localhost:8443/oauth/validate',
  haloLogin: 'https://oidc.stage.flogin.att.com/isam/oidc/endpoint/amapp-runtime-PSE2/authorize?response_type=id_token+token&client_id=m17580&state=FWpMHzl61gXfcnMmwkp4&&scope=openid&nonce=dsZHN5kvm2a4cVIA0ZdN&response_mode=form_post',
  haloLogout: 'https://fcontent.stage.att.com/dynamic/iamLRR/LrrController?IAM_OP=logout&appName=m17580',
  apperianUploads: 'https://ease.apperian.com/uploads/',
  cloudGeolinkAssets: 'https://onemap.att.com/icecapmap',
  geolinkAuthScript: 'https://geo.stage.att.com/appBoard/views/firstnet-pse-remote-auth.html',
  geolinkAbMapConstantsFileName: 'abMapConstantsFNST.js',
  mktgPortalImgBaseUrl: 'https://www.firstnet.ws',
  apiBase: '/api',
  attCustomerSupportPhone: '800-574-7000',
  attCustomerSupportDialNum: '+18005747000',
  firstnetGov: 'https://firstnet.gov/',
  firstnetCom: 'https://www.firstnet.com/',
  appCatalog: 'https://stage-apps.sapientfirst.net',
  appControl: 'https://stage-appcontrol.sapientfirst.net',
  localControl: 'https://stage-localcontrol.sapientfirst.net',
  devPortal: 'https://test-developer.firstnet.com',
  manageMyProfileLink: 'https://test-profilemgt.firstnet.att.com/firstnet/icam/index.html#/firstnet/icam/index/my-profile-view-only',
  manageUsersLink: 'https://test-profilemgt.firstnet.att.com/firstnet/icam/index.html#/firstnet/icam/index/lander-city',
  manageServicesLink: 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn',
  viewWirelessReportsLink: 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn?requestedPage=downloadReports',
  shopStandardDevicesLink: 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn',
  showOnboardingWalkthrough: true
}

export default config
