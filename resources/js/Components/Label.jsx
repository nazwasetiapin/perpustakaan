// resources/js/Components/Label.jsx

import React from 'react';
import PropTypes from 'prop-types';

export default function Label({ htmlFor, children, className = '' }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
}

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
