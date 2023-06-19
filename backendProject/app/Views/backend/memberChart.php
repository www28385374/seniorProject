<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" name="viewport">
    <title>Senior &mdash; Backend</title>

    <!-- General CSS Files -->
    <link rel="stylesheet" href="../../assets/modules/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../assets/modules/fontawesome/css/all.min.css">

    <!-- CSS Libraries -->
    <link rel="stylesheet" href="../../assets/modules/jqvmap/dist/jqvmap.min.css">
    <link rel="stylesheet" href="../../assets/modules/weather-icon/css/weather-icons.min.css">
    <link rel="stylesheet" href="../../assets/modules/weather-icon/css/weather-icons-wind.min.css">
    <link rel="stylesheet" href="../../assets/modules/summernote/summernote-bs4.css">
    <link rel="stylesheet" href="../../assets/modules/datatables/datatables.min.css">
    <link rel="stylesheet" href="../../assets/modules/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="../../assets/modules/datatables/Select-1.2.4/css/select.bootstrap4.min.css">

    <!-- Template CSS -->
    <link rel="stylesheet" href="../../assets/css/style.css">
    <link rel="stylesheet" href="../../assets/css/components.css">
    <!-- Start GA -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-94034622-3"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'UA-94034622-3');
    </script>
    <!-- /END GA -->
</head>

<body>
    <div id="app">
        <div class="main-wrapper main-wrapper-1">
            <div class="navbar-bg"></div>
            <nav class="navbar navbar-expand-lg main-navbar">
                <?= view('basic/navbar') ?>
            </nav>
            <div class="main-sidebar sidebar-style-2">
                <aside id="sidebar-wrapper">
                    <?= view('basic/sidebar') ?>
                </aside>
            </div>

            <!-- Main Content -->
            <div class="main-content">
                <section class="section">
                    <div class="section-header">
                        <h1>會員數據</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-6 col-md-12 col-12 col-sm-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4>年齡比例</h4>
                                </div>
                                <div class="card-body">
                                    <canvas id="ageRadioPie"></canvas>
                                </div>
                            </div>


                        </div>
                        <div class="col-12 col-md-12 col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <h4>年齡分布</h4>
                                </div>
                                <div class="card-body">
                                    <canvas id="ageRadioBarChart"></canvas>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-12 col-md-12 col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <h4>性別比例</h4>
                                </div>
                                <div class="card-body">
                                    <canvas id="sexRadioPie"></canvas>
                                </div>
                            </div>

                        </div>
                        <div class="col-12 col-sm-12 col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <h4>性別年齡比例圖</h4>
                                </div>
                                <div class="card-body">
                                    <canvas id="sexAndAgeChart" height="180"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>


    </div>
    </div>


    <!-- General JS Scripts -->
    <script src="../assets/modules/jquery.min.js"></script>
    <script src="../assets/modules/popper.js"></script>
    <script src="../assets/modules/tooltip.js"></script>
    <script src="../assets/modules/bootstrap/js/bootstrap.min.js"></script>
    <script src="../assets/modules/nicescroll/jquery.nicescroll.min.js"></script>
    <script src="../assets/modules/moment.min.js"></script>
    <script src="../assets/js/stisla.js"></script>

    <!-- JS Libraies -->
    <script src="../assets/modules/simple-weather/jquery.simpleWeather.min.js"></script>
    <script src="../assets/modules/chart.min.js"></script>
    <script src="../assets/modules/jqvmap/dist/jquery.vmap.min.js"></script>
    <script src="../assets/modules/jqvmap/dist/maps/jquery.vmap.world.js"></script>
    <script src="../assets/modules/summernote/summernote-bs4.js"></script>
    <script src="../assets/modules/chocolat/dist/js/jquery.chocolat.min.js"></script>
    <script src="../assets/modules/datatables/datatables.min.js"></script>
    <script src="../assets/modules/datatables/DataTables-1.10.16/js/dataTables.bootstrap4.min.js"></script>
    <script src="../assets/modules/datatables/Select-1.2.4/js/dataTables.select.min.js"></script>
    <script src="../assets/modules/jquery-ui/jquery-ui.min.js"></script>


    <!-- Page Specific JS File -->

    <script src="../assets/js/backendPage/member-chart.js"></script>
    <script src="../assets/js/page/modules-datatables.js"></script>


    <!-- Template JS File -->
    <script src="../assets/js/scripts.js"></script>
    <script src="../assets/js/custom.js"></script>
</body>

</html>