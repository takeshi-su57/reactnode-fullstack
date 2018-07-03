import React, { Component } from 'react';

export class Tabs extends Component {
  defaultProps = {
    defaultActiveTabIndex: 0,
  };

  constructor(props, context) {
    super(props, context);
    const { defaultActiveTabIndex } = this.props;
    this.state = {
      activeTabIndex: defaultActiveTabIndex,
    };
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(tabIndex) {
    const { activeTabIndex } = this.state;
    const { defaultActiveTabIndex } = this.props;
    this.setState({
      activeTabIndex: tabIndex === activeTabIndex ? defaultActiveTabIndex : tabIndex,
    });
  }

  // Encapsulate <Tabs/> component API as props for <Tab/> children
  renderChildrenWithTabsApiAsProps() {
    const { children } = this.props;
    const { activeTabIndex } = this.state;
    return React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        onClick: this.handleTabClick,
        tabIndex: index,
        isActive: index === activeTabIndex,
      })
    );
  }

  // Render current active tab content
  renderActiveTabContent() {
    const { children } = this.props;
    const { activeTabIndex } = this.state;
    if (children[activeTabIndex]) {
      return children[activeTabIndex].props.children;
    }
    return null;
  }

  render() {
    return (
      <div className="tabs">
        <ul className="tabs-nav nav navbar-nav navbar-left">{this.renderChildrenWithTabsApiAsProps()}</ul>
        <div className="tabs-active-content">{this.renderActiveTabContent()}</div>
      </div>
    );
  }
}
