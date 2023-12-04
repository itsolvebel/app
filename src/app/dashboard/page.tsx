"use client";
import { ShieldCheck, Ticket, Users } from "lucide-react";
import { User } from "@/typings/user";
import { Chart } from "primereact/chart";
import TicketsCollapsible from "@components/dashboard/TicketsCollapsible";
import { getMe, getUserRoles } from "@/lib/auth";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { FetchingError } from "@/lib/errors";
import Loading from "@components/Loading";
import Sidebar from "@components/dashboard/Sidebar";


function getGreeting() {
  const hour = new Date().getHours();

  const greetings = [
    "Good morning",
    "Good afternoon",
    "Good evening",
    "Good night",
  ];

  if (hour >= 5 && hour < 12) return greetings[0];
  if (hour >= 12 && hour < 18) return greetings[1];
  if (hour >= 18 && hour < 22) return greetings[2];
  if (hour >= 22 || hour < 5) return greetings[3];
}

export default function Dashboard() {
  const charts = [
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
  ];
  const greeting = getGreeting();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   //if (auth.isLogged) getStats()
  //   // async function getStats() {
  //   //   const token = localStorage.getItem("token")
  //   //   const response = await fetch("http://localhost:3001/api/stats/all", {
  //   //     headers: {
  //   //       "auth-token": token,
  //   //     },
  //   //   })
  //   //   const data = await response.json()
  //   //   const { users, companies, tickets, completedTickets } = data.data
  //   //   setCharts([
  //   //     {
  //   //       title: "Total tickets",
  //   //       value: tickets,
  //   //       color: "#276eff",
  //   //       icon: Ticket,
  //   //     },
  //   //     {
  //   //       title: "Completed tickets",
  //   //       value: completedTickets,
  //   //       color: "#01c156",
  //   //       icon: ShieldCheck,
  //   //     },
  //   //     {
  //   //       title: "Registered users",
  //   //       value: users,
  //   //       color: "#ffd727",
  //   //       icon: Users,
  //   //     },
  //   //     {
  //   //       title: "Registered companies",
  //   //       value: companies,
  //   //       color: "#ff3d3d",
  //   //       icon: Building2,
  //   //     },
  //   //   ])
  //   // }
  //   //
  // }, [data])
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const { isUser } = await getUserRoles();
        // if (isUser) {
        //   redirect("/dashboard/tickets");
        // }

        const user = await getMe();
        setUser(user);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof FetchingError) {
          console.error(err.body);
        }
      }
    };

    fetchData();
  }, []);
  if (isLoading) return <Loading />;

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-full">
          <div className="px-24 py-16">
            <h1 className="text-3xl font-bold">
              {greeting}, {user?.first_name}!
            </h1>
          </div>
          <div>
            <div className="flex w-full flex-row gap-8 px-24 py-16">
              {charts.map((chart, index) => (
                <Chart
                  key={index}
                  // title={chart.title} TODO
                  // value={chart.value}
                  // color={chart.color}
                  // icon={chart.icon}
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
