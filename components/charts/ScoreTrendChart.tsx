"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { scoreTrend } from "@/lib/data";

export function ScoreTrendChart() {
  return (
    <div className="h-64 w-full px-2 pb-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={scoreTrend} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fill: "#6B7A8F", fontSize: 11, fontFamily: "var(--font-mono)" }}
            axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6B7A8F", fontSize: 11, fontFamily: "var(--font-mono)" }}
            axisLine={false}
            tickLine={false}
            width={30}
            domain={[40, 80]}
          />
          <Tooltip
            contentStyle={{
              background: "#151B26",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              fontSize: 12,
              boxShadow: "0 12px 40px -12px rgba(0,0,0,0.5)",
            }}
            labelStyle={{ color: "#F4F6F8", fontWeight: 600 }}
            itemStyle={{ color: "#FF6B00" }}
          />
          <Area
            type="monotone"
            dataKey="avgScore"
            name="Avg opportunity score"
            stroke="#FF6B00"
            strokeWidth={2.5}
            fill="url(#scoreFill)"
            activeDot={{ r: 5, fill: "#FF6B00", stroke: "#07090D", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
