import React, { Component } from 'react'
import { connect } from 'react-redux'

class TableDanhSachSinhVien extends Component {

    state = {
        maSearchInput: '',
        maSearch: ''
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({
            mangSinhVien: newProps.mangSinhVien
        })
    }

    handleSearch = (event) => {
        let { value } = event.target;
        this.setState({ maSearchInput: value })
        if (value === '') {
            this.setState({ maSearch: '' })
        }
    }

    renderTableSinhVien = () => {
        let { maSearchInput, maSearch } = this.state;
        let mangSinhVienFilter = this.props.mangSinhVien;
        if (maSearch) {
            mangSinhVienFilter = this.props.mangSinhVien.filter(sv => sv.ma === maSearchInput)
        }

        return mangSinhVienFilter.map((sinhVien, index) => {
            return <tr key={index}>
                <td>{sinhVien.ma}</td>
                <td>{sinhVien.hoTen}</td>
                <td>{sinhVien.soDienThoai}</td>
                <td>{sinhVien.email}</td>
                <td>
                    <button className="btn btn-danger mr-2" onClick={() => {
                        this.props.dispatch({
                            type: 'XOA_SINH_VIEN',
                            maXoa: sinhVien.ma
                        })
                    }}>Xoá</button>
                    <button className="btn btn-primary" onClick={() => {
                        this.props.dispatch({
                            type: 'CHINH_SUA',
                            sinhVienChinhSua: sinhVien
                        })
                    }}>Chỉnh sửa</button>
                </td>
            </tr>
        })
    }

    render() {
        return (
            <div className="card mt-3">
                <div className="form-inline bg-light py-2 pr-2 justify-content-end">
                    <input className="form-control mr-2" type="text" placeholder="Mã sinh viên cần tìm" onChange={this.handleSearch} />
                    <button className="btn btn-outline-success" type="button" onClick={() => {
                        this.setState({
                            maSearch: this.state.maSearchInput
                        })
                    }}>Tìm</button>
                </div>
                <h4 className="card-header bg-dark text-white">Danh sách người dùng</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã SV</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableSinhVien()}
                    </tbody>
                </table>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    mangSinhVien: state.baiTapQuanLySinhVienReducer.mangSinhVien
})
export default connect(mapStateToProps)(TableDanhSachSinhVien);