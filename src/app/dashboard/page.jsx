"use client";

import { useState, useEffect } from "react";
import Loading from "@components/Loading";
import Sidebar from "@components/dashboard/Sidebar";
import Chart from "@components/dashboard/Chart";
import TicketsCollapsible from "@components/dashboard/TicketsCollapsible";
import { Ticket, ShieldCheck, Users, Building2 } from "lucide-react";

import { useAuthContext } from "../../contexts/AuthContext";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  } else if (hour < 18) {
    return "Good afternoon";
  } else {
    return "Good night";
  }
}

export default function Dashboard() {
  const [charts, setCharts] = useState([
    {
      title: "Total tickets",
      value: 0,
      color: "#276eff",
      icon: Ticket,
    },
    {
      title: "Completed tickets",
      value: 0,
      color: "#01c156",
      icon: ShieldCheck,
    },
    {
      title: "Total users",
      value: 0,
      color: "#ffd727",
      icon: Users,
    },
  ]);
  const greeting = getGreeting();

  const { auth } = useAuthContext();

  useEffect(() => {
    //if (auth.isLogged) getStats();
    // async function getStats() {
    //   const token = localStorage.getItem("token");
    //   const response = await fetch("http://localhost:3001/api/stats/all", {
    //     headers: {
    //       "auth-token": token,
    //     },
    //   });
    //   const data = await response.json();
    //   const { users, companies, tickets, completedTickets } = data.data;
    //   setCharts([
    //     {
    //       title: "Total tickets",
    //       value: tickets,
    //       color: "#276eff",
    //       icon: Ticket,
    //     },
    //     {
    //       title: "Completed tickets",
    //       value: completedTickets,
    //       color: "#01c156",
    //       icon: ShieldCheck,
    //     },
    //     {
    //       title: "Registered users",
    //       value: users,
    //       color: "#ffd727",
    //       icon: Users,
    //     },
    //     {
    //       title: "Registered companies",
    //       value: companies,
    //       color: "#ff3d3d",
    //       icon: Building2,
    //     },
    //   ]);
    // }
    //
  }, [auth.isLogged]);

  if (auth.loading) return <Loading />;

  if (!auth.loading && !auth.isLogged) {
    window.location.href = "/login";
  }

  if (auth.role == "user") window.location.href = "/dashboard/tickets";

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-full">
          <div className="px-24 py-16">
            <h1 className="text-3xl font-bold">
              {greeting}, {auth.first_name}!
            </h1>
          </div>
          <div>
            <div className="flex w-full flex-row gap-8 px-24 py-16">
              {charts.map((chart, index) => (
                <Chart
                  key={index}
                  title={chart.title}
                  value={chart.value}
                  color={chart.color}
                  icon={chart.icon}
                />
              ))}
            </div>
            <TicketsCollapsible />
          </div>
        </div>
      </div>
    </>
  );
}
