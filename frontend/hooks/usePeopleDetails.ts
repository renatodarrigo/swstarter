import { useQuery } from "@tanstack/react-query";

const fetchPeopleDetails = async (id: string) => {
  const response = await fetch(`http://localhost:3001/people/${id}`);
  const data = await response.json();
  return data;
};

export const usePeopleDetails = (id: string) => {
  return useQuery({
    queryKey: ["people", id],
    queryFn: () => fetchPeopleDetails(id),
  });
};
