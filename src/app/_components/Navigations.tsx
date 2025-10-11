// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   ChefHat,
//   Sparkles,
//   Home,
//   Search,
//   LogOut,
//   Menu,
//   X,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const Navigation = () => {
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);

//   const isActive = (path: string) => pathname === path;

//   const handleLogout = () => {
//     console.log("User signed out");
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
//       <div className="container mx-auto px-4 h-16 flex items-center justify-between">
//         {/* Logo */}
//         <Link
//           href="/"
//           className="flex items-center gap-2 font-bold text-xl group"
//         >
//           <ChefHat className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
//           <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//             Recipify
//           </span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-6">
//           <Link href="/">
//             <Button
//               variant={isActive("/") ? "default" : "ghost"}
//               size="sm"
//               className="gap-2"
//             >
//               <Home className="w-4 h-4" />
//               Home
//             </Button>
//           </Link>

//           <Link href="/recipe">
//             <Button
//               variant={isActive("/recipe") ? "default" : "ghost"}
//               size="sm"
//               className="gap-2"
//             >
//               <Search className="w-4 h-4" />
//               Browse
//             </Button>
//           </Link>

//           <Link href="/generate">
//             <Button
//               variant={isActive("/generate") ? "secondary" : "ghost"}
//               size="sm"
//               className="gap-2"
//             >
//               <Sparkles className="w-4 h-4" />
//               AI Generate
//             </Button>
//           </Link>

//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={handleLogout}
//             className="gap-2"
//           >
//             <LogOut className="w-4 h-4" />
//             Sign Out
//           </Button>
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden p-2 rounded-md hover:bg-muted transition"
//         >
//           {isOpen ? (
//             <X className="w-6 h-6 text-primary" />
//           ) : (
//             <Menu className="w-6 h-6 text-primary" />
//           )}
//         </button>
//       </div>

//       {/* Mobile Dropdown */}
//       {isOpen && (
//         <div className="md:hidden bg-white/95 border-t shadow-lg backdrop-blur-sm">
//           <div className="flex flex-col items-start gap-3 px-4 py-4">
//             <Link
//               href="/"
//               onClick={() => setIsOpen(false)}
//               className={`flex items-center gap-2 w-full px-3 py-2 rounded-md ${
//                 isActive("/") ? "bg-primary/10 text-primary" : "hover:bg-muted"
//               }`}
//             >
//               <Home className="w-4 h-4" />
//               Home
//             </Link>

//             <Link
//               href="/recipe"
//               onClick={() => setIsOpen(false)}
//               className={`flex items-center gap-2 w-full px-3 py-2 rounded-md ${
//                 isActive("/recipe")
//                   ? "bg-primary/10 text-primary"
//                   : "hover:bg-muted"
//               }`}
//             >
//               <Search className="w-4 h-4" />
//               Browse
//             </Link>

//             <Link
//               href="/generate"
//               onClick={() => setIsOpen(false)}
//               className={`flex items-center gap-2 w-full px-3 py-2 rounded-md ${
//                 isActive("/generate")
//                   ? "bg-primary/10 text-primary"
//                   : "hover:bg-muted"
//               }`}
//             >
//               <Sparkles className="w-4 h-4" />
//               AI Generate
//             </Link>

//             <button
//               onClick={() => {
//                 handleLogout();
//                 setIsOpen(false);
//               }}
//               className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-muted"
//             >
//               <LogOut className="w-4 h-4" />
//               Sign Out
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navigation;



"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChefHat, Sparkles, Home, Search, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase"; // make sure your firebase.js file exports "auth"

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path:any) => pathname === path;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully 👋");
      setTimeout(() => {
        router.push("/auth");
      }, 1200);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to sign out. Try again.");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl group">
          <ChefHat className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Recipify
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>

          <Link href="/recipe">
            <Button
              variant={isActive("/recipe") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <Search className="w-4 h-4" />
              Browse
            </Button>
          </Link>

          <Link href="/generate">
            <Button
              variant={isActive("/generate") ? "secondary" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <Sparkles className="w-4 h-4" />
              AI Generate
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md hover:bg-muted transition"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/95 border-t shadow-lg backdrop-blur-sm">
          <div className="flex flex-col items-start gap-3 px-4 py-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-md ${
                isActive("/") ? "bg-primary/10 text-primary" : "hover:bg-muted"
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>

            <Link
              href="/recipe"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-md ${
                isActive("/recipe")
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted"
              }`}
            >
              <Search className="w-4 h-4" />
              Browse
            </Link>

            <Link
              href="/generate"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-md ${ 
                isActive("/generate")
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              AI Generate
            </Link>

            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-muted"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
