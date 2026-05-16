"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

export default function SalesLeads() {

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const response = await API.get(
          "/auth/users"
        );

        setUsers(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();

  }, []);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

      <h2 className="text-3xl font-bold mb-6">
        Sales Leads
      </h2>

      <div className="space-y-4">

        {users.map((user) => (

          <div
            key={user._id}
            className="bg-zinc-800 rounded-2xl p-5"
          >
            <p className="font-semibold">
              {user.fullName}
            </p>

            <p className="text-zinc-400">
              {user.email}
            </p>
          </div>

        ))}

      </div>
    </div>
  );
}