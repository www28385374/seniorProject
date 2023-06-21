<?php

namespace App\Models;

use CodeIgniter\Model;

class SubscribeModel extends BaseModel
{
    public static function show_city_info()
    {
        try {
            $db = \Config\Database::connect();
            $builder = $db->table('city');
            $query = $builder->select('*')
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
    public static function subscribe_unit($data)
    {
        try {
            $db = \Config\Database::connect();
            $builder = $db->table('subscribe_unit');
            $check_query = $builder->select('*')
                ->where('sha1(m_id)', $data['m_id'])
                ->where('city_id', $data['city_id'])
                ->where('sub_unit', $data['sub_unit'])
                ->countAllResults();
            if ($check_query > 0) {
                return array(
                    'status' => '0',
                    'error' => 'Repeat subscription',
                    'status_code' => 400
                );
            } else {
                $member_query = $db->table('member')
                            ->select('m_id')
                            ->where('sha1(m_id)', $data['m_id'])
                            ->get()
                            ->getResultArray();
                $data['m_id']=$member_query[0]['m_id'];
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
    public static function show_subscribe_senior($data)
    {
        try {
            $db = \Config\Database::connect();
            $builder = $db->table('subscribe_unit');
            $check_query = $builder->select('sub_id,subscribe_unit.city_id,city.city_name_CN')
                ->join('city', 'city.city_id=subscribe_unit.city_id')
                ->where('sha1(m_id)', $data['m_id'])
                ->where('sub_unit', $data['sub_unit'])
                ->get()
                ->getResultArray();
            return array(
                'status' => '1',
                'result' => $check_query,
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
    public static function delete_subscribe($data)
    {
        try {
            $db = \Config\Database::connect();
            $builder = $db->table('subscribe_unit');
            $check_query = $builder->select('sub_id')
                ->where('m_id', $data['m_id'])
                ->where('city_id', $data['city_id'])
                ->where('sub_unit', $data['sub_unit'])
                ->get()
                ->getResultArray();
            if (count($check_query) > 0) {
                $delete_query = $builder->where('sub_id', $check_query[0]['sub_id'])->delete();
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
    public static function show_subscribe_all_data($data)
    {
        try {
            $db = \Config\Database::connect();
            $builder = $db->table('subscribe_unit');
            $culture_query = $builder
                ->select('cul_id as id,cul_title as title,cul_content as content,cul_upload_date as upload_date,culture.city_id,t_id')
                ->join('city', 'city.city_id=subscribe_unit.city_id')
                ->join('culture', 'culture.city_id=subscribe_unit.city_id')
                ->where('sha1(m_id)', $data['m_id'])
                ->where('sub_unit', 'C')
                ->orderBy('cul_upload_date', 'DESC')
                ->get()
                ->getResultArray();
            $senior_query = $builder
                ->select('se_id as id,se_title as title,se_content as content,se_upload_date as upload_date,senior.city_id')
                ->join('city', 'city.city_id=subscribe_unit.city_id')
                ->join('senior', 'senior.city_id=subscribe_unit.city_id')
                ->where('sha1(m_id)', $data['m_id'])
                ->where('sub_unit', 'S')
                ->orderBy('se_upload_date', 'DESC')
                ->get()
                ->getResultArray();

            foreach ($culture_query as $key => $value) {
                $culture_query[$key]['unit'] = 'cul';
            };
            foreach ($senior_query as $key => $value) {
                $senior_query[$key]['unit'] = 'se';
            }
            $result = array_merge($culture_query, $senior_query);

            usort($result, function($element1, $element2) {
                $datetime1 = strtotime($element1['upload_date']);
                $datetime2 = strtotime($element2['upload_date']);
                return $datetime2 - $datetime1;});
            return array(
                'status' => '1',
                'result' => $result,
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
