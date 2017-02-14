'use strict';
const CategoryTree = rootRequire('app/CategoryTree');

describe('Category Tree', () => {
  var tree;
  beforeEach(() => {
    tree = new CategoryTree();
  });

  it('should initialise', () => {
    expect(tree).not.toBeUndefined();
  });
});
