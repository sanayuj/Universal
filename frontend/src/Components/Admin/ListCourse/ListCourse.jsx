import React, { useEffect, useState } from "react";
import "./ListCourse.css";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import Modal from "react-modal";

import { getAllCourse, deleteCourse } from "../../../Services/adminApi";
import Sidebar from "../SideBar/SideBar";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export default function ListCourse() {
  const navigate = useNavigate();
  const [Course, setCourse] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [Loading, setLoading] = useState(true);

  const OpenDeleteModal = (courseId) => {
    setCourseId(courseId);

    setShowModal(true);
    console.log(showModal, "dsfsdf");
  };

  const closeDeleteModal = () => {
    setCourseId(null);
    setShowModal(false);
  };

  const confirmDelete = async () => {
    try {
      const { data } = await deleteCourse(courseId);
      setShowModal(false);
      if (data.status) {
        toast.success(data.message);
        const updatedCourse = Course.filter((value) => {
          if (value._id !== courseId) {
            return value;
          }
        });
        setCourse(updatedCourse);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete course.");
    }
  };

  useEffect(() => {
    // Fetch users and update the state
    const fetchCourse = async () => {
      try {
        const response = await getAllCourse();
        setCourse(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch course:", error);
      }
    };

    fetchCourse();
  }, []);
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // Returns a formatted date string
  };
  if (!Loading) {
    return (
      <div>
        <AdminNavBar />
        <Sidebar />
        <div className="content-div">
          <h3>Course</h3>
          {Course?.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">About</th>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Durations</th>
                  <th scope="col">Language</th>
                  <th scope="col">Price</th>
                  <th scope="col">Created</th>
                  <th scope="col">Chapter</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {Course &&
                  Course.map((courses) => (
                    <tr key={courses?._id}>
                      <td>
                        <img
                          className="courseImg"
                          src={`${process.env.REACT_APP_BASE_URL}/${courses?.image}`}
                        ></img>
                      </td>

                      <td>{courses?.name}</td>
                      <td>{courses?.about}</td>
                      <td>{courses?.description}</td>
                      <td>{courses?.category}</td>
                      <td>{courses?.duration}</td>
                      <td>{courses?.language}</td>
                      <td>{courses?.price}</td>

                      <td>{formatDate(courses?.createAt)}</td>
                      <td>
                        {courses?.chapters.map((chapter, index) => (
                          <div key={chapter?.chapterId}>
                            <p>
                              {index + 1}.{chapter?.chapter}
                            </p>
                          </div>
                        ))}
                      </td>
                      <td>
                        <div>
                          <button
                            className="EditBtn"
                            onClick={() =>
                              navigate(`/admin/courseEdit/${courses?._id}`)
                            }
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => OpenDeleteModal(courses?._id)}
                            className="DeleteBtn"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="no-users">No Course found.</p>
          )}
        </div>

        {/* <MODAL> */}
        <Modal
          isOpen={showModal}
          onRequestClose={closeDeleteModal}
          className="delete-modal"
          overlayClassName="delete-modal-overlay"
          ariaHideApp={false}
        >
          <h2>Confirmation</h2>
          <p>Are you sure you want to delete this course?</p>

          <div className="modal-buttons">
            <button className="DeleteBtn" onClick={confirmDelete}>
              Confirm
            </button>
            <button className="cancel-button" onClick={closeDeleteModal}>
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    );
  } else {
    return (
      <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}
