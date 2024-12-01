import React, { useState, useEffect } from 'react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

import { ChartConfig, ChartContainer } from "@/frontend/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#666666",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

function SubscriptionChart({ type, chartData }: { type: string, chartData: { month: string; desktop: number }[] }) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full bg-white p-4 rounded-lg shadow mb-4 ">
    <h3>{type}</h3>
      <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export default SubscriptionChart;
