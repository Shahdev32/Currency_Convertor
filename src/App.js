import Currency from "./components/Currency";

function App() {
  return (
    <div className="App flex flex-col items-center justify-center h-screen bg-orange-200">
      <h1 className="text-3xl font-bold mb-5">Currency Converter</h1> 
      <Currency />
    </div>
  );
}

export default App;
