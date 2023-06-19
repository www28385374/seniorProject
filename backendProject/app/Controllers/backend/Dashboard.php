<?php

namespace App\Controllers\Backend;

// use App\Models\DashboardModel;
use App\Controllers\BaseController;

class Dashboard extends BaseController
{
    /**
     * Return View home.
     */
    public function home()
    {
        return view('backend/index');
    }
    /**
     * Return View chart.
     */
    public function chart()
    {
        return view('backend/chart');
    }
    /**
     * Return View member.
     */
    public function member()
    {
        return view('backend/member');
    }
     /**
     * Return View memberChart.
     */
    public function memberChart()
    {
        return view('backend/memberChart');
    }
     /**
     * Return View dataChart.
     */
    public function dataChart()
    {
        return view('backend/dataChart');
    }
}