function Main({ children, className, ref = null }) {
  return (
    <main
      ref={ref}
      className={`mx-4 flex flex-col justify-center pb-16 transition-opacity duration-500 ease-in-out sm:mx-6 md:mx-10 ${className}`}
    >
      {children}
    </main>
  );
}

export default Main;
