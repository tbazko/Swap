'use strict';
const ItemFormPagePresenter = rootRequire('app/pages/itemForm/ItemFormPagePresenter');
const ItemMock = rootRequire('spec/helpers/ItemMock');

describe('Item Form page presenter', () => {
  let page;
  let fakeReq = {
    method: 'GET',
    path: '/edit',
    params: {
      id: 1
    },
    user: {
      id: 0
    }
  }
  let fakeRes = {
    render: function() {
      return true;
    },
    redirect: function() {
      return true;
    }
  }
  let fakeReqWithoutId = {
    method: 'GET',
    params: {}
  }

  beforeEach(() => {
    page = new ItemFormPagePresenter({
      template: 'pages/itemFormView'
    });
    spyOn(page, '_renderEditForm').and.callThrough();
    spyOn(page, '_renderEmptyForm');
    spyOn(page, '_redirectToItemNotExists').and.callFake(function() {return true});
    spyOn(page, '_denyItemEditing');
  });

  it('if request params contain id, render edit form', () => {
    page.render(fakeReq, fakeRes, {});
    expect(page._renderEditForm).toHaveBeenCalledTimes(1);
    expect(page._renderEmptyForm).toHaveBeenCalledTimes(0);
  });

  it('if request params doesn\'t contain id, render empty form', () => {
    page.render(fakeReqWithoutId, fakeRes, {});
    expect(page._renderEmptyForm).toHaveBeenCalledTimes(1);
    expect(page._renderEditForm).toHaveBeenCalledTimes(0);
  });

  xit('if request params contain id, but item doesn\'t exist, redirect', (done) => {
    fakeReq.params.id = 0;
    page.render(fakeReq, fakeRes, {});
    page.model.pageDataPromise.then((pageData) => {
      expect(page._redirectToItemNotExists).toHaveBeenCalledTimes(1);
      done();
    }).catch((err) => console.log(err));
  });

  it('if request params contain id, item exists, but user is NOT owner, deny', (done) => {
    fakeReq.params.id = global.itemId;
    fakeReq.user.id = -1;
    page.render(fakeReq, fakeRes, {});
    page.model.pageDataPromise.then((pageData) => {
      expect(page._denyItemEditing).toHaveBeenCalledTimes(1);
      done();
    }).catch((err) => {
      console.log('line 69: ' + err);
    });
  });

  it('if request params contain id, item exists and user is owner, render form', (done) => {
    fakeReq.params.id = global.itemId;
    fakeReq.user.id = ItemMock.ownerId;
    page.render(fakeReq, fakeRes, {});
    spyOn(page.view, 'render');
    page.model.pageDataPromise.then((pageData) => {
      expect(page._redirectToItemNotExists).toHaveBeenCalledTimes(0);
      expect(page._denyItemEditing).toHaveBeenCalledTimes(0);
      expect(page.view.render).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
