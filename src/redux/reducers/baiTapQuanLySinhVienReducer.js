
const stateDefault = {
    mangSinhVien: [
        {
            ma: '1',
            hoTen: 'Nguyễn Văn A',
            soDienThoai: '09090909',
            email: 'nguyenvana@gmail.com'
        },
        {
            ma: '2',
            hoTen: 'Nguyễn Văn B',
            soDienThoai: '09191919191',
            email: 'nguyenvanb@gmail.com'
        },
    ],
    sinhVienChinhSua: {
        ma: '',
        hoTen: '',
        soDienThoai: '',
        email: ''
    },
    disabledMaSV: false
}

export const baiTapQuanLySinhVienReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'THEM_SINH_VIEN': {
            let sinhVienUpdate = state.mangSinhVien.find(sv => sv.ma === action.sinhVien.ma)
            if (sinhVienUpdate) {
                alert('Mã sinh viên đã tồn tại!')
                return state
            }
            else {
                state.mangSinhVien = [...state.mangSinhVien, action.sinhVien]
                return { ...state }
            }
        }
        case 'XOA_SINH_VIEN': {
            state.mangSinhVien = state.mangSinhVien.filter(sv => sv.ma !== action.maXoa);
            return { ...state }
        }
        case 'CHINH_SUA': {
            state.disabledMaSV = true;
            state.sinhVienChinhSua = action.sinhVienChinhSua;
            return { ...state }
        }
        case 'CAP_NHAT_SINH_VIEN': {
            let mangSinhVienUpdate = [...state.mangSinhVien]
            let sinhVienUpdate = mangSinhVienUpdate.find(sv => sv.ma === action.sinhVienCapNhat.ma)
            if (sinhVienUpdate) {
                sinhVienUpdate.hoTen = action.sinhVienCapNhat.hoTen;
                sinhVienUpdate.soDienThoai = action.sinhVienCapNhat.soDienThoai;
                sinhVienUpdate.email = action.sinhVienCapNhat.email;
            }
            state.mangSinhVien = mangSinhVienUpdate;
            state.disabledMaSV = false;
            state.sinhVienChinhSua = {
                ma: '',
                hoTen: '',
                soDienThoai: '',
                email: ''
            }
            return { ...state }
        }
        default: return state
    }

}