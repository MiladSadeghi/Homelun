import { TAgent } from "../../types/agent";

type Props = {
  key: string;
  agent: TAgent;
};

const AgentCard = ({ agent }: Props) => {
  return (
    <div className="relative">
      <div className="before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border before:border-solid before:border-[#e3e3e3] before:mt-24 before:-z-10">
        <img src={agent.cover} className="w-[248px] h-[248px] mx-auto" />
        <h5 className="font-bold text-2xl mt-7 text-center">{agent.name}</h5>
        <p className="mt-4 text-lg font-normal text-[#8C959F] text-center">
          {agent.field}
        </p>
      </div>
    </div>
  );
};

export { AgentCard };
