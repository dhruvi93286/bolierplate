/**
 * HELPERS
 */
const helpers = require('../helpers/helpers')

/**
 * COMMON SEND EMAIL HTML FUNCTION
 * @param {STRING} email 
 * @param {STRING} milisecound 
 * @param {STRING} randomString 
 */

async function commenSendEmail(email, milliseconds, randomString, urlPath) {

    var html = `<!DOCTYPE html>
 <html lang="en">
 
 <head>
     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta name="description"
         content="On To Family is super flexible, powerful, clean &amp; modern responsive bootstrap 5 admin template with unlimited possibilities.">
     <meta name="keywords"
         content="admin template, On To Family template, dashboard template, flat admin template, responsive admin template, web app">
     <meta name="author" content="pixelstrap">
     <link rel="icon" href="../assets/images/favicon.png" type="image/x-icon">
     <link rel="shortcut icon" href="../assets/images/favicon.png" type="image/x-icon">
     <title>On To Family - Admin panel</title>
     <!-- Google font-->
     <link href="https://fonts.googleapis.com/css?family=Rubik:400,400i,500,500i,700,700i&amp;display=swap"
         rel="stylesheet">
     <link href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900&amp;display=swap"
         rel="stylesheet">
     <link rel="stylesheet" type="text/css" href="/public/assets/css/fontawesome.css">
     <!-- ico-font-->
     <link rel="stylesheet" type="text/css" href="/public/assets/css/vendors/icofont.css">
     <!-- Themify icon-->
     <link rel="stylesheet" type="text/css" href="/public/assets/css/vendors/themify.css">
     <!-- Flag icon-->
     <link rel="stylesheet" type="text/css" href="/public/assets/css/vendors/flag-icon.css">
     <!-- Feather icon-->
     <link rel="stylesheet" type="text/css" href="/public/assets/css/vendors/feather-icon.css">
     <!-- Plugins css start-->
     <!-- Plugins css Ends-->
     <!-- Bootstrap css-->
     <link rel="stylesheet" type="text/css" href="/public/assets/css/vendors/bootstrap.css">
     <!-- App css-->
     <link rel="stylesheet" type="text/css" href="/public/assets/css/style.css">
     <!-- <link rel="stylesheet" type="text/css" href="/public/assets/css/custom.css"> -->
     <!-- <link id="color" rel="stylesheet" href="/public/assets/css/color-1.css" media="screen"> -->
     <!-- Responsive css-->
     <link rel="stylesheet" type="text/css" href="/public/assets/css/responsive.css">
     <style>
 
       /*  .update-status {
             height: 100vh;
             text-align: center;
             background-image: url(/public/assets/images/LOGINBG.png);
             width: 100%;
             background-size: cover;
         }*/
 
         /*.update-panel {
             height: 100%;
             display: -webkit-box;
             display: -ms-flexbox;
             display: flex;
             -webkit-box-orient: vertical;
             -webkit-box-direction: normal;
                 -ms-flex-direction: column;
                     flex-direction: column;
             -webkit-box-pack: center;
                 -ms-flex-pack: center;
                     justify-content: center;
             -webkit-box-align: center;
                 -ms-flex-align: center;
                     align-items: center;
         }*/
 
      /*   .update-panel h2 {
             margin: 0;
             font-size: 4rem;
             font-weight: 600;
             color: #48A9FE;
             margin-bottom: 50px;
         }*/
 
        /* .update-panel p {
             font-size: 20px;
             letter-spacing: normal;
             color: #404040;
             line-height: 28px;
         }*/
 
       /*  .update-panel p span {
             display: block;
             text-align: center;
             color: #000;
             font-weight: 500;
         }*/
 
        /* .change-password-btn {
             display: -webkit-box;
             display: -ms-flexbox;
             display: flex;
             -webkit-box-pack: center;
                 -ms-flex-pack: center;
                     justify-content: center;
             -webkit-box-align: center;
                 -ms-flex-align: center;
                     align-items: center;
             letter-spacing: normal;
             background: #48A9FE;
             padding: 10px 20px;
             border-radius: 30px;
             text-decoration: none;
             color: #fff;
             font-weight: 500;
         }*/
 
        /* .smile-icon {
             width: 13px;
             height: 13px;
         }*/
 
        /* .regard-pera {
             margin-top: 50px;
         }*/
 
        /* .update-pera-one {
             margin: 0;
         }*/
 
        /* .change-password-btn:hover {
             opacity: 0.8;
         }
 
         .update-panel a {
             margin: 50px 0;
         }*/
 
     </style>
 </head>
 
 <body>
     <!-- <section class="update-status" style="height: 100vh;text-align: center;background-image:url(cid:temp);width: 100%;background-size: cover;">
         <div class="update-panel" style="height: 100%; background-image: url(cid:temp)">
             <h2 style=" margin: 0;font-size: 4rem;font-weight: 600;color: #48A9FE;margin-bottom: 50px;">Hello!</h2> 
            <p class="update-pera-one" style="margin: 0;font-size:20px;letter-spacing: normal;color: #404040;line-height:28px;">You have requested to reset your app password through our forgotten password
                 recovery
                 service.
                 <span style=" display: block;text-align: center;color: #000;font-weight: 500;">Click the button below and change your password!</span>
             </p> 
             <a href="#" class="change-password-btn">Change Password</a>
             <p class="update-pera" style="margin: 0;font-size:20px;letter-spacing: normal;color: #404040;line-height:28px;">If you face any issue with our solution, go to contact support chat.
                 <br>We will be glad to
                 help you.
             </p> 
             <p class="regard-pera" style="margin-top: 50px; font-size:20px;letter-spacing: normal;color: #404040;line-height:28px;">Regards, Choi Team
                 <svg style="width: 13px;height: 13px;" class="smile-icon" id="layer_1" enable-background="new 0 0 512 512" height="13"
                     viewBox="0 0 512 512" width="13" xmlns="http://www.w3.org/2000/svg">
                     <path
                         d="m256 0c-141.159 0-256 114.841-256 256s114.841 256 256 256 256-114.841 256-256-114.841-256-256-256zm0 480c-123.514 0-224-100.486-224-224s100.486-224 224-224 224 100.486 224 224-100.486 224-224 224zm134.856-146c-27.973 48.445-78.385 77.368-134.852 77.369-56.469.001-106.884-28.922-134.859-77.369-4.419-7.652-1.798-17.438 5.854-21.856 7.654-4.419 17.439-1.797 21.856 5.854 22.191 38.429 62.247 61.372 107.148 61.371 44.899-.001 84.952-22.943 107.141-61.371 4.418-7.653 14.204-10.274 21.856-5.855 7.653 4.419 10.274 14.204 5.856 21.857zm-272.178-141.057c0-17.652 14.361-32.014 32.014-32.014s32.014 14.361 32.014 32.014-14.361 32.014-32.014 32.014-32.014-14.361-32.014-32.014zm274.645 0c0 17.652-14.361 32.014-32.014 32.014s-32.014-14.361-32.014-32.014 14.361-32.014 32.014-32.014c17.652.001 32.014 14.362 32.014 32.014z" />
                 </svg>
             </p>
         </div>
     </section>  -->
 
     <div style="height: 90vh;text-align: center;background-image: url(cid:temp);width: 100%;background-size: cover;">
     <div style="padding-top: 9%;">
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                 <tr>
                     <td >
                         <center><h2 style="font-size: 4rem;font-weight: 600;color: #48A9FE;margin-bottom: 25px;">Hello!</h2></center>
                     </td>
                 </tr>
                 <tr>
                     <td >
                         <table style="width: 100%;text-align: center;">
                             <tr>
                                 <td>
                                     <div>
                                         <p class="update-pera-one" style="margin: 0;font-size:20px;letter-spacing: normal;color: #404040;line-height:28px;">You have requested to reset your app password through our forgotten password
                                             recovery
                                             service.
                                             <span style=" display: block;text-align: center;color: #000;font-weight: 500;">Click the button below and change your password!</span>
                                         </p>
                                     </div>
                                 </td>
                             </tr>
                         </table>
                     </td>
                 </tr>
                 <tr>
                     <td >
                         <table style="width: 100%;text-align: center;">
                             <tr>
                                 <td>
                                     <div style="margin: 50px 0;">
                                         <a href="` +
        process.env.apiUrl +
        `/${urlPath}/` +
        await helpers.encryptData(email) +
        `/password/` + milliseconds + `/` + randomString + `" class="change-password-btn" style="letter-spacing: normal;background: #48A9FE;padding: 10px 20px;border-radius: 30px;text-decoration: none;color: #fff;font-weight: 500;">Change Password</a>
                                     </div>
                                 </td>
                             </tr>
                         </table>
                     </td>
                 </tr>
                 <tr>
                     <td >
                         <table style="width: 100%;text-align: center;">
                             <tr>
                                 <td>
                                     <div>
                                         <p class="update-pera" style="margin: 0;font-size:20px;letter-spacing: normal;color: #404040;line-height:28px;">If  you face any issue with our solution, go to contact support chat.
                                             <br>We will be glad to
                                             help you.
                                         </p>
                                     </div>
                                 </td>
                             </tr>
                         </table>
                     </td>
                 </tr>
                 <tr>
                     <td >
                         <table style="width: 100%;text-align: center;">
                             <tr>
                                 <td>
                                     <div>
                                         <p class="regard-pera" style="margin-top: 50px; font-size:20px;letter-spacing: normal;color: #404040;line-height:28px;">Regards, Choi Team
                                             <svg style="width: 13px;height: 13px;" class="smile-icon" id="layer_1" enable-background="new 0 0 512 512" height="13"
                                                 viewBox="0 0 512 512" width="13" xmlns="http://www.w3.org/2000/svg">
                                                 <path
                                                     d="m256 0c-141.159 0-256 114.841-256 256s114.841 256 256 256 256-114.841 256-256-114.841-256-256-256zm0 480c-123.514 0-224-100.486-224-224s100.486-224 224-224 224 100.486 224 224-100.486 224-224 224zm134.856-146c-27.973 48.445-78.385 77.368-134.852 77.369-56.469.001-106.884-28.922-134.859-77.369-4.419-7.652-1.798-17.438 5.854-21.856 7.654-4.419 17.439-1.797 21.856 5.854 22.191 38.429 62.247 61.372 107.148 61.371 44.899-.001 84.952-22.943 107.141-61.371 4.418-7.653 14.204-10.274 21.856-5.855 7.653 4.419 10.274 14.204 5.856 21.857zm-272.178-141.057c0-17.652 14.361-32.014 32.014-32.014s32.014 14.361 32.014 32.014-14.361 32.014-32.014 32.014-32.014-14.361-32.014-32.014zm274.645 0c0 17.652-14.361 32.014-32.014 32.014s-32.014-14.361-32.014-32.014 14.361-32.014 32.014-32.014c17.652.001 32.014 14.362 32.014 32.014z" />
                                             </svg>
                                         </p>
                                     </div>
                                 </td>
                             </tr>
                         </table>
                     </td>
                 </tr>
             </table> 
         </div>
     </div>
 </body>
 </html>`

    return html
}


module.exports = {
    commenSendEmail
}