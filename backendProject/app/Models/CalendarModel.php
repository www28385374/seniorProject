<?php

namespace App\Models;

use CodeIgniter\Model;

class CalendarModel extends BaseModel
{
    public static function create_calendar($data)
    {
        try {
            $db = \Config\Database::connect();
            $query = $db->table('calendar')->insert($data);
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
    public static function show_all_calendar($data)
    {
        try {
            $db = \Config\Database::connect();
            $query = $db->table('calendar')
                ->select('*')
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
    public static function delete_calendar($data)
    {
        try {
            $db = \Config\Database::connect();
            $check_query = $db->table('calendar')
                ->selectCount('c_id')
                ->where('c_id', $data['c_id'])
                ->get()
                ->getResultArray();
            if ($check_query[0]['c_id'] > 0) {
                $query = $db->table('calendar')
                    ->where('c_id', $data['c_id'])
                    ->delete();
                return array(
                    'status' => '1',
                    'result' => $query,
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
    public static function edit_calendar($data)
    {
        try {
            $db = \Config\Database::connect();
            $builder = $db->table('calendar');
            $check_query = $builder->selectCount('c_id')
                ->where('c_id', $data['c_id'])
                ->get()
                ->getResultArray();
            if ($check_query[0]['c_id'] > 0) {
                $query = $builder
                    ->where('c_id', $data['c_id'])
                    ->update($data);
                return array(
                    'status' => '1',
                    'result' => $query,
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
    public static function show_single_calendar($data)
    {
        try {
            $db = \Config\Database::connect();
            $check_query = $db->table('calendar')
                ->selectCount('c_id')
                ->where('c_id', $data['c_id'])
                ->get()
                ->getResultArray();
            if ($check_query[0]['c_id'] > 0) {
                $query = $db->table('calendar')
                    ->select('*')
                    ->where('c_id', $data['c_id'])
                    ->get()
                    ->getResultArray();
                return array(
                    'status' => '1',
                    'result' => $query,
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
