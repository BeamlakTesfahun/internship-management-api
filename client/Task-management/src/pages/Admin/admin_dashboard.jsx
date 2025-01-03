import React from 'react';
import { FaTasks, FaUsers, FaClipboardList, FaPlus } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import './AdminDashboard.css'; // Add custom CSS for the styles

const AdminDashboard = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-dashboard">
      <Navbar role="admin" />
      <div className="dashboard-container">
        <nav className="sidebar">
          <div className="logo">Admin Panel</div>
          <ul>
            <li><NavLink to="/tracks/create" activeClassName="active-link"><FaPlus /> Create Track</NavLink></li>
            <li><NavLink to="/tracks" activeClassName="active-link"><FaClipboardList /> View All Tracks</NavLink></li>
            <li><NavLink to="/tasks/create" activeClassName="active-link"><FaTasks /> Create Task</NavLink></li>
            {/* <li><NavLink to="/view-submissions" activeClassName="active-link"><FaUsers /> View Submissions</NavLink></li> */}
            <li><NavLink to="/invite-user" activeClassName="active-link"><FaPlus /> Invite User</NavLink></li>
          </ul>
        </nav>

        <main className="dashboard-content">
          <header className="dashboard-header">
            <h1>Welcome, Admin</h1>
            <p>Manage tracks, tasks, and user invitations seamlessly.</p>
          </header>

          <section className="dashboard-sections">
            <div className="card">
              <h2>Tracks</h2>
              <p>Create and manage tracks effortlessly.</p>
              <button className="btn-primary" onClick={() => navigateTo('/tracks/create')}>Manage Tracks</button>
            </div>
            <div className="card">
              <h2>Invite Users</h2>
              <p>Send invitations to new students or admins.</p>
              <button className="btn-primary" onClick={() => navigateTo('/invite-user')}>Invite Now</button>
            </div>
            <div className="card">
              <h2>Tasks</h2>
              <p>Assign and track tasks linked to specific tracks.</p>
              <button className="btn-primary" onClick={() => navigateTo('/tasks/admin')}>Manage Tasks</button>
            </div>

            {/* <div className="card">
              <h2>Submissions</h2>
              <p>Review student submissions and provide feedback.</p>
              <button className="btn-primary" onClick={() => navigateTo('/view-submissions')}>View Submissions</button>
            </div> */}

            {/* <div className="card">
              <h2>Invite Users</h2>
              <p>Send invitations to new students or admins.</p>
              <button className="btn-primary" onClick={() => navigateTo('/invite-user')}>Invite Now</button>
            </div> */}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;