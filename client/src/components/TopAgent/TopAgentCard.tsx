import React from "react";

type TProps = {
  cover: string;
  name: string;
};

const TopAgentCard: React.FC<TProps & { key: string }> = ({
  cover,
  name,
}): JSX.Element => {
  return (
    <div>
      <div className="flex py-2 items-center">
        <div className="left-col mr-4">
          <img className="rounded-full" src={cover} width={54} height={54} />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-500">{name}</h3>
        </div>
      </div>
    </div>
  );
};

export { TopAgentCard };
