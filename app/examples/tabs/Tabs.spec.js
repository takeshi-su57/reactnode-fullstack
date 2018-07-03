import React from 'react';
import { mount } from 'enzyme';
import { Tabs } from './Tabs';
import { Tab } from './Tab';

describe('<Tabs/>', () => {
  let comp = null;

  beforeEach(() => {
    comp = mount(
      <Tabs>
        <Tab iconClassName="icon-class-0" linkClassName="link-class-0">
          <p>content 0</p>
        </Tab>
        <Tab iconClassName="icon-class-1" linkClassName="link-class-1">
          <p>content 1</p>
        </Tab>
      </Tabs>
    );
  });

  it('should render', () => {
    expect(comp.length).toBeTruthy();
  });

  it('should render tab 0 content by default', () => {
    expect(comp.find('.tabs-active-content').text()).toEqual('content 0');
  });

  it("should allow to specify the 'defaultActiveTabIndex'", () => {
    const Component = mount(
      <Tabs defaultActiveTabIndex={1}>
        <Tab iconClassName="icon-class-0" linkClassName="link-class-0">
          <p>content 0</p>
        </Tab>
        <Tab iconClassName="icon-class-1" linkClassName="link-class-1">
          <p>content 1</p>
        </Tab>
      </Tabs>
    );
    // Active tab content should be 1 instead of 0 now
    expect(Component.find('.tabs-active-content').text()).toEqual('content 1');
  });

  it('should change tab content to the selected tab', () => {
    expect(comp.find('.tabs-active-content').text()).toEqual('content 0');
    // Select tab at index 1, and expect text to change
    comp.find('.link-class-1').simulate('click', { preventDefault: () => {} });
    expect(comp.find('.tabs-active-content').text()).toEqual('content 1');
  });
});
