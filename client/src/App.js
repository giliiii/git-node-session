import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Layout from "./Component/Shared/Layout";
import Login from "./Component/All/Login";
import Product from "./Component/All/Product"
import Register from "./Component/All/Register";
import Contact from "./Component/All/Contact";
import MyBasket from "./Component/All/MyBasket";
import Logout from "./Component/All/Logout";
import Manager from "./Component/All/Manager";
import Home from "./Component/All/Home";

function App() {
  return (
    <div className="App">
      {/* <h1>Hello world!</h1> */}
        <Router>
          <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="all/login" element={<Login/>}/>
                <Route path="all/product" element={<Product/>}/>
                <Route path="all/register" element={<Register/>}/>
                <Route path="all/logout" element={<Logout/>}/>
                <Route path="all/contact" element={<Contact/>}/>
                <Route path="all/mybasket" element={<MyBasket/>}/>
                <Route path="all/manager" element={<Manager/>}/> 
            </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
