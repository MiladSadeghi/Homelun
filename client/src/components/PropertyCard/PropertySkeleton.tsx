import Skeleton from "react-loading-skeleton";

const PropertySkeleton = ({ cards }: { cards: number }): JSX.Element => {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <div key={i}>
            <Skeleton className="h-72 w-full" />
            <div className="py-[30px] px-6 flex flex-col">
              <Skeleton count={1} />
              <Skeleton count={1} containerClassName="w-1/2" />
              <Skeleton className="" count={1} />
              <div className="flex gap-4 justify-between">
                <Skeleton
                  count={1}
                  containerClassName="w-3/4"
                  className="w-full"
                />
                <Skeleton
                  count={1}
                  containerClassName="w-1/4"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export { PropertySkeleton };
