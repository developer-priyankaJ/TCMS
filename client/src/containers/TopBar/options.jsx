import React from 'react';

export default [
  {
    align: 'left',
    inverse: true,
    text: 'Align Left Inversed No animation',
    animate: false,
  },
  {
    inverse: true,
    align: 'right',
    text: 'Inverse With Align Right Multi-Nested Menus'
  },
  {
    inverse: true,
    align: 'right',
    text: 'Inverse With Align Right Animated Multi-Nested Menus'
  },
  {
    inverse: false,
    align: 'left',
    textAlign: 'right',
    size: 'sm',
    text: 'Left Align, Text Right Small Size Forced With Separators',
    additionalItems: [
      <li key="sep1" role="separator" />,
      <li key="woop"><a href="#">Woop Woop</a></li>,
      <li key="sep2" className="separator" />,
      <li key="fred"><a href="#">Fred Flinstone</a></li>,
      <li key="guac"><a href="#">Guacamole</a></li>,
      <li key="sep3" role="separator" className="separator" />,
      <li key="some"><a href="#">Something</a></li>,
    ],
  },
  {
    inverse: true,
    align: 'right',
    size: 'md',
    text: 'Inverse Right Medium Size Forced With Separators',
    additionalItems: [
      <li key="sep1" role="separator" />,
      <li key="woop"><a href="#">Woop Woop</a></li>,
      <li key="sep2" className="separator" />,
      <li key="fred"><a href="#">Fred Flinstone</a></li>,
      <li key="guac"><a href="#">Guacamole</a></li>,
      <li key="sep3" role="separator" className="separator" />,
      <li key="some"><a href="#">Something</a></li>,
    ],
  },
  {
    inverse: false,
    align: 'left',
    size: 'lg',
    text: 'Left Align Large Size Forced Upwards',
    upwards: true,
  },
  {
    inverse: false,
    align: 'left',
    text: 'Default Left Nested Menu Upwards No Animation',
    upwards: true,
    animate: false,
    nestedProps: {
      animate: false,
    },
  },
  {
    inverse: true,
    align: 'right',
    text: 'Inverse Right Nested Menu Animated Upwards',
    upwards: true,
    nestedProps: {
      animate: true,
      upwards: true,
    },
  },
];
