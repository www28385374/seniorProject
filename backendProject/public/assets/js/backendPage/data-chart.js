addSidebarClass();
articleRadioPieFn();
allDataBarChartFn();
saveArticleRadioPieFn();

function addSidebarClass() {
    $("#sidebar-data-li")[0].classList.add("active");
    $("#sidebar-data-drop-li")[0].classList.add("active");
}

function articleRadioPieFn() {
    let ctx = $("#articleRadioPie")[0].getContext('2d');
    $.ajax({
        type: "post",
        url: "../backend/show_all_data_cnt",
        data: "data",
        async: false,
        success: function (response) {
            let myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    datasets: [{
                        data: [
                            response['cultureCnt'],
                            response['seniorCnt'],
                        ],
                        backgroundColor: [
                            '#FE938C',
                            '#4281A4',
                        ],
                        label: ''
                    }],
                    labels: [
                        '文化部資料',
                        '樂齡中心資料'
                    ],
                },
                options: {
                    responsive: true,
                    legend: {
                        position: 'bottom',
                    },
                }
            });

        },
        error: function (e) {
            console.log(e);
        }
    });

}
function saveArticleRadioPieFn() {
    let ctx = $("#saveArticleRadioPie")[0].getContext('2d');
    $.ajax({
        type: "post",
        url: "../backend/show_save_article_radio",
        data: "data",
        async: false,
        success: function (response) {
            let myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    datasets: [{
                        data: [
                            response['result']['cultureSaveCnt'],
                            response['result']['seniorSaveCnt']
                        ],
                        backgroundColor: [
                            '#FE938C',
                            '#4281A4',
                        ],
                        label: ''
                    }],
                    labels: [
                        '以收藏文化部資料',
                        '以收藏樂齡中心資料'
                    ],
                },
                options: {
                    responsive: true,
                    legend: {
                        position: 'bottom',
                    },
                }
            });

        },
        error: function (e) {
            console.log(e);
        }
    });

}

function allDataBarChartFn() {
    var allDataBarChart = $("#allDataBarChart")[0].getContext('2d');

    $.ajax({
        type: "post",
        url: "../backend/show_all_data_cnt_by_city",
        data: "data",
        success: function (response) {
            var myChart = new Chart(allDataBarChart, {
                type: 'bar',
                data: {
                    labels: response['result']['city'],
                    datasets: [{
                        label: '文化部',
                        data: response['result']['culture'],
                        borderWidth: 2,
                        backgroundColor: 'rgba(254,86,83,.7)',
                        borderColor: 'rgba(254,86,83,.7)',
                        borderWidth: 2.5,
                        pointBackgroundColor: '#ffffff',
                        pointRadius: 4
                    }, {
                        label: '樂齡中心',
                        data: Object.values(response['result']['senior']),
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
                                stepSize: 500
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