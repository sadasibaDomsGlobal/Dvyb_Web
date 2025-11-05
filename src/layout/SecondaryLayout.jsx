// src/layout/SecondaryLayout.jsx
import "../styles/SecondaryLayout.css";

/**
 * SecondaryLayout:
 * - Left sticky sidebar
 * - Right main content
 * - Fully responsive
 */
const SecondaryLayout = ({ children }) => {
    return (
        <div className="secondary-layout">
            {/* Sidebar */}
            <aside className="secondary-sidebar">
                <h3 className="sidebar-title">Filters</h3>
                <p className="sidebar-text">
                    Use filters to refine your search. Categories, sizes, colors, and price range will appear here.
                </p>
            </aside>

            {/* Main Content */}
            <section className="secondary-content">
                <h2 className="content-title">Womenwear Collection</h2>
                <div>{children || <p>Select filters to see products.</p>}</div>
            </section>
        </div>
    );
};

export default SecondaryLayout;