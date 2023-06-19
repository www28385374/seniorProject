<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;
use CodeIgniter\Validation\CreditCardRules;
use CodeIgniter\Validation\FileRules;
use CodeIgniter\Validation\FormatRules;
use CodeIgniter\Validation\Rules;

class Validation extends BaseConfig
{
    //--------------------------------------------------------------------
    // Setup
    //--------------------------------------------------------------------

    /**
     * Stores the classes that contain the
     * rules that are available.
     *
     * @var string[]
     */
    public $ruleSets = [
        Rules::class,
        FormatRules::class,
        FileRules::class,
        CreditCardRules::class,
    ];

    /**
     * Specifies the views that are used to display the
     * errors.
     *
     * @var array<string, string>
     */
    public $templates = [
        'list'   => 'CodeIgniter\Validation\Views\list',
        'single' => 'CodeIgniter\Validation\Views\single',
    ];

    //--------------------------------------------------------------------
    // Rules
    //--------------------------------------------------------------------

    public $createMemberVali = [
        "m_name"    => 'required',
		'm_account' => 'required|min_length[6]|is_unique[member.m_account]',
		'm_password'=> 'required|min_length[6]',
		'm_phone'   => 'required|is_unique[member.m_phone]',
		'm_birthday'=> 'required|valid_date',
		'm_sex'     => 'required|in_list[F,M]',
    ];

    public $createCalendarVali = [
        'c_title'       => 'required|min_length[2]',
        'c_content'     => 'required|max_length[30]',
        'c_start_date'  => 'required|valid_date',
        'c_end_date'    => 'required|valid_date',
        'c_unit'        => 'required|in_list[C,S]',
        'm_id'          => 'required',
        'city_id'       => 'required',
    ];
}
