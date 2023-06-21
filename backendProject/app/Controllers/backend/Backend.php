<?php

namespace App\Controllers\Backend;

use App\Models\BackendModel;
use App\Controllers\BaseController;

class Backend extends BaseController
{
    /**
     * Show sex ratio.
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_sex_ratio()
    {
        $result = BackendModel::show_sex_ratio();
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Show all member.
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_all_member()
    {
        $result = BackendModel::show_all_member();
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Show age ratio.
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_age_ratio()
    {
        $result = BackendModel::show_age_ratio();
        if ($result['status'] == 1) {
            $result = $result['result'];
            $minor = 0;
            $adult = 0;
            $elder = 0;
            $currentDate = date("d-m-Y");

            foreach ($result as $e) {
                $now_birthday = $e['m_birthday'];
                $age = date_diff(date_create($now_birthday), date_create($currentDate));
                $age = $age->format("%y");
                if ($age > 65)
                    $elder += 1;
                else if ($age <= 18)
                    $minor += 1;
                else
                    $adult += 1;
            }
            return $this->response->setStatusCode(200)->setJSON([
                'minor' => $minor,
                'adult' => $adult,
                'elder' => $elder,
            ]);
        } else {
            return $this->response->setStatusCode($result['status_code'])->setJSON($result);
        }
    }
    /**
     * Show age ratio by show_age_ratio_decimal (0~20,20~30,...,70~80).
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_age_ratio_decimal()
    {
        $result = BackendModel::show_age_ratio();
        if ($result['status'] == 1) {

            $ageRadio = [0, 0, 0, 0, 0, 0, 0];
            $currentDate = date("d-m-Y");

            foreach ($result['result'] as $e) {
                $now_birthday = $e['m_birthday'];
                $age = date_diff(date_create($now_birthday), date_create($currentDate));
                $age = $age->format("%y");
                switch ($age) {
                    case (0 <= $age && $age < 20):
                        $ageRadio[0] += 1;
                        break;
                    case (20 <= $age && $age < 30):
                        $ageRadio[1] += 1;
                        break;
                    case (30 <= $age && $age < 40):
                        $ageRadio[2] += 1;
                        break;
                    case (40 <= $age && $age < 50):
                        $ageRadio[3] += 1;
                        break;
                    case (50 <= $age && $age < 60):
                        $ageRadio[4] += 1;
                        break;
                    case (60 <= $age && $age < 70):
                        $ageRadio[5] += 1;
                        break;
                    case (70 <= $age):
                        $ageRadio[6] += 1;
                        break;
                }
            }
            $result['result'] = $ageRadio;
            return $this->response->setStatusCode($result['status_code'])->setJSON($result);
        } else {
            return $this->response->setStatusCode($result['status_code'])->setJSON($result);
        }
    }
    /**
     * Show age ratio  (0~20,20~30,...,70~80) by sex.
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_sex_age_ratio()
    {
        $result = BackendModel::show_age_ratio();

        if ($result['status'] == 1) {
            $femaleAgeRadio = [0, 0, 0, 0, 0, 0, 0];
            $manAgeRadio = [0, 0, 0, 0, 0, 0, 0];
            $currentDate = date("d-m-Y");

            foreach ($result['result'] as $e) {
                $now_birthday = $e['m_birthday'];
                $age = date_diff(date_create($now_birthday), date_create($currentDate));
                $age = $age->format("%y");
                switch ($age) {
                    case (0 <= $age && $age < 20):
                        $val = 0;
                        break;
                    case (20 <= $age && $age < 30):
                        $val = 1;
                        break;
                    case (30 <= $age && $age < 40):
                        $val = 2;
                        break;
                    case (40 <= $age && $age < 50):
                        $val = 3;
                        break;
                    case (50 <= $age && $age < 60):
                        $val = 4;
                        break;
                    case (60 <= $age && $age < 70):
                        $val = 5;
                        break;
                    case (70 <= $age):
                        $val = 6;
                        break;
                }
                $e['m_sex'] == "F" ?  $femaleAgeRadio[$val] += 1 : $manAgeRadio[$val] += 1;
            }
            $result['result'] = array(['femaleAgeRadio' => $femaleAgeRadio, 'manAgeRadio' => $manAgeRadio]);
            return $this->response->setStatusCode($result['status_code'])->setJSON($result);
        } else {
            return $this->response->setStatusCode($result['status_code'])->setJSON($result);
        }
    }
    /**
     * Show subscribe Top5 .
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'totalCnt'    => (int) total subscribe count.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_subcribe_top5()
    {
        $result = BackendModel::show_subcribe_top5();
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Show all senior data count .
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_senior_cnt()
    {
        $result = BackendModel::show_senior_cnt();
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Show all culture data count .
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_culture_cnt()
    {
        $result = BackendModel::show_culture_cnt();
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Show all culture data count .
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_all_data_cnt()
    {
        $cultureCnt = BackendModel::show_culture_cnt();
        $seniorCnt = BackendModel::show_senior_cnt();
        if ($cultureCnt['status'] == 1 && $seniorCnt['status'] == 1) {
            return $this->response
                ->setStatusCode($cultureCnt['status_code'])
                ->setJSON([
                    'cultureCnt' => $cultureCnt['result'][0]['cnt'],
                    'seniorCnt' => $seniorCnt['result'][0]['cnt'],
                ]);
        } else {
            return $this->response->setStatusCode($cultureCnt['status_code'])->setJSON($cultureCnt);
        }
    }
    /**
     * Show all data count by city.
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_all_data_cnt_by_city()
    {
        $result = BackendModel::show_all_data_cnt_by_city();
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * Show all data count by city.
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function show_save_article_radio()
    {
        $result = BackendModel::show_save_article_radio();
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * changeMemberPermission .
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function changeMemberPermission()
    {
        $post = $this->request->getRawInput();
        $result = BackendModel::changeMemberPermission($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);
    }
    /**
     * showMemberInfo .
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function showMemberInfo() //show 個人 member info
    {
        $post = $this->request->getRawInput();

        $result = BackendModel::showMemberInfo($post);
        return $this->response->setStatusCode($result['status_code'])->setJSON($result);

    }
     /**
     * showMemberInfo .
     *
     * @return   array   $result   Array containing the status.
     *    $result = [
     *      'status'     => (string) 1 or 0 ,means success or defeat.
     *      'result|error'=> The query result or error Msg.
     *      'status_code' => (int) status_code.
     *    ]
     */
    public function updateMemberInfo()//backend
    {
        $post = $this->request->getRawInput();
        $result = BackendModel::updateMemberInfo($post);
        // return json_encode($result);

        return $this->response->setStatusCode($result['status_code'])->setJSON($result);

    }
}
