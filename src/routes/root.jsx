import { Outlet, Link } from "react-router-dom";


export default function Root() {
    return (
        <div className="flex justify-start h-screen">
            <div className="bg-slate-200 w-2/12 min-w-[200px] p-4 border-r border-gray-400 ">
                <h1 className="font-bold mb-4">Working Hours Form</h1>
                <div>
                    <div
                        id="search-spinner"
                        aria-hidden
                        hidden={true}
                    />
                    <div
                        className="sr-only"
                        aria-live="polite"
                    ></div>

                </div>
                <nav>
                    <ul className="list-none ">
                        <li className="py-1 px-2 hover:bg-slate-100 rounded-md">
                            <Link to={`/add-hours`}>Add Hours</Link>
                        </li>
                        <li className="py-1 px-2 hover:bg-slate-100 rounded-md">
                            <Link to={`/show-report`}>Show Report</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="w-9/12" id="detail">
                <Outlet />
            </div>
        </div>
    );
}