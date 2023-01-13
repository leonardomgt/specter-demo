import { useLocation } from "react-router-dom";

import NothingHere from "src/layout/components/NothingHere";

const Page404 = () => {
  const location = useLocation();

  console.error("Wrong page", location);
  return <NothingHere />;
};

export default Page404;
