<?php

namespace App\Controllers;

use App\Models\SeniorModel;
use App\Controllers\BaseController;



class Senior extends BaseController
{

    /**
     * Show all senior data
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
        $result=SeniorModel::show_all();
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Show senior single post content by se_id
     *
     * @param    int   $se_id    The senior post id
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
        $result = SeniorModel::show_single_post($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Show senior data by city_id
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
        $result=SeniorModel::show_by_city($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Save senior data by se id
     *
     * @param    int   $se_id    The senior data id
     * @param    int   $m_id    The member id
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function save_senior_data()
    {
        $post = $this->request->getRawInput();
        $result=SeniorModel::save_senior_data($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Delete save senior data by save_se_id
     *
     * @param    int   $se_id    The senior data id
     * @param    int   $m_id    The member id
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function delete_save_senior_data()
    {
        $post = $this->request->getRawInput();
        $result=SeniorModel::delete_save_senior_data($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
}