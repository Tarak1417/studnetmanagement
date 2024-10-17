import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed">
      <div className="p-5 text-xl font-bold"><Link href="/">👨🏻‍💻 </Link></div>
      <ul className="mt-10">
       
        <li className="p-4 hover:bg-gray-600">
          <Link href="/students">Students</Link>
        </li>
        <li className="p-4 hover:bg-gray-600">
          <Link href="/attendance">Attendance</Link>
        </li>
        <li className="p-4 hover:bg-gray-600">
          <Link href="/settings">Settings</Link>
        </li>
        <li className="p-4 hover:bg-gray-600">
          <Link href="/contact">contact</Link>
        </li>
       
      </ul>
    </div>
  );
};

export default Sidebar;
