const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUYwdDY3aEFMdGtZRU03dmxNeHdOR2tnSGd1TE1lWm1BUGZaYkN4eU5rST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTTNDK1cxMHlKYUJzVWswMExyZHVYRko5akZCMURkWC9Wem1ISE9NbGRtMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5RHVTcDJxRytpNUNCYWtkQkx0eDJIMlFuYUlKS0t4OThiZkVkQlMvMUVrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHeWZBKy9YZGNrWnd1MUl1RmJiRDFmOElySkxRNGJXVEhXQnU3RDNVT1drPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1NUWJuZTdNV0lGTUpZaW5WUkYySEplK1BoS2RLRm5OWEs1R0c1ZEZwVzA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVDUTdZVVg0YVo5SnA0YXFyMkZHQXVWeHdiaHRXaklpSndBLzJHd09aQUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU1zT0kvUWRYd0dFV3huSHJsUnBSbllMNWJSNTBsZlVsSGhRblhWMVIwYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVlVsYTBrZzhOVlNKTEl6Q1RrSHlHS29pR05wcVl0VDB2enlaaE9YMW1XQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkduZUpuNkI3U1h3WDZLRmN5WmtEb2lCSTlDSitRL283ajZ5cXhDZFhWSmZaMWRuazUxTUVkb2VqWXhsRmMvK3Z6YWVtekE1Ky9mNFFvOERkUllsUGdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAyLCJhZHZTZWNyZXRLZXkiOiJUTStZa0RtMG5lemdMamlid3l2VTBTcjh4UTRTQ2U2dHBNU215Q1c4UC9JPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcxMTYyNzgwMEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3NUZEMTdEMDAxNDA4MEZBQTJDMTE5Q0QyMURDMjU4QSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxMTM0NjUwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI2UlhET3N4YVI0YUpjVTkyeU42dmJnIiwicGhvbmVJZCI6IjQyNDlkZTM5LTMzOWYtNGM5Yy05YjA0LTk5NzVkZGVjZTNmZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVcGo0bXA0STA2TEFBektMeWVpRzNTNHRHTHc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0NLcm1xcERPei9KMktKQ3IxNElSYVE2SGlnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjFDRERRR0RGIiwibWUiOnsiaWQiOiIyNTQ3MTE2Mjc4MDA6NkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJNYW5uYSBEcmlsbGVyIELwn5iA8J+koyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTXVSbHVJRUVLcmMyYlFHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiL1N5bUhKT3p2L3VqT1E2dzZURXdCSGJVUnQ4bXBuOTB4ZGVyVzNaTXprWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoibHdJb0FnQTl0WGliS3o4R1JGaS80Wnk0UmE4NTcxSWJvWndSTllPYTVTVmZIREt3VTZCUnh3TktoOEo1eDJId3BweEUyV1VDTTNnaXRwNkFISmxnRGc9PSIsImRldmljZVNpZ25hdHVyZSI6IkJ3UERLdCs4Y3E5QUlKU3NWL3djWk92NXZsbXg1aWZVbVp0MU5ZSCtoamw0UXhJc2MyaG9SaXZ2VzdGYTdHNHNTMThqbS9zWEQ0ekpCbE5SNEo5dml3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzExNjI3ODAwOjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZjBzcGh5VHM3LzdvemtPc09reE1BUjIxRWJmSnFaL2RNWFhxMXQyVE01RyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTEzNDY0NywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFON00ifQ==',
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
