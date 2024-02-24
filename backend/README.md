# m1p11mean-Elsy-Murphy-back
PROJET MEAN Master 1 - Promotion 11 - BACK

# Installation
```bash
npm install
```

## .env file
Create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE. For example:
```
MONGODB_URL=[url]
MONGODB_NAME=[dbname]
APP_NAME=[appname]
PORT=[port]
BCRYPT_SALT_ROUNDS=[bcrypt_salt_rounds]
DATE_FORMAT=[date_format]
SECRET_TOKEN_KEY=[secret_token_key]
EMAIL_SERVICE=[email_service]
EMAIL_USERNAME=[email_username]
EMAIL_PASSWORD=[email_password]
IMAGE_SERVICE_DIRECTORY=[image_service_directory]
```

# Usage
you need to install nodemon for auto reload
```bash
npm install -g nodemon
```
then run
```bash
npm run dev
```
if you don't want auto reload, run
```bash
npm start
```