const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0JrYTVNWGM0TU5HNkt5UHNTZFNreGVYeUZLaWgyalRMT0pnTTlVN0IxOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMDNFR1luWWdmM0FBelU3YnZPWkJURWNkVmJMZ1lJUHJjQnRGc1hKMk5Bdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTSXFvUnNWVDI5ZHQ0WTBJRGwyQ25vRjI2RmNTZTRxSzlXQWhYNjNkUFhzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRTGhnQ3VtQkJjMlJBMzFUU0dOZE8raDdYS3lpbFlzSjdxalh1a05GbGxrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNETzhTTTZlU0JLZXZoaE5JNUkvVzV3NTJ4SkpvK1AzQmRWazRpenh3SFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtlRkllWjU5VklDblE3bFRwemkvKzlueE9qaVFWRDE0bWtCNkk2cW9kWEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUY5REt2aFl4K1h4azlzMmd3SCszSGl5bXpTamVlMmhBYjQxUGQ2bTJuST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUmhQVVZZL3ZVQW1wZEQ1N3EzOUFKR291ZkEyMG5seElpZVV5QTh5bXNFST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5ESlJGbytkb2JEbDhVRU44c2pOT1VwSk5FQ3dmYllIOHJrMCtHK2J0NEM4N0dITGxJK3I5OGJpUytraDlPYmtDNVlZM3I4T09VTmtVMWpRc0xYYkRnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQyLCJhZHZTZWNyZXRLZXkiOiJRSzhSbUdvLzRCaVRIdURDdnNXWThIdU9JMFRsemUrOENTS0lBZmhrbllNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcxMTYyNzgwMEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0QzAzQkNGRjBDRTZBRjUyRDZEQjNDMThCODQ3QkJFNyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxMTM3MjU4fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ5UXc5bnVtblMxV2JiSE4xLUxXdlpRIiwicGhvbmVJZCI6ImMyNTE4NTQ1LWYzYmUtNDhkMS1iMGE5LThlMTE3NGUxNzAyOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOS3pNL3ZyaCtNR1gxUGplQmROWStnL2lwZFk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSDI3UXI0UFhScXdMUkhuUVo3Tzdqb0dQL1ljPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkZFTkY2OEdFIiwibWUiOnsiaWQiOiIyNTQ3MTE2Mjc4MDA6N0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJNYW5uYSBEcmlsbGVyIELwn5iA8J+koyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTXVSbHVJRUVOdncyYlFHR0FZZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiL1N5bUhKT3p2L3VqT1E2dzZURXdCSGJVUnQ4bXBuOTB4ZGVyVzNaTXprWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoialJ3YkUydk9FaHNRV3pyY2FlZ0EzUVc4dWRuUDliYkxsd2RPbFFrQ2tMNk40bnBGaHNuS0Z3K3BjbTRIaG8xZjM3ZWF1K29mT0VNb1BMK2lHVmpiQlE9PSIsImRldmljZVNpZ25hdHVyZSI6IkVUU1RPbno1d09WSjdSdXhGMDZoS3BlSlREc0VtQWRETklGVm9rR0RnclpmWTZJM0ZMdFQyeTVlZjhBNEd2OGJYUXVmN0x6cGpITXd0VnNPRk1QckF3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzExNjI3ODAwOjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZjBzcGh5VHM3LzdvemtPc09reE1BUjIxRWJmSnFaL2RNWFhxMXQyVE01RyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTEzNzI1NSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFON00ifQ==',
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
