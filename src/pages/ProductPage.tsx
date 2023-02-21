import React from 'react';
import {usePersmissions} from "../packageTest";

import { ProductPageKeys } from './../routes/EcommerceModule/product';

const ProductPages = () => {
  const {actions: {get, add, remove, update, downlaodFile}} = usePersmissions(ProductPageKeys.pageKey)
  return (
    <div>
      <h1>products</h1>
      {get && <h1>get</h1>}
      {add && <h1>add</h1>}
      {remove && <h1>remove</h1>}
      {update && <h1>update</h1>}
      {downlaodFile && <h1>downlaodFile</h1>}
    </div>
  );
};

export default ProductPages;
