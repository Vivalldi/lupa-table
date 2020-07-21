import * as React from "react";
import {
  useData,
  useFeatures,
  useShape,
  dataIsRowArray,
  dataIsAsyncMethod,
  Row,
  Feature,
} from "@lupa/lupa";
import { useTable } from "react-table";

export const LupaTable = () => {
  const data = useData();
  const features = useFeatures();
  const shape = useShape();

  if (dataIsAsyncMethod(data)) {
    return <AsyncMethodTable data={data} features={features} shape={shape} />;
  }

  if (dataIsRowArray(data)) {
    return <RowArrayTable data={data} features={features} shape={shape} />;
  }

  throw new Error("data has an unknown type/shape");
};

const RowArrayTable = ({ data, features, shape }: RowArrayTableProps) => {
  const ddata = React.useMemo(() => data, [data]);

  const [height, width] = shape;

  const columns = React.useMemo(
    () => features.map((f) => ({ Header: f.key, accessor: f.key })),
    [features]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: ddata });

  return (
    <div>
      <div>Rows: {height}</div>
      <div>Columns: {width}</div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <th {...col.getHeaderProps()}>{col.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

interface RowArrayTableProps {
  data: Row[];
  features: Feature[];
  shape: [number, number];
}

const AsyncMethodTable = ({ data, features, shape }: AsyncMethodTableProps) => {
  const [localData, setLocalData] = React.useState<Row[]>([]);

  const reloadData = React.useCallback(() => {
    (async () => {
      const d = await data();
      setLocalData(d);
    })();
  }, [data]);

  return (
    <div>
      <button onClick={reloadData}>Load data</button>
      <RowArrayTable data={localData} features={features} shape={shape} />
    </div>
  );
};

interface AsyncMethodTableProps {
  data: () => Promise<Row[]>;
  features: Feature[];
  shape: [number, number];
}
