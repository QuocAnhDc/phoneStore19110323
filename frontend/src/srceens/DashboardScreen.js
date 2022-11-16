import DashboardMenu from '../components/DashboardMenu';
// import { getUserInfo } from '../localStorage';
import { checkRedirectUser } from '../utils';

const DashboardScreen = {
  after_render: () => {
    checkRedirectUser()
  },
  render: () => {
    
    return `
      <div class="dashboard">
        ${DashboardMenu.render({ selected: 'dashboard' })}
        <div class="dashboard-content">
          <h1>Dashboard</h1>
          <div>
            Info and Charts will be added here
          </div>
        </div>
      </div>
    `;
    
  },
};
export default DashboardScreen;