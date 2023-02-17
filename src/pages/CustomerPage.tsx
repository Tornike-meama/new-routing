import { ClientsModule } from "../routes/ClientsModule";
import { ClientPageKeys } from "../routes/ClientsModule/customer";
import usePersmissions from '../hooks/usePermission.hook';

const Customers = () => {
  const { actions: {add, update, remove} } = usePersmissions(
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
