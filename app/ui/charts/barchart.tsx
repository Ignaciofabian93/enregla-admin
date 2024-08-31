import { Label } from "@/types/label";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

export default function LabelQuantityBarChart({ labels }: { labels: Label[] }) {
  // Explicitly typing the accumulator as an object with numeric keys and values.
  const branchQuantities = labels.reduce<{ [key: number]: number }>((acc, label) => {
    acc[label.branch_id] = (acc[label.branch_id] || 0) + label.label_quantity;
    return acc;
  }, {});

  // Converting the accumulated values to the correct type
  const series = [
    {
      name: "Label Quantity",
      data: Object.values(branchQuantities) as number[], // Cast to number[]
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: Object.keys(branchQuantities),
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
}
