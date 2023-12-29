import { Outlet } from 'react-router';
import Header from './Header';

export default function Layout(): JSX.Element {
  return (
    <div className="content">
      <Header />
      <Outlet />
    </div>
  );
}
