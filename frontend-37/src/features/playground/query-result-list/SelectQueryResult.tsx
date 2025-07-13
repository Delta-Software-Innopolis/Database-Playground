import { QueryData } from "../types";

interface SelectQueryResultProps {
  queryData: QueryData;
}

export function SelectQueryResult({ queryData }: SelectQueryResultProps) {
  if (!queryData.columns) {
    return <pre>{JSON.stringify(queryData, null, 2)}</pre>;
  }

  console.log(queryData);

  const nums = [];
  for (let i = 0; i < queryData.data[queryData.columns[0]].length; i++) {
    nums.push(i);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            {queryData.columns.map((col) => (
              <td key={col}>{col}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {nums.map((index) => (
            <tr key={index}>
              {queryData.columns.map((key) => (
                <td key={queryData.data[key][index]}>
                  {queryData.data[key][index]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
