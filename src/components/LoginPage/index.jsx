"use client";

import { useAuthContext } from "../../contexts/AuthContext";
import { Toaster } from "react-hot-toast";

import SideWelcome from "./SideWelcome";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const { auth } = useAuthContext();

  if (!auth.loading && auth.isLogged) {
    window.location.href = "/dashboard";
  }

  return (
    <div className="flex h-screen w-screen bg-[#0D1623] p-4">
      <Toaster />
      <LoginForm />
      <SideWelcome />
    </div>
  );
}
