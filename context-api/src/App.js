import "./App.css";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import { UserProvider } from "./context";
import AddUser from "./components/AddUser";
import UpdateUser from "./components/UpdateUser";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
      <UserProvider>
        <div>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Users} />
                <Route exact path="/addUser" 
                  render={(props) =>  {
                    return <AddUser {...props} />;
                  }} 
                />
                <Route exact path="/updateUser/:id" component={UpdateUser}/>
                <Route render={()=> (<h1>Not Found</h1>)} />
              </Switch>
            </div>
          </Router>
        </div>
      </UserProvider>
  );
}

export default App;
