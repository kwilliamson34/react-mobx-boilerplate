const config = {
  httpProtocol: 'https://',
  ssoCrack: 'https://localhost:8443/oauth/validate',
  haloLogin: 'https://oidc.flogin.att.com/isam/oidc/endpoint/amapp-runtime-SSPRS/authorize?response_type=id_token+token&client_id=m11635&state=FWpMHzl61gXfcnMmwkp4&&scope=openid&nonce=dsZHN5kvm2a4cVIA0ZdN&response_mode=form_post',
  haloLogout: 'https://fcontent.att.com/dynamic/iamLRR/LrrController?IAM_OP=logout&appName=m11635',
  apperianUploads: 'https://ease.apperian.com/uploads/',
  geolinkScripts: 'https://geo.att.com/appBoard',
  geolinkAbMapConstants: 'abMapConstantsFN.js',
  mktgPortalImgBaseUrl: 'https://www.firstnet.ws',
  apiBase: '/api'
}

export default config
