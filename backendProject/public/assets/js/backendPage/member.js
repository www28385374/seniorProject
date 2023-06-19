$(document).ready(function () {

  tableSet();
  getAllMember();
  addSidebarClass();
  deleteModal();
  recoverModal();
  editModal();
});


function tableSet(){
$("[data-checkboxes]").each(function () {
    var me = $(this),
      group = me.data('checkboxes'),
      role = me.data('checkbox-role');
  
    me.change(function () {
      var all = $('[data-checkboxes="' + group + '"]:not([data-checkbox-role="dad"])'),
        checked = $('[data-checkboxes="' + group + '"]:not([data-checkbox-role="dad"]):checked'),
        dad = $('[data-checkboxes="' + group + '"][data-checkbox-role="dad"]'),
        total = all.length,
        checked_length = checked.length;
  
      if (role == 'dad') {
        if (me.is(':checked')) {
          all.prop('checked', true);
        } else {
          all.prop('checked', false);
        }
      } else {
        if (checked_length >= total) {
          dad.prop('checked', true);
        } else {
          dad.prop('checked', false);
        }
      }
    });
  });
  
    $("#member-table").dataTable({
      "columnDefs": [{
        "sortable": false,
        "targets": [2,5]
      }]
    });
}

function addSidebarClass() {
    $("#sidebar-member-li")[0].classList.add("active");
}

function getAllMember() {
    $.ajax({
        type: "post",
        url: "../backend/show_all_member",
        data: "data",
        async: false,
        success: function (response) {
            var table = $('#member-table').DataTable();
            table.clear();
            let result = response['result'];

            result.forEach(function callback(currentValue, index) {
                if (currentValue['m_sex'] == 'F') {
                    var imgName = 'default-female';
                } else {
                    var imgName = 'default-man';
                }
                if (currentValue['m_permission'] == 0) {
                    var permissionArray=["停權狀態","danger","warning","Recovery","history","recoverBtn"]
                } else if (currentValue['m_permission'] == 1) {
                    var permissionArray=["會員","success","danger","Delete","ban","deleteBtn"]
                } else {
                    var permissionArray=["管理員","info","secondary","None","ellipsis-h"]
                }
                var permissionHTML = `<div id="${currentValue['m_id']}" class="badge badge-${permissionArray[1]}">${permissionArray[0]}</div>`;
                var permissionBtnHTML = `<a class="btn btn-${permissionArray[2]} btn-action ${permissionArray[5]}" data-toggle="tooltip"
                                        title="${permissionArray[3]}"><i class="fas fa-${permissionArray[4]}"></i></a>`;
                var infoBtnHTML=` <a class="btn btn-primary btn-action mr-1 editBtn" data-toggle="tooltip" title="Edit">
                                    <i class="fas fa-pencil-alt"></i></a>`;

                                    currentValue['m_birthday']=currentValue['m_birthday'].replaceAll('/','-');
                table.row.add([index + 1,
                    `<a href="#" class="font-weight-600"><img src="../assets/img/avatar/${imgName}.png" alt="avatar" width="30" class="rounded-circle mr-1">
                    ${currentValue['m_name']}</a>`,
                    currentValue['m_account'],
                    currentValue['m_birthday'],
                    permissionHTML,
                    infoBtnHTML+permissionBtnHTML
                ]).draw(false);
            });
            deleteModal();
                recoverModal();
                editModal();
        },
        error: function (e) {
            console.log(e);
            deleteModal();
                recoverModal();
                editModal();
        }
    });
}


function deleteModal() {
  let delete_id = '';
  $(".deleteBtn").on("click", function (event) {
    delete_id = $(this).parents("td").siblings();
    delete_id  = delete_id.children("div").attr('id')
    $('#deleteModal').modal('show');
  });
  $(".deleteCancel").on("click", function (event) {
    $('#deleteModal').modal('hide');
  });
  $(".deleteSubmit").on("click", function (event) {
    $.ajax({
      url:"../backend/changeMemberPermission",
      type: "POST",
      async:false,

      data: {
        'm_id':delete_id,
        'permission':0
      }
    }).done(e => {
            console.log(e);
            $('#deleteModal').modal('hide');
            getAllMember();
            // deleteModal();
    })
      .fail(e => {
        console.log(e);
      });
  });
}
function recoverModal() {
  let recover_id = '';
  $(".recoverBtn").on("click", function (event) {
    recover_id = $(this).parents("td").siblings();
    recover_id  = recover_id.children("div").attr('id')
    $('#recoverModal').modal('show');
  });

  $(".recoverCancel").on("click", function (event) {
    $('#recoverModal').modal('hide');
  });

  $("#recoverSubmit").on("click", function (event) {
    $.ajax({
      url:"../backend/changeMemberPermission",
      type: "POST",
      async:false,
      data: {
        'm_id':recover_id,
        'permission':1
      }
    }).done(e => {
            console.log(e);
            $('#recoverModal').modal('hide');
            getAllMember();
            // recoverModal() ;
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
    edit_id = $(this).parents("td").siblings();
    edit_id  = edit_id.children("div").attr('id')
    $('#editModal').modal('show');
    $.ajax({
      url:"../backend/showMemberInfo",
      type: "POST",
      data: {
        'm_id':edit_id,
      }
    }).done(e => {
            let data=e['result'][0]
            document.querySelector("#edit-name").value = data['m_name'];
            document.querySelector("#edit-account").value = data['m_account'];
            document.querySelector("#edit-phone").value = data['m_phone'];
            data['m_birthday']=data['m_birthday'].replaceAll('/','-');
            document.querySelector("#edit-birthday").value = data['m_birthday'];
            if(data['m_sex']=='M'){
              document.querySelector("#edit-radioMale").checked  = true;
            }else if(data['m_sex']=='F'){
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
      let edit_birthday = document.querySelector("#edit-birthday").value;
      let edit_sex = document.querySelector("#edit-radioFemale").checked;
      if(edit_sex==true){
        edit_sex='F';
      }else{
        edit_sex='M';
      }
    $.ajax({
      url: "../backend/updateMemberInfo",
      type: "POST",
      data: {
        'm_id':edit_id,
        'm_name':edit_name,
        'm_account':edit_account,
        'm_phone':edit_phone,
        'm_birthday':edit_birthday,
        'm_sex':edit_sex
      }
    }).done(e => {
            $('#editModal').modal('hide');
            getAllMember();
    })
      .fail(e => {
        console.log(e);
        getAllMember();
      });
  });
}
