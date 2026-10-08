import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-white to-indigo-50 text-slate-900">
      <Navbar />
      <main className="flex-grow mx-auto max-w-7xl w-full px-4 pb-10 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}