import Image from "next/image"
// import { SideBarRoutes } from "./SideBarRoutes"


export const SideBar =() =>{
    return(
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white">
            <div className="p-6">
                <Image height={60} width={60} alt="logo" className="rounded-full" src={"/img/logo.jpg"}/>
            </div>
           <div className="flex flex-col w-full">
            {/* <SideBarRoutes /> */}
           </div>
        </div>
    )
}