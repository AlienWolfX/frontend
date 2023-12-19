<?php
error_reporting(0);
function build_calendar($month, $year) {
    $mysqli = new mysqli('localhost', 'root', '', 'bookingsysystem');
    $stmt = $mysqli->prepare("SELECT * FROM bookings_record WHERE MONTH(DATE) = ? AND YEAR(DATE) = ?");
    $stmt->bind_param('ss', $month, $year);
    $bookings = array();
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $bookings[] = $row['DATE'];
            }

            $stmt->close();
        }
    }



    $daysOfWeek = array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    $firstDayOfMonth = mktime(0, 0, 0, $month, 1, $year);
    $numberDays = date('t', $firstDayOfMonth);
    $dateComponents = getdate($firstDayOfMonth);
    $monthName = $dateComponents['month'];
    $dayOfWeek = ($dateComponents['wday'] + 6) % 7 + 1;

    $datetoday = date('Y-m-d');

    $calendar = "<table class='table table-bordered'>";
    $calendar .= "<center><h2>$monthName $year</h2>";
    $prevMonth = date('m', mktime(0, 0, 0, $month - 1, 1, $year));
    $prevYear = date('Y', mktime(0, 0, 0, $month - 1, 1, $year));

    $nextMonth = date('m', mktime(0, 0, 0, $month + 1, 1, $year));
    $nextYear = date('Y', mktime(0, 0, 0, $month + 1, 1, $year));

    $calendar .= "<a class='btn btn-xs btn-success' href='?month=$prevMonth&year=$prevYear'>Previous Month</a> ";
    $calendar .= " <a class='btn btn-xs btn-danger' href='?month=$month&year=$year'>Current Month</a> ";
    $calendar .= "<a class='btn btn-xs btn-primary' href='?month=$nextMonth&year=$nextYear'>Next Month</a></center><br>";

    $calendar .= "<tr>";
    foreach ($daysOfWeek as $day) {
        $calendar .= "<th  class='header'>$day</th>";
    }

    $currentDay = 1;
    $calendar .= "</tr><tr>";

    if ($dayOfWeek > 0) {
        for ($k = 0; $k < $dayOfWeek; $k++) {
            $calendar .= "<td  class='empty'></td>";
        }
    }

    $month = str_pad($month, 2, "0", STR_PAD_LEFT);

    while ($currentDay <= $numberDays) {

        if ($dayOfWeek == 7) {

            $dayOfWeek = 0;
            $calendar .= "</tr><tr>";
        }

        $currentDayRel = str_pad($currentDay, 2, "0", STR_PAD_LEFT);
        $date = "$year-$month-$currentDayRel";

        $dayname = strtolower(date('l', strtotime($date)));
        $eventNum = 0;
        $today = $date == date('Y-m-d') ? "today" : "";
        if ($date < date('Y-m-d')) {
            $calendar .= "<td><h4>$currentDay</h4> <button class='btn btn-danger btn-xs' disabled>N/A</button>";
        } elseif (in_array($date, $bookings)) {
            $calendar .= "<td class='$today'><h4>$currentDay</h4> <button class='btn btn-danger btn-xs'> <span class='glyphicon glyphicon-lock'></span> Already Booked</button>";
        } else {
            
            $calendar .= "<td class='$today'><h4>$currentDay</h4> <a href='book.php?date=' class='btn btn-success btn-xs' data-action='confirmation'> <span class='glyphicon glyphicon-ok'></span> Book Now</a>";

        }
    
       
        //book.php?date=" . $date . "

        $calendar .= "</td>";
        $currentDay++;
        $dayOfWeek++;
    }

    if ($dayOfWeek != 7) {

        $remainingDays = 7 - $dayOfWeek;
        for ($l = 0; $l < $remainingDays; $l++) {
            $calendar .= "<td class='empty'></td>";
        }
    }

    $calendar .= "</tr>";
    $calendar .= "</table>";
    echo $calendar;
}

?>

<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <title>Online booking system</title>
    <link href="assets/css/style_calendar.css" rel="stylesheet">

    <link href="assets/img/favicon.png" rel="icon">
  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="assets/vendor/animate.css/animate.min.css" rel="stylesheet">
  <link href="assets/vendor/aos/aos.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">
  <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

  <!-- Template Main CSS File -->
  <link href="assets/css/style.css" rel="stylesheet">
</head>

<body>
<header id="header" class="fixed-top d-flex align-items-center header-inner-pages">
    <div class="container d-flex align-items-center justify-content-between">

      <h1 class="logo"><a href="index.html">ALLUC</a></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href=index.html" class="logo"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->
      <nav id="navbar" class="navbar">
        <ul>
          <li><a class="nav-link scrollto" href="index.php #hero">Home</a></li>
          <li><a class="nav-link scrollto" href="index.php #about">About</a></li>
          <li><a class="nav-link scrollto" href="index.php #services">Services</a></li>
          <li><a class="nav-link scrollto " href="index.php #portfolio">Cars</a></li>
          <li><a class="nav-link scrollto" href="index.php #team">Founder</a></li>
          <li><a class="nav-link scrollto" href="index.php #contact">Contact</a></li>
          <li><a class="active" href="blog.php">Cars Detail</a></li>
          <li class="dropdown"><a href="#"><span>Drop Down</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="#">Drop Down 1</a></li>
              <li class="dropdown"><a href="#"><span>Deep Drop Down</span> <i class="bi bi-chevron-right"></i></a>
                <ul>
                  <li><a href="#">Deep Drop Down 1</a></li>
                  <li><a href="#">Deep Drop Down 2</a></li>
                  <li><a href="#">Deep Drop Down 3</a></li>
                  <li><a href="#">Deep Drop Down 4</a></li>
                  <li><a href="#">Deep Drop Down 5</a></li>
                </ul>
              </li>
              <li><a href="#">Drop Down 2</a></li>
              <li><a href="#">Drop Down 3</a></li>
              <li><a href="#">Drop Down 4</a></li>
            </ul>
          </li>
          <button type="button" class=" btn btn-custom text-light" ><a href="home.php?logout='1'">Sign out</a></button>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav><!-- .navbar -->

    </div>
  </header><!-- End Header -->


<main>

    <div class="container alert alert-default" style="background:#fff">
        <div class="row">
            <div class="col-md-12">
                <div class="alert alert-danger" style="background:#2ecc71;border:none;color:#fff">
                    <h1>Online Booking System</h1>
                </div>
                <div class="wrapper_calendar">   
                <span class="icon-closed"><ion-icon name="close"></ion-icon> </span>  
                    <div class="form-boxed ">
                        <h1> ARE YOU SURE?</h1>
                        <div class="btn-wrapper">
                        <button type="button" class="btn btn-warning btn-lg white-button" id="yesButton">
                            <a href="book.php?$calendar" class="calendar_yes">YES</a>
                        </button>          
                            <button type="button" class="btn btn-warning text-light btn-lg white-button">
                                <a href="#" class="calendar_no ">NO</a>
                            </button>
                        </div>
                        
                    </div>
                </div>
                <input type="hidden" id="selectedDateInput" name="selectedDateInput" value="">
                <?php
                $dateComponents = getdate();
                if (isset($_GET['month']) && isset($_GET['year'])) {
                    $month = $_GET['month'];
                    $year = $_GET['year'];
                } else {
                    $month = $dateComponents['mon'];
                    $year = $dateComponents['year'];
                }
                echo build_calendar($month, $year);
                ?>
            </div>
        </div>
    </div>
 </main>


 <footer id="footer">

<div class="footer-newsletter">
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <h4>Our Newsletter</h4>
        <p>Our newsletter delivers timely updates, exclusive content, and valuable insights 
          to keep you informed and engaged in the latest happenings and trends</p>
      </div>
      <div class="col-lg-6">
        <form action="" method="post">
          <input type="email" name="email"><input type="submit" value="Subscribe">
        </form>
      </div>
    </div>
  </div>
</div>

<div class="footer-top">
  <div class="container">
    <div class="row">

      <div class="col-lg-3 col-md-6 footer-links">
        <h4>Useful Links</h4>
        <ul>
          <li><i class="bx bx-chevron-right"></i> <a href="#">Home</a></li>
          <li><i class="bx bx-chevron-right"></i> <a href="#">About us</a></li>
          <li><i class="bx bx-chevron-right"></i> <a href="#">Services</a></li>
          <li><i class="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
          <li><i class="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
        </ul>
      </div>

      <div class="col-lg-3 col-md-6 footer-links">
        <h4>Our Services</h4>
        <ul>
          <li><i class="bx bx-chevron-right"></i> <a href="#">Customer Service</a></li>
          <li><i class="bx bx-chevron-right"></i> <a href="#">Corporate Solutions</a></li>
          <li><i class="bx bx-chevron-right"></i> <a href="#">Roadside Assistance</a></li>
          <li><i class="bx bx-chevron-right"></i> <a href="#">Online Reservations</a></li>
          <li><i class="bx bx-chevron-right"></i> <a href="#">Flexible Rental Periods</a></li>
        </ul>
      </div>

      <div class="col-lg-3 col-md-6 footer-contact">
        <h4>Contact Us</h4>
        <p>
                      KM 7 NH1  Butuan City <br>               
                      Agusan Del Norte<br>
                      Philippines 8600 <br><br>
              <strong>Phone:</strong> 09631922544<br>
              <strong>Email:</strong> ALLUC@gmail.com<br>
            </p>

      </div>

      <div class="col-lg-3 col-md-6 footer-info">
        <h3>About ALLUC</h3>
        <p>Our organization's car rental service ensures seamless mobility solutions, offering a diverse fleet of 
          well-maintained vehicles to meet the varied needs of our members, 
          providing convenience and reliability for every journey</p>
        <div class="social-links mt-3">
          <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
          <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
          <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
          <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
          <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
        </div>
      </div>

    </div>
  </div>
</div>

    
  </footer><!-- End Footer -->
  <script src="assets/vendor/aos/aos.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <script src="assets/js/calendar_script.js"></script>
</body>

</html>
