import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { User } from "../types/user";
import { FormattedBranch } from "../types/branch";

type Rows = User[] | FormattedBranch[];

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

  return workbook.xlsx.writeBuffer();
}
