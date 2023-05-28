import { Range as ReactRange, getTrackBackground } from "react-range";

type Props = {
  values: number[];
  changeFn: (values: number[]) => void;
  finishedFn: (values: number[]) => void;
  step: number;
  min: number;
  max: number;
};

const Range = ({
  values,
  changeFn,
  finishedFn = () => console.log(1),
  step,
  min,
  max,
}: Props) => {
  return (
    <ReactRange
      step={step}
      min={min}
      max={max}
      onChange={changeFn}
      values={values}
      onFinalChange={finishedFn}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          className="flex w-full z-10"
        >
          <div
            ref={props.ref}
            className={`h-1 w-full rounded-sm bg-center z-10`}
            style={{
              background: getTrackBackground({
                values: values,
                colors: ["#e3e3e3", "#FF967D", "#e3e3e3"],
                min: min,
                max: max,
              }),
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props, index }) => (
        <div className="relative outline-none rounded-sm z-10" {...props}>
          <div className="z-10 text-white font-bold text-base px-1 -translate-x-1  w-full bg-[#FF6653] rounded-sm">
            {new Intl.NumberFormat("en-US").format(values[index])}
          </div>
        </div>
      )}
    />
  );
};

export default Range;
