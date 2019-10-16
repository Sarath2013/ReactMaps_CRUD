import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddModal from './AddModal';

const addProps = {
    toggle: jest.fn(),
    toggleClose: jest.fn(),
    modalName: "Add",
    curLocation: {
    },
    locations: []
};

const editProps = {
    toggle: jest.fn(),
    toggleClose: jest.fn(),
    modalName: "Edit",
    curLocation: {
        name: 'Berlin',
        lat: 52.52,
        lng: 13.405
    },
    locations: [{
        name: 'Berlin',
        lat: 52.52,
        lng: 13.405
    }]
};
let wrapper;

describe("Rendering AddModal", () => {
    beforeAll(() => {
    });

    afterAll(() => {
        wrapper = null;
    });

    test('renders snapshot', () => {
        wrapper = shallow(<AddModal {...addProps} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('Check AddModal Elements', () => {
        wrapper = mount(<AddModal {...addProps} />);
        wrapper.update();
        expect(wrapper.find('.modal-header h3').text()).toBe("Add Marker");
        expect(wrapper.find('.geo-btn').text()).toBe("Get Geo Cordinates");
        expect(wrapper.find('.loc-title').length).toBe(0);
        expect(wrapper.find('.loc-name').length).toBe(0);
        expect(wrapper.find('.loc-lat').length).toBe(0);
        expect(wrapper.find('.loc-lng').length).toBe(0);
        expect(wrapper.find('.modal-footer .btn-secondary').text()).toBe("Close");
        expect(wrapper.find('.modal-footer .btn-primary').text()).toBe("Add");
        wrapper.unmount();
    });
});

describe("Rendering EditModal", () => {
    beforeAll(() => {
    });

    afterAll(() => {
        wrapper = null;
    });

    test('renders snapshot', () => {
        wrapper = shallow(<AddModal {...editProps} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('Check AddModal Elements', () => {
        wrapper = mount(<AddModal {...editProps} />);
        wrapper.update();
        expect(wrapper.find('.modal-header h3').text()).toBe("Edit Marker");
        expect(wrapper.find('input.form-control').props().value).toBe("Berlin");
        expect(wrapper.find('.geo-btn').text()).toBe("Get Geo Cordinates");
        expect(wrapper.find('.loc-title').text()).toBe('Berlin');
        expect(wrapper.find('.loc-name').text()).toBe('Berlin');
        expect(wrapper.find('.loc-lat').text()).toBe('latitude: 52.52');
        expect(wrapper.find('.loc-lng').text()).toBe('longitude: 13.405');
        expect(wrapper.find('.modal-footer .btn-secondary').text()).toBe("Close");
        expect(wrapper.find('.modal-footer .btn-primary').text()).toBe("Edit");
        wrapper.unmount();
    });
});