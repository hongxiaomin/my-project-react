import check from 'check-types';
import * as propertySpecs from '../constants/propertySpecs';
/**
 * combine all component properties
 * @type {Object}
 */

export default (stencilName) => {
  const spec = propertySpecs[stencilName];

  return check.undefined(spec) ? {} : spec;
};
