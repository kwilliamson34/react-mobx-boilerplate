const config = {
  httpProtocol: 'https://',
  ssoCrack: 'https://localhost:8443/oauth/validate',
  haloLogin: 'https://oidc.flogin.att.com/isam/oidc/endpoint/amapp-runtime-SSPRS/authorize?response_type=id_token+token&client_id=m11635&state=FWpMHzl61gXfcnMmwkp4&&scope=openid&nonce=dsZHN5kvm2a4cVIA0ZdN&response_mode=form_post',
  haloLogout: 'https://fcontent.att.com/dynamic/iamLRR/LrrController?IAM_OP=logout&appName=m11635',
  apperianUploads: 'https://ease.apperian.com/uploads/',
  cloudGeolinkAssets: 'https://onemap.att.com/icecapmap',
  geolinkAuthScript: 'https://geo.att.com/appBoard/views/firstnet-pse-remote-auth.html',
  geolinkAbMapConstantsFileName: 'abMapConstantsFN.js',
  mktgPortalImgBaseUrl: 'https://www.firstnet.ws',
  apiBase: '/api',
  attCustomerSupportPhone: '800-574-7000',
  viewWirelessReportsLink: 'https://wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn?requestedPage=downloadReports',
  firstnetGov: 'https://firstnet.gov/',
  firstnetCom: 'https://www.firstnet.com/',
  appStore: 'https://apps.firstnet.att.com',
  appControl: 'https://appcontrol.firstnet.att.com',
  localControl: 'https://localcontrol.firstnet.att.com',
  devPortal: 'https://test-developer.firstnet.att.com'
}

export default config
