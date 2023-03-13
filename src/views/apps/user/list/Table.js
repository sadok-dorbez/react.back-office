import React, { useState, useEffect } from "react"
import { Card, CardBody, CardHeader, Col, Row, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap"
import axios from "axios"

export const UsersList = () => {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)
  const [indexOfLastUser, setIndexOfLastUser] = useState(0)
  const [indexOfFirstUser, setIndexOfFirstUser] = useState(0)
  const [currentUsers, setCurrentUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:3000/api/users")
      setUsers(res.data)
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    setIndexOfLastUser(currentPage * usersPerPage)
    setIndexOfFirstUser(indexOfLastUser - usersPerPage)
    setCurrentUsers(users.slice(indexOfFirstUser, indexOfLastUser))
  }, [currentPage, usersPerPage, indexOfLastUser, indexOfFirstUser, users])

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Users{" "}
              <small className="text-muted">example</small>
            </CardHeader>
            <CardBody>
              <Table responsive hover striped>
                <thead>
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">CIN</th>
                    <th scope="col">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.cin}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination>
                <PaginationItem disabled={currentPage <= 0}>
                  <PaginationLink
                    previous
                    tag="button"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  />
                </PaginationItem>
                {[...Array(Math.ceil(users.length / usersPerPage))].map(
                  (page, i) => (
                    <PaginationItem
                      active={i === currentPage}
                      key={i}
                    >
                      <PaginationLink
                        tag="button"
                        onClick={() => paginate(i)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem
                  disabled={
                    currentPage >=
                    Math.ceil(users.length / usersPerPage) - 1
                  }
                >
                  <PaginationLink
                    next
                    tag="button"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  />
                </PaginationItem>
              </Pagination>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default UsersList
