import { useCompanies } from "src/api/companies";

function App() {
  const { isLoading, data } = useCompanies();

  return (
    <div>
      <h1>Good luck!</h1>

      <p>Here is an example of data we hold on a company</p>
      <pre>{!isLoading && JSON.stringify(data?.slice(0, 1), null, 2)}</pre>
    </div>
  );
}

export default App;
