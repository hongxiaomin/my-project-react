/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { GUID } from '../../utils/Common';

export const getId = () => (
  () => GUID()
);
