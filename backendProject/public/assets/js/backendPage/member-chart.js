addSidebarClass();
ageRadioBarFn();
sexRadioPieFn();
ageRadioPieFn();
sexAndAgeFn();

function addSidebarClass() {
    $("#sidebar-member-data-li")[0].classList.add("active");
    $("#sidebar-data-drop-li")[0].classList.add("active");
}

function ageRadioBarFn() {
    var ageRadioArray = [];
    $.ajax({
        type: "post",
        url: "../backend/show_age_ratio_decimal",
        data: "data",
        async: false,
        success: function (response) {
            ageRadioArray = response['result'];
        },
        error: function (e) {
            console.log(e);
        }
    });

    var ageRadioBarChartID = $("#ageRadioBarChart")[0].getContext('2d');
    var ageRadioBarChart = new Chart(ageRadioBarChartID, {
        type: 'bar',
        data: {
            labels: ["0~20歲", "20~30歲", "30~40歲", "40~50歲", "50~60歲", "60~70歲", "70以上"],
            datasets: [{
                label: '數量',
                data: ageRadioArray,
                borderWidth: 2,
                backgroundColor: '#7D82B8',
                borderColor: '#7D82B8',
                borderWidth: 2.5,
                pointBackgroundColor: '#ffffff',
                pointRadius: 4
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    gridLines: {
                        drawBorder: false,
                        color: '#f2f2f2',
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 5
                    }
                }],
                xAxes: [{
                    ticks: {
                        display: true
                    },
                    gridLines: {
                        display: false
                    }
                }]
            },
        }
    });
}

function sexRadioPieFn() {
    var man_ratio = 0;
    var female_ratio = 0;
    let ctx = $("#sexRadioPie")[0].getContext('2d');
    $.ajax({
        type: "post",
        url: "../backend/show_sex_ratio",
        data: "data",
        async: false,
        success: function (response) {
            man_ratio = response['result']['man_ratio'];
            female_ratio = response['result']['female_ratio'];
        },
        error: function (e) {
            console.log(e);
        }
    });
    let myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [
                    man_ratio,
                    female_ratio,
                ],
                backgroundColor: [
                    '#FE938C',
                    '#4281A4',
                ],
                label: ''
            }],
            labels: [
                '女性',
                '男性'
            ],
        },
        options: {
            responsive: true,
            legend: {
                position: 'bottom',
            },
        }
    });
}

function ageRadioPieFn() {
    let ctx = $("#ageRadioPie")[0].getContext('2d');
    var minor = 0;
    var adult = 0;
    var elder = 0;
    $.ajax({
        type: "post",
        url: "../backend/show_age_ratio",
        data: "data",
        async: false,
        success: function (response) {
            minor = response['minor'];
            adult = response['adult'];
            elder = response['elder'];
        },
        error: function (e) {
            console.log(e);
        }
    });
    let myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [
                    minor,
                    adult,
                    elder,
                ],
                backgroundColor: [
                    '#EF798A',
                    '#F7A9A8',
                    '#7D82B8',
                ],
                label: 'Dataset 1'
            }],
            labels: [
                '18歲(含)以下',
                '19~65歲',
                '65歲以上'
            ],
        },
        options: {
            responsive: true,
            legend: {
                position: 'bottom',
            },
        }
    });
}

function sexAndAgeFn() {
    var sexAndAgeChart = $("#sexAndAgeChart")[0].getContext('2d');

    $.ajax({
        type: "post",
        url: "../backend/show_sex_age_ratio",
        data: "data",
        success: function (response) {
            var femaleAgeChart = response['result'][0]['femaleAgeRadio'];
            var manAgeChart = response['result'][0]['manAgeRadio'];

            var myChart = new Chart(sexAndAgeChart, {
                type: 'bar',
                data: {
                    labels: ["0~20歲", "20~30歲", "30~40歲", "40~50歲", "50~60歲", "60~70歲", "70歲以上"],
                    datasets: [{
                        label: '女性',
                        data: femaleAgeChart,
                        borderWidth: 2,
                        backgroundColor: 'rgba(254,86,83,.7)',
                        borderColor: 'rgba(254,86,83,.7)',
                        borderWidth: 2.5,
                        pointBackgroundColor: '#ffffff',
                        pointRadius: 4
                    }, {
                        label: '男性',
                        data: manAgeChart,
                        borderWidth: 2,
                        backgroundColor: 'rgba(125,130,184,.8)',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        pointBackgroundColor: '#999',
                        pointRadius: 4
                    }]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            gridLines: {
                                drawBorder: false,
                                color: '#f2f2f2',
                            },
                            ticks: {
                                beginAtZero: true,
                                stepSize: 5
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                }
            });
        },
        error: function (e) {
            console.log(e);
        }
    });


}