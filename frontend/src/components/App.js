import { Route } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "../util/route";
import Welcome from "./Welcome";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Profile from "./Profile";

function App() {
  return (
    <>
      <Route exact path="/" component={Welcome} />
      <AuthRoute path="/login" component={Login} />
      <AuthRoute path="/signup" component={Signup} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/profile" component={Profile} />
    </>
  );
}

export default App;
