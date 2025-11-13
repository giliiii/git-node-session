import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
const Layout = () => {
  return (
  <div className="page-layout">
        <Header />
        <div className="content">
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default Layout