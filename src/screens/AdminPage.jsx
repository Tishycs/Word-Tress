import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../BaseUrl";
import secondsToMinutesAndSeconds from "../utilities/formatTime";

const AdminPage = () => {
  const navigate = useNavigate();

  let isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  let adminPass = JSON.parse(localStorage.getItem("adminPass"));

  const [usersDetails, setUsersDetails] = useState([]);

  const getUsers = async () => {
    const res = await axios
      .get(`${BaseUrl}/auth/users`, {
        headers: { adminPass },
      })
      .catch((err) => {
        return alert(err.response.data.message);
      });
    setUsersDetails(res.data);
  };

  useEffect(() => {
    if (isAdmin) getUsers();
  }, []);

  useEffect(() => {
    if (!isAdmin) return navigate("/login");
  }, [isAdmin]);

  return (
    <div className="dashboard">
      <div className="dashnavbar">
        <div className="totalusers">
          <span>Total Users : </span> <span>{usersDetails.length}</span>
        </div>
        <div className="logout-btn">
          <p
            onClick={() => {
              localStorage.removeItem("isAdmin");
              localStorage.removeItem("adminPass");
              window.location.reload();
            }}
          >
            Logout
          </p>
        </div>
      </div>
      <div className="Thedashboard">
        <div className="adminHeadBox">
          <p className="adminUserHeader">Username</p>
          <p className="adminHeader">Time used</p>
          <p className="adminHeader">Level</p>
          <p className="adminHeader ">Result</p>
          <p className="adminHeader ">Wrong Attempts</p>
        </div>

        {usersDetails.map((user) => (
          <div className="adminBox">
            <div className="admin">
              <div className="profile">
                <i>
                  <FaRegUserCircle size={45} />
                </i>
              </div>
              <div className="dashpara1">{user.fullname}</div>
            </div>

            <div className="timestamp">
              <p className="dashpara">
                {secondsToMinutesAndSeconds(
                  300 - user.puzzleProgress.timeRemaining
                )}
              </p>
            </div>

            <div className="level">
              <p className="dashpara">{user.puzzleProgress.level}</p>
            </div>

            <div className="hintUsed">
              <p className="dashpara">
                {user.puzzleProgress.result?.toUpperCase()}
              </p>
            </div>
            <div className="hintUsed">
              <p className="dashpara">{user.puzzleProgress.wrongAttempts}/2</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
