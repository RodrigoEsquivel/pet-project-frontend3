import { Spinner, ResponsiveContext, Box } from "grommet";
import * as queryString from "query-string";
import { Wrapper } from "../../components/CommonComponents";
import { getFacebookUserData } from "../../utils/facebook";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { request } from "../../utils/request";
import Cookies from "universal-cookie";
import { useAuth } from "../../utils/useAuth";

export function FacebookLoginPage() {
  const urlParams = queryString.parse(window.location.search);
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    if (urlParams.code) {
      getFacebookUserData(urlParams.code).then((data) => {
        const Email: string = data["email"];
        const requestHeaders = new Headers();
        requestHeaders.append(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );

        const urlencoded = new URLSearchParams();
        urlencoded.append("Email", Email);

        const requestOptions = {
          method: "POST",
          headers: requestHeaders,
          body: urlencoded,
          redirect: "follow",
        };
        request("http://localhost:9100/user/validateEmail", requestOptions)
          .then((loginData) => {
            const cookies = new Cookies();
            cookies.set("token", loginData["token"], { path: "/" });
            cookies.set("user_id", loginData["userData"]["id"], { path: "/" });
            auth?.signIn({
              token: loginData["token"],
              userID: loginData["userData"]["id"],
            });
            navigate("/Buyer");
          })
          .catch((error) => {
            navigate("/CompleteFacebookSignUp", {
              state: {
                email: data["email"],
                name: data["first_name"],
                lastName: data["last_name"],
              },
            });
          });
      });
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Wrapper overflow="auto">
          <Box
            responsive={true}
            fill="vertical"
            align="center"
            pad="xlarge"
            gap="medium"
            justify="center"
            background={{ color: "#f7f1e3", opacity: "medium" }}
          >
            <Spinner color="#84817a" size="xlarge" />
          </Box>
        </Wrapper>
      )}
    </ResponsiveContext.Consumer>
  );
}
