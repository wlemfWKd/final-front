import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

const ChartComponent = ({ data }) => {
  return (
    <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis label={{ value: '(명)', angle: 0, position: 'bottom' }} />
      <Tooltip />
      <Legend />
      <Bar dataKey='접수자 수' fill="#64dee0" />
      <Bar dataKey='응시자 수' fill="#ff8e7f" />
      <Bar dataKey='합격자 수' fill="#a5ea89" />
    </BarChart>
  );
};

export default ChartComponent;