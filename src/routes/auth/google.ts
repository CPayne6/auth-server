import express from 'express'
import passport from 'passport'
import { Strategy as OAuth2Strategy } from 'passport-oauth2'

import { config } from 'src/config'
import { verifyGoogleUser } from 'src/handlers'

passport.use('google', new OAuth2Strategy({
  authorizationURL: config.GOOGLE_AUTH_URL,
  tokenURL: config.GOOGLE_TOKEN_URL,
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: `${config.AUTH_DOMAIN}/${config.API_VERSION}/auth/google/callback`
}, verifyGoogleUser))

const router = express.Router();

router.get('/auth/google', passport.authenticate('google'))

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (_, res) => {
    res.redirect('/')
  }
)

export default router
