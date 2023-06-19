<?php

namespace App\Models;

use CodeIgniter\Model;

class BackendModel extends BaseModel
{
    public static function show_sex_ratio()
    {
        try {
            $db = \Config\Database::connect();
            $man_query = $db->table('member')->select('*')->where('m_sex', 'M')->countAllResults();
            $female_query = $db->table('member')->select('*')->where('m_sex', 'F')->countAllResults();
            return array(
                'status' => '1',
                'result' => [
                    'man_ratio' => $man_query,
                    'female_ratio' => $female_query,
                ],
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
    public static function show_all_member()
    {
        try {
            $db = \Config\Database::connect();
            $query = $db->table('member')
                ->select('sha1(m_id) as m_id,m_name,m_birthday,m_sex,m_permission,m_account')
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
    public static function show_age_ratio()
    {
        try {
            $db = \Config\Database::connect();
            $query = $db->table('member')
                ->select('m_birthday,m_sex')
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
    public static function show_subcribe_top5()
    {
        try {
            $db = \Config\Database::connect();
            $top5Query = $db->table('subscribe_unit')
                ->select('count(*) AS cnt,subscribe_unit.city_id,sub_unit,city_name_CN')
                ->join('city', 'city.city_id=subscribe_unit.city_id')
                ->groupBy(['city_id', 'sub_unit'])
                ->orderBy('cnt', 'DESC')
                ->limit(5)
                ->get()
                ->getResultArray();

            $totalCnt = 0;
            foreach ($top5Query as $key => $value) {
                $totalCnt += $value['cnt'];
                $resultArray[$key]['cnt'] = $value['cnt'];
                $resultArray[$key]['city_name'] = $value['city_name_CN'];
                $resultArray[$key]['sub_unit'] =
                    $value['sub_unit'] == 'C' ? "文化局" : "樂齡中心";
                foreach (['M', 'F'] as $sexValue) {
                    $sexQuery = $db->table('subscribe_unit')
                        ->join('member', 'member.m_id=subscribe_unit.m_id')
                        ->select('count(*) AS cnt')
                        ->where('city_id', $value['city_id'])
                        ->where('sub_unit', $value['sub_unit'])
                        ->where('member.m_sex', $sexValue)
                        ->get()
                        ->getResultArray();
                    $resultArray[$key][$sexValue] = $sexQuery[0]['cnt'];
                }
            }
            return array(
                'status' => '1',
                'result' => $resultArray,
                'totalCnt' => $totalCnt,
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

    public static function show_senior_cnt()
    {
        try {
            $db = \Config\Database::connect();
            $query = $db->table('senior')
                ->select('count(*) as cnt')
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
    public static function show_culture_cnt()
    {
        try {
            $db = \Config\Database::connect();
            $query = $db->table('culture')
                ->select('count(*) as cnt')
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
    public static function show_all_data_cnt_by_city()
    {
        try {
            $db = \Config\Database::connect();
            $cultureQuery = $db->table('culture')
                ->select('count(*) as cnt,city.city_id,city.city_name_CN')
                ->join('city', 'city.city_id=culture.city_id')
                ->groupBy('city.city_id')
                ->get()
                ->getResultArray();
            $seniorQuery = $db->table('senior')
                ->select('count(*) as cnt,city.city_id')
                ->join('city', 'city.city_id=senior.city_id')
                ->groupBy('city.city_id')
                ->get()
                ->getResultArray();
            $checkArray = array_fill(0, 22, 0);
            $resultArray = [];
            foreach ($cultureQuery as $cultureValue) {
                $resultArray['city'][$cultureValue['city_id'] - 1] = $cultureValue['city_name_CN'];
                $resultArray['culture'][$cultureValue['city_id'] - 1] = $cultureValue['cnt'];
            }
            foreach ($seniorQuery as $seniorValue) {
                $checkArray[$seniorValue['city_id'] - 1] = 1;
                $resultArray['senior'][$seniorValue['city_id'] - 1] = $seniorValue['cnt'];
            }
            foreach ($checkArray as $key => $checkValue) {
                if ($checkValue == 0)
                    $resultArray['senior'][$key] = "0";
            }
            $resultArray['senior'] = (array) $resultArray['senior'];
            return array(
                'status' => '1',
                'result' => $resultArray,
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
    public static function show_save_article_radio()
    {
        try {
            $db = \Config\Database::connect();
            $seniorQuery = $db->table('save_senior')
                ->select('count(*) as cnt')
                ->get()
                ->getResultArray();
            $cultureQuery = $db->table('save_culture')
                ->select('count(*) as cnt')
                ->get()
                ->getResultArray();
            return array(
                'status' => '1',
                'result' => array(
                    'seniorSaveCnt' => $seniorQuery[0]['cnt'],
                    'cultureSaveCnt' => $cultureQuery[0]['cnt']
                ),
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
     public static function changeMemberPermission($data) //傳入delete_id
    {
        try{
            $db = \Config\Database::connect();
            $checkQuery = $db->table('member')
                ->select('sha1(m_id) as m_id')
                ->where('sha1(m_id)', $data['m_id'])
                ->get()
                ->getResultArray();
            if (count($checkQuery) > 0) {
                $result = $db->table('member')->set(['m_permission' => $data['permission']])->where('sha1(`m_id`)',  $data['m_id'])->update();
                return array(
                    'status' => '1',
                    'result' => $result,
                    'status_code' => 200
                );
            } else {
                return false;
            }
        }catch (\Exception $e) {
            return array(
                'status' => '0',
                'error' => 'Caught exception: ' . $e->getMessage() . '\n',
                'status_code' => 400
            );
        }
    }
    public static function showMemberInfo($data)
    {
        try{
            $db = \Config\Database::connect();

            $accountQuery = $db->table('member')
                ->select('sha1(m_id) as m_id,m_name,m_account,m_phone,m_sex,m_birthday')
                ->where('sha1(m_id)', $data['m_id'])
                ->get()
                ->getResultArray();
                return array(
                    'status' => '1',
                    'result' => $accountQuery,
                    'status_code' => 200
                );
        }catch (\Exception $e) {
            return array(
                'status' => '0',
                'error' => 'Caught exception: ' . $e->getMessage() . '\n',
                'status_code' => 400
            );
        }
    }
    public static function updateMemberInfo($data)
    {
        try{
            $db = \Config\Database::connect();
            $checkQuery = $db->table('member')
                ->select('sha1(m_id) as m_id')
                ->where('sha1(m_id)', $data['m_id'])
                ->get()
                ->getResultArray();

            if (count($checkQuery) > 0) {
                $result = $db->table('member')
                    ->set(['m_name' => $data['m_name'], 'm_account' => $data['m_account'], 'm_phone' => $data['m_phone'], 'm_birthday' => $data['m_birthday'], 'm_sex' => $data['m_sex']])
                    ->where('sha1(`m_id`)',  $data['m_id'])->update();
                // return $result;
                return array(
                    'status' => '1',
                    'result' => $result,
                    'status_code' => 200
                );
            } else {
                return false;
                return array(
                    'status' => '0',
                    'error' => 'no account',
                    'status_code' => 400
                );
            }
        }catch (\Exception $e) {
            return array(
                'status' => '0',
                'error' => 'Caught exception: ' . $e->getMessage() . '\n',
                'status_code' => 400
            );
        }
    }
}