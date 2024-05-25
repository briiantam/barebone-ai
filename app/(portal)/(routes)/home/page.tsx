import React from "react";
import PortalHeader from "@/app/(portal)/PortalHeader";
import CompanyInputs from "./companyInputs";
import { DataTable } from "./dataTable";
import { PotentialInvestors, columns } from "./columns";
import { Vortex } from "@/components/Vortex";
import { BackgroundGradient } from "@/components/BackgroundGradient";

export const dynamic = "force-dynamic";

async function getData(): Promise<PotentialInvestors[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

export default async function Portal() {
  const data = await getData();

  return (
    <main className="pb-24">
      <div className="h-screen max-w-full mx-auto py-20 px-6 sm:px-8 lg:px-20 flex items-center justify-center">
        <div className="w-full">
          <CompanyInputs />
        </div>
      </div>
    </main>
  );
}
