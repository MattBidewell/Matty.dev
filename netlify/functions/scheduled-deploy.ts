import { schedule } from '@netlify/functions'


// set to run 8am every Friday.
// Hits a Post request to a build hook URL which triggers a rebuild of the primary website.

// export const handler = schedule("0 8 * * 5" ,async () => {
export const handler = schedule("5 * * * *" ,async () => {
  // const buildHook = new URL(process.env.BUILD_HOOK as string);
  console.log(process.env.BUILD_HOOK)
  console.log("Testing");
  // const res = await fetch(buildHook, {
  //   method: "POST"
  // });

  // const resJson = await res.json();
  // console.log(resJson);

  return {
    statusCode: 200
  }
});