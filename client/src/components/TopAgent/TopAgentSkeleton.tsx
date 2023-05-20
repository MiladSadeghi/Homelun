import Skeleton from "react-loading-skeleton";

const TopAgentSkeletonCard = ({ cards }: { cards: number }): JSX.Element => {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <div className="flex py-2 items-center" key={i}>
            <div className="left-col mr-4">
              <Skeleton circle width={54} height={54} />
            </div>
            <div className="flex-1">
              <Skeleton count={1} height={20} />
            </div>
          </div>
        ))}
    </>
  );
};

export { TopAgentSkeletonCard };
