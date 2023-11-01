const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="ml-[260px] bg-[#f7f7f9]">
      <div className="pt-8">
        <section className="flex flex-col min-h-screen px-8 container mx-auto">
          <div className="flex-grow">{children}</div>
        </section>
      </div>
    </div>
  );
};

export default Container;
