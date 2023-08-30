const fs = require('fs')
const path = require('path')


module.exports = {
    development: {
      username: 'admin1',
      password: 'root1',
      database: 'admin1',
      host: 'localhost',
      dialect: 'postgres'
    },
    production: {
      username: 'doadmin',
      password: 'AVNS_TW_J1OavxjlGt-uh8jK',
      database: 'defaultdb',
      host: 'db-postgresql-sgp1-81046-do-user-14535698-0.b.db.ondigitalocean.com',
      dialect: 'postgres',
      port: 25060,
      dialectOptions: {
        ssl: {
            ca: fs.readFileSync(path.resolve("config", "ca-certificate.crt"))  // Замените на путь к вашему сертификату
        }
    }
    }
};
  
// username = doadmin
// password = AVNS_TW_J1OavxjlGt-uh8jK 
// host = db-postgresql-sgp1-81046-do-user-14535698-0.b.db.ondigitalocean.com
// port = 25060
// database = defaultdb
// sslmode = require
