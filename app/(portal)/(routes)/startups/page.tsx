import ButtonAccount from "@/components/ButtonAccount";
import { Button } from "@/components/ui/button";
import React from "react";
import { Label } from "@/components/Label";
import { Input } from "@/components/Input";
import { cn } from "@/utils/cn";

export const dynamic = "force-dynamic";

export default async function StartupPage() {
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">Startups</h1>
      </section>
    </main>
  );
}
