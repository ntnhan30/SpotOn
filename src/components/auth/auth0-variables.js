// Get the callbackURL depending if its localhost or remote
let callbackUrl = ''
const LOCAL_DOMAINS = ['localhost', '127.0.0.1']
if (LOCAL_DOMAINS.includes(window.location.hostname)) {
	callbackUrl = 'http://localhost:3000/callback'
} else {
	callbackUrl = 'https://spoton.deliveryhero.com/callback'
}

export const AUTH_CONFIG = {
	domain: 'deliveryhero.auth0.com',
	clientId: 'cso8G5VomCv1qwpwAfd2Fru7CnGL9sk6',
	callbackUrl: callbackUrl
}
