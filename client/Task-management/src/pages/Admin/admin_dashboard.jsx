import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Button from '../../components/button';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Navbar role="admin" />

      {/* Header Section */}
      <header className="dashboard-header">
        <h1>Welcome, Admin!</h1>
        <p>Manage your tasks and submissions efficiently.</p>
      </header>

      {/* Metrics Section */}
      <section className="metrics-section">
        <div className="metric-card">
          <h3>Total Tasks</h3>
          <p>24</p>
        </div>
        <div className="metric-card">
          <h3>Pending Tasks</h3>
          <p>8</p>
        </div>
        <div className="metric-card">
          <h3>Reviewed Submissions</h3>
          <p>16</p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <Button text="Create Task" className="action-button" />
        <Button text="View Submissions" className="action-button" />
      </section>

      {/* Recent Activities */}
      <section className="recent-activities">
        <h2>Recent Activities</h2>
        <table className="activities-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Student</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Assignment 1</td>
              <td>John Doe</td>
              <td>Pending</td>
              <td><Button text="Review" /></td>
            </tr>
            <tr>
              <td>Project Report</td>
              <td>Jane Smith</td>
              <td>Reviewed</td>
              <td><Button text="View" /></td>
            </tr>
          </tbody>
        </table>
      </section>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
