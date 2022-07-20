import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../actions/session";

const mapStateToProps = ({ session }) => ({
  session,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

const Dashboard = ({ logout, session }) => (
  <>
    <h1>Hi {session.username}</h1>
    <p>You are now logged in!</p>
    <Link to="/profile">Go to Profile</Link>
    <br />
    <br />
    <button onClick={logout}>Logout</button>
  </>
);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
