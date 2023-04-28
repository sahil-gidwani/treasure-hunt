import Level1 from "../components/Level1";
import withAuthorization from "../utils/withAuthorization";

const AuthorizedLevel1 = withAuthorization(Level1, 1);
function Level1Page() {
  return <AuthorizedLevel1 />;
}

export default Level1Page;
