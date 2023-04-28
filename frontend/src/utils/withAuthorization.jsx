import React, { useEffect } from "react";
import useAxios from "../utils/useAxios";
import { useNavigate } from "react-router-dom";

function withAuthorization(WrappedComponent, level) {
  function AuthorizationCheck(props) {
    const api = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await api.get("/accounts/get_level/");
          if (response.data.current_level !== level) {
            navigate(`/level${response.data.current_level}`);
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }, [api, props, level]);

    return <WrappedComponent {...props} />;
  }

  return AuthorizationCheck;
}

export default withAuthorization;
