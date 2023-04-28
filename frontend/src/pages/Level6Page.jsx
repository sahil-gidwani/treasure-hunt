import Level6 from "../components/Level6";
import withAuthorization from "../utils/withAuthorization";

const AuthorizedLevel6 = withAuthorization(Level6, 6);
function Level6Page() {
  return <AuthorizedLevel6 />;
}

export default Level6Page;
