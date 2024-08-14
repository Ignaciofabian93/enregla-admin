import { Pagination } from "@nextui-org/pagination";
import CustomSelect from "./select";

type PaginationProps = {
  page: number;
  totalpages: number;
  rows: number;
  handleRows: (value: number) => void;
  handlePage: (value: number) => void;
  totalData: number;
};

const rowOptions = [
  { key: "10", label: "10" },
  { key: "20", label: "20" },
  { key: "50", label: "50" },
];

export default function CustomPagination({
  page,
  totalpages,
  rows,
  handlePage,
  handleRows,
  totalData,
}: PaginationProps) {
  return (
    <div className="w-full h-[10%] flex items-center justify-center relative">
      <Pagination
        aria-label="pagination"
        total={totalpages}
        initialPage={1}
        page={page}
        onChange={handlePage}
        radius="sm"
        classNames={{ cursor: "bg-slate-800 text-[#fff]" }}
      />
      <div className="w-[18%] absolute right-0 flex items-center">
        <span className="font-semibold text-[14px] text-white w-[80px] mr-[2%]">Total: {totalData}</span>
        <CustomSelect
          options={rowOptions}
          value={[rows.toString()]}
          onChange={(e) => handleRows(parseInt(e.target.value))}
          placeholder="Filas"
          size="sm"
        />
      </div>
    </div>
  );
}
