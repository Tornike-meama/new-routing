import React from "react";
import { useParams } from "react-router";

const CustomerAddOrUpdate = () => {
  const params = useParams();
  return <h1>
    customer updtae: {params.id}
  </h1>;
};

export default CustomerAddOrUpdate;
