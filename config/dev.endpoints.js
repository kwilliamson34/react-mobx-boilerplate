const config = {
  httpProtocol: 'https://',
  ssoCrack: 'https://localhost:8443/oauth/validate',
  haloLogin: 'https://oidc.stage.flogin.att.com/isam/oidc/endpoint/amapp-runtime-SSPRS/authorize?response_type=id_token+token&client_id=m11635&state=FWpMHzl61gXfcnMmwkp4&&scope=openid&nonce=dsZHN5kvm2a4cVIA0ZdN&response_mode=form_post',
  haloLogout: 'https://fcontent.stage.att.com/dynamic/iamLRR/LrrController?IAM_OP=logout&appName=m11635',
  apperianUploads: 'https://ease.apperian.com/uploads/',
  cloudGeolinkAssets: 'https://onemap.att.com/icecapmap',
  geolinkAuthScript: 'https://geo.stage.att.com/appBoard/views/firstnet-pse-remote-auth-dev.html',
  geolinkAbMapConstantsFileName: 'abMapConstantsFNST.js',
  mktgPortalImgBaseUrl: 'https://www.firstnet.ws',
  apiBase: '/api',
  attCustomerSupportPhone: '800-574-7000',
  appStore: 'https://apps-qa.sapientfirst.net',
  developerConsole: 'https://devcon-qa.sapientfirst.net',
  localControl: 'https://pse-qa.sapientfirst.net',
  viewWirelessReportsLink: 'https://test-wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn?requestedPage=downloadReports'
}

export default config
