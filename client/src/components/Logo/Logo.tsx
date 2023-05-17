function Logo({ textColor }: { textColor: string }) {
  return (
    <h5 className={`font-semibold  text-2xl ${textColor}`}>
      Homelun
      <span className="w-1 h-1 bg-red-500 inline-block ml-0.5" />
    </h5>
  );
}

export default Logo;
