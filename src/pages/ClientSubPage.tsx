import { usePersmissions } from "@Tornike-meama/ds-routing";
import { ClientSubPageKeys } from "../routes/ClientsModule/customer";

const ClientSubPage = () => {
  const {actions: {get, add}} = usePersmissions(ClientSubPageKeys.pageKey)
  return <div>
    <h1>Client Sub Page</h1>

    <p>{get && "get"}</p>
    <p>{add && "add"}</p>
  </div>
};

export default ClientSubPage;
