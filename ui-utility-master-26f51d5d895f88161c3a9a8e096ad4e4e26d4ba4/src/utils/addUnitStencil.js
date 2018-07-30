import { ROOT_DIV_ID } from '../constants/config';
import { createStencil } from '../constants/models';
import { addStencil } from '../actions';
/**
 * create a unit stencil into root (canvas) or parent container
 * @param  {Object} dispatch        store.dispatch
 * @param  {String} stencilName     stencil template in left menu list
 * @param  {String} parentStencilId uuid
 * @return {String}                 uuid by some stencil || undefined
 */
export default (dispatch, stencilName = undefined, parentStencilId, props) => {
  const stencilElement = createStencil(stencilName, props);

  if (stencilElement) {
    const selfStencilId = stencilElement.get('id');
    const parentId = parentStencilId || ROOT_DIV_ID;
    dispatch(addStencil({ stencil: stencilElement, childId: selfStencilId, parentId }));
    return stencilElement;
  }

  return undefined;
};
