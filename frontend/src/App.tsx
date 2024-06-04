import { Suspense } from "react";
import { useRoutes } from "react-router";
import routes from "./Routes";
import "../src/App.css"

const App = () => {
  const route = useRoutes(routes);
  return <Suspense fallback={<></>}>{route}</Suspense>;
};

export default App;
