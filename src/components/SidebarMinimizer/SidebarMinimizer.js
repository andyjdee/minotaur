import React from 'react';

class SidebarMinimizer extends React.Component {
  constructor() {
    super();
    this.document = document;
  }

  sidebarMinimize() {
    this.document.body.classList.toggle('sidebar-minimized');
  }

  brandMinimize() {
    this.document.body.classList.toggle('brand-minimized');
  }

  render() {
    return (
      <button className="sidebar-minimizer" type="button" onClick={() => { this.sidebarMinimize(); this.brandMinimize(); }} />
    );
  }
}

export default SidebarMinimizer;
