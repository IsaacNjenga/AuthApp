import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Swal from "sweetalert2";
import axios from "axios";

function UseFetchUser() {
  const { user } = useContext(UserContext);
  
  const [userData, setUserData] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const id = user;

  useEffect(() => {
    const fetchUser = async () => {
      setUserLoading(true);
      if (!id) {
        console.warn("No user ID found, skipping request.");
        return;
      }
      try {
        const res = await axios.get(`get-profile?id=${id}`);
        if (res.data.success) {
          setUserData(res.data.user);
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : "An unexpected error occurred. Please try again later.";

        Swal.fire({
          icon: "warning",
          title: "Error",
          text: errorMessage,
        });
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, [user, refreshKey]);

  return {
    userData,
    userLoading,
    refreshKey: () => setRefreshKey((prev) => prev + 1),
  };
}

export default UseFetchUser;
