import React, { Component } from "react";
import adminService from "../services/adminService";
import PageHeader from "./common/pageHeader";
import Table from "./common/table";
import { toast } from "react-toastify";
import AddInput from "./common/addInput";

class AdminView extends Component {
  state = {};

  async getTablesAndUpdateState() {
    try {
      const instrumentsPayload = await adminService.getTable("instruments");
      await this.addToState("instruments", instrumentsPayload.data);
      const districtPayload = await adminService.getTable("district");
      await this.addToState("district", districtPayload.data);
      const musiciansPayload = await adminService.getTable("musicians");
      await this.addToState("musicians", musiciansPayload.data);
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Failed to retrieve table data from server", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }

  addToState(tableName, tableData) {
    if (tableData.length) {
      const keys = Object.keys(tableData[0]);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === "password") {
          delete tableData[0][keys[i]];
        }
      }

      this.setState({
        [tableName]: tableData,
      });
    }
  }

  async componentDidMount() {
    await this.getTablesAndUpdateState();
  }

  handleDelete = async (tableName, rowId) => {
    try {
      await adminService.deleteById(tableName, rowId);

      this.setState({
        [tableName]: this.state[tableName].filter((row) => row.id !== rowId),
      });
      toast.success(`Deleted row successfully from ${tableName} table `, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Failed to delete data from server", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  handleAdd = async (item, tableName) => {
    try {
      await adminService.addItem(item, tableName);
      toast.success(`${item} added successfully to ${tableName} table`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const payload = await adminService.getTable(tableName);
      await this.addToState(tableName, payload.data);
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Could not add Item to table", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  handleAdmin = async (access_level, rowId) => {
    try {
      if (access_level === 1) {
        //demote
        await adminService.demoteAdmin(rowId);

        this.setState({
          musicians: this.state.musicians.map((row) => {
            if (row.id === rowId) {
              return { ...row, access_level: 2 };
            }
            return row;
          }),
        });
      } else {
        // promote
        await adminService.promoteAdmin(rowId);

        this.setState({
          musicians: this.state.musicians.map((row) => {
            if (row.id === rowId) {
              return { ...row, access_level: 1 };
            }
            return row;
          }),
        });
      }
      toast.success(`Updated access successfuly `, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch {
      toast.error("Failed to update access", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  render() {
    const { instruments, district, musicians } = this.state;
    return (
      <>
        <PageHeader Header="Welcome Admin" />

        <AddInput
          tableName="instruments"
          validation={(input) => {
            if (input.length < 2) {
              return "input must be at least two characters long";
            }
            if (input.length > 30) {
              return "input must be less than 30 characters long";
            }
          }}
          preMessage="Add to Instruments table:"
          submitButtonText="Add Instrument"
          onSubmit={(input, tableName) => this.handleAdd(input, tableName)}
        />
        <AddInput
          tableName="district"
          validation={(input) => {
            if (input.length < 2) {
              return "input must be at least two characters long";
            }
            if (input.length > 30) {
              return "input must be less than 30 characters long";
            }
          }}
          preMessage="Add to district table:"
          submitButtonText="Add district"
          onSubmit={(input, tableName) => this.handleAdd(input, tableName)}
        />

        <Table
          tableHeader={"instruments"}
          tableData={instruments}
          onHandleDelete={this.handleDelete}
        ></Table>
        <Table
          tableHeader={"district"}
          tableData={district}
          onHandleDelete={this.handleDelete}
        ></Table>
        <Table
          tableHeader={"musicians"}
          tableData={musicians}
          onHandleDelete={this.handleDelete}
          onHandleAdmin={this.handleAdmin}
        ></Table>
      </>
    );
  }
}

export default AdminView;
