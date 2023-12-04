"use client";

import { useEffect, useRef, useState } from "react";
import Loading from "@components/Loading";
import Sidebar from "@components/dashboard/Sidebar";
import UserTable from "@components/users/UsersTable";
import { getAllUserRoles, UserRole } from "@/typings/user";
import { fetcher } from "@/lib/fetcher";
import { log } from "util";


export default function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState<UserRole[]>(getAllUserRoles);

  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    fetchUsers();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);
  const fetchUsers = () => {
    const token = localStorage.getItem("token");

    fetcher.get("/users", {
      signal: abortControllerRef.current?.signal,
    }).then((res) => {
      setUsers(res.data);
    }).catch(err => {
      console.log(err);
    });

    return () => {
      abortControllerRef.current?.abort();
    };
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <UserTable users={users} fetchUsers={fetchUsers} roles={roles}></UserTable>
    </div>
  );
}
