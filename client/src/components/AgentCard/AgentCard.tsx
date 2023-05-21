import { Link } from "react-router-dom";
import { TAgent } from "../../types/agent";

type Props = {
  key: string;
  agent: TAgent;
};

const AgentCard = ({ agent }: Props) => {
  return (
    <div className="relative h-[460px]">
      <div className="before:absolute before:top-0 before:left-0 before:w-full before:h-[80%] before:border before:border-solid before:border-[#e3e3e3] before:mt-[92px] before:-z-10">
        <img src={agent.cover} className="w-[248px] h-[248px] mx-auto" />
        <Link
          to={`${agent.slug}`}
          className="font-bold text-2xl mt-7 text-center block"
        >
          {agent.name}
        </Link>
        <p className="mt-4 text-lg font-normal text-[#8C959F] text-center">
          {agent.field}
        </p>
      </div>
    </div>
  );
};

export { AgentCard };
