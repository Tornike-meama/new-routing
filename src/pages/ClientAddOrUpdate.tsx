import React from "react";
import { useParams } from "react-router";
import { usePersmissions } from "../packageTest";
import { ClientAddOrUpdate, } from './../routes/ClientsModule/customer';

const CustomerAddOrUpdate = () => {
  const params = useParams();
  const {actions: {get}} = usePersmissions(ClientAddOrUpdate);
  return <h1>
    customer updtae: {params.id}
  </h1>;
};

export default CustomerAddOrUpdate;
