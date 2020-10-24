import React, { useState, useImperativeHandle } from 'react';
import { Button } from 'semantic-ui-react';

/* eslint-disable react/prop-types */
const Togglable = React.forwardRef(({ children, buttonLabel, data_cy }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button data-cy={data_cy} type="button" onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button type="button" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
});
/* eslint-enable react/prop-types */

Togglable.displayName = 'Togglable';

export default Togglable;
