import React, { useState, useImperativeHandle } from 'react';
import { Button } from 'semantic-ui-react';

/* eslint-disable react/prop-types */
const Togglable = React.forwardRef(({ children, buttonLabel, data_cy }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => setVisible(!visible);
  const resetVisibility = () => setVisible(false);

  useImperativeHandle(ref, () => ({ toggleVisibility, resetVisibility }));

  return (
    <div>
      <Button style={hideWhenVisible} primary data-cy={data_cy} type="button" onClick={toggleVisibility}>{buttonLabel}</Button>
      <div style={showWhenVisible}>
        {children}
      </div>
    </div>
  );
});
/* eslint-enable react/prop-types */

Togglable.displayName = 'Togglable';

export default Togglable;

//<Button style={{ margin: 5 }} type="button" onClick={toggleVisibility}>cancel</Button>