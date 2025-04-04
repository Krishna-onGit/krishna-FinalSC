import React, { useEffect, useState } from "react";
import Navbar from "@/components/Shared/Navbar";
import Filtercard from "@/components/Actor/Filtercard";
import Job from "./JobCompo";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { HoverEffect } from "../ui/card-hover-effect";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    const isEmptyFilter =
      !searchedQuery ||
      Object.values(searchedQuery).every((arr) => arr.length === 0);

    if (isEmptyFilter) {
      setFilterJobs(allJobs);
      return;
    }

    const filteredJobs = allJobs.filter((job) => {
      const location = job.location?.toLowerCase() || "";
      const roleType = job.roleType?.toLowerCase() || "";
      const genre = job.genre?.toLowerCase() || "";
      const gender = job.gender?.toLowerCase() || "";
      const ageRange = job.ageRange?.toLowerCase() || "";

      return Object.entries(searchedQuery).some(([filterType, values]) => {
        if (!values || values.length === 0) return false;
        const lowerCaseValues = values.map((val) => val.toLowerCase());

        switch (filterType) {
          case "Location":
            return lowerCaseValues.includes(location);
          case "Role Type":
            return lowerCaseValues.includes(roleType);
          case "Genre":
            return lowerCaseValues.includes(genre);
          case "Gender":
            return lowerCaseValues.includes(gender);
          case "Age Range":
            return lowerCaseValues.includes(ageRange);
          default:
            return false;
        }
      });
    });

    setFilterJobs(filteredJobs);
    setCurrentPage(1); // Reset to first page when filters change
  }, [allJobs, searchedQuery]);

  // Pagination Logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filterJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-1/5">
            <Filtercard />
          </div>
          <div className="flex-1 min-h-screen">
            {currentJobs.length <= 0 ? (
              <span>Job not found</span>
            ) : (
              <>
                {/* <div className="grid grid-cols-3 gap-4">
                  {currentJobs.map((job) => (
                    <Job key={job._id} job={job} />
                  ))}
                </div> */}
                <HoverEffect
                  items={currentJobs.map((job) => ({
                    title: job.title,
                    description: job.description,
                    link: `/description/${job._id}`, // This is used for the motion link
                    component: <Job key={job._id} job={job} />, // We'll render this inside the card
                  }))}
                />

                {/* Pagination Controls */}
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    variant="outline"
                    className="mx-2 text-black"
                  >
                    Previous
                  </Button>
                  <span className="text-lg font-semibold">{currentPage}</span>
                  <Button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={indexOfLastJob >= filterJobs.length}
                    variant="outline"
                    className="mx-2 text-black"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
