"use strict";
addSidebarClass();
sexRadioPie();
ageRadioPie();
top5Chart();
showMemberCnt();
showSeniorCnt();
showCultureCnt();






function addSidebarClass() {
  $("#sidebar-index-li")[0].classList.add("active");
}

function showMemberCnt(){
  $.ajax({
    type: "post",
    url: "../backend/show_all_member",
    data: "data",
    async: false,
    success: function (response) {
      
      $("#memberCntCard")[0].insertAdjacentHTML('beforeend', response['result'].length);
    },
    error: function (e) {
      console.log(e);
    }
  });
}

function showSeniorCnt(){
  $.ajax({
    type: "post",
    url: "../backend/show_senior_cnt",
    data: "data",
    async: false,
    success: function (response) {
      console.log(response['result']);
      
      $("#seniorCntCard")[0].insertAdjacentHTML('beforeend', response['result'][0]['cnt']);
    },
    error: function (e) {
      console.log(e);
    }
  });
}
function showCultureCnt(){
  $.ajax({
    type: "post",
    url: "../backend/show_culture_cnt",
    data: "data",
    async: false,
    success: function (response) {
      $("#cultureCntCard")[0].insertAdjacentHTML('beforeend', response['result'][0]['cnt']);
    },
    error: function (e) {
      console.log(e);
    }
  });
}


function top5Chart(){
  $.ajax({
    type: "post",
    url: "../backend/show_subcribe_top5",
    data: "data",
    async: false,
    success: function (response) {
      let result=response['result'];
      let str="";
      result.forEach(value => {
        let mPercent=(value['M']/response['totalCnt'])*100;
        let fPercent=(value['F']/response['totalCnt'])*100;
        str+=`<li class="media"><div class="media-body"><div class="float-right">
        <div class="font-weight-600 text-muted text-small">${value['cnt']}人已訂閱</div></div>
          <div class="media-title">${value['city_name']}-${value['sub_unit']}</div>
          <div class="mt-1"><div class="budget-price">
              <div class="budget-price-square bg-primary" data-width="${mPercent}%"></div>
              <div class="budget-price-label">${value['M']}</div>
          </div><div class="budget-price">
              <div class="budget-price-square bg-danger" data-width="${fPercent}%"></div>
              <div class="budget-price-label">${value['F']}</div>
            </div>
          </div>
        </div>
      </li>`
      });
      $("#top5List")[0].insertAdjacentHTML('beforeend', str);
      
    },
    error: function (e) {
      console.log(e);
    }
  });
}

function sexRadioPie() {
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
          '#fc544b',
          '#6777ef',
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

function ageRadioPie() {
  let ctx = $("#ageRadioPie")[0].getContext('2d');
  var minor=0;
  var adult=0;
  var elder=0;
  $.ajax({
    type: "post",
    url: "../backend/show_age_ratio",
    data: "data",
    async: false,
    success: function (response) {
      minor = response['minor'];
      adult = response['adult'];
      elder = response['elder'];
      console.log(response)

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
          '#921AFF',
          '#63ed7a',
          '#ffa426',
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

