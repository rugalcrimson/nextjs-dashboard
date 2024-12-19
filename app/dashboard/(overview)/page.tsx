import CardWrapper from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  CardsSkeleton,
  LatestInvoicesSkeleton,
} from "@/app/ui/skeletons";

export default async function Page() {
  console.log("test");
  //串行执行三个查询

  //并行同时执行三个查询
  // const data = await Promise.all([
  //   fetchRevenue(),
  //   fetchLatestInvoices(),
  //   fetchCardData(),
  // ]);
  // const revenue = data[0];
  // const latestInvoices = data[1];
  // const {
  //   numberOfInvoices,
  //   numberOfCustomers,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = data[2]; //对象解构

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* 通过Suspense让RevenueChart这个较慢的组件流式加载，其他组件可以先加载 */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
