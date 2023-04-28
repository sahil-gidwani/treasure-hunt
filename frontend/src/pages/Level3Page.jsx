import Level3 from "../components/Level3";
import withAuthorization from "../utils/withAuthorization";

const AuthorizedLevel3 = withAuthorization(Level3, 3);
function Level3Page() {
  return <AuthorizedLevel3 />;
}

export default Level3Page;
