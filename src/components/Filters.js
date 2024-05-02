// Correct import path for Filters component
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

const Filters = ({
  setFilteredJobs,
  jobs,
  applyFilters,
  setFilters,
  filters,
  loadJobs,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div style={{ display: "flex" }}>
      <Box sx={{ m: 2 }}>
        <input
          type="text"
          name="minExperience"
          value={filters.minExperience}
          onChange={handleChange}
          placeholder="Min Experience"
        />
      </Box>
      <Box sx={{ m: 2 }}>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="Location"
        />
      </Box>
      <Box sx={{ m: 2 }}>
        <input
          type="text"
          name="remoteOnSite"
          value={filters.remoteOnSite}
          onChange={handleChange}
          placeholder="Remote/On-Site"
        />
      </Box>

      <Box sx={{ m: 2 }}>
        <input
          type="text"
          name="role"
          value={filters.role}
          onChange={handleChange}
          placeholder="Role"
        />
      </Box>

      <Box sx={{ m: 2 }}>
        <input
          type="text"
          name="minBasePay"
          value={filters.minBasePay}
          onChange={handleChange}
          placeholder="Min Base Pay"
        />
      </Box>

      <Box sx={{ m: 2 }}>
      <button onClick={loadJobs}>Apply Filters</button>
      </Box>
    </div>
  );
};

export default Filters;
