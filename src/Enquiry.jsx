import React, { useEffect, useState } from "react";
import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import { EnquiryList } from "./enquiryList.jsx/EnquiryList";
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from "axios";

export default function Enquiry() {
  let [enquiryList, setEnquiryList] = useState([])
  let [userformdata, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  let saveEnquiry = (e) => {
    e.preventDefault();
    // let formData={
    //   name: e.target.name.value, 
    //   email: e.target.email.value,
    //   phone: e.target.phone.value,
    //   message: e.target.message.value
    // }

    axios
      .post("http://localhost:8020/api/website/enquiry/insert", userformdata)
      .then((res) => {
        console.log(res.data);
        getAllEnquires();
        toast.success("Enquiry Saved Successfully")
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  let getAllEnquires = () => {
    axios.get('http://localhost:8020/api/website/enquiry/view')
    .then((res) => {
      return res.data
    })
    .then((finalData) => {
      if(finalData.status) {
        setEnquiryList(finalData.enquiryList)
      }
    })
  }

  let getValue = (e) => {
    let inputName = e.target.name; // name
    let inputValue = e.target.value; // p
    let oldData = { ...userformdata };

    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

useEffect(()=> {
  getAllEnquires();
}, [])

  return (
    <div className="px-10">
      <ToastContainer />
      <h1 className="text-[40px] text-center py-6 font-bold">User Enquiry</h1>
      {/* form section */}
      <div className="grid grid-cols-[30%_auto] gap-10">
        <div className="bg-gray-200 text-[20px] font-bold p-4">
          <h2 className="text-[20px] font-bold">Enquiry Form</h2>

          <form action="" onSubmit={saveEnquiry}>
            <div className="py-3">
              <Label htmlFor="name" value="Name" />
              <TextInput
                type="text"
                value={userformdata.name}
                onChange={getValue}
                name="name"
                placeholder="Enter Your Name"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="email" value="Email" />
              <TextInput
                type="email"
                value={userformdata.email}
                onChange={getValue}
                name="email"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="phone" value="Phone" />
              <TextInput
                type="text"
                value={userformdata.phone}
                onChange={getValue}
                name="phone"
                placeholder="Enter Your Phone Number"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="message" value="Message" />
              <Textarea
                type="text"
                value={userformdata.message}
                onChange={getValue}
                name="message"
                placeholder="Message..."
                required
                rows={4}
              />
            </div>
            <div className="py-3">
              <Button className="w-[100%]" type="submit">
                Saved
              </Button>
            </div>
          </form>
        </div>
        {/* table section */}
        <EnquiryList data={enquiryList} getAllEnquires={getAllEnquires} Swal={Swal} setFormData={setFormData}/>
      </div>
    </div>
  );
}
