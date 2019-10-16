import React from 'react';
import { shallow, mount, wait } from 'enzyme';
import toJson from 'enzyme-to-json';
import MapCrud from './MapCrud';
import axios from "axios";

jest.mock('axios');

let locations = [{
  name: 'Berlin',
  lat: 52.52,
  lng: 13.405,
  id: '1A'
},
{
  name: 'Munich',
  lat: 48.1351,
  lng: 11.582,
  id: '1B'
}];

let results = [{
  formatted_address: 'Hamburg',
  geometry: {
    location: {
      lat: 53.5511,
      lng: 9.9937
    }
  }
}]


let results2 = [{
  formatted_address: 'Frankfurt',
  geometry: {
    location: {
      lat: 50.1109,
      lng: 8.6821
    }
  }
}]

axios.get.mockImplementation((url, data) => {
  if (url === 'http://localhost:4000/getMarkers')
    return Promise.resolve({
      data: {
        locations: locations
      }
    });
  else if (url.indexOf('googleapis') > -1) {
    let data = results;
    if (url.indexOf('sdsdsdsd') > -1)
      data = [];
    else if (url.indexOf('Frankfurt') > -1)
      data = results2;
    return Promise.resolve({
      data: {
        results: data
      }
    });
  }
});

axios.post.mockImplementation((url, data) => {
  return Promise.resolve({
    data: {
      location: {
        name: 'Hamburg',
        lat: 53.5511,
        lng: 9.9937,
        id: '1H'
      }
    }
  });
});


axios.put.mockImplementation((url, data) => {
  return Promise.resolve({
    data: {
      error: false,
      message: "Marker updated successfully"
    }
  });
});

axios.delete.mockImplementation((url, data) => {
  return Promise.resolve({
    data: {
      error: false,
      message: "Marker deleted successfully"
    }
  });
});

describe("Rendering MapCrud Snapshot - Unit Testing", () => {
  it('renders snapshot  - Unit Testing', async () => {
    const getMockSpy = jest.spyOn(axios, 'get');
    let wrapper = shallow(<MapCrud />);
    expect(getMockSpy).toHaveBeenCalled();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});

describe("Check mock axios  - Integration Testing", () => {
  let wrapper;
  beforeAll(() => {
  });

  afterAll(() => {
    wrapper = null;
    wrapper.unmount();
  });


  it('ensure marker location data with mock axios - Integration Testing', async () => {
    const getMockSpy = jest.spyOn(axios, 'get');
    wrapper = await mount(<MapCrud />);
    expect(getMockSpy).toHaveBeenCalled();
    wrapper.update();
    const markersList = wrapper.find('.loc-details');
    expect(markersList.length).toBe(locations.length);
    expect(wrapper.instance().state.locations.length).toBe(locations.length);
    wrapper.unmount();
  });

  it('Check Add Marker Modal Window and Google Map - Integration Testing', async () => {
    const getMockSpy = jest.spyOn(axios, 'get');
    wrapper = await mount(<MapCrud />);
    expect(getMockSpy).toHaveBeenCalled();
    wrapper.update();
    await wrapper.find('.btn-primary').simulate('click');
    wrapper.update();
    expect(wrapper.find('.add-modal-container h3').text()).toBe('Add Marker');
    expect(wrapper.find('.add-modal-container input').text()).toBe('');
    expect(wrapper.find('.add-modal-container .loc-title').length).toBe(0);
    expect(wrapper.find('.add-modal-container .loc-name').length).toBe(0);
    expect(wrapper.find('.add-modal-container .loc-lat').length).toBe(0);
    expect(wrapper.find('.add-modal-container .loc-lng').length).toBe(0);
    expect(wrapper.find('.modal-footer .btn-primary').props().disabled).toBe(true);
    expect(wrapper.find('.add-modal-container .geo-btn').props().disabled).toBe(true);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.disableBtn).toBe(true);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.disableGeoBtn).toBe(true);
    await wrapper.find('.add-modal-container input').simulate('change', { target: { name: 'searchInput', value: 'Hamburg' } });
    wrapper.update();
    expect(wrapper.find('.add-modal-container .geo-btn').props().disabled).toBe(false);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.disableGeoBtn).toBe(false);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.searchValue).toBe('Hamburg');
    expect(wrapper.find('.add-modal-container input').props().value).toBe('Hamburg');
    await wrapper.find('.add-modal-container .geo-btn').simulate('click');
    wrapper.update();
    expect(wrapper.find('.modal-footer .btn-primary').props().disabled).toBe(false);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.disableBtn).toBe(false);
    expect(wrapper.find('.add-modal-container .loc-title').length).toBe(1);
    expect(wrapper.find('.add-modal-container .loc-name').length).toBe(1);
    expect(wrapper.find('.add-modal-container .loc-lat').length).toBe(1);
    expect(wrapper.find('.add-modal-container .loc-lng').length).toBe(1);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.location).toEqual({
      name: 'Hamburg',
      lat: 53.5511,
      lng: 9.9937
    });
    await wrapper.find('.modal-footer .btn-primary').simulate('click');
    wrapper.update();
    expect(wrapper.find('.loc-details').length).toBe(3);
    expect(wrapper.instance().state.locations.length).toBe(3);
    expect(wrapper.instance().state.locations[wrapper.instance().state.locations.length - 1]).toEqual({
      name: 'Hamburg',
      lat: 53.5511,
      lng: 9.9937,
      id: '1H'
    });
    await wrapper.find('.btn-primary').simulate('click');
    wrapper.update();
    expect(wrapper.find('.modal-footer .btn-primary').props().disabled).toBe(true);
    expect(wrapper.find('.add-modal-container .geo-btn').props().disabled).toBe(true);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.disableBtn).toBe(true);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.disableGeoBtn).toBe(true);
    await wrapper.find('.add-modal-container input').simulate('change', { target: { value: 'sdsdsdsd' } });
    wrapper.update();
    expect(wrapper.find('.add-modal-container .geo-btn').props().disabled).toBe(false);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.disableGeoBtn).toBe(false);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.searchValue).toBe('sdsdsdsd');
    expect(wrapper.find('.add-modal-container input').props().value).toBe('sdsdsdsd');
    await wrapper.find('.add-modal-container .geo-btn').simulate('click');
    wrapper.update();
    expect(wrapper.find('.add-modal-container .error-msg.locations').text()).toBe('No locations found.');
    expect(wrapper.find('.add-modal-container .loc-title').length).toBe(0);
    expect(wrapper.find('.add-modal-container .loc-name').length).toBe(0);
    expect(wrapper.find('.add-modal-container .loc-lat').length).toBe(0);
    expect(wrapper.find('.add-modal-container .loc-lng').length).toBe(0);
    expect(wrapper.find('.modal-footer .btn-primary').props().disabled).toBe(true);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.disableBtn).toBe(true);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.noGeoData).toBe(true);
    await wrapper.find('.add-modal-container input').simulate('change', { target: { value: 'Hamburg' } });
    wrapper.update();
    expect(wrapper.find('.add-modal-container .geo-btn').props().disabled).toBe(false);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.disableGeoBtn).toBe(false);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.searchValue).toBe('Hamburg');
    expect(wrapper.find('.add-modal-container input').props().value).toBe('Hamburg');
    await wrapper.find('.add-modal-container .geo-btn').simulate('click');
    wrapper.update();
    expect(wrapper.find('.add-modal-container .error-msg.exists').text()).toBe('Marker already exists there.');
    expect(wrapper.find('.add-modal-container .loc-title').length).toBe(0);
    expect(wrapper.find('.add-modal-container .loc-name').length).toBe(0);
    expect(wrapper.find('.add-modal-container .loc-lat').length).toBe(0);
    expect(wrapper.find('.add-modal-container .loc-lng').length).toBe(0);
    expect(wrapper.find('.modal-footer .btn-primary').props().disabled).toBe(true);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.disableBtn).toBe(true);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.noGeoData).toBe(false);
    await wrapper.find('.modal-footer .btn-secondary').simulate('click');
    wrapper.update();
    expect(wrapper.find('.loc-details').length).toBe(3);
    expect(wrapper.instance().state.locations.length).toBe(3);
    wrapper.unmount();
  });

  it('Check Edit Marker Modal Window and Google Map - Integration Testing', async () => {
    const getMockSpy = jest.spyOn(axios, 'get');
    wrapper = await mount(<MapCrud />);
    expect(getMockSpy).toHaveBeenCalled();
    wrapper.update();
    const editIndex = 0;
    const markerDiv = wrapper.find('.loc-details').at(editIndex);
    await markerDiv.find('.btn-default').at(1).simulate('click');
    wrapper.update();
    expect(wrapper.find('.add-modal-container h3').text()).toBe('Edit Marker');
    expect(wrapper.find('.add-modal-container input').props().value).toBe('Berlin');
    expect(wrapper.find('.add-modal-container .loc-title').text()).toBe('Berlin');
    expect(wrapper.find('.add-modal-container .loc-name').text()).toBe('Berlin');
    expect(wrapper.find('.add-modal-container .loc-lat').text()).toBe('latitude: 52.52');
    expect(wrapper.find('.add-modal-container .loc-lng').text()).toBe('longitude: 13.405');
    expect(wrapper.find('.modal-footer .btn-primary').props().disabled).toBe(true);
    expect(wrapper.find('.add-modal-container .geo-btn').props().disabled).toBe(true);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.disableBtn).toBe(true);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.disableGeoBtn).toBe(true);
    await wrapper.find('.add-modal-container input').simulate('change', { target: { name: 'searchInput', value: 'Frankfurt' } });
    wrapper.update();
    expect(wrapper.find('.add-modal-container .geo-btn').props().disabled).toBe(false);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.disableGeoBtn).toBe(false);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.searchValue).toBe('Frankfurt');
    expect(wrapper.find('.add-modal-container input').props().value).toBe('Frankfurt');
    await wrapper.find('.add-modal-container .geo-btn').simulate('click');
    wrapper.update();
    expect(wrapper.find('.modal-footer .btn-primary').props().disabled).toBe(false);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.disableBtn).toBe(false);
    expect(wrapper.find('.add-modal-container .loc-title').length).toBe(1);
    expect(wrapper.find('.add-modal-container .loc-name').length).toBe(1);
    expect(wrapper.find('.add-modal-container .loc-lat').length).toBe(1);
    expect(wrapper.find('.add-modal-container .loc-lng').length).toBe(1);
    expect(wrapper.find('.add-modal-container').childAt(0).instance().state.location).toEqual({
      name: 'Frankfurt',
      lat: 50.1109,
      lng: 8.6821
    });
    await wrapper.find('.modal-footer .btn-primary').simulate('click');
    wrapper.update();
    expect(wrapper.find('.loc-details').length).toBe(2);
    expect(wrapper.instance().state.locations.length).toBe(2);
    expect(wrapper.instance().state.locations[editIndex]).toEqual({
      name: 'Frankfurt',
      lat: 50.1109,
      lng: 8.6821,
      id: '1A'
    });
    await wrapper.find('.btn-primary').simulate('click');
    wrapper.update();
    wrapper.unmount();
  });

  it('View Marker in Google Map - Integration Testing', async () => {
    wrapper = await mount(<MapCrud />);
    wrapper.update();
    const markerDiv = wrapper.find('.loc-details').at(1);
    await markerDiv.find('.btn-default').at(0).simulate('click');
    wrapper.update();
    expect(wrapper.find('.map-view').children().children().instance().props.activeMarkerValues).toEqual({
      lat: 48.1351,
      lng: 11.582
    });
    wrapper.unmount();
  });

  it('Delete Marker in oogle Map - Integration Testing', async () => {
    const getMockSpy = jest.spyOn(axios, 'get');
    wrapper = await mount(<MapCrud />);
    wrapper.update();
    expect(getMockSpy).toHaveBeenCalled();
    const markerDiv = wrapper.find('.loc-details').at(1);
    await markerDiv.find('.btn-default').at(2).simulate('click');
    wrapper.update();
    expect(wrapper.find('.loc-details').length).toBe(1);
    expect(wrapper.instance().state.locations.length).toBe(1);
    wrapper.unmount();
  });
});