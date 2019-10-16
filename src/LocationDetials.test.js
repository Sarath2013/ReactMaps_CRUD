import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LocationDetials from './LocationDetials';

const props = {
  location: {
    name: 'Berlin',
    lat: 52.52,
    lng: 13.405
  }
};

let wrapper;

describe("Rendering LocaitonDetials", () => {
  beforeAll(() => {
    wrapper = shallow(<LocationDetials {...props}/>);
  });
  
  afterAll(() => {
    wrapper = null
  });
  
  test('renders snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('ensure location detials', () => {
    expect(wrapper.find('.loc-title').text()).toEqual('Berlin');
    expect(wrapper.find('.loc-name').text()).toEqual('Berlin');
    expect(wrapper.find('.loc-lat').text()).toEqual('latitude: 52.52');
    expect(wrapper.find('.loc-lng').text()).toEqual('longitude: 13.405');
  });
});


