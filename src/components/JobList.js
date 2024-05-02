import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Filters from "./Filters";
import { fetchJobs, fetchJobsWithFilters } from "../services/jobService";
import "./JobList.css";

const JobList = () => {
  const [filters, setFilters] = useState({
    minExperience: "",
    companyName: "",
    location: "",
    remoteOnSite: "",
    techStack: "",
    role: "",
    minBasePay: "",
  });
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    const data = await fetchJobs((page - 1) * 10);
    setJobs((prevJobs) => [...prevJobs, ...data]);
    let filteredJob = jobs;
    if (filters.location !== "") {
        filteredJob = filteredJob.filter((job) =>
        job.location && job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.minExperience !== "") {
      filteredJob = jobs.filter((job) => job.minExp <= filters.minExperience);
    }
    if (filters.companyName !== "") {
        filteredJob = filteredJob.filter((job) =>job.companyName && job.companyName.toLowerCase().includes(filters.companyName.toLowerCase()));
      }
      if (filters.remoteOnSite !== "") {
        filteredJob = filteredJob.filter((job) =>job.remoteOnSite && job.remoteOnSite.toLowerCase().includes(filters.remoteOnSite.toLowerCase()));
      }
      if (filters.techStack !== "") {
        filteredJob = filteredJob.filter((job) =>job.techStack && job.techStack.toLowerCase().includes(filters.techStack.toLowerCase()));
      }
      if (filters.role !== "") {
        filteredJob = filteredJob.filter((job) =>job.role && job.role.toLowerCase().includes(filters.role.toLowerCase()));
      }
      if (filters.minBasePay !== "") {
        filteredJob = jobs.filter((job) =>job.minBasePay >= parseInt(filters.minBasePay));
      }

    setFilteredJobs(filteredJob);
    setLoading(false);
  };
  useEffect(() => {
    loadJobs();
  }, [page]);

  const handleInfiniteScroll = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleApplyFilters = async (filters) => {
    setLoading(true);
    const filteredJobs = await fetchJobsWithFilters(filters);
    setJobs(filteredJobs);
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <div>
      <Filters
        jobs={jobs}
        filters={filters}
        setFilters={setFilters}
        setFilteredJobs={setFilteredJobs}
        applyFilters={handleApplyFilters}
        loadJobs={loadJobs}
      />
      <div className="job-list-container">
        {filteredJobs.length !== 0
          ? filteredJobs.map((job, index) => <JobCard key={index} job={job} />)
          : jobs.map((job, index) => <JobCard key={index} job={job} />)}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default JobList;
