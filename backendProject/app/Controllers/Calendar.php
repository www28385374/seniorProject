<?php

namespace App\Controllers;

use App\Models\CalendarModel;
use App\Controllers\BaseController;

class Calendar extends BaseController
{
    /**
     * Create calendar data by Array
     *
     * @param    array   $post    Array containing the Calendar params.
     *    $post = [
     *      'c_title'      => (string) Calendar's title. Required.
     *      'c_content'    => (string) Calendar's content. Required.
     *      'c_start_date' => (date) Calendar's start date. Required.
     *      'c_end_date'   => (date) Calendar's end date. Required.
     *      'c_unit'       => (char) Unit means senior or culture. Required(C or S).
     *      'm_id'         => (int) Member's ID. Required.
     *      'city_id'      => (int) City's ID to connect to calendar. Required.
     *    ]
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function create_calendar()
    {
        $post = $this->request->getRawInput();
        $validation = \Config\Services::validation();
        $result = $validation->run($post, 'createCalendarVali');
        $start_date = strtotime($post['c_start_date']);
        $end_date = strtotime($post['c_end_date']);
        if (!$result) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    "status" => "0",
                    "error" => $validation->getErrors(),
                ]);
        } else if ($start_date > $end_date) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    "status" => "0",
                    "error" => "start time shouldn't greater than end time",
                ]);
        } else {
            $result = CalendarModel::create_calendar($post);
            return $this->response->setStatusCode($result['status_code'])->setJSON($result);
        }
    }
    /**
     * Show member's all calendar data by m_id
     *
     * @param    int   $m_id    Member ID.
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_all_calendar()
    {
        $post = $this->request->getRawInput();
        $result = CalendarModel::show_all_calendar($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Delete calendar data by c_id.
     *
     * @param    int   $c_id    The calendar's ID.
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function delete_calendar()
    {
        $post = $this->request->getRawInput();
        $result = CalendarModel::delete_calendar($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Edit calendar data by c_id , edit not contain change unit.
     *
     * @param    array   $post    Array containing the Calendar params.
     *    $post = [
     *      'c_id'         => (int) Calendar's ID. Required.
     *      'c_title'      => (string) Calendar's title. Required.
     *      'c_content'    => (string) Calendar's content. Required.
     *      'c_start_date' => (date) Calendar's start date. Required.
     *      'c_end_date'   => (date) Calendar's end date. Required.
     *    ]
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function edit_calendar()
    {
        $post = $this->request->getRawInput();
        $result = CalendarModel::edit_calendar($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Show single calendar content.
     *
     * @param    int   $c_id    The calendar's ID.
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_single_calendar()
    {
        $post = $this->request->getRawInput();
        $result = CalendarModel::show_single_calendar($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
}
