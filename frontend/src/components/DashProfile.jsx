import { useSelector } from "react-redux";
import { TextInput, Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { logout } from "../redux/adminRedux/adminSlice";
import IntroDash from "../pages/Admin/dashboard/IntroDash";
import { FiBarChart } from "react-icons/fi";
import BarChart from "../pages/Admin/dashboard/BarChart";

export default function DashProfile() {
  const { isAdmin, username, email } = useSelector(
    (state) => state.admin.adminDetails
  );
  const dispatch = useDispatch();

  // const handleChange = (e) => {};
  // const handleSubmit = async (e) => {};

  // const handleSignout = async () => {
  //   try {
  //     const res = await fetch("/api/admin/signout", {
  //       method: "POST",
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       console.error(data.message || "Failed to sign out");
  //     } else {
  //       localStorage.clear();
  //       dispatch(logout());
  //       toast.success(data.message);
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error("Sign out failed:", error);
  //   }
  // };

  return (
    // <div className="mx-auto max-w-lg w-full p-3">
    //   <h1 className=" p-3 font-semibold text-3xl text-center">{`Welcome ${username} 🌟`}</h1>
    //   <div className="flex flex-col justify-center items-center w-full h-full gap-2  ">
    //     <p className="text-lg text-gray-600 ">
    //       You're doing an amazing job! Keep up the great work. Your efforts make
    //       a real difference.
    //     </p>
    //     <p className="text-lg text-gray-500 p-4">
    //       Take a deep breath and enjoy the process!
    //     </p>
    //   </div>
    //   <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
    //     <TextInput
    //       type="text"
    //       id="username"
    //       defaultValue={username}
    //       placeholder="Username"
    //       onChange={handleChange}
    //     />
    //     <TextInput
    //       type="email"
    //       id="email"
    //       defaultValue={email}
    //       placeholder="Email"
    //       onChange={handleChange}
    //     />
    //     <TextInput
    //       type="password"
    //       id="password"
    //       placeholder="**********"
    //       onChange={handleChange}
    //     />
    //     <Button type="submit" gradientDuoTone="tealToLime" outline>
    //       Update Profile
    //     </Button>
    //     {isAdmin && (
    //       <Link to="/create-post">
    //         <Button
    //           type="button"
    //           gradientDuoTone="purpleToPink"
    //           className="w-full"
    //         >
    //           Create a Post
    //         </Button>
    //       </Link>
    //     )}
    //   </form>
    //   <div className="flex justify-between text-red-500 mt-5">
    //     <span className="cursor-pointer" onClick={handleSignout}>
    //       Sign Out
    //     </span>
    //   </div>
    // </div>
    <div className="max-w-4xl">
      <IntroDash />
      <BarChart />
    </div>
  );
}
