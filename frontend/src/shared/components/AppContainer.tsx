type ContainerProps = {
  children: JSX.Element | JSX.Element[];
};

const Container = ({ children }: ContainerProps) => {
  return (
    <>
      <div className={`mx-auto max-w-screen-2xl px-1`}>{children}</div>;
    </>
  );
};

export default Container;
