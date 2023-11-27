"use client";

import { useAuthContext } from "../../contexts/AuthContext";
import { Toaster } from "react-hot-toast";

import SideWelcome from "./SideWelcome";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  const { auth } = useAuthContext();

  if (!auth.loading && auth.isLogged) {
    window.location.href = "/dashboard";
  }

  return (
    <div className="flex h-screen w-screen bg-[#0D1623] p-4">
      <Toaster />
      <SideWelcome />
      <RegisterForm />
    </div>
  );
}
