export default class MLB {
  constructor() { }

  async getCurrentMatch(today: string = new Date().toISOString().split("T")[0]): Promise<{ success: boolean }> {
    const url = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}`;

    try {
      console.log("Have to wait for 2 seconds to fetch MLB data");
      await timeoutPromise();
    } catch (error) {
      console.error("Error fetching MLB data:", error);
    } finally {
      console.log("✅")
      return { success: true };
    }
  }
}


const timeoutPromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("done");
    }, 2000);
  });

}