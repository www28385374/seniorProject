<?php

namespace App\Controllers;

use App\Models\SubscribeModel;
use App\Controllers\BaseController;

class Subscribe extends BaseController
{
    /**
     * Show all city info.
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_city_info()
    {
        $post = $this->request->getRawInput();
        $result=SubscribeModel::show_city_info();
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Subscribe senior by city id
     *
     * @param    int   $city_id    The city id
     * @param    int   $m_id    The member id
     * @param    int   $sub_unit    The subscribe unit 'S' means senior 'C' means culture
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function subscribe_unit()
    {
        $post = $this->request->getRawInput();
        $result=SubscribeModel::subscribe_unit($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Show member's subscribe unit
     *
     * @param    int   $m_id    The member id
     * @param    string   $sub_unit    The subscribe's unit S or C
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_subscribe_senior()
    {
        $post = $this->request->getRawInput();
        $result=SubscribeModel::show_subscribe_senior($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Delete member's subscribe unit
     *
     * @param    int   $city_id    The city id
     * @param    int   $m_id    The member id
     * @param    string   $sub_unit    The subscribe's unit S or C
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function delete_subscribe()
    {
        $post = $this->request->getRawInput();
        $result=SubscribeModel::delete_subscribe($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Show member's all subscribe
     *
     * @param    int   $m_id    The member id
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_subscribe_all_data()
    {
        $post = $this->request->getRawInput();
        $result=SubscribeModel::show_subscribe_all_data($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
}