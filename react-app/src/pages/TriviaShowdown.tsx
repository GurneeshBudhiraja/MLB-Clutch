import { useEffect, useState } from "react";
function TriviaShowdown({ assetsLinks }: { assetsLinks: AssetLinks }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [userStreakData, setUserStreakData] = useState<{
    progress: Progress;
    quizStreak: number;
  }>({ progress: "neutral", quizStreak: 0 });

  useEffect(() => {
    window.parent.postMessage(
      {
        type: "getStreakPoints",
      },
      "*"
    );

    window.addEventListener("message", (event) => {
      // TODO: remove in production
      console.log("This is:");
      console.log(event.data);
      const { message } = event.data.data;
      if (message.devvitDataType === "streak-points-info") {
        console.log("streak-points-info");
        const { results } = message.devvitData;
        setUserStreakData(results);
      }
      setLoading(false);
    });
  }, []);
  return (
    <div className="p-4 relative h-full">
      {loading && (
        <div className="flex justify-center items-center h-full">
          <img
            src={assetsLinks["loader"]}
            alt="Loading..."
            className="w-40 h-40"
          />
        </div>
      )}
      {/* {!loading && (
        <>
          <div>{userStreakData["progress"]}</div>
          <div>{userStreakData["quizStreak"]}</div>
        </>
      )}
      <button onClick={() => console.log(userStreakData)}>Click </button> */}
    </div>
  );
}

export default TriviaShowdown;
