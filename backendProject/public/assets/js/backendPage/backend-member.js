function loadAllFunction(){
  $(document).ready(function () {
    // readMemberTable();
    deleteModal();
    recoverModal();
    editModal();
  });
}
loadAllFunction();
function readMemberTable() {
  $("#memberTable").empty();
  let str = '';
  $.ajax({
    type: 'POST',
    url: base_url + '/member/showAllMember',
    async: false,
  })
    .done(e => {
      e = JSON.parse(e);
      var memberTable = document.querySelector('#memberTable');

      let deleteMember = `<a  class="btn btn-danger btn-circle deleteBtn">
                        <i class="fas fa-times"></i>
                        </a>
                        </td>
                        </tr>`;
      let recoveryMember = `<a class="btn btn-warning btn-circle recoverBtn">
                          <i class="fas fa-retweet"></i>
                          </a>
                          </td>
                          </tr>`;

      e.forEach(function (item, i) {
        str += `<tr id="${item['m_id']}">
                  <td>${item['m_permission'] == 0 ? '會員' : item['m_permission'] == 1 ? '管理員' : '已停權'
          }</td>
                  <td>${item['m_name']}</td>
                  <td>${item['m_account']}</td>
                  <td>${item['m_phone']}</td>
                  <td>${item['m_email']}</td>
                  <td>${item['m_sex'] == 1 ? '女性' : '男性'}</td>

                  <td>
                      <a  class="btn btn-info btn-circle infoBtn">
                          <i class="fas fa-info-circle"></i>
                      </a>
                      <a class="btn btn-success btn-circle editBtn">
                          <i class="fas fa-pen"></i>
                      </a>
                      `;
        if (item['m_permission'] == 2) {
          str += recoveryMember;
        } else {
          str += deleteMember;
        }
      });
      memberTable.insertAdjacentHTML('beforeend', str);
    })
    .fail(e => {
      console.log(e);
    });
}

function deleteModal() {
  let delete_id = '';
  $(".deleteBtn").on("click", function (event) {
    delete_id = $(this).parents("tr").attr("id");
    $('#deleteModal').modal('show');
  });
  $(".deleteCancel").on("click", function (event) {
    $('#deleteModal').modal('hide');
  });
  $(".deleteSubmit").on("click", function (event) {
    $.ajax({
      url: base_url + '/member/changeMemberPermission',
      type: "POST",
      data: {
        'm_id':delete_id,
        'permission':2
      }
    }).done(e => {
            $('#deleteModal').modal('hide');
            loadAllFunction();
    })
      .fail(e => {
        console.log(e);
      });
  });
}
function recoverModal() {
  let recover_id = '';
  $(".recoverBtn").on("click", function (event) {
    recover_id = $(this).parents("tr").attr("id");
    $('#recoverModal').modal('show');
    console.log('test');
  });

  $(".recoverCancel").on("click", function (event) {
    $('#recoverModal').modal('hide');
  });

  $("#recoverSubmit").on("click", function (event) {
    $.ajax({
      url: base_url + '/member/changeMemberPermission',
      type: "POST",
      data: {
        'm_id':recover_id,
        'permission':0
      }
    }).done(e => {
            $('#recoverModal').modal('hide');
            loadAllFunction();

    })
      .fail(e => {
        console.log(e);
      });
  });
}

let edit_id = '';

function editModal() {

  $(".editBtn").on("click", function (event) {
    edit_id = '';
    edit_id = $(this).parents("tr").attr("id");
    $('#editModal').modal('show');
    $.ajax({
      url: base_url + '/member/showMemberInfo',
      type: "POST",
      data: {
        'm_id':edit_id,
      }
    }).done(e => {

            e = JSON.parse(e);
            let data=e['data'][0]
            document.querySelector("#edit-name").value = data['m_name'];
            document.querySelector("#edit-account").value = data['m_account'];
            document.querySelector("#edit-phone").value = data['m_phone'];
            document.querySelector("#edit-email").value = data['m_email'];
            document.querySelector("#edit-birthday").value = data['m_birthday'];
            if(data['m_sex']==0){
              document.querySelector("#edit-radioMale").checked  = true;
            }else if(data['m_sex']==1){
              document.querySelector("#edit-radioFemale").checked  = true;
            }
    })
      .fail(e => {
        console.log(e);
      });
  });


  $(".editCancel").on("click", function (event) {
    $('#editModal').modal('hide');
  });


  $(".editSubmit").on("click", function (event) {
      let edit_name = document.querySelector("#edit-name").value;
      let edit_account = document.querySelector("#edit-account").value;
      let edit_phone = document.querySelector("#edit-phone").value;
      let edit_email = document.querySelector("#edit-email").value;
      let edit_birthday = document.querySelector("#edit-birthday").value;
      let edit_sex = document.querySelector("#edit-radioFemale").checked;
      if(edit_sex==true){
        edit_sex=1;
      }else{
        edit_sex=0;
      }
    $.ajax({
      url: base_url + '/member/updateMemberInfo',
      type: "POST",
      data: {
        'm_id':edit_id,
        'm_name':edit_name,
        'm_account':edit_account,
        'm_phone':edit_phone,
        'm_email':edit_email,
        'm_birthday':edit_birthday,
        'm_sex':edit_sex
      }
    }).done(e => {
            $('#editModal').modal('hide');
            loadAllFunction();
    })
      .fail(e => {
        console.log(e);
        loadAllFunction();
      });
  });
}
