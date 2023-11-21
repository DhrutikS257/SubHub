"use client";
import React, { useEffect, useState } from 'react';
import { Card } from "@/app/ui/dashboard/cards";
import { inter, lusitana } from "@/app/ui/fonts";

interface SubscriptionData {
  paidtotal: number;
  pendingtotal: number;
  totalamount: number;
  count: number;
}

interface SubscriptionItem {
  monthlyexpenses: number;
  month: number;
}
export default async function Page() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [subscriptionItems, setMonthlyCost] = useState<SubscriptionItem[] | null>(null);

  useEffect(() => {
    const getSubscription = async () => {
      try {
        const response = await fetch("http://localhost:8080/get-subscription-count", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        setSubscription(data.body);


      } catch (err) {
        console.log("Error: ", err);
      }
    }
    getSubscription();
  }, []);

  useEffect(() => {
    const monthlyExpenses = async () => {
      try {
        const response = await fetch("http://localhost:8080/get-monthly-cost", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        setMonthlyCost(data.body);


      } catch (err) {
        console.log("Error: ", err);
      }
    }
    monthlyExpenses();
  }, []);
  console.log(subscriptionItems)

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Paid Subscriptions" value={subscription?.paidtotal ?? 0} type="collected" />
        <Card title="Pending Subscriptions" value={subscription?.pendingtotal ?? 0} type="pending" />
        <Card title="Total Amount" value={subscription?.totalamount ?? 0} type="customers" />
        <Card title="Total Subscriptions" value={subscription?.count ?? 0} type="invoices" />
      </div>
    </main >
  );
}