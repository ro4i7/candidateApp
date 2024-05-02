const apiUrl = 'https://api.weekday.technology/adhoc/getSampleJdJSON';

export const fetchJobs = async (offset, limit = 10) => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ offset, limit })
  });

  const data = await response.json();

  console.log(data)
  return data.jdList || [];
};

export const fetchJobsWithFilters = async (filters) => {
  // Construct the API request with filters
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ filters })
  });

  const data = await response.json();
  return data.jdList || [];
};
