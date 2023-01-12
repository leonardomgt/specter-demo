import { useLocation } from "react-router-dom";

const Page404 = () => {
  const location = useLocation();

  console.error("Wrong page", location);
  return <div>Page404</div>;
};

export default Page404;
