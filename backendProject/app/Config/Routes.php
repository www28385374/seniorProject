<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (is_file(SYSTEMPATH . 'Config/Routes.php')) {
    require SYSTEMPATH . 'Config/Routes.php';
}

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
// The Auto Routing (Legacy) is very dangerous. It is easy to create vulnerable apps
// where controller filters or CSRF protection are bypassed.
// If you don't want to define all routes, please use the Auto Routing (Improved).
// Set `$autoRoutesImproved` to true in `app/Config/Feature.php` and set the following to true.
//$routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
// $routes->get('home', 'home::index');
// $routes->get('test', 'home::test');
$routes->get('/', 'backend\dashboard::home');

$routes->group('member', static function ($routes) {
    $routes->post('create', 'Member::create');
    $routes->post('login_check', 'Member::login_check');
    $routes->post('show_member_info', 'Member::show_member_info');
});

$routes->group('frontend', static function ($routes) {
    $routes->get('show_all', 'frontend::show_all');
    $routes->post('show_single_post', 'frontend::show_single_post');
    $routes->post('show_save_all_data', 'frontend::show_save_all_data');
    $routes->post('show_recent_data', 'frontend::show_recent_data');
    $routes->post('advanced_search', 'frontend::advanced_search');
});

$routes->group('subscribe', static function ($routes) {
    $routes->get('show_city_info', 'subscribe::show_city_info');
    $routes->post('subscribe_unit', 'subscribe::subscribe_unit');
    $routes->post('show_subscribe_senior', 'subscribe::show_subscribe_senior');
    $routes->post('delete_subscribe', 'subscribe::delete_subscribe');
    $routes->post('show_subscribe_all_data', 'subscribe::show_subscribe_all_data');
});

$routes->group('senior', static function ($routes) {
    $routes->get('show_all', 'senior::show_all');
    $routes->post('show_single_post', 'senior::show_single_post');
    $routes->post('show_by_city', 'senior::show_by_city');
    $routes->post('save_senior_data', 'senior::save_senior_data');
    $routes->post('delete_save_senior_data', 'senior::delete_save_senior_data');
});

$routes->group('culture', static function ($routes) {
    $routes->get('show_all', 'culture::show_all');
    $routes->post('show_single_post', 'culture::show_single_post');
    $routes->post('show_by_city', 'culture::show_by_city');
    $routes->post('save_culture_data', 'culture::save_culture_data');
    $routes->post('delete_save_culture_data', 'culture::delete_save_culture_data');
});

$routes->group('calendar', static function ($routes) {
    $routes->post('create_calendar', 'calendar::create_calendar');
    $routes->post('show_calendar', 'calendar::show_calendar');
    $routes->post('delete_calendar', 'calendar::delete_calendar');
    $routes->post('edit_calendar', 'calendar::edit_calendar');
    $routes->post('show_single_calendar', 'calendar::show_single_calendar');
});

$routes->group('backend', static function ($routes) {
    $routes->post('show_sex_ratio', 'backend\backend::show_sex_ratio');
    $routes->post('show_all_member', 'backend\backend::show_all_member');
    $routes->post('show_age_ratio', 'backend\backend::show_age_ratio');
    $routes->post('show_subcribe_top5', 'backend\backend::show_subcribe_top5');
    $routes->post('show_senior_cnt', 'backend\backend::show_senior_cnt');
    $routes->post('show_culture_cnt', 'backend\backend::show_culture_cnt');
    $routes->post('show_age_ratio_decimal', 'backend\backend::show_age_ratio_decimal');
    $routes->post('show_sex_age_ratio', 'backend\backend::show_sex_age_ratio');
    $routes->post('show_all_data_cnt', 'backend\backend::show_all_data_cnt');
    $routes->post('show_all_data_cnt_by_city', 'backend\backend::show_all_data_cnt_by_city');
    $routes->post('show_save_article_radio', 'backend\backend::show_save_article_radio');
    $routes->post('changeMemberPermission', 'backend\backend::changeMemberPermission');
    $routes->post('showMemberInfo', 'backend\backend::showMemberInfo');
    $routes->post('updateMemberInfo', 'backend\backend::updateMemberInfo');
});

$routes->group('dashboard', static function ($routes) {
    $routes->get('', 'backend\dashboard::home');
    $routes->get('home', 'backend\dashboard::home');
    $routes->get('chart', 'backend\dashboard::chart');
    $routes->get('member', 'backend\dashboard::member');
    $routes->get('memberChart', 'backend\dashboard::memberChart');
    $routes->get('dataChart', 'backend\dashboard::dataChart');
});


/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (is_file(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
