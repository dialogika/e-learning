import React, { useState, useEffect } from "react";

const dummyEnrollments = [
  {
    id: 1,
    title: "Mastering Public Speaking",
    instructor: "Jane Doe",
    status: "Active",
  },
  {
    id: 2,
    title: "Effective Communication Skills",
    instructor: "John Smith",
    status: "Completed",
  },
  {
    id: 3,
    title: "Overcoming Stage Fright",
    instructor: "Emily Clark",
    status: "Active",
  },
];

const MyEnrollmen = () => {
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setEnrollments(dummyEnrollments);
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">My Enrollments</h1>
      <div className="space-y-4">
        {loading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4 flex items-center animate-pulse">
                <div className="h-12 w-12 bg-gray-200 rounded mr-4" />
                <div className="flex-1">
                  <div className="h-5 w-1/2 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-1/3 bg-gray-100 rounded" />
                </div>
                <div className="h-8 w-20 bg-gray-200 rounded ml-4" />
              </div>
            ))
          : enrollments.map((enroll) => (
              <div key={enroll.id} className="bg-white rounded-lg shadow p-4 flex items-center">
                <div className="h-12 w-12 bg-blue-100 rounded flex items-center justify-center font-bold text-blue-600 mr-4">
                  {enroll.title.split(" ")[0][0]}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">{enroll.title}</div>
                  <div className="text-gray-500 text-sm">by {enroll.instructor}</div>
                </div>
                <span className={`ml-4 px-4 py-1 rounded-full text-sm font-medium ${enroll.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                  {enroll.status}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default MyEnrollmen;
