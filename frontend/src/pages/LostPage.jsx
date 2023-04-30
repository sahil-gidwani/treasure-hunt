import Lost from "../components/Lost";
import withAuthorization from "../utils/withAuthorization";

const AuthorizedLevel6 = withAuthorization(Lost, 1);
function LostPage() {
  return <AuthorizedLevel6 />;
}

export default LostPage;
