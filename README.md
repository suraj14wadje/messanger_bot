## Steps to run

1. Copy your facebook Access Token and paste it in .env 

        npm install
        npm start

2. Install ngrok 
    
    a. on Linux

        sudo npm install --unsafe-perm -g ngrok
    b. on Other OS

        npm install ngrok -g
    
3.  copy url that starts with https from screen that will appear after entering below command

        ngrok http 3000


4. go to https://developers.facebook.com/ then login

5. click on your app -> messenger settings

6. paste the url copied in step 3 into callback url 

7. put value of Verify_Token from .env file

8. Your App is ready!



# Demo

 https://drive.google.com/file/d/1dz-Gw1BKMbHX0Z2vTvrUS3mQFjfS3iuK/preview




