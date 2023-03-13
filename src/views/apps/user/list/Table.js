import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  Card,
  CardBody,
  Col,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

export const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [usersPerPage] = useState(10)
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/users')
      .then(response => {
        setUsers(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const indexOfLastUser = (currentPage + 1) * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = Array.isArray(users) ? users.slice(indexOfFirstUser, indexOfLastUser) : []
  const totalPages = Math.ceil(users.length / usersPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <Col md="12">
      <Card className="main-card mb-3">
        <CardBody>
          <Table hover striped responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    {user.name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link
                      to={`/user/edit/${user._id}`}
                      className="btn btn-success btn-sm"
                    >
                      <i className="fa fa-edit"></i>
                    </Link>{' '}
                    <Link
                      to={`/user/delete/${user._id}`}
                      className="btn btn-danger btn-sm"
                    >
                      <i className="fa fa-trash"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination className="pagination justify-content-end mb-0">
            {users.length > 0 && (
              <PaginationItem>
                <PaginationLink
                  disabled={currentPage <= 0}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  previous
                  tag="button"
                />
              </PaginationItem>
            )}
            {[...Array(totalPages)].map((page, i) => (
              <PaginationItem active={i === currentPage} key={i}>
                <PaginationLink
                  onClick={() => paginate(i)}
                  tag="button"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {users.length > 0 && (
              <PaginationItem>
                <PaginationLink
                  disabled={currentPage >= totalPages - 1}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  next
                  tag="button"
                />
              </PaginationItem>
            )}
          </Pagination>
        </CardBody>
      </Card>
    </Col>
  )
}

export default UsersList
 