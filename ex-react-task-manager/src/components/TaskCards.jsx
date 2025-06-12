import React from "react";

function TaskCards({ task, index }) {
  let color = "";
  if (task.status === "To do") color = "table-danger";
  if (task.status === "Doing") color = "table-warning";
  if (task.status === "Done") color = "table-success";

  return (
    <>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>
          <Link to={`/task/${task.id}`}>{task.title}</Link>{" "}
          {/* <== link dinamico */}
        </td>
        <td>{task.createdAt}</td>
        <td className={color}>{task.status}</td>
      </tr>
    </>
  );
}

export default React.memo(TaskCards);
