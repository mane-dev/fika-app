import React, { useEffect, useState } from "react";
import { data as sample } from "./data";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface CoffeeData {
  t: number | undefined;
  pressure: number | undefined;
  weight: number | undefined;
  flow: number | undefined;
  pwm: number | undefined;
  xProfile: number | undefined;
  yProfile: number | undefined;
}

const initialData: CoffeeData[] = sample.map(
  ([t, pressure, weight, flow, pwm, xProfile, yProfile]) => ({
    t,
    pressure,
    weight,
    flow,
    pwm,
    xProfile,
    yProfile,
  })
);

function App() {
  const [data, setData] = useState<CoffeeData[]>([]);
  useEffect(() => {
    setInterval(() => {
      if (initialData.length) {
        const d = initialData.shift()
        if (d){
          console.log(d)
          setData((x) => [...x, d]);
        }
      }
    }, 100);
  }, []);
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="t" height={0}/>
          <YAxis />
          <Tooltip />
          <Area isAnimationActive={false} type="monotone" dataKey="pressure" stroke="#8884d8" fillOpacity={0} />
          <Area isAnimationActive={false} type="monotone" dataKey="flow" stroke="#000"  fillOpacity={0}/>
          <Area isAnimationActive={false} type="monotone" dataKey="weight" stroke="#34e5eb" fillOpacity={0}/>
          <Area isAnimationActive={false} type="monotone" dataKey="pwm" stroke="#b3258d"  fillOpacity={0}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;
