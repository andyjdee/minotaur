import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { PropTypes } from 'prop-types';
import routes from '../../routes';

const findRouteName = url => routes[url];

const getPaths = (pathname) => {
  const paths = ['/'];

  if (pathname === '/') return paths;

  pathname.split('/').reduce((prev, curr) => {
    const currPath = `${prev}/${curr}`;
    paths.push(currPath);
    return currPath;
  });
  return paths;
};

const BreadcrumbsItem = ({ match }) => {
  console.log(match);
  const routeName = findRouteName(match.url);
  if (routeName) {
    return (
      match.isExact
        ? (
          <BreadcrumbItem active>{routeName}</BreadcrumbItem>
        )
        : (
          <BreadcrumbItem>
            <Link to={match.url || ''}>
              {routeName}
            </Link>
          </BreadcrumbItem>
        )
    );
  }
  return null;
};

BreadcrumbItem.propTypes = {
  match: PropTypes.object.isRequired,
};

const Breadcrumbs = ({ location: { pathname } }) => {
  const paths = getPaths(pathname);
  let i = paths;
  const items = paths.map((path) => {
    i += 1;
    return <Route key={i} path={path} component={BreadcrumbsItem} />;
  });
  return (
    <Breadcrumb>
      {items}
    </Breadcrumb>
  );
};

export default props => (
  <div>
    <Route path="/:path" component={Breadcrumbs} {...props} />
  </div>
);
