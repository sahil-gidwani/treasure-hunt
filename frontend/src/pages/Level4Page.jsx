import Level4 from "../components/Level4";
import withAuthorization from "../utils/withAuthorization";

const AuthorizedLevel4 = withAuthorization(Level4, 4);
function Level4Page() {
  return <AuthorizedLevel4 />;
}

export default Level4Page;
