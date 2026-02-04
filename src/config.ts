// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();
 const environment=process.env.NODE_ENV;
 const PORT=process.env.PORT;
 const DB_URL=process.env.DATABASE_URL;
 const corsUrl = process.env.CORS_URL;
 const SECRET=process.env.SECRET;
 const JWT_ACCESS_SECRET=process.env.JWT_ACCESS_SECRET || "";
 const JWT_REFRESH_SECRET=process.env.JWT_REFRESH_SECRET || "";

 const tokenInfo = {
  accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '0'),
  refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '0'),
  issuer: process.env.TOKEN_ISSUER || '',
  audience: process.env.TOKEN_AUDIENCE || '',
};
export { environment, PORT, DB_URL, corsUrl, SECRET, tokenInfo, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET };

