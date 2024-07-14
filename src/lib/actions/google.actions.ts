"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { google } from 'googleapis';

export async function check() {
  const user = await currentUser()
  if (user){
    const OauthAccessToken = await clerkClient().users.getUserOauthAccessToken(
      user.id || '',
      'oauth_google'
    )
    const { token } = OauthAccessToken.data[0];
    const calendar = google.calendar({
      version:'v3',
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    const res = await calendar.calendarList.list({})
    console.log(res.data);
  }
  console.log("[CHECK] No User");
}