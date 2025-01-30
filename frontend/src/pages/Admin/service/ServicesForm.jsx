import { Button, Card, Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
export default function ServicesForm() {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("photo", file);
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);

    try {
      const res = await fetch("/api/backend7/service", {
        method: "POST",
        body: formDataObj,
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error("Failed to add service");
        return;
      } else {
        toast.success("Service added successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="mx-auto p-6 m-7 w-80 sm:w-[800px] bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold">Services Form</h2>
      <form onSubmit={handleSubmit} method="POST" enctype="multipart/form-data">
        <div className="mb-4">
          <Label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </Label>
          <TextInput
            id="title"
            type="text"
            placeholder="Enter a Title"
            className="mt-1 block"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 "
          >
            Description
          </Label>
          <Textarea
            id="description"
            type="text"
            placeholder="Enter a Description"
            className="mt-1 block p-3 "
            required
            onChange={handleChange}
            rows={6}
          />
          <TextInput
            type="file"
            id="image"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full mt-2 text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
          />
        </div>
        <Button type="submit" className=" bg-blue-950">
          Add Service
        </Button>
      </form>
    </div>
  );
}
