import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [form, setForm] = useState({
    email_or_username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      handleOnSubmit();
    }
  };

  const handleOnSubmit = () => {
    fetch("http://localhost:3001/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    }).then((res) => {
      if (res.status === 401) {
        res.json().then((data) => {
          toast.error(data.message);
        });
      }

      if (res.status === 500) {
        toast.error("Something went wrong");
      }

      if (res.status === 200) {
        res.json().then(() => {
          window.location.href = "/dashboard";
        });
      }
    });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col gap-8 sm:w-[30rem]">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-white">Log in</h1>
          <span className="font-medium text-white/80">
            Let&apos;s login to your ItSolve account.
          </span>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex w-full flex-col gap-2">
            <label className="font-medium text-white/80">
              Email or username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="john@itsolve.be"
              id="email_or_username"
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              className="w-full rounded-lg border-2 border-[#FFFFFF1A] bg-transparent px-4 py-2 text-white outline-none duration-300 focus:border-[#01A0C4] focus:bg-[#01A0C405] focus:outline-none"
            />
          </div>

          <div className="flex w-full flex-col gap-2">
            <label className="font-medium text-white/80">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="•••••••••"
              id="password"
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              className="w-full rounded-lg border-2 border-[#FFFFFF1A] bg-transparent px-4 py-2 text-white outline-none duration-300 focus:border-[#01A0C4] focus:bg-[#01A0C405] focus:outline-none"
            />
          </div>

          <div>
            <button
              onClick={handleOnSubmit}
              className="rounded-lg bg-[#01A0C4] px-6 py-2 font-medium text-white duration-300 hover:bg-[#25C3E6]"
            >
              Log in
            </button>
          </div>

          <div>
            <span className="font-medium text-white/80">
              Don&apos;t have an account?{" "}
            </span>
            <Link href="/register" className="font-medium text-[#01A0C4]">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
