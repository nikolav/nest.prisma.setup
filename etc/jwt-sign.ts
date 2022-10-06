import { createHmac } from 'crypto';
// 
const DEFAULT_JWT_SECRET = 'dlvldyipdlk';
const jwtSign = (payload: any, jwtSecret = DEFAULT_JWT_SECRET) => {
  const header        = { alg: 'HS256', type: 'JWT' };
  const encodeHeader  = Buffer.from(JSON.stringify(header)).toString('base64');
  const encodePayload = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature     = 
    createHmac('sha256', jwtSecret)
      .update(`${encodeHeader}.${encodePayload}`)
      .digest('base64');
  const token = `${encodeHeader}.${encodePayload}.${signature}`;
  return token;
}
// 
export default jwtSign;
