<?php

//Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'server/PHPMailer-master/src/Exception.php';
require 'server/PHPMailer-master/src/PHPMailer.php';
require 'server/PHPMailer-master/src/SMTP.php';

$sent = NULL;
//Don't run this unless we're handling a form submission
if (array_key_exists('email', $_POST)) {
    date_default_timezone_set('Etc/UTC');

    //Create a new PHPMailer instance
    $mail = new PHPMailer;
    //Tell PHPMailer to use SMTP - requires a local mail server
    //Faster and safer than using mail()
    $mail->isSMTP();                                      // Send using SMTP
    $mail->Host       = 'smtp.server.here';               // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                             // Enable SMTP authentication
    $mail->Username   = 'username';                       // SMTP username
    $mail->Password   = 'password';                       // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption
    $mail->Port       = 25;                               // TCP port to connect to
    $mail->CharSet    = 'UTF-8';

    //Use a fixed address in your own domain as the from address
    //**DO NOT** use the submitter's address here as it will be forgery
    //and will cause your messages to fail SPF checks
    $mail->setFrom('your-form@example.com', 'Contact Form');
    //Send the message to yourself, or whoever should receive contact for submissions
    $mail->addAddress('your-inbox@example.com', 'Your Name');
    //Put the submitter's address in a reply-to header
    //This will fail if the address provided is invalid,
    //in which case we should ignore the whole request
    if ($mail->addReplyTo($_POST['email'], $_POST['name'])) {
        $mail->Subject = "Support form: ".$_POST['subject'];
        //Don't use HTML
        $mail->isHTML(false);
        //Message body
        $mail->Body = $_POST['message'];
        //Send the message, check for errors
        if (!$mail->send()) {
            $sent = 1;
        } else {
            $sent = 0;
        }
    } else {
        $sent = 2;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>body{visibility: hidden;opacity:0;}</style>

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    
    <!-- Meta Description -->
    <meta name="description" content="Description of the page less than 150 characters">

    <title>Contact support - LogoIpsum</title>

    <link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png">
    <link rel="manifest" href="assets/site.webmanifest">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
    <!-- Bootstrap core CSS -->
    <link href="lib/MDBootstrap/bootstrap.min.css" rel="stylesheet">
    <!-- Material Design Bootstrap -->
    <link href="lib/MDBootstrap/mdb.min.css" rel="stylesheet">
    <!-- Animate.css -->
    <link rel="stylesheet" href="lib/AnimateCSS/animate.min.css">

    <!-- Custom CSS -->
    <link href="styles/global.css" rel="stylesheet">
    <link href="styles/support.css" rel="stylesheet">

    <link href="styles/dark-theme.css" rel="stylesheet">

  </head>

  <body>

    <!-- Top navbar and expandable sidebar -->

    <nav class="navbar navbar-expand-lg navbar-justify-center custom-navbar custom-primary-color position-fixed fixed-top font-weight-400">
      <div>
        <ul class="navbar-nav -non-mobile">
          <li class="nav-item active">
            <a class="nav-link white-text" href="index.html">Explore</a>
          </li>
        </ul>
      </div>
      <a class="navbar-brand mx-0" href="index.html" title="Explore">
        <img src="assets/logo-8.svg" width="150" alt="Your Logo" loading="lazy">
      </a>
      <div>
        <ul class="navbar-nav custom-navbar-nav">
          <li class="nav-item active -non-mobile">
            <a class="nav-link white-text" href="signin.html">Sign in</a>
          </li>
          <li class="nav-item active -non-mobile">
            <a class="nav-link white-text" href="signup.html">Sign up</a>
          </li>
          <li class="nav-item active">
            <button class="button-clear-default" id="navHamburger" aria-label="Menu">
              <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-list" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container p-0 scrollable shadow min-vh-100 position-fixed animated quick custom-primary-color" id="sideBarNav">
      <div class="list-group list-group-flush custom-list_sidebar" id="sideBarNavList">

        <li class="list-group-item custom-primary-color white-text mt-8 d-flex flex-column justify-content-center align-items-center">
          <img src="assets/ipsum_profile0.jpg" class="img-fluid z-depth-1 rounded-circle w-35" alt="Your profile image" id="sideBarNavProfileImage">
          <p class="text-center mt-3">Signed in as John Doe</p>
        </li>

        <!-- overview of pages & elements for developers -->
        <a class="list-group-item list-group-item-action custom-primary-color white-text d-flex align-items-center" href="pages-elements.html" title="Pages & Elements">
          Pages / Elements & Docs
        </a>

        <a class="list-group-item list-group-item-action custom-primary-color white-text d-flex align-items-center" href="home.html" title="Home">
          <i class="fas fa-home mr-2"></i>
          Home
        </a>
        <a class="list-group-item list-group-item-action custom-primary-color white-text d-flex align-items-center" href="index.html" title="Explore">
          <i class="fas fa-search mr-2"></i>
          Explore
        </a>
        <a class="list-group-item list-group-item-action custom-primary-color white-text d-flex align-items-center" href="library.html" title="Library">
          <i class="fas fa-bookmark mr-2"></i>
          Library
        </a>
        <a class="list-group-item list-group-item-action custom-primary-color white-text d-flex align-items-center" href="add-product.html" title="Add a product">
          <i class="fas fa-cloud-upload-alt mr-2"></i>
          Add a product
        </a>
        <a class="list-group-item list-group-item-action custom-primary-color white-text d-flex align-items-center" href="manage-product.html" title="Manage your products">
          <i class="fas fa-tools mr-2"></i>
          Manage your products
        </a>
        <a class="list-group-item list-group-item-action custom-primary-color white-text d-flex align-items-center" href="promote.html" title="Advertise your product">
          <i class="fas fa-ad mr-2"></i>
          Advertise your product
        </a>
        <a class="list-group-item list-group-item-action custom-primary-color white-text d-flex align-items-center" href="account.html" title="Account settings">
          <i class="fas fa-cog mr-2"></i>
          Account settings
        </a>
        <a class="list-group-item list-group-item-action custom-primary-color white-text d-flex align-items-center" href="support.php" title="Support">
          <i class="fas fa-question-circle mr-2"></i>
          Support
        </a>
        <hr />
        <a class="list-group-item list-group-item-action custom-primary-color white-text d-flex align-items-center" href="signin.html" title="Sign in">
          <i class="fas fa-sign-in-alt mr-2"></i>
          Sign in
        </a>
        <a class="list-group-item list-group-item-action custom-primary-color white-text d-flex align-items-center" href="signup.html" title="Sign up">
          <i class="fas fa-edit mr-2"></i>
          Sign up
        </a>
        <a class="list-group-item list-group-item-action custom-primary-color white-text d-flex align-items-center mb-5" href="#" title="Sign out">
          <i class="fas fa-sign-out-alt mr-2"></i>
          Sign out
        </a>
      </div>

    </div>


    <div class="container-fluid my-buffer-px w-75">

        <?php if($sent === 0) : ?>
        <div class="alert alert-success" role="alert">
          Your message was sent successfully!
        </div>
        <?php elseif($sent === 1) : ?>
        <div class="alert alert-danger" role="alert">
          Something went wrong, your message could not be sent.
        </div>
        <?php elseif($sent === 2) : ?>
        <div class="alert alert-danger" role="alert">
          Your email address is invalid, please try again.
        </div>
        <?php endif; ?>

        <h1 class="text-center">Contact us</h1>
        <p class="text-center subheader-display" style="width: 350px">Please provide some details below and we'll be sure to get back to you as soon as possible.</p>

        <div class="mb-4">

            <div class="row justify-content-center">

                <!--Grid column-->
                <div class="col-md-9 mb-md-0 mb-5">
                    <form id="contact-form" class="dark" name="contact-form" action="" method="POST">

                        <!--Grid row-->
                        <div class="row">

                            <!--Grid column-->
                            <div class="col-md-6">
                                <div class="md-form mb-0">
                                    <input type="text" id="name" name="name" class="form-control">
                                    <label for="name" class="">Your name</label>
                                </div>
                            </div>
                            <!--Grid column-->

                            <!--Grid column-->
                            <div class="col-md-6">
                                <div class="md-form mb-0">
                                    <input type="text" id="email" name="email" class="form-control">
                                    <label for="email" class="">Your email</label>
                                </div>
                            </div>
                            <!--Grid column-->

                        </div>
                        <!--Grid row-->

                        <!--Grid row-->
                        <div class="row">
                            <div class="col-md-12">
                                <div class="md-form mb-0">
                                    <input type="text" id="subject" name="subject" class="form-control">
                                    <label for="subject" class="">Subject</label>
                                </div>
                            </div>
                        </div>
                        <!--Grid row-->

                        <!--Grid row-->
                        <div class="row">

                            <!--Grid column-->
                            <div class="col-md-12">

                                <div class="md-form">
                                    <textarea id="message" name="message" rows="2" class="form-control md-textarea min-vh-30"></textarea>
                                    <label for="message">Your message</label>
                                </div>

                            </div>
                        </div>
                        <!--Grid row-->

                        <div class="text-center text-md-center">
                          <!-- 

                            ### Google reCAPTCHA integration ###
                            The reCAPTCHA script is already imported at the bottom of this document along with the
                            necessary javascript below that. Register with Google and get a site key to finish the integration.
                            See: https://developers.google.com/recaptcha/docs/v3

                            Once you have your site key, do the following:
                            1. add "g-recaptcha" to the input's class list below
                            2. copy and paste the following in between value="Send" and > on the input below: data-sitekey="reCAPTCHA_site_key" data-callback='onSubmit' data-action='submit'
                            3. replace "reCAPTCHA_site_key" with your site key

                          -->
                          <input class="btn custom-btn-primary" type="submit" value="Send" >

                        </div>
                    </form>

                </div>
                <!--Grid column-->
            </div>
        </div>
    </div>

    <!-- Cookie notice (if needed) -->
    <div id="cookieNotice" class="card w-100 position-fixed fixed-bottom rounded-0 animated fadeInUp faster">
      <div class="card-body">
        <h5 class="card-title">Cookie notice</h5>
        <p class="card-text">We use cookies to provide our services and for analytics and marketing. To find out more about our use of cookies, please see our Privacy Policy and Cookie Policy. By continuing to browse our website, you agree to our use of cookies.</p>
        <a href="#!" id="cookieNoticeAccept" class="btn custom-btn-primary">Accept & Close</a>
        <a href="legal.html" class="btn btn-link">More Info</a>
      </div>
    </div>

   
    <!-- Footer -->
    <footer class="page-footer font-small fixed-bottom border-top">

        <div class="text-left">
            <li class="list-group list-group-horizontal list-group-flush d-flex align-items-center">

                <!-- Copyright -->
                <p class="list-group-item border-0 mb-0">© 2020 Copyright: Your Company</p>
                <!-- Copyright -->

                <a href="#" title="Terms of Service" class="list-group-item border-0">Terms of Service</a>
                <a href="#" title="Privacy Policy" class="list-group-item border-0">Privacy Policy</a>
                <a href="#" title="Cookies" class="list-group-item border-0">Cookies</a>
                <a href="#" title="DMCA" class="list-group-item border-0">DMCA</a>
            </li>
        </div>

    </footer>
    <!-- Footer -->



    <!-- JQuery -->
    <script src="lib/MDBootstrap/jquery.min.js"></script>
    <!-- Bootstrap tooltips -->
    <script src="lib/MDBootstrap/popper.min.js"></script>
    <!-- Bootstrap core JavaScript -->
    <script src="lib/MDBootstrap/bootstrap.min.js"></script>
    <!-- MDB core JavaScript -->
    <script src="lib/MDBootstrap/mdb.min.js"></script>

    <!-- Google reCAPTCHA v3 -->
    <script src="https://www.google.com/recaptcha/api.js"></script>
    <script>
      function onSubmit(token) {
        document.getElementById("contact-form").submit();
      }
    </script>

    <!-- Stripe integration for ad space purchasing and fraud detection functionality -->
    <script src="https://js.stripe.com/v3/"></script>

    <!-- Custom JS -->
    <script src="scripts/dark_theme.js"></script>
    <script src="scripts/cookie_notice.js"></script>
    <script src="scripts/sidebar_nav.js"></script>

  </body>
</html>