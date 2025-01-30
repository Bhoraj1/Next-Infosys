import React, { useState } from "react";
import { toast } from "react-hot-toast";
import useLoading from "../../../hooks/useLoading";
import { Spinner } from "flowbite-react";
import { useSelector } from "react-redux";

export default function TeamForm() {
  const loading = useSelector((state) => state.loading.loading);
  const setLoading = useLoading();
  // Single state for all form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    department: "",
    bio: "",
    description: "",
    socialMedia: {
      linkedin: "",
      github: "",
      twitter: "",
      facebook: "",
    },
    image: null,
  });

  const handleInputChange = (e) => {
    if (e.target.type === "file") {
      // Update the file
      setFormData({ ...formData, image: e.target.files[0] });
    } else if (e.target.name.startsWith("socialMedia")) {
      // Update the specific social media field
      setFormData({
        ...formData,
        socialMedia: {
          ...formData.socialMedia,
          [e.target.name.split(".")[1]]: e.target.value.trim(),
        },
      });
    } else {
      // For other fields (name, department, bio, description)
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      phoneNumber,
      department,
      bio,
      description,
      socialMedia,
      image,
    } = formData;

    // Check for required fields
    if (
      !name ||
      !department ||
      !email ||
      !phoneNumber ||
      !bio ||
      !description ||
      !socialMedia ||
      !image
    ) {
      toast.error("All fields are required");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("department", department);
    formDataToSend.append("email", email);
    formDataToSend.append("phoneNumber", phoneNumber);
    formDataToSend.append("bio", bio);
    formDataToSend.append("description", description);
    formDataToSend.append("socialMedia", JSON.stringify(socialMedia));
    formDataToSend.append("image", image);

    try {
      setLoading(true);
      const response = await fetch("/api/backend9/add-team", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setLoading(false);
        toast.success("Team member added successfully!");
      } else {
        setLoading(false);
        toast.error("Something went wrong!");
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
    <div className=" mx-auto mt-3 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Add Team Member
      </h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Name and Department */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
              placeholder="Enter a Flll Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="department"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              onChange={handleInputChange}
              placeholder="Enter a post"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="department"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
              placeholder="Enter a email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="department"
            >
              PhoneNumber
            </label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              onChange={handleInputChange}
              placeholder="Enter a number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Bio */}
          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="bio"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              onChange={handleInputChange}
              placeholder="Enter a bio"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              onChange={handleInputChange}
              placeholder="Enter a description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
              required
            />
          </div>

          {/* Social Media */}
          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="linkedin"
            >
              LinkedIn
            </label>
            <input
              type="text"
              id="linkedin"
              name="socialMedia.linkedin"
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="LinkedIn URL"
            />
          </div>

          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="github"
            >
              GitHub
            </label>
            <input
              type="text"
              id="github"
              name="socialMedia.github"
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="GitHub URL"
            />
          </div>

          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="twitter"
            >
              Twitter
            </label>
            <input
              type="text"
              id="twitter"
              name="socialMedia.twitter"
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Twitter URL"
            />
          </div>

          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="facebook"
            >
              Facebook
            </label>
            <input
              type="text"
              id="facebook"
              name="socialMedia.facebook"
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Facebook URL"
            />
          </div>
        </div>

        {/* Image */}
        <div className="mb-2">
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="image"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleInputChange}
            className="mt-1 block w-full text-sm text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className=" px-4 py-2 text-white font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700"
        >
          Add Team Member
        </button>
      </form>
    </div>
  );
}
