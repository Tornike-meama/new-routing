import { usePersmissions } from "../packageTest";

const Home = () => {
  const {actions: {get}} = usePersmissions("get_key");
  return <h1>Home...</h1>;
};

export default Home;
