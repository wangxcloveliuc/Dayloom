const React = require('react');
const { render, screen } = require('@testing-library/react');

function Simple() {
  return React.createElement('h1', null, 'Simple Component');
}

test('renders simple component', () => {
  render(React.createElement(Simple));
  expect(screen.getByText('Simple Component')).toBeInTheDocument();
});
