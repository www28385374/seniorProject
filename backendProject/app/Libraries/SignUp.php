<?php

namespace App\Libraries;

use App\Controllers\BaseController;
use App\Models\MemberModel;
use App\Entities\MemberEntity;


class SignUp extends BaseController
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
     *      'error'|'result' => (string) Error Msg.
     *    ]
     */
    public function sign_up($data)
    {
        $validation = \Config\Services::validation();
        $result = $validation->run($data,'createMemberVali');
        if (!$result){
            return array(
                "status"=>"0",
                "error" => $validation->getErrors(),
                "status_code"=>400
            );
        }
        $MemberModel=new MemberModel;
        $MemberModelEntities = new MemberEntity();
        $data['m_password']=sha1($data['m_password']);
        foreach($data as $key=>$value)
        {
            $MemberModelEntities->$key = $value;
        }
        $MemberModelEntities->m_permission = 1;

        if($MemberModel->save($MemberModelEntities))
        {
            return array(
                "status"=>"1",
                "status_code"=>200
            );
        }
        else
        {
            return array(
                "status"=>"0",
                "error" =>"請回傳系統管理員",
                "status_code"=>400
            );
        }
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
     *      'error'|'result' => (string) Error Msg.
     *    ]
     */
    public function login_check_test($data)
    {
        $result=MemberModel::login_check($data);
        $MemberModel=new MemberModel;
        $result=$MemberModel->select('m_id')
                            ->where('m_account',$data['m_account'])
                            ->where('m_password',sha1($data['m_password']))
                            ->findAll();
        if(count($result)>0)
        {
            return array(
                "status"=>"1",
                "status_code"=>200,
                "m_id"=>sha1($result[0]->m_id)
            );
        }
        else
        {
            return array(
                "status"=>"0",
                "status_code"=>400
            );
        }
    }
}