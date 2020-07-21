import React from "react";
import { action } from "@storybook/addon-actions";
import { MockDataset } from "@lupa/mock";
import { Dataset } from "@lupa/lupa";

import { LupaTable } from "../esm/index";

export default {
  title: "Table",
  component: LupaTable,
};

const data = [
  {
    engagement: 10.97,
    eventtype: "Mission",
    eventdurationmin: 117,
    timespent: 46,
    timespentmin: 53.82,
  },
  {
    engagement: 11.88,
    eventtype: "Mission",
    eventdurationmin: 110,
    timespent: 50,
    timespentmin: 55,
  },
];

export const StaticData = () => (
  <MockDataset data={data}>
    <LupaTable />
  </MockDataset>
);

export const AsyncData = () => {
  const getData = async () => data;

  const featKeys = Object.keys(data[0]);
  const features = featKeys.map((key) => {
    const feat = data.map((r) => r[key]);

    if (typeof data[0][key] === "string") {
      const mods = [...new Set(feat)];

      return { key, type: "discrete", modalities: mods };
    }

    const min = Math.min(...feat);
    const max = Math.max(...feat);
    return { key, type: "continuous", range: [min, max] };
  });

  const height = data.length;
  const width = features.length;

  return (
    <Dataset data={getData} features={features} shape={[height, width]}>
      <LupaTable />
    </Dataset>
  );
};
