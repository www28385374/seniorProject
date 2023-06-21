<?php

namespace App\Models;

use CodeIgniter\Model;

class SeniorModel extends BaseModel
{
    public static function show_all()
    {
        try {
            $db = \Config\Database::connect();
            $builder = $db->table('senior');
            $query = $builder->select('*')
                ->orderBy('se_upload_date', 'DESC')
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
    public static function show_single_post($data)
    {
        try {
            $db = \Config\Database::connect();
            $builder = $db->table('senior');
            $query = $builder->select('*')
                ->where('se_id', $data['se_id'])
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
    public static function show_by_city($data)
    {
        try {
            $db = \Config\Database::connect();
            $builder = $db->table('senior');
            $query = $builder->select('*')
                ->where('city_id', $data['city_id'])
                ->orderBy('se_upload_date', 'DESC')
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
    public static function save_senior_data($data)
    {
        try {
            $db = \Config\Database::connect();
            $builder = $db->table('save_senior');
            $check_query = $builder->select('*')
                ->where('sha1(m_id)', $data['m_id'])
                ->where('se_id', $data['se_id'])
                ->countAllResults();
            if ($check_query > 0) {
                return array(
                    'status' => '0',
                    'error' => 'Repeat save',
                    'status_code' => 400
                );
            } else {
                $member_query = $db->table('member')
                    ->select('m_id')
                    ->where('sha1(m_id)', $data['m_id'])
                    ->get()
                    ->getResultArray();
                $data['m_id'] = $member_query[0]['m_id'];
                $insert_query = $builder->insert($data);
                return array(
                    'status' => '1',
                    'result' => $insert_query,
                    'status_code' => 200
                );
            }
        } catch (\Exception $e) {
            return array(
                'status' => '0',
                'error' => 'Caught exception: ' . $e->getMessage() . '\n',
                'status_code' => 400
            );
        }
    }
    public static function delete_save_senior_data($data)
    {
        try {
            $db = \Config\Database::connect();
            $builder = $db->table('save_senior');
            $check_query = $builder->select('save_se_id')
                ->where('sha1(m_id)', $data['m_id'])
                ->where('se_id', $data['se_id'])
                ->get()
                ->getResultArray();
            if (count($check_query) > 0) {
                $delete_query = $builder->where('save_se_id', $check_query[0]['save_se_id'])->delete();
                return array(
                    'status' => '1',
                    'result' => $delete_query,
                    'status_code' => 200
                );
            } else {
                return array(
                    'status' => '0',
                    'error' => 'data does not exist',
                    'status_code' => 400
                );
            }
        } catch (\Exception $e) {
            return array(
                'status' => '0',
                'error' => 'Caught exception: ' . $e->getMessage() . '\n',
                'status_code' => 400
            );
        }
    }
}
