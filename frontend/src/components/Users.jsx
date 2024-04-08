import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../redux/Slices/Conversations";
import getMessages from "../hooks/getMessages";

const Users = ({ users }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const { fetchMessages } = getMessages(user);

  const handlesubmit = async (item) => {
    dispatch(setUsers(item));
    await fetchMessages(item._id);
  };

  return (
    <div className="flex flex-col gap-3 ">
      {Array.isArray(users) && users.length > 0 ? (
        users.map((item, index) => (
          <div
            className="flex items-center gap-5"
            key={index}
            onClick={() => handlesubmit(item)}
          >
            <img
              className="w-8 h-8 rounded-full"
              src={item.profilePhotoUrl}
              alt=""
            />
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
