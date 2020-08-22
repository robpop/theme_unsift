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
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Contact support - LogoIpsum</title>

    <link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png">
    <link rel="manifest" href="assets/site.webmanifest">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&display=swap" rel="stylesheet">
    <!-- Bootstrap core CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">
    <!-- Material Design Bootstrap -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css" rel="stylesheet">
    <!-- Animate.css -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css">

    <link href="styles/support.css" rel="stylesheet">
    <link href="styles/custom.css" rel="stylesheet">
  </head>

  <body>

    <!-- Top navbar and expandable sidebar -->

    <nav class="navbar navbar-expand-lg navbar-justify-center custom-navbar primary-color position-fixed fixed-top font-weight-400">
      <div>
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link white-text" href="index.html">Explore</a>
          </li>
        </ul>
      </div>
      <a class="navbar-brand mx-0" href="index.html" title="Explore">
        <img src="assets/logo-8.svg" width="150px" height="auto" alt="Your Logo" loading="lazy">
      </a>
      <div>
        <ul class="navbar-nav custom-navbar-nav">
          <li class="nav-item active">
            <a class="nav-link white-text" href="signin.html">Sign in</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link white-text" href="signup.html">Sign up</a>
          </li>
          <li class="nav-item active">
            <button class="button-clear-default" id="navHamburger">
              <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-list" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container w-20 p-0 scrollable shadow min-vh-100 position-fixed animated quick primary-color" id="sideBarNav">
      <div class="list-group list-group-flush custom-list_sidebar" id="sideBarNavList">

        <li class="list-group-item primary-color white-text mt-8 d-flex flex-column justify-content-center align-items-center">
          <img src="assets/ipsum_profile0.jpg" class="img-fluid z-depth-1 rounded-circle w-35" alt="Your profile image" id="sideBarNavProfileImage">
          <p class="text-center mt-3">Signed in as John Doe</p>
        </li>

        <a class="list-group-item list-group-item-action primary-color white-text d-flex align-items-center" href="home.html" title="Home">
          <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-house-fill mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
            <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
          </svg>
          Home
        </a>
        <a class="list-group-item list-group-item-action primary-color white-text d-flex align-items-center" href="index.html" title="Explore">
          <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-search mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
          </svg>
          Explore
        </a>
        <a class="list-group-item list-group-item-action primary-color white-text d-flex align-items-center" href="library.html" title="Library">
          <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-bookmark-fill mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M3 3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12l-5-3-5 3V3z"/>
          </svg>
          Library
        </a>
        <a class="list-group-item list-group-item-action primary-color white-text d-flex align-items-center" href="add-product.html" title="Add a product">
          <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-cloud-arrow-up-fill mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 1 0V6.707l1.146 1.147a.5.5 0 0 0 .708-.708z"/>
          </svg>
          Add a product
        </a>
        <a class="list-group-item list-group-item-action primary-color white-text d-flex align-items-center" href="manage-product.html" title="Manage your products">
          <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-tools mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M0 1l1-1 3.081 2.2a1 1 0 0 1 .419.815v.07a1 1 0 0 0 .293.708L10.5 9.5l.914-.305a1 1 0 0 1 1.023.242l3.356 3.356a1 1 0 0 1 0 1.414l-1.586 1.586a1 1 0 0 1-1.414 0l-3.356-3.356a1 1 0 0 1-.242-1.023L9.5 10.5 3.793 4.793a1 1 0 0 0-.707-.293h-.071a1 1 0 0 1-.814-.419L0 1zm11.354 9.646a.5.5 0 0 0-.708.708l3 3a.5.5 0 0 0 .708-.708l-3-3z"/>
            <path fill-rule="evenodd" d="M15.898 2.223a3.003 3.003 0 0 1-3.679 3.674L5.878 12.15a3 3 0 1 1-2.027-2.027l6.252-6.341A3 3 0 0 1 13.778.1l-2.142 2.142L12 4l1.757.364 2.141-2.141zm-13.37 9.019L3.001 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"/>
          </svg>
          Manage your products
        </a>
        <a class="list-group-item list-group-item-action primary-color white-text d-flex align-items-center" href="account.html" title="Account settings">
          <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-gear-fill mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 0 0-5.86 2.929 2.929 0 0 0 0 5.858z"/>
          </svg>
          Account settings
        </a>
        <a class="list-group-item list-group-item-action primary-color white-text d-flex align-items-center" href="support.php" title="Support">
          <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-question-circle-fill mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.57 6.033H5.25C5.22 4.147 6.68 3.5 8.006 3.5c1.397 0 2.673.73 2.673 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.355H7.117l-.007-.463c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.901 0-1.358.603-1.358 1.384zm1.251 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z"/>
          </svg>
          Support
        </a>
        <hr />
        <a class="list-group-item list-group-item-action primary-color white-text d-flex align-items-center" href="signin.html" title="Sign in">
          <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-door-open mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M1 15.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM11.5 2H11V1h.5A1.5 1.5 0 0 1 13 2.5V15h-1V2.5a.5.5 0 0 0-.5-.5z"/>
            <path fill-rule="evenodd" d="M10.828.122A.5.5 0 0 1 11 .5V15h-1V1.077l-6 .857V15H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117z"/>
            <path d="M8 9c0 .552.224 1 .5 1s.5-.448.5-1-.224-1-.5-1-.5.448-.5 1z"/>
          </svg>
          Sign in
        </a>
        <a class="list-group-item list-group-item-action primary-color white-text d-flex align-items-center" href="signup.html" title="Sign up">
          <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-pencil-square mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
          Sign up
        </a>
        <a class="list-group-item list-group-item-action primary-color white-text d-flex align-items-center mb-5" href="#" title="Sign out">
          <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-door-open-fill mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2v13h1V2.5a.5.5 0 0 0-.5-.5H11zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
          </svg>
          Sign out
        </a>
      </div>

    </div>

    <!-- --------------------------------- -->

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
        <p class="text-center">Phasellus vitae velit eu erat pellentesque rhoncus vel ut velit.</p>

        <section class="mb-4">

            <div class="row justify-content-center">

                <!--Grid column-->
                <div class="col-md-9 mb-md-0 mb-5">
                    <form id="contact-form" name="contact-form" action="" method="POST">

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
                                    <textarea type="text" id="message" name="message" rows="2" class="form-control md-textarea min-vh-30"></textarea>
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
                          <input class="btn btn-primary" type="submit" value="Send" >

                        </div>
                    </form>

                    
                </div>
                <!--Grid column-->

            </div>

        </section>

    </div>


   
    <!-- Footer -->
    <footer class="page-footer font-small primary-color-dark fixed-bottom">

        <div class="text-left">
            <li class="list-group list-group-horizontal list-group-flush d-flex align-items-center">

                <!-- Copyright -->
                <p class="list-group-item primary-color-dark border-0 mb-0">© 2020 Copyright: Your Company</p>
                <!-- Copyright -->

                <a href="#" title="Terms of Service" class="list-group-item primary-color-dark border-0">Terms of Service</a>
                <a href="#" title="Privacy Policy" class="list-group-item primary-color-dark border-0">Privacy Policy</a>
                <a href="#" title="Cookies" class="list-group-item primary-color-dark border-0">Cookies</a>
                <a href="#" title="DMCA" class="list-group-item primary-color-dark border-0">DMCA</a>
            </li>
        </div>

    </footer>
    <!-- Footer -->



    <!-- JQuery -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- Bootstrap tooltips -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js"></script>
    <!-- Bootstrap core JavaScript -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <!-- MDB core JavaScript -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/js/mdb.min.js"></script>

    <!-- Google reCAPTCHA v3 -->
    <script src="https://www.google.com/recaptcha/api.js"></script>
    <script>
      function onSubmit(token) {
        document.getElementById("contact-form").submit();
      }
    </script>

    <script type="text/javascript" src="scripts/support.js"></script>
    <script type="text/javascript" src="scripts/sidebar_nav.js"></script>
  </body>
</html>