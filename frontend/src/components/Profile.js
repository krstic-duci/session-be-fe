import { connect } from "react-redux";

const mapStateToProps = ({ session }) => ({
  session,
});

const Profile = ({ session }) => (
  <>
    <h1>Hi {session.username}</h1>
    <p>This is a profile</p>
  </>
);
export default connect(mapStateToProps)(Profile);
