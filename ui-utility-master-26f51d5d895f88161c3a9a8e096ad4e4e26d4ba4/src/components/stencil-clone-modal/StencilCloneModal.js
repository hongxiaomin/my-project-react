import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import ActionInfo from 'material-ui/svg-icons/action/info';
import styles from './stencilCloneModalStyles';

export default class StencilCloneModal extends Component {
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPageCheck = this.onPageCheck.bind(this);
    this.state = {
      pageIndexes: [],
    };
  }

  onCancel() {
    this.props.closeStencilCloneModal();
    this.setState({ pageIndexes: [] });
  }

  onSubmit() {
    const { selectedStencil, stencilCloneModalType, currentPageIndex, routes } = this.props;
    this.props.onDifferentPageCloneSubmit(
      selectedStencil, this.state.pageIndexes, stencilCloneModalType, currentPageIndex, routes,
    );
    this.props.closeStencilCloneModal();
    this.setState({ pageIndexes: [] });
  }

  onPageCheck = (pageIndex) => (e, isChecked) => {
    if (isChecked) {
      this.state.pageIndexes.push(pageIndex);
    } else {
      const index = this.state.pageIndexes.indexOf(pageIndex);
      this.state.pageIndexes.splice(index, 1);
    }
    this.setState(this.state);
  }

  getAllPageInfo() {
    const pageInfoArray = [];
    for (let i = 0; i < this.props.routes.length; i++) {
      pageInfoArray.push({ name: this.props.routes[i].path, index: i });
    }
    pageInfoArray.forEach((pageInfo, index) => {
      if (pageInfo.name === this.props.currentPage) {
        pageInfoArray.splice(index, 1);
      }
    });
    return pageInfoArray;
  }

  // should check all pages for any same linked clone stencil, then disable it
  getPagesHaveSameId() {
    const { stencilCloneModalType, routes, selectedStencil, currentPageIndex } = this.props;
    const pagesHaveSameId = [];
    if (stencilCloneModalType === 'link clone') {
      for (let i = 0; i < routes.length; i++) {
        if (i !== currentPageIndex) {
          const idArray = Object.keys(routes[i].stencils);
          for (let j = 0; j < idArray.length; j++) {
            if (idArray[j] === selectedStencil.id) {
              pagesHaveSameId.push(routes[i].path);
            }
          }
        }
      }
    }
    return pagesHaveSameId;
  }

  renderPageCheckbox(pagesHaveSameId) {
    const { selectedStencil, stencilCloneModalType } = this.props;
    if (Object.keys(selectedStencil).length === 0) {
      return (
        <div style={styles.hintItem}>
          Oops, seems you haven't selected stencil to clone.
        </div>
      );
    }
    if (selectedStencil.name === 'ListItem') {
      return (
        <div style={styles.hintItem}>
          Can't clone part of List across pages, choose whole List instead.
        </div>
      );
    }
    if (selectedStencil.namespace === 'DRC' && stencilCloneModalType === 'link clone') {
      return (
        <div style={styles.hintItem}>
          Sorry, can't do link clone on this component.
        </div>
      );
    }
    const pages = this.getAllPageInfo();
    if (pages.length === 0) {
      return (
        <div style={styles.hintItem}>
          There is no other pages existed. Please add page.
        </div>
      );
    }

    return pages.map((page, index) =>
      <Checkbox key={index} label={page.name} style={styles.checkbox}
        onCheck={this.onPageCheck(page.index)} disabled={pagesHaveSameId.indexOf(page.name) > -1}
      />
    );
  }

  render() {
    const { stencilCloneModalType, stencilCloneModalOpen } = this.props;
    const pagesHaveSameId = this.getPagesHaveSameId();
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        labelStyle={styles.label}
        onTouchTap={this.onCancel}
      />,
      <FlatButton
        label="Submit"
        primary
        labelStyle={styles.label}
        onTouchTap={this.onSubmit}
      />,
    ];

    return (
      <Dialog
        title={`Select the destination page of ${stencilCloneModalType}d stencil`}
        titleStyle={styles.title}
        actions={actions}
        modal={false}
        onRequestClose={this.onCancel}
        open={stencilCloneModalOpen}
        contentStyle={{ width: '50%' }}
      >
        <div>
          <div style={styles.checkboxContainer}>
            {this.renderPageCheckbox(pagesHaveSameId)}
          </div>
          {pagesHaveSameId.length > 0 &&
            <div style={{ display: 'flex', marginTop: 20 }}>
              <ActionInfo color="#ff9800" style={styles.infoIcon} />
              <div style={styles.hintText}>
                The disabled pages already have the same linked clone stencil with
                  the stencil you currently selected, so they can't be chosen
              </div>
            </div>
          }
        </div>
      </Dialog>
    );
  }
}

StencilCloneModal.propTypes = {
  routes: PropTypes.array,
  currentPage: PropTypes.string,
  currentPageIndex: PropTypes.number,
  selectedStencil: PropTypes.object.isRequired,
  stencilCloneModalOpen: PropTypes.bool.isRequired,
  stencilCloneModalType: PropTypes.string.isRequired,
  onDifferentPageCloneSubmit: PropTypes.func.isRequired,
  closeStencilCloneModal: PropTypes.func.isRequired,
};
