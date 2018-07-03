import React from 'react';
import { mount } from 'enzyme';
import { Tab } from './Tab';

describe('<Tab/>', () => {
  let comp = null;
  let onClickHandler = null;

  beforeEach(() => {
    onClickHandler = jasmine.createSpy('onClickHandler');
    comp = mount(<Tab onClick={onClickHandler} isActive iconClassName="foo" linkClassName="test" />);
  });

  it('should render', () => {
    expect(comp.length).toBeTruthy();
  });

  it('should call onClick() prop when link is clicked', () => {
    comp.find('.tab-link').simulate('click', { preventDefault: () => {} });
    expect(onClickHandler).toHaveBeenCalledWith(comp.props().tabIndex);
  });

  it("should add '.active' className to component if tab is active", () => {
    const Component = mount(<Tab isActive iconClassName="foo" linkClassName="test" />);

    expect(Component.find('.tab-link').hasClass('active')).toBeTruthy();
  });

  it("should not add '.active' className to component if tab is inactive", () => {
    const Component = mount(<Tab isActive={false} iconClassName="foo" linkClassName="test" />);
    expect(Component.find('.tab-link').hasClass('active')).toBeFalsy();
  });

  it('should add correct className to tab link', () => {
    expect(comp.find('.tab-link').hasClass(comp.props().linkClassName)).toBeTruthy();
  });

  it('should add correct className to tab icon', () => {
    expect(comp.find('.tab-icon').hasClass(comp.props().iconClassName)).toBeTruthy();
  });
});
