import { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
const FaqContext = createContext();
const TeamContext = createContext();
const RevivewContext = createContext();
const BlogContext = createContext();

export const ContextProvider = ({ children }) => {
  const { adminDetails } = useSelector((state) => state.admin);
  const [faqs, setFaqs] = useState([]);
  const [teams, setTeams] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch(`api/backend8/get-faqs`);
        const data = await res.json();
        // console.log("Data Fetching", data);
        if (!res.ok) {
          console.error(data.message || "Failed to fetch users.");
        } else {
          setFaqs(data.faqs);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchFaqs();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/backend9/getTeams`);
        const data = await res.json();
        if (!res.ok) {
          console.error(data.message || "Failed to fetch Teams.");
        } else {
          setTeams(data.teams);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchUsers();
  }, [adminDetails.isAdmin]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/backend10/getReview`);
        const data = await res.json();
        if (!res.ok) {
          console.error(data.message || "Failed to fetch Review.");
        } else {
          setReviews(data.review);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchReviews();
  }, []);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/backend11/getBlogs`);
        const data = await res.json();
        if (!res.ok) {
          console.error(data.message || "Failed to fetch blogs.");
        } else {
          setBlogs(data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <BlogContext.Provider value={{ blogs }}>
      <RevivewContext.Provider value={{ reviews }}>
        <FaqContext.Provider value={{ faqs }}>
          <TeamContext.Provider value={{ teams }}>
            {children}
          </TeamContext.Provider>
        </FaqContext.Provider>
      </RevivewContext.Provider>
    </BlogContext.Provider>
  );
};

export const useFaqs = () => useContext(FaqContext);
export const useTeams = () => useContext(TeamContext);
export const useReview = () => useContext(RevivewContext);
export const useBlog = () => useContext(BlogContext);
