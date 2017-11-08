const config = {
  httpProtocol: 'https://',
  ssoCrack: 'https://localhost:8443/oauth/validate',
  haloLogin: 'https://oidc.idp.flogin.att.com/isam/oidc/endpoint/amapp-runtime-PSE/authorize?response_type=id_token+token&client_id=m14332&state=FWpMHzl61gXfcnMmwkp4&&scope=openid&nonce=dsZHN5kvm2a4cVIA0ZdN&response_mode=form_post',
  haloLogout: 'https://fcontent.att.com/dynamic/iamLRR/LrrController?IAM_OP=logout&appName=m14332',
  apperianUploads: 'https://ease.apperian.com/uploads/',
  cloudGeolinkAssets: 'https://onemap.att.com/icecapmap',
  geolinkAuthScript: 'https://geo.att.com/appBoard/views/firstnet-pse-remote-auth.html',
  geolinkAbMapConstantsFileName: 'abMapConstantsFN.js',
  mktgPortalImgBaseUrl: 'https://www.firstnet.com',
  apiBase: '/api',
  attCustomerSupportPhone: '800-574-7000',
  attCustomerSupportDialNum: '+18005747000',
  firstnetGov: 'https://firstnet.gov/',
  firstnetCom: 'https://www.firstnet.com/',
  appStore: 'https://apps.firstnet.att.com/',
  appControl: 'https://appcontrol.firstnet.att.com/',
  localControl: 'https://localcontrol.firstnet.att.com',
  devPortal: 'https://developer.firstnet.att.com',
  manageMyProfileLink: 'https://profilemgt.firstnet.att.com/ebiz/firstnet/userDetails/viewMyProfile',
  manageUsersLink: 'https://profilemgt.firstnet.att.com/ebiz/firstnet/index.jsp#/companyInfo/companyInfoProfile',
  manageServicesLink: 'https://wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn',
  viewWirelessReportsLink: 'https://wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn?requestedPage=downloadReports',
  shopStandardDevicesLink: 'https://wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn',
  showOnboardingWalkthrough: true
}

export default config
