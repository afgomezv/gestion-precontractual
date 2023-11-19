const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="ml-[260px] bg-[#f7f7f9]">
      <section className="container mx-auto h-screen flex flex-col pt-8 px-8">
        <div className="flex-grow">{children}</div>
      </section>
    </div>
  );
};

export default Container;
