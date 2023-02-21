import { ClientsModule } from "../routes/ClientsModule";
import { ClientPageKeys } from "../routes/ClientsModule/customer";
import {usePersmissions} from "@Tornike-meama/ds-routing";

const Customers = () => {
  const { actions: {add, update, remove} } = usePersmissions(ClientPageKeys.pageKey);

  return (
    <div>
      {add && <div>Add access</div>}
      {update && <div>update access</div>}
      {remove && <div>remove access</div>}
    </div>
  );
};

export default Customers;
