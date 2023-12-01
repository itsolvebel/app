"use client";

import {useEffect, useRef, useState} from "react";
import Loading from "@components/Loading";
import Sidebar from "@components/dashboard/Sidebar";
import UserTable from "@components/users/UsersTable";
import {getAllUserRoles, UserRole} from "@/typings/user";
import {fetcher} from "@/lib/fetcher";



export default function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState<UserRole[]>(getAllUserRoles);
  const [categories, setCategories] = useState([]);

  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    fetchUsers();
    fetchCategories()

    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])
  const fetchUsers = () => {
    const token = localStorage.getItem("token");

    fetcher.get("/users/", {
      signal: abortControllerRef.current?.signal
    }).then((res) => {
      setUsers(res.data);
    });

    return () => {
      abortControllerRef.current?.abort();
    };
  };
  const fetchCategories = () => {
    fetch("http://localhost:3001/api/v1/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(res => res.json()).then(res => {
      setCategories(res.data);
    });
  }


  return (
      <div className="flex h-screen">
        <Sidebar/>
        <UserTable users={users} fetchUsers={fetchUsers} categories={categories} roles={roles}></UserTable>
      </div>
  );
}
