import { ClientsModule } from "../routes/ClientsModule";
import { ClientPageKeys } from "../routes/ClientsModule/customer";
import { getPersmissions } from "../routes/PrivateRoutes";

const Customers = () => {
  const { add, update, remove } = getPersmissions(
    ClientsModule.moduleKey,
    ClientPageKeys
  );
  return (
    <div>
      {add && <div>Add access</div>}
      {update && <div>update access</div>}
      {remove && <div>remove access</div>}
    </div>
  );
};

export default Customers;
