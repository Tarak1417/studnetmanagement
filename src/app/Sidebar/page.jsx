import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed">
      <div className="p-5 text-xl font-bold"><Link href="/">mkskdjis</Link></div>
      <ul className="mt-10">
       
        <li className="p-4 hover:bg-gray-600">
          <Link href="/students">Students</Link>
        </li>
        <li className="p-4 hover:bg-gray-600">
          <Link href="/attendance">attendance</Link>
        </li>
        <li className="p-4 hover:bg-gray-600">
          <Link href="/settings">settings</Link>
        </li>
        <li className="p-4 hover:bg-gray-600">
          <Link href="/contact">contact</Link>
        </li>
        <li className="p-5 hover:bg-gray-600">
          <Link href="/me">contact</Link>
        </li>
       
      </ul>
    </div>
  );
};

export default Sidebar;
