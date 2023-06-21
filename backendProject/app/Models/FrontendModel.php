<?php

namespace App\Models;

use CodeIgniter\Model;

class FrontendModel extends BaseModel
{
    public static function show_all()
    {
        try {
            $db = \Config\Database::connect();
            $builder = $db->table('culture');
            $culQuery = $builder->select('cul_id as id,cul_title as title,cul_content as content,cul_upload_date as upload_date,city_id,t_id')
                ->orderBy('cul_upload_date', 'DESC')
                ->get()
                ->getResultArray();
            foreach ($culQuery as $key => $value) {
                $culQuery[$key]['unit'] = 'cul';
            };
            $seQuery = $db->table('senior')
                ->select('se_id as id,se_title as title,se_content as content,se_upload_date as upload_date,city_id')
                ->orderBy('se_upload_date', 'DESC')
                ->get()
                ->getResultArray();
            foreach ($seQuery as $key => $value) {
                $seQuery[$key]['unit'] = 'se';
            }
            $result = array_merge($culQuery, $seQuery);

            usort($result, function ($element1, $element2) {
                $datetime1 = strtotime($element1['upload_date']);
                $datetime2 = strtotime($element2['upload_date']);
                return $datetime2 - $datetime1;
            });
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
    public static function show_single_post($data)
    {
        try {
            $db = \Config\Database::connect();
            if ($data['unit'] == 'se') {
                $sql_table = "senior";
                $sql_column = "se_id";
            } else if ($data['unit'] == 'cul') {
                $sql_table = "culture";
                $sql_column = "cul_id";
            }
            $builder = $db->table($sql_table);
            $query = $builder->select('*')
                ->where($sql_column, $data['id'])
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
    public static function show_save_all_data($data)
    {
        try {
            $db = \Config\Database::connect();
            $culture_query =  $db->table('save_culture')
                ->select('save_culture.cul_id as id,cul_title as title,cul_content as content,cul_upload_date as upload_date,culture.city_id,t_id')
                ->join('culture', 'culture.cul_id=save_culture.cul_id')
                ->where('sha1(m_id)', $data['m_id'])
                ->orderBy('cul_upload_date', 'DESC')
                ->get()
                ->getResultArray();
            $senior_query = $db->table('save_senior')
                ->select('save_senior.se_id as id,se_title as title,se_content as content,se_upload_date as upload_date,senior.city_id')
                ->join('senior', 'senior.se_id=save_senior.se_id')
                ->where('sha1(m_id)', $data['m_id'])
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

            usort($result, function ($element1, $element2) {
                $datetime1 = strtotime($element1['upload_date']);
                $datetime2 = strtotime($element2['upload_date']);
                return $datetime2 - $datetime1;
            });
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
    public static function show_recent_data($data)
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
                ->where('cul_upload_date >=', date("Y-m-d", strtotime("-2 day")))
                ->where('cul_upload_date <=', date("Y-m-d"))
                ->orderBy('cul_upload_date', 'DESC')
                ->get()
                ->getResultArray();
            $senior_query = $builder
                ->select('se_id as id,se_title as title,se_content as content,se_upload_date as upload_date,senior.city_id')
                ->join('city', 'city.city_id=subscribe_unit.city_id')
                ->join('senior', 'senior.city_id=subscribe_unit.city_id')
                ->where('sha1(m_id)', $data['m_id'])
                ->where('sub_unit', 'S')
                ->where('se_upload_date >=', date("Y-m-d", strtotime("-2 day")))
                ->where('se_upload_date <=', date("Y-m-d"))
                ->orderBy('se_upload_date', 'DESC')
                ->get()
                ->getResultArray();

            foreach ($culture_query as $key => $value) {
                $culture_query[$key]['unit'] = 'cul';
            };
            foreach ($senior_query as $key => $value) {
                $senior_query[$key]['unit'] = 'se';
            }
            $result = array_merge($culture_query);
            $result = array_merge($culture_query, $senior_query);

            usort($result, function ($element1, $element2) {
                $datetime1 = strtotime($element1['upload_date']);
                $datetime2 = strtotime($element2['upload_date']);
                return $datetime2 - $datetime1;
            });
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
    public static function advanced_search($data)
    {
        try {
            $db = \Config\Database::connect();
            if ($data['unit'] == 'C') {
                $builder = $db->table('culture');
                if ($data['city_id'] == 0) {
                    $Query = $builder
                        ->select('*')
                        ->where('cul_upload_date >=', $data['min_date'])
                        ->where('cul_upload_date <=', $data['max_date'])
                        ->orderBy('cul_upload_date', 'DESC')
                        ->get()
                        ->getResultArray();
                } else {
                    $Query = $builder
                        ->select('*')
                        ->where('city_id', $data['city_id'])
                        ->where('cul_upload_date >=', $data['min_date'])
                        ->where('cul_upload_date <=', $data['max_date'])
                        ->orderBy('cul_upload_date', 'DESC')
                        ->get()
                        ->getResultArray();
                }
            } else {
                if ($data['city_id'] == 0) {
                    $builder = $db->table('senior');
                    $Query = $builder
                        ->select('*')
                        ->where('se_upload_date >=', $data['min_date'])
                        ->where('se_upload_date <=', $data['max_date'])
                        ->orderBy('se_upload_date', 'DESC')
                        ->get()
                        ->getResultArray();
                } else {
                    $builder = $db->table('senior');
                    $Query = $builder
                        ->select('*')
                        ->where('city_id', $data['city_id'])
                        ->where('se_upload_date >=', $data['min_date'])
                        ->where('se_upload_date <=', $data['max_date'])
                        ->orderBy('se_upload_date', 'DESC')
                        ->get()
                        ->getResultArray();
                }
            }
            return array(
                'status' => '1',
                'result' => $Query,
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
