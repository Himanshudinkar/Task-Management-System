import { Outlet } from "react-router-dom"
import TopNav from "./Component/TopNav"
import Footer from "./Component/Footer"
const Layout = () =>{
    return(
        <>
    <TopNav/>

    <main>
        <Outlet/>
    </main>

    <Footer />
        
        </>
    )
}

export default Layout