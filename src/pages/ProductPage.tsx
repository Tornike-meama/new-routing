import { PageProps } from "../routes/types/componentProps.types";

const ProductPages = ({
  actions: { add, remove, update, downlaodFile },
}: PageProps) => {
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
