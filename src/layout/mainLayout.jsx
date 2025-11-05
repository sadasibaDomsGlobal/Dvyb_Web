import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/b2c/sidebar';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ products }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <div className="flex flex-1 lg:flex-row">
                
                {/* Sidebar */}
                <Sidebar products={products} />
                
                {/* Main Content */}
                <main className="flex-1 lg:ml-0 p-4 lg:p-6">
                    
                    {/* Renders child routes Here */}
                    <Outlet />
                    
                </main>

            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;