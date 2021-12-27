const DEVELOP_MODE = true;

const DEV_CONFIG = {
  salt_rounds: 10,
  token_expire: {
    access: '20d',
    refresh: '70d',
  },
  server: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
  },
  secret_key: process.env.SECRET_KEY,
};

const PROD_CONFIG = {
  salt_rounds: 10,
  token_expire: {
    access: '1h',
    refresh: '7d',
  },
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  secret_key: process.env.SECRET_KEY,
};

module.exports = DEVELOP_MODE ? DEV_CONFIG : PROD_CONFIG;
