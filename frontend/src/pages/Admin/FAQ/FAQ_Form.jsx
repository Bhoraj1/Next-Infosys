import { Button, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import useLoading from "../../../hooks/useLoading";
import SpinnerComponent from "../../../hooks/SpinnerComponent";

export default function FAQForm() {
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const {setLoading,loading} = useLoading();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/backend8/add-faq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        setLoading(false);
        toast.error("FAQ Added Failed");
        return;
      } else {
        setLoading(false);
        toast.success("FAQ added successfully");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
       {loading && <SpinnerComponent />}
      <h2 className="text-2xl font-bold text-center text-gray-800 ">Add FAQ</h2>
      <form onSubmit={handleSubmit} className="m-7">
        <div className="mb-4">
          <label
            htmlFor="question"
            className="block max-auto text-gray-700 font-semibold mb-2 "
          >
            Question
          </label>
          <TextInput
            name="question"
            id="question"
            type="text"
            placeholder="Enter your question"
            className="w-full"
            onChange={handleInputChange}
          />
        </div>

        {/* Answer Field */}
        <div className="mb-6">
          <label
            htmlFor="answer"
            className="block text-gray-700 font-semibold mb-2"
          >
            Answer
          </label>
          <Textarea
            name="answer"
            id="answer"
            placeholder="Enter your answer"
            rows={4}
            className="w-full"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-center">
          <Button type="submit" className="w-full">
            Add FAQ
          </Button>
        </div>
      </form>
    </div>
  );
}
