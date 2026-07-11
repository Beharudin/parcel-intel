"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { leadSourceBreakdown } from "@/lib/data";

const barColors = [
  "#FF6B00",
  "#FF7A1A",
  "#FF9A4D",
  "#F5C542",
  "#4C8DFF",
  "#A78BFA",
  "#22C58B",
  "#F04438",
];

export function LeadSourceChart() {
  return (
    <div className="h-64 w-full px-1 pb-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={leadSourceBreakdown}
          layout="vertical"
          margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: "#6B7A8F", fontSize: 11, fontFamily: "var(--font-mono)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey="source"
            type="category"
            width={120}
            tick={{ fill: "#9AA8B8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
            contentStyle={{
              background: "#151B26",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              fontSize: 12,
            }}
            labelStyle={{ color: "#F4F6F8" }}
            itemStyle={{ color: "#FF6B00" }}
          />
          <Bar dataKey="count" name="Active leads" radius={[0, 6, 6, 0]} barSize={12}>
            {leadSourceBreakdown.map((_, i) => (
              <Cell key={i} fill={barColors[i % barColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
