# aestheticity

## Full stack Image Gallery Platform using next.js, tailwind, mongoDB

Features:
1. Signup/Login
2. Store user and session data in cookies through JWT to persist session.
3. Forgot/Reset password via email
4. Verify account via email
5. Image upload, download**
6. Favorite images
7. Account page with user's uploaded images, favorited images and so much more
8. Settings page to verify email, check account status, reset password etc (in the works)
9. Skeleton loading and Lazy Loading (in the works)

### Homepage 
(mongoDB IP whitelist problem so images didn't load at the time, but you can see the skeleton loaders in action)
![alt text](https://github.com/josephbinoy/aestheticity/blob/main/public/Web%20capture_25-10-2023_203150_localhost.jpeg?raw=true)


### Login Page (couldnt record at high bitrate rip)
![alt text](https://github.com/josephbinoy/aestheticity/blob/main/public/2023-10-25-21-21-26.gif?raw=true)

**at the time i didn't know mongoDB is so bad at storing images. There are so many steps in between involving base64 encoding, bindata, array buffers... hence its very slow over https. 

