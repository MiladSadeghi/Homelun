import Skeleton from "react-loading-skeleton";
const AgentCardSkeleton = ({ cards }: { cards: number }): JSX.Element => {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <div className="relative" key={i}>
            <div className="before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border before:border-solid before:border-[#e3e3e3] before:mt-24 before:-z-10">
              <Skeleton
                containerClassName="mx-auto !w-[248px] h-[248px] mx-auto block"
                className="w-full h-full"
              />
              <Skeleton
                containerClassName="w-5/12 block mx-auto"
                className="mt-7  w-full"
              />
              <Skeleton
                containerClassName="w-7/12 block mx-auto"
                className="mt-4 text-center w-full"
              />
              <Skeleton
                containerClassName="w-6/12 block mx-auto"
                className="mt-4 text-center w-full"
              />
            </div>
          </div>
        ))}
    </>
  );
};

export { AgentCardSkeleton };
