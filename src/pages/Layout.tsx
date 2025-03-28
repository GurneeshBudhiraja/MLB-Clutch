import { Devvit, useAsync, useForm, useState } from "@devvit/public-api";
import Home from "./Home.js";
import { data } from "motion/react-client";
import { getRedisData } from "../components/LeaderBoard.js";

function Layout({ context }: { context: Devvit.Context }) {
  useAsync(
    async () => {
      const applicationData = await getRedisData(context, "application-data");
      if (!applicationData) {
        context.ui.showToast("Please reinstall the application");
        return {};
      }
      const userId = String(context.userId);
      const { users } = applicationData as ApplicationData;
      if (!users[userId]) {
        users[userId] = {
          quizStreak: 0,
        };
        await context.redis.set(
          "application-data",
          JSON.stringify(applicationData)
        );
        console.log("Application data has been set for the user for 1st time");
      } else {
        console.log("User data has already been set");
        console.log(users);
      }
    },
    {
      finally: (data) => {},
    }
  );
  return <Home context={context} />;
}

export default Layout;
