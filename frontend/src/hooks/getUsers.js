import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../redux/Slices/Conversations";
const GetUsers = (setConversations) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.value);
  const fetchUsers = async () => {
    try {
      const res = await fetch(`/api/users`);
      const result = await res.json();
      setConversations(result);
    } catch (error) {
      console.log(error);
    }
  };
  return { fetchUsers };
};
export default GetUsers;
