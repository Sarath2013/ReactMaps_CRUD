import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import CrudView from './CrudView';

const props = {
  locations: [{
    name: 'Berlin',
    lat: 52.5200,
    lng: 13.4050
  },
  {
    name: 'Munich',
    lat: 48.1351,
    lng: 11.5820
  }],
  update: jest.fn()
};

let wrapper;

describe("Rendering CrudView", () => {
  beforeAll(() => {
  });

  afterAll(() => {
    wrapper = null;
  });

  test('renders snapshot', () => {
    wrapper = shallow(<CrudView {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('check markers count', () => {
    wrapper = mount(<CrudView {...props} />);
    wrapper.update();
    expect(wrapper.props().locations.length).toBe(2);
    expect(wrapper.props().locations).toEqual([{
      name: 'Berlin',
      lat: 52.52,
      lng: 13.405
    },
    {
      name: 'Munich',
      lat: 48.1351,
      lng: 11.582
    }]);
    expect(wrapper.find('button.btn.btn-primary').text()).toBe('Add Map');
    const locations = wrapper.find('.loc-details');
    expect(locations.length).toBe(2);
    const details = locations.get(0);
    expect(details.props.children[0].props.location.name).toBe('Berlin');
    expect(details.props.children[0].props.location.lat).toBe(52.52);
    expect(details.props.children[0].props.location.lng).toBe(13.405);
    expect(locations.get(1).props.children[0].props.location.name).toBe('Munich');
    expect(locations.get(1).props.children[0].props.location.lat).toBe(48.1351);
    expect(locations.get(1).props.children[0].props.location.lng).toBe(11.582);
    const actionBtns = wrapper.find('button.btn.btn-default');
    expect(actionBtns.get(0).props.children).toBe('View Marker');
    expect(actionBtns.get(1).props.children).toBe('Edit');
    expect(actionBtns.get(2).props.children).toBe('Delete');
    wrapper.unmount();
  });
});


