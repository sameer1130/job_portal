// import {Compass, Home, User,  } from "lucide-react"
// import { usePathname, useRouter } from "next/navigation";
// import { SidebarrouteItem } from "./SidebarrouteItem";



// const routes = [
//     {
//         icon: Home,
//         label: "Home",
//         href: "/",
//     },
//     {
//         icon: Compass,
//         label: "Search",
//         href: "/search",
//     },
//     {
//         icon: User,
//         label: "Profile",
//         href: "/user",
//     }
// ];

// export const SideBarRoutes =() =>{
//     // const pathName = usePathname();
//     const router = useRouter();

//     const route = routes;
//     return (
//         <div className="flex flex-col w-full">
//             {route.map((route) =>(
//                 <SidebarrouteItem />
//             ))}
//         </div>
//     )
// }