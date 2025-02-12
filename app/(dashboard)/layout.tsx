import NavBar from "./_components/NavBar"
import { SideBar } from "./_components/SideBar"



const dashboardLayout = ({children} : {children: React.ReactNode}) =>{
    return(
        <div className="h-full">
            <header className="h-200 fixed inset-y-0 w-full z-50">
                <NavBar />
            </header>

            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                <SideBar />
            </div>

            <main>{children}</main>
        </div>
    )
}

export default dashboardLayout