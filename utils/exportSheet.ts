import { FormattedBranch } from "@/types/branch";
import { Supply } from "@/types/supply";
import { User } from "@/types/user";
import { FormattedVehicle } from "@/types/vehicle";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";

type Rows = User[] | FormattedBranch[] | FormattedVehicle[] | Supply[];

type Excel = {
  headers: { label: string; key: string }[];
  rows: Rows;
  sheet: string;
};

export default function downloadExcel({ headers, rows, sheet }: Excel) {
  const workbook = new Workbook();
  workbook.creator = "EnRegla";
  workbook.created = new Date();
  workbook.modified = new Date();

  const worksheet = workbook.addWorksheet(sheet);
  worksheet.columns = headers.map((header) => header.label).map((h) => ({ h, header: h }));
  worksheet.columns.forEach((column) => {
    column.width = headers.map((item) => item.label.length).reduce((a, b) => Math.max(a, b), 0) + 10;
  });

  rows.forEach((row) => {
    let rowValues: any[] = [];
    if (isUser(row)) {
      rowValues = headers.map((header) => row[header.key as keyof User]);
      worksheet.addRow(rowValues);
    } else if (isFormattedBranch(row)) {
      rowValues = headers.map((header) => row[header.key as keyof FormattedBranch]);
      worksheet.addRow(rowValues);
    } else if (isFormattedVehicle(row)) {
      rowValues = headers.map((header) => row[header.key as keyof FormattedVehicle]);
      worksheet.addRow(rowValues);
    } else if (isSupply(row)) {
      rowValues = headers.map((header) => row[header.key as keyof Supply]);
      worksheet.addRow(rowValues);
    }
  });

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${sheet}.xlsx`);
  });

  function isUser(row: any): row is User {
    return (row as User).email !== undefined;
  }

  function isFormattedBranch(row: any): row is FormattedBranch {
    return (row as FormattedBranch).location !== undefined;
  }

  function isFormattedVehicle(row: any): row is FormattedVehicle {
    return (row as FormattedVehicle).brand !== undefined;
  }

  function isSupply(row: any): row is Supply {
    return (row as Supply).category !== undefined;
  }

  return workbook.xlsx.writeBuffer();
}
