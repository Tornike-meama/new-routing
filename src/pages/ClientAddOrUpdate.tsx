import React from "react";
import { useParams } from "react-router";
import { usePersmissions } from "@Tornike-meama/ds-routing";
import { ClientAddOrUpdate, } from '../routes/private/ClientsModule/customer';

const CustomerAddOrUpdate = () => {
  const params = useParams();
  const {actions: {get}} = usePersmissions(ClientAddOrUpdate.pageKey);
  return <h1>
    customer updtae: {params.id}
  </h1>;
};

export default CustomerAddOrUpdate;
