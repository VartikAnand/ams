const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center align-middle mt-[10%] h-full">
      {children}
    </div>
  );
};

export default AuthLayout;
