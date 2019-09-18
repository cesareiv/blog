import React from 'react';
import ReactDOM from 'react-dom';
import { Blog, sum } from './Blog.jsx';


it('sums numbers', () => {
    expect(sum(1, 2)).toEqual(3);
    expect(sum(2, 2)).toEqual(4);
});

it('renders without crashing', ()=> {
    const div = document.createElement('div');
    ReactDOM.render(<Blog />, div);
});


