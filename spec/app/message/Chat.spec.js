'use strict';
const Chat = rootRequire('app/message/Chat');

describe('Destroy Button Model', function() {
  let chat = new Chat();

  it('should initialise', () => {
    expect(chat).not.toBeUndefined();
  });
});
