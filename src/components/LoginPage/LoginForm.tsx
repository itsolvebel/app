"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { FetchingError } from "@/lib/errors";
import { fetcher } from "@/lib/fetcher";


type LoginForm = {
  email_or_username: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>(
    { email_or_username: "", password: "" },
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(form).then(res => {
      fetcher.setToken(res.access_token);
      router.replace("/dashboard");
    }).catch(error => {
      if (error instanceof FetchingError) {
        if (error.statusCode === 401) {
          toast.error("Wrong email/username or password");
        }
        return;
      }
      toast.error("Something went wrong!");
      console.error(error);
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
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-8">
          <div className="flex w-full flex-col gap-2">
            <label className="font-medium text-white/80">
              Email or username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="john@itsolve.be"
              id="email_or_username"
              onChange={handleOnChange}
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
              className="w-full rounded-lg border-2 border-[#FFFFFF1A] bg-transparent px-4 py-2 text-white outline-none duration-300 focus:border-[#01A0C4] focus:bg-[#01A0C405] focus:outline-none"
            />
          </div>

          <div>
            <button
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
        </form>
      </div>
    </div>
  );
}
