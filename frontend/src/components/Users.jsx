import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../redux/Slices/Conversations";
import getMessages from "../hooks/getMessages";

const Users = ({ users }) => {
  const dispatch = useDispatch();
  const { onlineUsers } = useSelector((store) => store.onlineUser);

  const handlesubmit = async (item) => {
    dispatch(setUsers(item));
  };

  return (
    <div className="flex flex-col gap-3 ">
      {Array.isArray(users) && users?.length > 0 ? (
        users.map((item, index) => (
          <div
            className="flex items-center gap-5"
            key={index}
            onClick={() => handlesubmit(item)}
          >
            <div
              className={`avatar ${
                onlineUsers.includes(item._id) ? "online" : ""
              } w-8 h-8 rounded-full`}
            >
              <img className="" src={item.profilePhotoUrl} alt="" />
            </div>

            <p>{item.fullName}</p>
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Users;
