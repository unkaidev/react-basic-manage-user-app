import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import _ from "lodash";


const TableUsers = (props) => {

    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});




    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
    }

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    }

    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item => item.id === user.id);
        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers);
    }

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(user);
        setDataUserDelete(user);
    }


    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);

        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
        setListUsers(cloneListUsers);
    }




    useEffect(() => {
        // call apis
        // dry
        getUsers(1);

    }, [])

    const getUsers = async (page) => {

        let res = await fetchAllUser(page);
        if (res && res.data) {
            console.log(res)
            setTotalUsers(res.total)
            setListUsers(res.data)
            setTotalPages(res.total_pages)
        }
    }

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    }

    return (<>
        <div className="my-3 add-new">
            <span> <b>List Users: </b></span>
            <button className='btn btn-success'
                onClick={() => setIsShowModalAddNew(true)}
            > Add new user </button>
        </div>

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Actions</th>

                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length > 0 &&
                    listUsers.map((item, index) => {
                        return (
                            <tr key={`user-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.email}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>
                                    <button
                                        className='btn btn-warning mx-3'
                                        onClick={() => handleEditUser(item)}
                                    >Edit</button>
                                    <button
                                        onClick={() => handleDeleteUser(item)}
                                        className='btn btn-danger'>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }


            </tbody>
        </Table>
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
        />

        <ModalAddNew
            show={isShowModalAddNew}
            handleClose={handleClose}
            handleUpdateTable={handleUpdateTable}
        />

        <ModalEditUser
            show={isShowModalEdit}
            handleClose={handleClose}
            dataUserEdit={dataUserEdit}
            handleEditUserFromModal={handleEditUserFromModal}

        />

        <ModalConfirm
            show={isShowModalDelete}
            handleClose={handleClose}
            dataUserDelete={dataUserDelete}
            handleDeleteUserFromModal={handleDeleteUserFromModal}

        />
    </>)
}

export default TableUsers;