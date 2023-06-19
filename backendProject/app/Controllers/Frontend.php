<?php

namespace App\Controllers;

use App\Models\FrontendModel;
use App\Controllers\BaseController;



class Frontend extends BaseController
{

    /**
     * Show all data
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
        $result = FrontendModel::show_all();
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Show single post content by unit,id
     *
     * @param    int      $id      The post id
     * @param    string   $unit    The unit string (cul/se)
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
        $result = FrontendModel::show_single_post($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Show member's all save data
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
    public function show_save_all_data()
    {
        $post = $this->request->getRawInput();
        $result=FrontendModel::show_save_all_data($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
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
    public function show_recent_data()
    {
        $post = $this->request->getRawInput();
        $result=FrontendModel::show_recent_data($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     *
     * min_date max_date
     * @param    string unit=C|S
     * @param    int  city_id 無則傳0
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function advanced_search()
    {
        $post = $this->request->getRawInput();
        $result=FrontendModel::advanced_search($post);

        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
}