import { schedule } from '@netlify/functions'
import axios from "axios";

// set to run 8am every Friday.
// Hits a Post request to a build hook URL which triggers a rebuild of the primary website.

// export const handler = schedule("0 8 * * 5" ,async () => {
export const handler = schedule("5 * * * *" ,async () => {
  try {
    console.log("Starting... ")
    const buildHook = process.env.BUILD_HOOK as string;
    console.log("Hook: " + buildHook);

    console.log("Sending req...")
    const res = await axios({
      url: buildHook,
      method: "POST"
    })

    console.log("status: " + res.status);
    console.log("body: " + res.data);

    return {
      statusCode: 200
    }
  } catch(err) {
    console.log("ERROR");
    console.log(err);
    return {
      statusCode: 500
    }
  }
});