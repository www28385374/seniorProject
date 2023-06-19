<?php

namespace App\Controllers;

use App\Models\MemberModel;
use App\Libraries\SignUp;
use App\Libraries\LoginCheck;


class Member extends SignUp
{

    /**
     * Create member account
     *
     * @param    array   $post    Array containing the necessary params.
     *    $post = [
     *      'm_name'     => (string) Member's name. Required.
     *      'm_birthday' => (date) Member's birthday. Required.
     *      'm_account'  => (string) Member's account. Required.
     *      'm_password' => (string) Member's password. Required.
     *      'm_phone'    => (string) Member's phone. Required.
     *      'm_sex' => (char) Member's sex is F or M. Required.
     *    ]
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function create()
    {
        $post = $this->request->getRawInput();
        $result=$this->sign_up($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result,400);
    }
    /**
     * Login checking
     *
     * @param    array   $post    Array containing the necessary params.
     *    $post = [
     *      'm_account'  => (string) Member's account. Required.
     *      'm_password' => (string) Member's password. Required.
     *    ]
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function login_check()
    {
        $post = $this->request->getRawInput();
        $result=$this->login_check_test($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result,400);
    }
    /**
     * Show member info
     *
     * @param    array   $post    Array containing the necessary params.
     *    $post = [
     *      'm_id'  => (string) sha1(m_id)
     *    ]
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_member_info()
    {
        $post = $this->request->getRawInput();
        $result=MemberModel::show_member_info($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    // f6e1126cedebf23e1463aee73f9df08783640400
}