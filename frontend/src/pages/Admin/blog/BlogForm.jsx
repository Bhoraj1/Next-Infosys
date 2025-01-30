import {
  TextInput,
  Textarea,
  Button,
  Label,
  FileInput,
  Spinner,
} from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function BlogForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    image: null,
  });

  const handleInputChange = (e) => {
    if (e.target.type === "file") {
      // Update the file
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      // For other fields (name, department, bio, description)
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.title ||
      !formData.description ||
      !formData.image
    ) {
      toast.error("Please fill out all fields!");
      return;
    }

    // Create FormData for uploading to backend
    const blogData = new FormData();
    blogData.append("name", formData.name);
    blogData.append("title", formData.title);
    blogData.append("description", formData.description);
    blogData.append("image", formData.image);

    try {
      setLoading(true);
      const response = await fetch("/api/backend11/post-blog", {
        method: "POST",
        body: blogData,
      });

      const result = await response.json();
      if (response.ok) {
        setLoading(false);
        toast.success("Blog post successfully!");
      } else {
        setLoading(false);
        toast.error(result.error || "Error posting blog");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <Spinner size="xl" />
      </div>
    );
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl flex justify-center items-center font-bold mb-4">
        Create a New Blog Post
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="name" value="Posted By" />
          <TextInput
            id="name"
            placeholder="Enter your name"
            required
            className="mt-1"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="title" value="Title" />
          <TextInput
            id="title"
            placeholder="Enter the title of the blog post"
            required
            className="mt-1"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="description" value="Description" />
          <Textarea
            id="description"
            placeholder="Write your blog post description here"
            required
            className="mt-1"
            rows="4"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="image" value="Image" />
          <FileInput
            type="file"
            id="image"
            className="mt-1"
            accept="image/*"
            onChange={handleInputChange}
            required
          />
        </div>

        <Button type="submit" className="w-full mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
}
