const config = {
  httpProtocol: 'https://',
  ssoCrack: 'https://localhost:8443/oauth/validate',
  haloLogin: 'https://oidc.stage.flogin.att.com/isam/oidc/endpoint/amapp-runtime-PSE/authorize?response_type=id_token+token&client_id=m11635&state=FWpMHzl61gXfcnMmwkp4&&scope=openid&nonce=dsZHN5kvm2a4cVIA0ZdN&response_mode=form_post',
  haloLogout: 'https://fcontent.stage.att.com/dynamic/iamLRR/LrrController?IAM_OP=logout&appName=m11635',
  apperianUploads: 'https://ease.apperian.com/uploads/',
  cloudGeolinkAssets: 'https://onemap.att.com/icecapmap',
  geolinkAuthScript: 'https://geo.stage.att.com/appBoard/views/firstnet-pse-remote-auth.html',
  geolinkAbMapConstantsFileName: 'abMapConstantsFNST.js',
  mktgPortalImgBaseUrl: 'https://www.firstnet.ws',
  apiBase: '/api',
  attCustomerSupportPhone: '800-574-7000',
  firstnetGov: 'https://firstnet.gov/',
  firstnetCom: 'https://www.firstnet.com/',
  appStore: 'https://test-apps.firstnet.att.com',
  appControl: 'https://test-appcontrol.firstnet.att.com/',
  localControl: 'https://test-localcontrol.firstnet.att.com',
  devPortal: 'https://test-developer.firstnet.att.com',
  manageMyProfileLink: 'https://test-profilemgt.firstnet.att.com/ebiz/firstnet/userDetails/viewMyProfile',
  manageUsersLink: 'https://test-profilemgt.firstnet.att.com/ebiz/firstnet/index.jsp#/companyInfo/companyInfoProfile',
  manageServicesLink: 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn',
  manageVoicemailAndUsageLink: ' https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn',
  viewWirelessReportsLink: 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn?requestedPage=downloadReports',
  shopStandardDevicesLink: 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn',
  showOnboardingWalkthrough: true
}

export default config
