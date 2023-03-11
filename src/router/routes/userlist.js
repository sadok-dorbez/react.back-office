import { UsersList } from "../../views/list/Table"


const Routes = [
  {
    path: "/userlist",
    exact: true,
    component: UsersList,
    element: <UsersList />
  }
]

export default Routes
