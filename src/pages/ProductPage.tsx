import React from 'react';
import {usePersmissions} from "@Tornike-meama/ds-routing";

import { ProductPageKeys } from './../routes/EcommerceModule/product';
import { EcommerceModule } from './../routes/EcommerceModule/index';

const ProductPages = () => {
  const {actions: {add, remove, update, downlaodFile}} = usePersmissions(EcommerceModule.moduleKey ,ProductPageKeys)
  return (
    <div>
      {add && <h1>add</h1>}
      {remove && <h1>remove</h1>}
      {update && <h1>update</h1>}
      {downlaodFile && <h1>downlaodFile</h1>}
    </div>
  );
};

export default ProductPages;
