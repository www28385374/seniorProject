<?php

namespace App\Controllers;
use App\Models\BackendModel;

class Home extends BaseController
{
    public function index()
    {
        return view('admin/index');
    }
    public function test()
    {
        return view('backend/index-0');
        // return json_encode('123');
    }
}
