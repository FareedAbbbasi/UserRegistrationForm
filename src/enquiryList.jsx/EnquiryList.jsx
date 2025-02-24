import React from "react";
import { Table } from "flowbite-react";
import axios from "axios";
import { toast } from "react-toastify";

export const EnquiryList = ({ data, getAllEnquires, Swal, setFormData }) => {
  let deleteRow = (delid) => {
    Swal.fire({
      title: "Do you want to save the Data?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`)
          .then((res) => {
            // toast.success("Enquiry Deleted successfully");
            getAllEnquires();
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  let editeRow=(edited) => {
    axios.get(`http://localhost:8020/api/website/enquiry/single/${edited}`)
    .then((res)=>{
      let data  = res.data
      setFormData(data.enquiry)
    })
  }
  return (
    <div className="bg-gray-200 text-[20px] font-bold p-4">
      <h2 className="text-[20px] font-bold py-4 mb-4">Enquiry List</h2>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Sr No</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Message</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.length >= 1 ? (
              data.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell>{item.phone}</Table.Cell>
                    <Table.Cell>{item.message}</Table.Cell>
                    <Table.Cell>
                      <button
                        onClick={() => deleteRow(item._id)}
                        className="bg-red-500 text-white px-4 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </Table.Cell>
                    <Table.Cell>
                      <button onClick={()=> editeRow(item._id)} className="bg-red-500 text-white px-4 py-1 rounded-md">
                        Edite
                      </button>
                    </Table.Cell>
                  </tr>
                );
              })
            ) : (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell colSpan={7} className="text-center">
                  No Data Found
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
