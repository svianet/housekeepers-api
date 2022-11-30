const { Authsignal } =require("@authsignal/node");
const secret = process.env.AUTHSIGNAL_SECRET;
if (!secret) {
  throw new Error("AUTHSIGNAL_SECRET is not set");
}
const authsignal = new Authsignal({ secret: process.env.AUTHSIGNAL_SECRET });
module.exports = authsignal;