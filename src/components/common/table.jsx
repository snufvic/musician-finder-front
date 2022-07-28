import React, { Component } from "react";
import musicianService from "../../services/musicianService";

class Table extends Component {
  state = {};

  connectedMusician = musicianService.getMusician();

  render() {
    const { tableHeader, tableData, onHandleDelete, onHandleAdmin } =
      this.props;
    const keys = tableData ? Object.keys(tableData[0]) : null;

    return keys ? (
      <>
        <hr />
        <h3>{tableHeader} table:</h3>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                {keys.map((key) => (
                  <th key={key} scope="col">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {tableData.map((rowData, index) => {
                return (
                  <tr key={rowData.id}>
                    <td>
                      {index + 1}
                      <button
                        type="button"
                        onClick={() => onHandleDelete(tableHeader, rowData.id)}
                        className="btn btn-sm btn-outline-dark mt-2 btn-danger mx-1"
                        title="Delete"
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                    {keys.map((key) => (
                      <td key={key}>
                        {rowData[key]}
                        {key === "access_level" &&
                        rowData.id !== this.connectedMusician.id ? (
                          <button
                            type="button"
                            onClick={() =>
                              onHandleAdmin(rowData.access_level, rowData.id)
                            }
                            className={
                              rowData.access_level === 2
                                ? "btn btn-sm btn-outline-dark mt-2 btn-success mx-1"
                                : "btn btn-sm btn-outline-dark mt-2 btn-warning mx-1"
                            }
                            title={
                              rowData.access_level === 2
                                ? "Promote to Admin"
                                : "Demote Admin"
                            }
                          >
                            {rowData.access_level === 2 ? (
                              <i className="bi bi-person-plus-fill"></i>
                            ) : (
                              <i className="bi bi-person-dash-fill"></i>
                            )}
                          </button>
                        ) : null}{" "}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    ) : (
      <>
        <hr />
        <h4>Could not find {tableHeader} table</h4>
      </>
    );
  }
}

export default Table;
