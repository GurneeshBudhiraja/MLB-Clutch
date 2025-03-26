// @ts-nocheck
import { useEffect } from "react";

function UserBets() {
  useEffect(() => {
    window.parent.postMessage(
      {
        type: "currentUserBets",
      },
      "*"
    );

    window.addEventListener("message", (event) => {
      console.log(event);
      if (event.data.type === "devvit-message") {
        const { data } = event.data;
        console.log(data);
        const { message } = data;
        console.log(message);
        if (message.devvitDataType === "user-bets-info") {
          console.log("user-bets-info");
          const { errorCode, success, results } = message.devvitData;
          console.log(errorCode);
          console.log(success);
          console.log(results);
        }
      }
    });
  }, []);
  return <div>UserBets</div>;
}

export default UserBets;
