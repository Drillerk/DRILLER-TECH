const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0pyUVdJREZKRGY4SnAxQlZjUDhqenZodHJzQUFwMngxemxBU0tEK3Ztcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHEybXdOWndCd2QyU2lVbzkzSVM0OGNNMzhPZHlVT281MjkzOHRMU1hrVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhUEhYSzUxN0FnL2g2b3NkVzc2TTYzK1JJNnJhb0lBbnA1anZGN1RlNFdvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2YlNXSER1V3kzSHpvZkdJTFQvR1R0bWpGdW5XblVDMFdGTEFoMTV5d1FjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdDQkp6a0ZGWDh0Y0NvUVBmQnlhRXAwV2YyZGlkMm5FZ1RkTUcvMlZvV0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im0yWG54OGozVFlqZ0t5K3NjR1ZnUnN2RXBwTElBVG9Hd3JHVjVaS25iemc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUN6SExOblRmaDExT0M4UVNaZXV0WXg4dEJLZmQ3dCt6Vm1Uak5zV2ZIcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUhaeVZ1QlArMml3b211OXdleWdjNlFBZEMxWkwwd2EvYXhNSE0xdmZUbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhqS2gxWDV4aGViMnBxejRFbUZUcHBhZjN4Z2xtdlZWWHJMTnVhSlBmTzRBeWJvTnU2c1RMLzNDbnFiTDYyWHpIODZNMUdXRjJvc01DKzFwSGdHNERRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIyLCJhZHZTZWNyZXRLZXkiOiJ0d2lCM042UE1BSUJUQ0lxaG9SQ01CMCtHRjJ1U1BzdGxOTVBGbU13ZDBvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcxMTYyNzgwMEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyRTQ3OTBGNDM5MjA4RDU2M0ExNUIzRDQzQjdDNDg2MyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxMTM4MjE2fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJJWmZycDZlTVRtZXhEeG5yb1NXMkF3IiwicGhvbmVJZCI6IjUyYWRhZDMzLTYwYTEtNGI1Zi04ZWJmLTg2NjMyYjJkOWVhNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnenY0L0syWFYzZncyM3IwRU5uUC8vck1TOGM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSVo1VVNUZmhNK2MvejkrMmlJZ2RwREFvMkNjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjhaRDJFQ0QxIiwibWUiOnsiaWQiOiIyNTQ3MTE2Mjc4MDA6OUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJNYW5uYSBEcmlsbGVyIELwn5iA8J+koyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTTZSbHVJRUVKajQyYlFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiL1N5bUhKT3p2L3VqT1E2dzZURXdCSGJVUnQ4bXBuOTB4ZGVyVzNaTXprWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiOWlxL1lYbWtpNWFienEyRGxmWEJycURHWHlGNk5xRkdIT2x0YlZEeGVHRVI1a25kUldZKzVmOC9CaUpaV1ZHYnZyaXJtK1kvaXVsT29mRXo0WURrQXc9PSIsImRldmljZVNpZ25hdHVyZSI6IjFzbnNwTDYyUVBoUDArdG5FMUU1Q3IrRkJEM2ZBc1ovMXplNmFHZEFNRWJGWXJBclNCcXA0d2hKcWlvSkp6ektHd044NmlvSlJWd1FiSkxsNFlZR0F3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzExNjI3ODAwOjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZjBzcGh5VHM3LzdvemtPc09reE1BUjIxRWJmSnFaL2RNWFhxMXQyVE01RyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTEzODIxMywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFON1YifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Driller Tech",
    NUMERO_OWNER : process.env.OWNER_NUM || "254710980500",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
