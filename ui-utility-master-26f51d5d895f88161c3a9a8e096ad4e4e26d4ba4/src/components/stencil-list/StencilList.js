import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import styles from './stencilListStyles';
import uuid from 'uuid';
import ReactTooltip from 'react-tooltip';
/**
 * list all stencil for user
 * @param  {[type]} options.title           [description]
 * @param  {[type]} options.stencils        [description]
 * @param  {[type]} options.onListItemClick [description]
 * @return {[type]}                         [description]
 */
const StencilList = ({ title, stencils, onListItemClick }) => {
  const handleClick = (name) => () => {
    onListItemClick(name);
  };
  // for Grid Layout only
  // there is only one component of Grid Layout, no need to render it in nestedItems
  const handleGridClick = (name) => () => {
    if (name === 'Grid Layout') {
      onListItemClick(name);
    }
  };
  /**
   * fix ReactTooltip not re-render
   * Material-ui 0.15.4 > 0.18.7 caused
   * @return {[type]} [description]
   */
  const handleMouseEnter = () => {
    ReactTooltip.rebuild();
  };

  return (
    <List style={styles.list}>
      <ListItem
        nestedListStyle={styles.nestedList}
        primaryText={title}
        onTouchTap={handleGridClick(title)}
        data-for="stencilPreview"
        data-html
        data-tip={
          stencils.img &&
          `<img key=${uuid.v4()} src="${stencils.img}" width=${stencils.width} />`
        }
        nestedItems={
          stencils.items && stencils.items.map((item, index) =>
            <ListItem
              style={styles.innerListItem}
              nestedListStyle={styles.nestedList}
              key={index}
              primaryText={item.name}
              onTouchTap={handleClick(item.name)}
              data-for="stencilPreview"
              data-html
              data-tip={
                item.img &&
                `<img key=${uuid.v4()} src="${item.img}" width=${item.width} />`
              }
              onMouseEnter={handleMouseEnter}
              nestedItems={
                item.subItems && item.subItems.map((subItem, subItemIndex) =>
                  <ListItem
                    style={styles.innerListItem}
                    key={subItemIndex}
                    primaryText={subItem.name}
                    onTouchTap={handleClick(subItem.name)}
                    data-for="stencilPreview"
                    data-html
                    data-tip={
                      subItem.img &&
                      `<img key=${uuid.v4()} src="${subItem.img}" width=${subItem.width} />`
                    }
                    onMouseEnter={handleMouseEnter}
                  />
                )
              }
            />
          )
        }
      />
    </List>
  );
};

StencilList.propTypes = {
  title: PropTypes.string,
  stencils: PropTypes.object,
  onListItemClick: PropTypes.func,
};

export default StencilList;
