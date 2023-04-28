import Level2 from "../components/Level2";
import withAuthorization from "../utils/withAuthorization";

const AuthorizedLevel2 = withAuthorization(Level2, 2);
function Level2Page() {
  return <AuthorizedLevel2 />;
}

export default Level2Page;
