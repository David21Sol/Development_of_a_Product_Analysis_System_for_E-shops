import React from "react";
import styles from "./Statistic.module.scss";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

function Statistic({ price, title, exPrice }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const data = [
    { name: "Current Price", value: price, fill: "orange" },
    { name: "Ex Price", value: exPrice, fill: "gray" },
  ];

  const data2 = [
    {
      name: "Ex Price",
      price: exPrice,
    },
    {
      name: "Current Price",
      price: price,
    },
  ];

  return (
    <>
      <img
        className={styles.logo}
        src="https://cdn0.iconfinder.com/data/icons/data-analysis-outline-1/351/data-analysis-statistic-business-49-256.png"
        height="40px"
        width="40px"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div div className={[styles.group, styles.active].join(" ")}>
          <img className={styles.close}
        onClick={() => setIsOpen(false)}
        src="https://cdn2.iconfinder.com/data/icons/weby-flat-vol-1/512/1_multiplication-multiply-close-remove-orange-256.png"/>
          <h2 className={styles.h2}>Product price change</h2>
          <p className={styles.p}>{title}</p>
          <p>* if Ex Price is 0, then the value of the Ex Price is not known.</p>
          <PieChart width={500} height={300}>
            <Pie
              dataKey="value" isAnimationActive={false}
              data={data}
              cx={275}
              cy={150}
              outerRadius={100}
              label
            />
            <Tooltip />
          </PieChart>

          <ResponsiveContainer width="100%" height="94%">
            <AreaChart
              width={500}
              height={400}
              data={data2}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="price"
                stroke="orange"
                fill="orange"
              />
            </AreaChart>
          </ResponsiveContainer>
          
        </div>
      )}
    </>
  );
}

export default Statistic;
