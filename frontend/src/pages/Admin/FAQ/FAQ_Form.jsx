import { Button, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FAQForm() {
  const [formData, setFormData] = useState({ question: "", answer: "" });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/backend8/add-faq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        toast.error("FAQ Added Failed");
        return;
      } else {
        toast.success("FAQ added successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto mt-7">
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
