import { Link, Outlet } from 'umi';
import React from 'react'
import styles from './index.less';
import { Provider } from 'react-redux'
import { store } from '@/store';

export default function Layout() {
  return (
    <Provider store={store}>
      <nav>
          <section>
            <h1>Redux Essentials Example</h1>

            <div className="navContent">
              <div className="navLinks">
                <Link to="/">文章列表</Link>
              </div>
            </div>
          </section>
        </nav>
        < Outlet/>
    </Provider>
  );
}
