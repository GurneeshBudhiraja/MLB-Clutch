import { Devvit, useForm, useState } from "@devvit/public-api";
import Home from "./Home.js";

function Layout({ context }: { context: Devvit.Context }) {
  return <Home context={context} />;
}

export default Layout;
