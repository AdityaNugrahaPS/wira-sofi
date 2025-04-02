import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center p-6 bg-blue-600 text-white">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <Link to="/" className="text-white">
          Logout
        </Link>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Manage Your Content</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">User Management</h3>
            <p className="text-sm text-gray-600">Add, remove or edit users</p>
            <Button className="mt-4">Manage Users</Button>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">Content Management</h3>
            <p className="text-sm text-gray-600">Manage articles and posts</p>
            <Button className="mt-4">Manage Content</Button>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">Analytics</h3>
            <p className="text-sm text-gray-600">View website statistics</p>
            <Button className="mt-4">View Analytics</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
