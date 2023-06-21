<!-- deleteModal -->

<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">停權用戶</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    確定要停權此用戶？
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary deleteCancel" data-bs-dismiss="modal">取消</button>
                    <button type="button" id="deleteSubmit" name="deleteSubmit" class="btn btn-primary deleteSubmit">確定</button>
                </div>
            </div>
        </div>
    </div>

    <!-- recoverModal -->
    <div class="modal fade" id="recoverModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">恢復用戶</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    確定要恢復此用戶會員資格？
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary recoverCancel" data-bs-dismiss="modal">取消</button>
                    <button type="button" id="recoverSubmit" class="btn btn-primary recoverSubmit">確定</button>
                </div>
            </div>
        </div>
    </div>

    <!-- editModal -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">修改此會員資料</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form name="edit-form" id="edit-form">
                        <div class="form-group">
                            <label for="edit-name" class="col-form-label">姓名:</label>
                            <input type="text" class="form-control" id="edit-name">
                        </div>
                        <div class="form-group">
                            <label for="edit-account" class="col-form-label">帳號:</label>
                            <input type="text" class="form-control" id="edit-account">
                        </div>
                        <div class="form-group">
                            <label for="edit-phone" class="col-form-label">手機:</label>
                            <input type="tel" class="form-control" id="edit-phone">
                        </div>
                        <div class="form-group">
                            <label for="edit-birthday" class="col-form-label">生日:</label>
                            <input type="date" class="form-control" id="edit-birthday">
                        </div>

                        <div class="form-group">
                            <label class="col-form-label">性別:</label>
                        </div>

                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="radioSex" id="edit-radioFemale" />
                            <label class="form-check-label" for="edit-radioFemale">女性</label>
                        </div>

                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="radioSex" id="edit-radioMale" />
                            <label class="form-check-label" for="edit-radioMale">男性</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary editCancel" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary editSubmit">變更</button>
                </div>
            </div>
        </div>
    </div>

    <!-- infoModal -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">會員資料</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form name="edit-form" id="edit-form">
                        <div class="form-group">
                            <label for="edit-name" class="col-form-label">姓名:</label>
                            <input type="text" class="form-control" id="edit-name">
                        </div>
                        <div class="form-group">
                            <label for="edit-account" class="col-form-label">帳號:</label>
                            <input type="text" class="form-control" id="edit-account">
                        </div>
                        <div class="form-group">
                            <label for="edit-phone" class="col-form-label">手機:</label>
                            <input type="tel" class="form-control" id="edit-phone">
                        </div>
                        <div class="form-group">
                            <label for="edit-mail" class="col-form-label">Email:</label>
                            <input type="email" class="form-control" id="edit-email">
                        </div>
                        <div class="form-group">
                            <label for="edit-birthday" class="col-form-label">生日:</label>
                            <input type="date" class="form-control" id="edit-birthday">
                        </div>

                        <div class="form-group">
                            <label class="col-form-label">性別:</label>
                        </div>

                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="radioSex" id="edit-radioFemale" />
                            <label class="form-check-label" for="edit-radioFemale">女性</label>
                        </div>

                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="radioSex" id="edit-radioMale" />
                            <label class="form-check-label" for="edit-radioMale">男性</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary editCancel" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary editSubmit">變更</button>
                </div>
            </div>
        </div>
    </div>