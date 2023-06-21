<?php

namespace App\Models;

use CodeIgniter\Model;

class MemberModel extends BaseModel
{
    protected $table = 'member';
    protected $allowedFields = [
        'm_name', 'm_birthday' , 'm_account', 'm_password' , 'm_phone' , 'm_sex' , 'm_permission'
    ];
    protected $returnType    = \App\Entities\MemberEntity::class;

    public static function create($data){
        try
        {
            $db = \Config\Database::connect();
            $builder = $db->table('member');
            $query = $builder->selectCount('m_account')
                            ->where('m_account',$data['m_account'])
                            ->orWhere('m_phone',$data['m_phone'])
                            ->get()
                            ->getResultArray();
            if ($query[0]['m_account']>0)
            {
                return array(
                    'status' => '0',
                    'error' => '帳號或手機重複'
                );
            }
            $data['m_password']=sha1($data['m_password']);
            $data['m_permission']=1;
            $query = $builder->insert($data);
            return array(
                'status' => '1',
                'result' => $query
            );;
        }
        catch (\Exception $e)
        {
            return array(
                'status' => '0',
                'error' => 'Caught exception: '.$e->getMessage().'\n'
            );
        }
    }
    public static function login_check($data){
        try
        {
            $db = \Config\Database::connect();
            $builder = $db->table('member');
            $query = $builder->selectCount('m_account')
                            ->where('m_account',$data['m_account'])
                            ->where('m_password',sha1($data['m_password']))
                            ->get()
                            ->getResultArray();
            if ($query[0]['m_account']==0)
            {
                return array(
                    'status' => '0',
                    'error' => '帳密錯誤'
                );
            }
            return array(
                'status' => '1',
                'result' => $query
            );
        }
        catch (\Exception $e)
        {
            return array(
                'status' => '0',
                'error' => 'Caught exception: '.$e->getMessage().'\n'
            );
        }
    }
    public static function show_member_info($data){
        try {
            $db = \Config\Database::connect();
            $builder = $db->table('member');

            $query = $builder->select('*')
                ->where('sha1(m_id)', $data['m_id'])
                ->get()
                ->getResultArray();
            return array(
                'status' => '1',
                'result' => $query,
                'status_code' => 200
            );
        } catch (\Exception $e) {
            return array(
                'status' => '0',
                'error' => 'Caught exception: ' . $e->getMessage() . '\n',
                'status_code' => 400
            );
        }
    }
}