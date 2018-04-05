import history from './history'
import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'
import UserRights from '../constants/userRights'

const userRights = new UserRights()

class Auth {
	auth0 = new auth0.WebAuth({
		domain: AUTH_CONFIG.domain,
		clientID: AUTH_CONFIG.clientId,
		redirectUri: AUTH_CONFIG.callbackUrl,
		audience: `https://${AUTH_CONFIG.domain}/userinfo`,
		responseType: 'token id_token',
		scope: 'openid profile email'
	})

	constructor() {
		this.login = this.login.bind(this)
		this.logout = this.logout.bind(this)
		this.handleAuthentication = this.handleAuthentication.bind(this)
		this.isAuthenticated = this.isAuthenticated.bind(this)
		this.getProfile = this.getProfile.bind(this)
		this.getEmail = this.getEmail.bind(this)
	}

	userProfile
	userEmail

	login() {
		this.auth0.authorize()
	}

	handleAuthentication() {
		//console.log('handleAuthentication()');
		this.auth0.parseHash((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult)
			} else if (err) {
				console.log(err)
				alert(
					`Error: ${
						err.error
					}. Check the console for further details.`
				)
			}
		})
	}

	setSession(authResult) {
		//console.log('setSession(authResult)');
		// Set the time that the access token will expire at
		let expiresAt = JSON.stringify(
			authResult.expiresIn * 400 + Math.floor(Date.now() / 1000)
		)
		localStorage.setItem('access_token', authResult.accessToken)
		localStorage.setItem('id_token', authResult.idToken)
		localStorage.setItem('expires_at', expiresAt)
		localStorage.setItem('user_email', authResult.idTokenPayload.email)
		// navigate to the home route
		history.push({ pathname: '/' })
	}

	logout() {
		// Clear access token and ID token from local storage
		localStorage.removeItem('access_token')
		localStorage.removeItem('id_token')
		localStorage.removeItem('expires_at')
		localStorage.removeItem('user_email')
		// navigate to the home route
		history.push({ pathname: '/' })
	}

	isAuthenticated() {
		if (!localStorage.getItem('expires_at')) {
			return false
		}
		// Check whether the current time is past the
		// access token's expiry time
		let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
		let thisDate = Math.floor(Date.now() / 1000)
		let result = thisDate < expiresAt ? true : false
		return result
	}

	getAccessToken() {
		const accessToken = localStorage.getItem('access_token')
		if (!accessToken) {
			throw new Error('No Access Token found')
		}
		return accessToken
	}

	getProfile(cb) {
		let accessToken = this.getAccessToken()
		this.auth0.client.userInfo(accessToken, (err, profile) => {
			if (profile) {
				this.userProfile = profile
			}
			cb(err, profile)
		})
	}

	getEmail() {
		let userEmail = localStorage.getItem('user_email')

		if (userEmail) {
			this.userEmail = userEmail
			return this.userEmail
		} else {
			return null
		}
	}

	getUserInfo() {
		const email = this.getEmail()
		const rights = userRights.init(email)

		let result = rights
		result.email = email

		return result
	}
}

export default Auth
