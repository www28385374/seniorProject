<?php

namespace App\Controllers;

use App\Models\CultureModel;
use App\Controllers\BaseController;



class Culture extends BaseController
{

    /**
     * Show all culture data
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_all()
    {
        $result = CultureModel::show_all();
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Show culture single post content by cul_id
     *
     * @param    int   $cul_id    The culture post id
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_single_post()
    {
        $post = $this->request->getRawInput();
        $result = CultureModel::show_single_post($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Show culture data by city_id
     *
     * @param    int   $city_id    The city id
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_by_city()
    {
        $post = $this->request->getRawInput();
        $result = CultureModel::show_by_city($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Save culture data by se id
     *
     * @param    int   $cul_id    The culture data id
     * @param    int   $m_id    The member id
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function save_culture_data()
    {
        $post = $this->request->getRawInput();
        $result = CultureModel::save_culture_data($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Delete save culture data by save_cul_id
     *
     * @param    int   $cul_id    The culture data id
     * @param    int   $m_id    The member id
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function delete_save_culture_data()
    {
        $post = $this->request->getRawInput();
        $result = CultureModel::delete_save_culture_data($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
}
