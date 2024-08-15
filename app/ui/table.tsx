import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/table";
import { PenIcon } from "../assets/icons/pen";
import { TrashIcon } from "../assets/icons/trash";
import { User } from "../types/user";
import { Branch, FormattedBranch } from "../types/branch";
import { Vehicle } from "../types/vehicle";

type ColumnProps = {
  key: string;
  label: string;
};

type Rows = User[] | FormattedBranch[] | Vehicle[];

type TableProps = {
  columns: ColumnProps[];
  rows: Rows;
  handleEdit?: (id: number) => void;
  handleDelete?: (id: number) => void;
};

export default function CustomTable({ columns, rows, handleEdit, handleDelete }: TableProps) {
  return (
    <Table
      aria-label="table"
      isHeaderSticky
      radius="none"
      shadow="none"
      className="max-h-[90%] w-full no-scrollbar"
      classNames={{
        wrapper: "p-0 no-scrollbar text-white bg-transparent w-full",
        th: `text-center text-[14px] text-white font-semibold bg-slate-800`,
        td: "min-w-[60px] w-[80px] max-w-[80px] text-center text-[12px] text-white border-b-[1px] border-slate-600",
      }}
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {(columnKey) =>
              columnKey === "options" ? (
                <TableCell>
                  <div className="w-full flex items-center justify-center">
                    <span className="w-[30%] flex items-center justify-center" onClick={() => handleEdit!(row.id)}>
                      <PenIcon />
                    </span>
                    |
                    <span className="w-[30%] flex items-center justify-center" onClick={() => handleDelete!(row.id)}>
                      <TrashIcon />
                    </span>
                  </div>
                </TableCell>
              ) : (
                <TableCell>{getKeyValue(row, columnKey)}</TableCell>
              )
            }
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
