import { VerifyFunction } from 'passport-oauth2'
import { db } from 'src/db'

type GoogleProfile = unknown

type GoogleResults = unknown

type VerifyCallback = (err?: Error | null | unknown, user?: Express.User | false, info?: object) => void;

export const verifyGoogleUser: VerifyFunction<GoogleProfile, GoogleResults> = 
  async (accessToken: string, refreshToken: string, profile: GoogleProfile, verified: VerifyCallback) => {
    if (!profile) {
      return cb(new Error('Unable to access user profile'), null)
    }
    try {
      const user = await db.findUser("")
      
    } catch (err) {
      return cb(new Error('Database Error'), null)
    }
  }