import { google } from "googleapis";

export const getEmails = async(auth)=>{

const gmail = google.gmail({version:"v1",auth});

const res = await gmail.users.messages.list({

 userId:"me",
 q:"transaction OR debited OR credited"

});

return res.data.messages;

}