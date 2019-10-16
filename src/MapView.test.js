import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MapView from './MapView';

const props = {
  locations: [{
    name: 'Berlin',
    lat: 52.52,
    lng: 13.405
  },
  {
    name: 'Munich',
    lat: 48.1351,
    lng: 11.582
  }],
  update: jest.fn(),
  activeMarkerValues: {
    lat: 52.52,
    lng: 13.405
  }
};
let wrapper;

describe("Rendering MapView", () => {
  beforeAll(() => {
  });

  afterAll(() => {
    wrapper = null;
  });

  test('renders snapshot', () => {
    wrapper = shallow(<MapView {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.instance().props.locations.length).toBe(2);
    expect(wrapper.instance().props.activeMarkerValues).toEqual({
      lat: 52.52,
      lng: 13.405
    });
  });
});

