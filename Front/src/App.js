import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home/Home";
import Print from "./page/Print/Print";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route />
          <Route path="print">
            <Route path=":id" element={<Print />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
