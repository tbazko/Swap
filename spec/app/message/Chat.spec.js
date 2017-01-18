'use strict';
const Chat = rootRequire('app/chat/Chat');

describe('Chat', function() {
  let chat = new Chat(2);

  it('should initialise', () => {
    expect(chat).not.toBeUndefined();
  });

  it('should return all messages related to the swapRequest id or empty Array', (done) => {
    chat.messages.then((messages) => {
      expect(messages).toEqual(jasmine.any(Array));
      done();
    });
  });

  it('if messages exist, should have data', () => {
    chat.messages.then((messages) => {
      if(messages[0]) {
        expect(messages[0].id).toEqual(jasmine.any(Number) || null);
        expect(messages[0].new).toEqual(jasmine.any(Number) || null);
        expect(messages[0].reg_date).toEqual(jasmine.any(Date) || null);
        expect(messages[0].text).toEqual(jasmine.any(String) || null);
        expect(messages[0].user_id).toEqual(jasmine.any(Number) || null);
        expect(messages[0].swapRequest_id).toEqual(jasmine.any(Number) || null);
      }
      done();
    });
  });
});
