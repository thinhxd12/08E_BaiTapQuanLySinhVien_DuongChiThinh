import React, { Component } from 'react'
import { connect } from 'react-redux';

class FormDangKy extends Component {
    state = {
        values: {
            ma: '',
            soDienThoai: '',
            hoTen: '',
            email: '',

        },
        errors: {
            ma: '',
            soDienThoai: '',
            hoTen: '',
            email: '',
        },
    }

    handleChangeInput = (event) => {
        let { name, value } = event.target;
        let newValues = { ...this.state.values }
        newValues[name] = value;
        const arrInputName = {
            ma: 'Mã',
            soDienThoai: 'Số điện thoại',
            hoTen: 'Họ tên',
            email: 'Email',
        }
        let messageError = '';

        if (name === 'email') {
            const regex = (/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!regex.test(value)) {
                messageError = 'Email phải đúng định dạng!';
            }
        }

        if (name === 'soDienThoai') {
            const reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4,5})$/;
            if (!reg.test(value)) {
                messageError = 'Số điện thoại phải đúng định dạng!';
            }
        }

        if (name === 'hoTen') {
            const reg = (/\b\S*[AĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴA-Z]+\S*\b/);
            if (!reg.test(value)) {
                messageError = 'Tên phải là chữ!';
            }
        }


        if (value.trim() === '') {
            messageError = arrInputName[name] + ' không được bỏ trống !';
        }


        let newErrors = { ...this.state.errors }
        newErrors[name] = messageError;

        this.setState({
            values: newValues,
            errors: newErrors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let valid = true;
        for (let key in this.state.errors) {
            if (this.state.errors[key] !== '') {
                valid = false;
                break;
            }
        }
        for (let key in this.state.values) {
            if (this.state.values[key] === '') {
                valid = false;
                break;
            }
        }
        if (!valid) {
            alert('Dữ liệu không hợp lệ !')
            return;
        }
        this.props.dispatch({
            type: 'THEM_SINH_VIEN',
            sinhVien: this.state.values
        })
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({
            values: newProps.sinhVienChinhSua
        })
    }

    render() {
        let { ma, soDienThoai, hoTen, email } = this.state.values;
        return (
            <form className="card mt-3" onSubmit={this.handleSubmit}>
                <h4 className="card-header bg-dark text-white">Thông tin sinh viên</h4>
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <p>Mã sinh viên</p>
                                <input value={ma} disabled={this.props.disabledMaSV} className="form-control" name="ma" type="number" onChange={this.handleChangeInput} />
                                <p className="text-danger">{this.state.errors.ma}</p>
                            </div>
                            <div className="form-group">
                                <p>Số điện thoại</p>
                                <input value={soDienThoai} className="form-control" name="soDienThoai" onChange={this.handleChangeInput} />
                                <p className="text-danger">{this.state.errors.soDienThoai}</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <p>Họ tên</p>
                                <input value={hoTen} className="form-control" name="hoTen" onChange={this.handleChangeInput} />
                                <p className="text-danger">{this.state.errors.hoTen}</p>
                            </div>
                            <div className="form-group">
                                <p>Email</p>
                                <input value={email} className="form-control" name="email" onChange={this.handleChangeInput} />
                                <p className="text-danger">{this.state.errors.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer text-left">
                    <button className="btn btn-success mr-2" type="submit">Thêm sinh viên</button>
                    <button className="btn btn-primary" type="button" onClick={() => {
                        this.props.dispatch({
                            type: 'CAP_NHAT_SINH_VIEN',
                            sinhVienCapNhat: this.state.values
                        })
                    }}>Cập nhật</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mangSinhVien: state.baiTapQuanLySinhVienReducer.mangSinhVien,
        sinhVienChinhSua: state.baiTapQuanLySinhVienReducer.sinhVienChinhSua,
        disabledMaSV: state.baiTapQuanLySinhVienReducer.disabledMaSV
    }
}
export default connect(mapStateToProps)(FormDangKy);