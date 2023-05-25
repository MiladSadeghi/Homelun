import { useQuery } from "@tanstack/react-query";
import Header from "./components/Header";
import TopAgents from "./components/TopAgents";
import axios from "axios";
import { TAgent } from "../../types/agent";
import { TProperty } from "../../types/property";
import LatestProperty from "./components/LatestProperty";
import OurTeam from "../../components/OurTeam/OurTeam";

type THomeData = {
  agents: {
    topAgents: TAgent[];
    agents: TAgent[];
  };
  properties: {
    rent: TProperty[];
    sale: TProperty[];
  };
};

function Home() {
  const { isLoading, data } = useQuery({
    queryKey: ["home"],
    queryFn: () =>
      axios.get<THomeData>("/home").then((response) => response.data),
  });

  return (
    <>
      <Header />
      <TopAgents
        loading={isLoading}
        data={data?.agents.topAgents as TAgent[]}
      />
      <LatestProperty
        loading={isLoading}
        properties={
          data?.properties as Pick<THomeData["properties"], "rent" | "sale">
        }
      />
      <OurTeam loading={isLoading} agents={data?.agents.agents as TAgent[]} />
    </>
  );
}

export default Home;
