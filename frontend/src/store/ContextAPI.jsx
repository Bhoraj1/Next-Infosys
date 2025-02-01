import { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useLoading from "../hooks/useLoading";
import { useLocation } from "react-router-dom";
const FaqContext = createContext();
const TeamContext = createContext();
const RevivewContext = createContext();
const BlogContext = createContext();
const LoaderContext = createContext();

export const ContextProvider = ({ children }) => {
  const { adminDetails } = useSelector((state) => state.admin);
  const [faqs, setFaqs] = useState([]);
  const [teams, setTeams] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const { setLoading, loading } = useLoading();

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`api/backend8/get-faqs`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          console.error(data.message || "Failed to fetch faqs.");
        } else {
          setLoading(false);
          setFaqs(data.faqs);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching users:", error);
      }
    };

    fetchFaqs();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/backend9/getTeams`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          console.error(data.message || "Failed to fetch Teams.");
        } else {
          setLoading(false);
          setTeams(data.teams);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching posts:", error);
      }
    };

    fetchUsers();
  }, [adminDetails?.isAdmin]);
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
    <LoaderContext.Provider value={{ loading, setLoading }}>
      <BlogContext.Provider value={{ blogs, setBlogs, setLoading }}>
        <RevivewContext.Provider value={{ reviews, setReviews, setLoading }}>
          <FaqContext.Provider value={{ faqs, setFaqs, setLoading }}>
            <TeamContext.Provider value={{ teams, setTeams, setLoading }}>
              {children}
            </TeamContext.Provider>
          </FaqContext.Provider>
        </RevivewContext.Provider>
      </BlogContext.Provider>
    </LoaderContext.Provider>
  );
};

export const useFaqs = () => useContext(FaqContext);
export const useTeams = () => useContext(TeamContext);
export const useReview = () => useContext(RevivewContext);
export const useBlog = () => useContext(BlogContext);
export const useLoader = () => useContext(LoaderContext);
