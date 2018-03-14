import React from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, Nav, NavItem, NavLink as RsNavLink } from 'reactstrap';
import classNames from 'classnames';
import nav from './_nav';
import SidebarFooter from './../SidebarFooter/SidebarFooter';
import SidebarForm from './../SidebarForm/SidebarForm';
import SidebarHeader from './../SidebarHeader/SidebarHeader';
import SidebarMinimizer from './../SidebarMinimizer/SidebarMinimizer';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.activeRoute = this.activeRoute.bind(this);
    this.hideMobile = this.hideMobile.bind(this);
  }


  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName, props) {
    return props.location.pathname.indexOf(routeName) > -1
      ? 'nav-item nav-dropdown open'
      : 'nav-item nav-dropdown';
  }

  hideMobile() {
    if (document.body.classList.contains('sidebar-mobile-show')) {
      document.body.classList.toggle('sidebar-mobile-show');
    }
  }

  render() {
    const badge = (b) => {
      if (b) {
        const classes = classNames(b.class);
        return (<Badge className={classes} color={b.variant}>{ b.text }</Badge>);
      }
    };

    let wrapper = null;
    let title = null;
    let divider = null;
    let navLabel = null;
    let navItem = null;
    let navLink = null;
    let navDropdown = null;
    let navType = null;
    let navList = null;
    let isExternal = null;

    wrapper = item => (item.wrapper && item.wrapper.element
      ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name))
      : item.name);

    title = (t, key) => {
      const classes = classNames('nav-title', t.class);
      return (<li key={key} className={classes}>{wrapper(t)} </li>);
    };

    divider = (d, key) => {
      const classes = classNames('divider', d.class);
      return (<li key={key} className={classes} />);
    };

    navLabel = (item, key) => {
      const classes = {
        item: classNames('hidden-cn', item.class),
        link: classNames('nav-label', item.class ? item.class : ''),
        icon: classNames(
          !item.icon ? 'fa fa-circle' : item.icon,
          item.label.variant ? `text-${item.label.variant}` : '',
          item.label.class ? item.label.class : '',
        ),
      };
      return (
        navLink(item, key, classes)
      );
    };

    navItem = (item, key) => {
      const classes = {
        item: classNames(item.class),
        link: classNames('nav-link', item.variant
          ? `nav-link-${item.variant}`
          : ''),
        icon: classNames(item.icon),
      };
      return (
        navLink(item, key, classes)
      );
    };

    navLink = (item, key, classes) => {
      const url = item.url
        ? item.url
        : '';
      return (
        <NavItem key={key} className={classes.item}>
          {
            isExternal(url)
              ? (
                <RsNavLink href={url} className={classes.link} active>
                  <i className={classes.icon} />{item.name}{badge(item.badge)}
                </RsNavLink>
              )
              : (
                <NavLink to={url} className={classes.link} activeClassName="active" onClick={this.hideMobile}>
                  <i className={classes.icon} />{item.name}{badge(item.badge)}
                </NavLink>
              )
          }
        </NavItem>
      );
    };

    navDropdown = (item, key) => (
      <li key={key} className={this.activeRoute(item.url, this.props)}>
        <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick}><i className={item.icon} />{item.name}</a>
        <ul className="nav-dropdown-items">
          {navList(item.children)}
        </ul>
      </li>);

    navType = (item, idx) =>
      (item.title ? title(item, idx) :
        item.divider ? divider(item, idx) :
          item.label ? navLabel(item, idx) :
            item.children ? navDropdown(item, idx)
              : navItem(item, idx));

    navList = items => items.map((item, index) => navType(item, index));

    isExternal = (url) => {
      const link = url ? url.substring(0, 4) : '';
      return link === 'http';
    };

    return (
      <div className="sidebar">
        <SidebarHeader />
        <SidebarForm />
        <nav className="sidebar-nav">
          <Nav>
            {navList(nav.items)}
          </Nav>
        </nav>
        <SidebarFooter />
        <SidebarMinimizer />
      </div>
    );
  }
}

export default Sidebar;
