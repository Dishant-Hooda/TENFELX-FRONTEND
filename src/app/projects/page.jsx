"use client";
import React, { useState } from "react";
import { ArrowUpRight, Users, Clock } from "lucide-react";

const ProjectPage = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [showModal, setShowModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [currentBidIndex, setCurrentBidIndex] = useState(null);
  const [expandedBids, setExpandedBids] = useState({});

  const [projects, setProjects] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("projects");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure each project has a `bids` array
        return parsed.map((p) => ({ ...p, bids: p.bids || [] }));
      }
    }
    return [];
  });

  const handleAddProject = (e) => {
    e.preventDefault();

    const getMultipleValues = (select) =>
      Array.from(select.selectedOptions).map((opt) => opt.value);

    const newProject = {
      title: e.target.title.value,
      description: e.target.description.value,
      postDate: e.target.postDate.value,
      deadline: e.target.deadline.value,
      budget: e.target.budget.value,
      tags: getMultipleValues(e.target.tags),
      skills: getMultipleValues(e.target.skills),
      postedBy: "Dishant Hooda",
      datePosted: new Date().toISOString().slice(0, 10),
      bids: [],
    };

    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setShowModal(false);
  };

  const toggleBids = (index) => {
    setExpandedBids((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="main mt-[87px]">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
        <div className="bg-white rounded-xl shadow-sm p-5 border flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Active Projects</p>
            <h2 className="text-2xl font-bold">{projects.length}</h2>
          </div>
          <ArrowUpRight className="text-blue-500" />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Freelancers</p>
            <h2 className="text-2xl font-bold">15,234</h2>
          </div>
          <Users className="text-green-600" />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Avg. Response Time</p>
            <h2 className="text-2xl font-bold">2.4 hrs</h2>
          </div>
          <Clock className="text-purple-500" />
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full flex justify-center mt-20">
        <div className="bg-gray-100 p-2 rounded-md inline-flex">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-2 rounded-md font-medium ${
              activeTab === "projects"
                ? "bg-white text-black shadow"
                : "text-gray-500"
            }`}
          >
            Browse Projects
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-6 py-2 rounded-md font-medium ${
              activeTab === "categories"
                ? "bg-white text-black shadow"
                : "text-gray-500"
            }`}
          >
            Categories
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6 space-y-4">
        {/* Post Project Modal */}
        {showModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[90%] sm:w-[500px] max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Post New Project</h2>
              <form onSubmit={handleAddProject} className="space-y-4">
                <input
                  name="title"
                  required
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                />
                <textarea
                  name="description"
                  required
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="date"
                  name="postDate"
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  type="date"
                  name="deadline"
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  name="budget"
                  required
                  placeholder="Budget ₹"
                  className="w-full p-2 border rounded"
                />
                <select
                  name="tags"
                  multiple
                  className="w-full p-2 border rounded h-[100px]"
                >
                  {[
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "React",
                    "Python",
                    "Next.js",
                    "Node.js",
                  ].map((tag) => (
                    <option key={tag}>{tag}</option>
                  ))}
                </select>
                <select
                  name="skills"
                  multiple
                  className="w-full p-2 border rounded h-[100px]"
                >
                  {[
                    "Frontend",
                    "Backend",
                    "Full Stack",
                    "UI/UX",
                    "Database",
                    "API Integration",
                  ].map((skill) => (
                    <option key={skill}>{skill}</option>
                  ))}
                </select>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bid Modal */}
        {showBidModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[90%] sm:w-[400px]">
              <h2 className="text-xl font-bold mb-4">Place Your Bid</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const name = e.target.name.value;
                  const amount = e.target.amount.value;
                  const updated = [...projects];
                  updated[currentBidIndex].bids.push({
                    name,
                    amount,
                    time: new Date().toLocaleTimeString(),
                  });
                  setProjects(updated);
                  localStorage.setItem("projects", JSON.stringify(updated));
                  setShowBidModal(false);
                }}
                className="space-y-4"
              >
                <input
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full p-2 border rounded"
                />
                <input
                  name="amount"
                  type="number"
                  required
                  placeholder="Bid Amount ₹"
                  className="w-full p-2 border rounded"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowBidModal(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects */}
        {activeTab === "projects" && (
          <div className="bg-white shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Latest Projects</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-black text-white px-5 py-2 rounded"
              >
                Post Project
              </button>
            </div>

            {projects.map((project, index) => (
              <div key={index} className="border rounded-xl p-5 mb-6 shadow-sm">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-gray-500 mb-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <span>Deadline: {project.deadline}</span>
                  <span>Budget: ₹{project.budget}</span>
                  <span>{project.bids?.length || 0} bids</span>

                  <button
                    onClick={() => {
                      setCurrentBidIndex(index);
                      setShowBidModal(true);
                    }}
                    className="bg-black text-white px-4 py-1 rounded"
                  >
                    Place Bid
                  </button>
                </div>

                {/* Bids */}
                {project.bids.length > 0 && (
                  <div className="mt-4 bg-gray-50 p-4 rounded-md">
                    <h4 className="font-semibold mb-2">Bids</h4>

                    {/* Show latest bid only */}
                    <div className="bg-white p-2 rounded-md border shadow-sm flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          {project.bids[project.bids.length - 1].name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Bid: ₹{project.bids[project.bids.length - 1].amount}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {project.bids[project.bids.length - 1].time}
                      </span>
                    </div>

                    {/* View all toggle */}
                    {project.bids.length > 1 && (
                      <button
                        onClick={() => toggleBids(index)}
                        className="mt-2 text-sm text-blue-600 hover:underline"
                      >
                        {expandedBids[index]
                          ? "Hide all bids"
                          : `View all ${project.bids.length} bids`}
                      </button>
                    )}

                    {/* All bids (except last one) */}
                    {expandedBids[index] && (
                      <div className="space-y-2 mt-3">
                        {project.bids
                          .slice(0, project.bids.length - 1)
                          .map((bid, i) => (
                            <div
                              key={i}
                              className="bg-white p-2 rounded-md border shadow-sm flex justify-between items-center"
                            >
                              <div>
                                <p className="font-medium">{bid.name}</p>
                                <p className="text-sm text-gray-500">
                                  Bid: ₹{bid.amount}
                                </p>
                              </div>
                              <span className="text-xs text-gray-400">
                                {bid.time}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Categories */}
        {activeTab === "categories" && (
          <div className="bg-white p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Web Development",
                "Mobile Apps",
                "UI/UX Design",
                "Data Science",
                "Digital Marketing",
                "Content Writing",
                "Graphic Design",
                "Video Editing",
              ].map((category) => (
                <div
                  key={category}
                  className="border rounded-xl p-6 hover:shadow-md transition text-center"
                >
                  <div className="inline-block border px-4 py-1 rounded-full font-semibold text-sm">
                    {category}
                  </div>
                  <p className="text-gray-500 text-sm mt-2">125+ projects</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
