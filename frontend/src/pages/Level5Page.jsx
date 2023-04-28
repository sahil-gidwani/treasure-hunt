import Level5 from "../components/Level5";
import withAuthorization from "../utils/withAuthorization";

const AuthorizedLevel5 = withAuthorization(Level5, 5);
function Level5Page() {
  return <AuthorizedLevel5 />;
}

export default Level5Page;
