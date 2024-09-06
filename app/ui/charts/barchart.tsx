import { Label } from "@/types/label";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

export default function LabelStatistics({ labels }: { labels: Label[] }) {
  // 1. Total Labels by Branch
  const branchQuantities = labels.reduce<{ [key: number]: number }>((acc, label) => {
    acc[label.branch_id] = (acc[label.branch_id] || 0) + label.label_quantity;
    return acc;
  }, {});

  // 2. Average Labels per Day by Branch
  const branchLabelStats = labels.reduce<{ [key: number]: { total: number; days: Set<string> } }>((acc, label) => {
    if (!acc[label.branch_id]) {
      acc[label.branch_id] = { total: 0, days: new Set<string>() };
    }
    acc[label.branch_id].total += label.label_quantity;
    acc[label.branch_id].days.add(label.date);
    return acc;
  }, {});

  const averageLabelsPerDay = Object.keys(branchLabelStats).map((branch_id) => ({
    branch_id: Number(branch_id),
    average: branchLabelStats[Number(branch_id)].total / branchLabelStats[Number(branch_id)].days.size,
  }));

  // 3. Most Frequent Vehicle Brand by Branch (showing frequency)
  const brandFrequencies = labels.reduce<{ [key: number]: { [brand: string]: number } }>((acc, label) => {
    if (!acc[label.branch_id]) {
      acc[label.branch_id] = {};
    }
    acc[label.branch_id][label.vehicle_brand] = (acc[label.branch_id][label.vehicle_brand] || 0) + 1;
    return acc;
  }, {});

  const mostFrequentBrandFrequency = Object.keys(brandFrequencies).map((branch_id) => {
    const brands = brandFrequencies[Number(branch_id)];
    const mostFrequent = Object.keys(brands).reduce((a, b) => (brands[a] > brands[b] ? a : b));
    return { branch_id: Number(branch_id), brand: mostFrequent, frequency: brands[mostFrequent] };
  });

  // 4. Percentage of Labels with VIN, Plate, Logo
  const labelFeaturesStats = labels.reduce<{
    [key: number]: { total: number; show_vin: number; show_plate: number; show_logo: number };
  }>((acc, label) => {
    if (!acc[label.branch_id]) {
      acc[label.branch_id] = { total: 0, show_vin: 0, show_plate: 0, show_logo: 0 };
    }
    acc[label.branch_id].total += label.label_quantity;
    if (label.show_vin) acc[label.branch_id].show_vin += label.label_quantity;
    if (label.show_plate) acc[label.branch_id].show_plate += label.label_quantity;
    if (label.show_logo) acc[label.branch_id].show_logo += label.label_quantity;
    return acc;
  }, {});

  const labelFeaturesPercentage = Object.keys(labelFeaturesStats).map((branch_id) => ({
    branch_id: Number(branch_id),
    vin_percentage:
      (labelFeaturesStats[Number(branch_id)].show_vin / labelFeaturesStats[Number(branch_id)].total) * 100,
    plate_percentage:
      (labelFeaturesStats[Number(branch_id)].show_plate / labelFeaturesStats[Number(branch_id)].total) * 100,
    logo_percentage:
      (labelFeaturesStats[Number(branch_id)].show_logo / labelFeaturesStats[Number(branch_id)].total) * 100,
  }));

  // Chart configurations
  const chartOptions = (categories: string[], title: string, brandNames?: string[]): ApexOptions => ({
    chart: {
      type: "bar",
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: "#fff",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff",
        },
      },
    },
    title: {
      text: title,
      style: {
        color: "#fff",
      },
    },
    tooltip: {
      y: {
        formatter: (val: number, opts: any) => {
          const branchIndex = opts.dataPointIndex;
          return brandNames ? `${val} - ${brandNames[branchIndex]}` : `${val}`;
        },
      },
      theme: "dark",
      style: {
        fontSize: "14px",
      },
    },
    legend: {
      position: "top",
      floating: true,
      horizontalAlign: "center",
      offsetY: -10,
      labels: {
        colors: "#fff",
      },
    },
  });

  return (
    <div>
      <div className="w-full flex items-center">
        {/* 1. Total Labels by Branch */}
        <div className="w-[48%]">
          <Chart
            options={chartOptions(Object.keys(branchQuantities), "Total de etiquetas por sucursal")}
            series={[{ name: "Total de etiquetas", data: Object.values(branchQuantities) }]}
            type="bar"
            height={300}
          />
        </div>

        {/* 2. Average Labels per Day by Branch */}
        <div className="w-[48%]">
          <Chart
            options={chartOptions(
              averageLabelsPerDay.map((stat) => stat.branch_id.toString()),
              "Promedio de etiquetas por día por sucursal"
            )}
            series={[{ name: "Promedio de etiquetas", data: averageLabelsPerDay.map((stat) => stat.average) }]}
            type="bar"
            height={300}
          />
        </div>
      </div>

      <div className="w-full flex items-center">
        {/* 3. Most Frequent Vehicle Brand Frequency by Branch */}
        <div className="w-[48%]">
          <Chart
            options={chartOptions(
              mostFrequentBrandFrequency.map((stat) => stat.branch_id.toString()),
              "Marcas más frecuentes por sucursal",
              mostFrequentBrandFrequency.map((stat) => stat.brand)
            )}
            series={[{ name: "Frecuencia de marca", data: mostFrequentBrandFrequency.map((stat) => stat.frequency) }]}
            type="bar"
            height={300}
          />
        </div>

        {/* 4. Percentage of Labels with VIN, Plate, Logo by Branch */}
        <div className="w-[48%]">
          <Chart
            options={chartOptions(
              labelFeaturesPercentage.map((stat) => stat.branch_id.toString()),
              "Caracteristicas de etiquetas por sucursal"
            )}
            series={[
              {
                name: "VIN %",
                data: labelFeaturesPercentage.map((stat) => stat.vin_percentage),
              },
              {
                name: "Patente %",
                data: labelFeaturesPercentage.map((stat) => stat.plate_percentage),
              },
              {
                name: "Logo %",
                data: labelFeaturesPercentage.map((stat) => stat.logo_percentage),
              },
            ]}
            type="bar"
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
