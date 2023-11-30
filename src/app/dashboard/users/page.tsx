"use client";

import {useEffect, useState} from "react";
import Loading from "@components/Loading";
import Sidebar from "@components/dashboard/Sidebar";
import UserTable from "@components/users/UsersTable";
import {useIsAuthenticated} from "@/hooks/useAuthentication";
import {getAllUserRoles, UserRole} from "@/typings/user";



export default function UserDashboard() {
  const { loading } = useIsAuthenticated();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState<UserRole[]>(getAllUserRoles);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchCategories()
  }, [])
  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    const abortController = new AbortController();

    fetch("http://localhost:3001/api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: abortController.signal,
    })
        .then((r) => r.json())
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => console.error(err));

    return () => {
      abortController.abort();
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

  if (loading) return <Loading />;

  return (
      <div className="flex h-screen">
        <Sidebar/>
        <UserTable users={users} fetchUsers={fetchUsers} categories={categories} roles={roles}></UserTable>
      </div>
  );
}
