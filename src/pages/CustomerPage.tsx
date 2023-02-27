import { usePersmissions } from "@Tornike-meama/ds-routing";
import { ClientsModule } from "../routes/private/ClientsModule";
import { ClientPageKeys } from "../routes/private/ClientsModule/customer";

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
