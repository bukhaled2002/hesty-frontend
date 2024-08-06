type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#121212]">اضافة امتحان جديد</h1>
        <p className="text-lg font-semibold text-[#121212]/70">
          من فضلك قم بمليء جميع تفاصيل الامتحان
        </p>
      </div>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
