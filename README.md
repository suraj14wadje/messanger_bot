## Testing setup

1.      npm install

2. inside config/test.json, change the value of dbUrl to your mongodb url

3.      npm test

4. Done!


## Steps to run

1. Copy your facebook Access Token and paste it in .env 


2.      npm install

3.      npm start

4. Install ngrok 
    
    a. on Linux

        sudo npm install --unsafe-perm -g ngrok
    b. on Other OS

        npm install ngrok -g
    
5.  copy url that starts with https from screen that will appear after entering below command

        ngrok http 3000


6. go to https://developers.facebook.com/ then login

7. click on your app -> messenger settings

8. Paste the url copied in step 3 into callback url and append  <b>'/webhook'</b>  to it without quotes 

    Example:
    
    if copied url = https://d8fe-2409-4042-4e11-c69e-fe54-93de-691a-f4a2.ngrok.io

    then paste https://d8fe-2409-4042-4e11-c69e-fe54-93de-691a-f4a2.ngrok.io/webhook into callback url

9. put value of Verify_Token from .env file into Verify Token box

10. Click verify and save

10. Your App is ready!



# Demo

 https://drive.google.com/file/d/1dz-Gw1BKMbHX0Z2vTvrUS3mQFjfS3iuK/preview




