import React, { useState } from 'react' 
import { Link } from 'react-router-dom'
import {
  Card,
  CardBody,
  Col,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

export const UsersList = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [usersPerPage] = useState(10)

  const indexOfLastUser = (currentPage + 1) * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = Array.isArray(users) ? users.slice(indexOfFirstUser, indexOfLastUser) : []

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
                    <Link to={`/user/${user._id}`}>{user.name}</Link>
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
          <Pagination aria-label="Page navigation example">
            <PaginationItem disabled={currentPage <= 0}>
              <PaginationLink
                onClick={() => setCurrentPage(currentPage - 1)}
                previous
                tag="button"
              />
            </PaginationItem>
            {[...Array(Math.ceil(users.length / usersPerPage))].map((page, i) => (
              <PaginationItem active={i === currentPage} key={i}>
                <PaginationLink onClick={() => paginate(i)} tag="button">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem disabled={currentPage >= Math.ceil(users.length / usersPerPage) - 1}>
              <PaginationLink
                onClick={() => setCurrentPage(currentPage + 1)}
                next
                tag="button"
              />
            </PaginationItem>
          </Pagination>
        </CardBody>
      </Card>
    </Col>
  )
}

export default UsersList
